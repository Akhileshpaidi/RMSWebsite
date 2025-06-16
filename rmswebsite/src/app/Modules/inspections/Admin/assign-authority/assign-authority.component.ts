import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';

@Component({
  selector: 'app-assign-authority',
  templateUrl: './assign-authority.component.html',
  styleUrls: ['./assign-authority.component.scss']
})
export class AssignAuthorityComponent {
    assignInspectionForm: FormGroup;
  selectedInspectors = new FormControl('');
  selectedInspection = new FormControl('');
  selectedReviewer = new FormControl('');
  selectedBridge = new FormControl('');
  nextreviewdate = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');
  description = new FormControl('');
  inspectors: any;
  selectInspection: any;
  selectBridge: any;
  pipe = new DatePipe('en-US');
  user: any; //reviewer
  sessionData: any;
  erroMessage: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    public dialog: MatDialog
  ) {
    this.assignInspectionForm = this.fb.group({
      inspector: this.selectedInspectors,
      inspection: this.selectedInspection,
      description: this.description,
    });

    this.getMetaData();
  }

  assignInspection(value: any) {
    if (this.assignInspectionForm.invalid) {
             this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {  message: 'All fields are compulsory' }
        });
      return;
    }
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    // const arr = value.inspector.map((item: { id: any }) => item.id);
    // console.log(arr, "inspector id for multiple")
    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      inspectionid: value.inspection.id,
      bridgeid: value.bridge.id,
      startdate: this.pipe.transform(value.startDate, 'dd.MM.yyyy'),
      enddate: this.pipe.transform(value.endDate, 'dd.MM.yyyy'),
      inspectorid: [value.inspector.id],
      reviewerid: [value.reviewer.id],
      nextreviewdate: this.pipe.transform(value.nextreviewdate, 'dd.MM.yyyy'),
      description: value.description,
    };
    console.log('payload', payload);
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
          this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {  message: response.ResponseDesc }
        });
          this.router.navigate([
            '/dashboard/inspection/assign-authority-list',
          ]);

          this.erroMessage = response.ResponseDesc;
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });
  }

  ngOnInit(): void {}

  getMetaData() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    console.log('session data', user);
    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      status: '',
    };

    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api for Inspector List
    this.inspection
      .inspectorList(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);
        if (response.ResponseCode === '0') {
          let res = this.encrypt.decryptionAES(response.ResponseData);
          let data = JSON.parse(res);
          this.inspectors = data.inspectorlist;
          console.log(this.inspectors, 'inspector list');
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });

    // Calling Api for Reviewer List
    this.inspection
      .reviewerList(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);
        if (response.ResponseCode === '0') {
          let res = this.encrypt.decryptionAES(response.ResponseData);
          let data = JSON.parse(res);
          this.user = data.reviewerlist;
          console.log(this.user, 'reviewer list');
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });

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
          // console.log(this.selectInspection, 'inspectionlist');
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
        // console.log(this.selectBridge, 'bridgesummary');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  Cancel(){
    this.router.navigate(['/dashboard/inspection/inspector-inspection-list']);  
  }
}


