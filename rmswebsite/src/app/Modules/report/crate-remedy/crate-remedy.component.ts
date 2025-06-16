import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-crate-remedy',
  templateUrl: './crate-remedy.component.html',
  styleUrls: ['./crate-remedy.component.scss'],
})
export class CrateRemedyComponent {
  addRemedyForm!: FormGroup;
  RemedyType: any;
  sessionData: any;
  selectedRating: any;
  key: any;
  erroMessage: any;
  selected: any;
  errorSubject = new Subject<any>(); // any can be replaced by the error resp JSON Type
  status = new FormControl('name');
  tempStatus: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private RemedyBank: ReportService
  ) {
   
  }

  rating: any[] = [
    { color: '#93d150', displayValue: 'Low-1', value: 1 },
    { color: '#93d150', displayValue: 'Low-2', value: 2 },
    { color: '#ffff00', displayValue: 'Low-Medium-3', value: 3 },
    { color: '#ffff00', displayValue: 'Low-Medium-4', value: 4 },
    { color: '#ffc100', displayValue: 'Medium-5', value: 5 },
  ];

  ngOnInit(): void {
    this.addRemedyForm = this.fb.group({
      Remedy: '',
    });
  }

  onSubmit(data: any) {

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      name: data.Remedy,
    };
    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.RemedyBank.CRUDRemedy(encryptedPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        this.router.navigate(['/dashboard/report/remedy-bank']);
      }
    });
  }


  getRating(value: any, key: any) {
    this.selectedRating = value;
    this.key = key;
    console.log(key, 'rating val');
  }

  getKey(value: any) {
    this.key = value;
  }
  

  Cancel() {
    this.router.navigate(['dashboard/report/remedy-bank']);
  }

  selectInspection(element: any) {
    let id = element.value;

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      bridgeid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.RemedyType
      .inspectionSummary(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let inspectionList = this.encrypt.decryptionAES(
            response.ResponseData
          );
          let data = JSON.parse(inspectionList);
          this.selectInspection = data.inspectionlist;
          console.log('inspectionList', this.selectInspection);
        } else {
          console.error(response);
        }

      });
    }

    statusToggle(event: any) {
      this.tempStatus = !this.tempStatus;
      this.status.setValue(this.tempStatus ? '0' : '1');
      console.log(this.status.value);
    }

}
