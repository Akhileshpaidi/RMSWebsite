import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-import-remedy',
  templateUrl: './import-remedy.component.html',
  styleUrls: ['./import-remedy.component.scss']
})
export class ImportRemedyComponent {
  remedyForm!: FormGroup;
  remedies: any;
  sessionData: any;
  erroMessage: any;

  constructor(
    private dialogRef: MatDialogRef<ImportRemedyComponent>,
    private router: Router,
    private report: ReportService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private formBuilder: FormBuilder
  ){
    this.getRemedyBank();
  }


  ngOnInit(): void {
    this.remedyForm = this.formBuilder.group({
      selectedremedys: '',
    });
  }

  getRemedyBank() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: 0, //pass 0 for summary
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.report.CRUDRemedy(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let remedyList = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(remedyList);
        this.remedies = data.remedy
        console.log(this.remedies, 'remedyList');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }


  onFormSubmit(value: any) {
    console.log('form value', value);
    this.dialogRef.close(this.remedyForm.value);
  }

  exit() {
    this.dialogRef.close();
  }

}
