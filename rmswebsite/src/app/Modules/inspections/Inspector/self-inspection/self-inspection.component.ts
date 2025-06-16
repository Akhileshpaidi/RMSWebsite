import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-self-inspection',
  templateUrl: './self-inspection.component.html',
  styleUrls: ['./self-inspection.component.scss'],
})
export class SelfInspectionComponent implements OnInit {
  selfInspectionForm: FormGroup;
  selectedInspection = new FormControl('');
  selectedBridge = new FormControl('');

  selectBridge: any;
  selectInspection: any;
  sessionData: any;
  erroMessage: any;

  constructor(
    private router: Router,
    private session: SessionService,
    private inspection: InspectionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder
  ) {
    this.selfInspectionForm = this.fb.group({
      inspection: this.selectedInspection,
      bridge: this.selectedBridge,
    });
    this.getMetaData();
  }

  ngOnInit(): void {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // console.log(this.sessionData.profile.userid, 'inspector');
  }
  selfInspection(element: any) {
    console.log('xxxxxxxxxxxxxxxxxx start self inspection data', element);

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      inspectionid: element.inspection,
      bridgeid: element.bridge,
      startdate: '',
      enddate: '',
      inspectorid: [this.sessionData.profile.userid],
      reviewerid: [this.sessionData.profile.userid],
      nextreviewdate: '',
      description: '',
    };
    console.log(
      ' step 1 sendind payload for self inspectiom in ssign inpsection Api',
      payload
    );

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api for Inspector List
    this.inspection
      .CRUDAssignInspection(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);
        if (response.ResponseCode === '0') {
          // let inspection = this.encrypt.decryptionAES(
          //   response.ResponseData
          // );
          // let data = JSON.parse(inspection);
          console.log(
            'step 2 getting response from asign inspection Api',
            response
          );

          console.log(
            response.ResponseData,
            'getting the id from respose to pass'
          );
          this.router.navigate(['dashboard/inspection/start-inspection'], {
            state: { data: response.ResponseData },
          });
          this.erroMessage = response.ResponseDesc;
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });

    // assign inspection

    // this.router.navigate(['dashboard/inspection/start-inspection'], {
    //   state: { data: element },
    // });
  }

  getMetaData() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      status: '',
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api inspection list
    this.inspection
      .inspectionList(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);
        if (response.ResponseCode === '0') {
          let inspectionlist = this.encrypt.decryptionAES(
            response.ResponseData
          );
          let data = JSON.parse(inspectionlist);
          this.selectInspection = data.inspectionlist;
          console.log(this.selectInspection, 'inspectionlist');
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });

    // Calling Api Bridge list
    this.inspection.bridgeList(encryptedPayload).subscribe((response: any) => {
      // console.log('response', response);
      if (response.ResponseCode === '0') {
        let inspectionlist = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(inspectionlist);
        this.selectBridge = data.bridgesummary;
        console.log(this.selectBridge, 'bridgesummary');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  // unregisteredBridge() {
  //   this.router.navigate(['dashboard/inspection/unregister-inspection']);
  // }
  Cancel(){
    this.router.navigate(['/dashboard/inspection/authority-name']);  
  }

}
