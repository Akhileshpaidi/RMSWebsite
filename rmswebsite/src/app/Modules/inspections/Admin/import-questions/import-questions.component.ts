import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrls: ['./import-questions.component.scss'],
})
export class ImportQuestionsComponent implements OnInit {
  questions: any;
  sessionData: any;
  erroMessage: any;
  isSelected = true;
  questionForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ImportQuestionsComponent>,
    private router: Router,
    private QuestionSummary: InspectionService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private formBuilder: FormBuilder
  ) {
    this.getQuestionBank();
  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      selectedQuestions: '',
    });
  }

  getQuestionBank() {
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

    // Calling Api
    this.QuestionSummary.QuestionSummary(encryptedPayload).subscribe(
      (response: any) => {
        if (response.ResponseCode === '0') {
          let questionList = this.encrypt.decryptionAES(response.ResponseData);
          let data = JSON.parse(questionList);
          this.questions = data.questionsummary;
          console.log(this.questions, 'questionList');
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

  close() {
    this.dialogRef.close();
  }
}
