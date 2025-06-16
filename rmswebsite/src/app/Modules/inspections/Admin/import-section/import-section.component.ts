import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-import-section',
  templateUrl: './import-section.component.html',
  styleUrls: ['./import-section.component.scss'],
})
export class ImportSectionComponent implements OnInit {
  questionForm!: FormGroup;
  sessionData: any;
  selectInspection: any;
  selectSection: any;
  erroMessage: any;
  constructor(
    private dialogRef: MatDialogRef<ImportSectionComponent>,
    private Inspection: InspectionService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private formBuilder: FormBuilder
  ) {
    this.getMetaDAta();
  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      selectedInspection: '',
      selectedSection:''
    });
  }


  close() {
    this.dialogRef.close();
  }

  getMetaDAta() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
    };
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.Inspection.inspectionList(encryptedPayload).subscribe(
      (response: any) => {
        console.log('response', response);
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
      }
    );
  }

  importsection(element: any) {
    let id = element.value;
    console.log(id, 'inspection id');

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionid: id,
    };
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.Inspection.SectionFromInspection(encryptedPayload).subscribe(
      (response: any) => {
        console.log('response', response);
        if (response.ResponseCode === '0') {
          let sectionlist = this.encrypt.decryptionAES(response.ResponseData);
          let data = JSON.parse(sectionlist);
          this.selectSection = data.section;

          console.log(this.selectSection, 'sectionlist');
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      }
    );
  }

  onFormSubmit(value: any) {
    console.log('form value', value);
    this.dialogRef.close(this.questionForm.value);
  }
}
