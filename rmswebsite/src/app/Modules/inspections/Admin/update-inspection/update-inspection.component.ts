import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { ImportQuestionsComponent } from '../import-questions/import-questions.component';
import { ImportSectionComponent } from '../import-section/import-section.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

@Component({
  selector: 'app-update-inspection',
  templateUrl: './update-inspection.component.html',
  styleUrls: ['./update-inspection.component.scss'],
})
export class UpdateInspectionComponent implements OnInit {
  inspectionData: any = [];
  sections: any;
  sessionData: any;
  erroMessage: any;
  updateInspectionForm!: FormGroup;
  SelectedQuestionType: any;
  selectedRating: any;

  rating: any[] = [
    { displayValue: 'Low-1', value: 1 },
    { displayValue: 'Low-2', value: 2 },
    { displayValue: 'Low-Medium-3', value: 3 },
    { displayValue: 'Low-Medium-4', value: 4 },
    { displayValue: 'Medium-5', value: 5 },
    { displayValue: 'Medium-6', value: 6 },
    { displayValue: 'High-7', value: 7 },
    { displayValue: 'High-8', value: 8 },
  ];

  questionType: any;
  checked = true;
  authid: any;
  files: any;
  questionId: any;
  sectionIndex: any;
  subsectionIndex: any;
  questionIndex: any;
  subSectionData: any;
  questionData: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    private router: Router
  ) {
    this.selectInspection();
    this.getTypeOfQuestion();
  }

  getQuestionType(value: any) {
    this.SelectedQuestionType = value;
  }

  getRating(value: any) {
    this.selectedRating = value;
  }

  ngOnInit() {
    this.updateInspectionForm = this.fb.group({
      name: '',
      description: '',
      section: this.fb.array([]),
    });
  }

  section(): FormArray {
    return this.updateInspectionForm.get('section') as FormArray;
  }

  subsections(secIndex: number): FormArray {
    return this.section().at(secIndex).get('subsection') as FormArray;
  }

  questions(secIndex: number, subsecIndex: number): FormArray {
    return this.subsections(secIndex)
      .at(subsecIndex)
      .get('questions') as FormArray;
  }

  putQuestions(secIndex: number, subsecIndex: number, data: any) {
    return this.subsections(secIndex)
      .at(subsecIndex)
      .get('questions') as FormArray;
  }
  
  options(
    secIndex: number,
    subsecIndex: number,
    questionindex: number
  ): FormArray {
    return this.questions(secIndex, subsecIndex)
      .at(questionindex)
      .get('options') as FormArray;
  }

  newSection(): FormGroup {
    return this.fb.group({
      sectionindex: '',
      sectionname: '',
      subsection: this.fb.array([]),
    });
  }

  newsubSection(): FormGroup {
    return this.fb.group({
      subsectionindex: '',
      subsectionname: '',
      questions: this.fb.array([]),
    });
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      questionindex: '',
      questionid: 0,
      question: '',
      mandatory: true ? '0' : '1',
      questiontype: this.SelectedQuestionType,
      options: this.fb.array([]),
    });
  }

  newOption(): FormGroup {
    return this.fb.group({
      key: '',
      value: '',
      rating: this.selectedRating,
    });
  }

  addSection() {
    this.section().push(this.newSection());
  }

  addSubsection(secIndex: number) {
    this.subsections(secIndex).push(this.newsubSection());
  }

  addQuestion(secIndex: number, subsecIndex: number) {
    this.questions(secIndex, subsecIndex).push(this.newQuestion());
  }

  addOptions(secIndex: number, subsecIndex: number, questionindex: number) {
    this.options(secIndex, subsecIndex, questionindex).push(this.newOption());
  }

  removeSection(secIndex: number) {
    this.section().removeAt(secIndex);
  }

  removesubSection(secIndex: number, subsecIndex: number) {
    this.subsections(secIndex).removeAt(subsecIndex);
  }

  removeQuestion(secIndex: number, questionindex: number, subsecIndex: number) {
    this.questions(secIndex, subsecIndex).removeAt(questionindex);
  }

  removeOption(
    secIndex: number,
    subsecIndex: number,
    questionindex: number,
    key: number
  ) {
    this.options(secIndex, subsecIndex, questionindex).removeAt(key);
  }

  importSection() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ImportSectionComponent, dialogConfig);
  }

  importQuestions(secIndex: number, subsecIndex: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ImportQuestionsComponent, dialogConfig);
    let CurrentDialog = this.dialog.open(
      ImportQuestionsComponent,
      dialogConfig
    );

    CurrentDialog.afterClosed().subscribe((result) => {
      // console.log('Dialog result: ', result.selectedQuestions);
      let x: FormArray = this.putQuestions(
        secIndex,
        subsecIndex,
        result.selectedQuestions
      );
      // console.log('X: ', x);
      result.selectedQuestions
        .map((e: any) =>
          this.fb.group({
            questionindex: 0,
            questionid: e.id,
            question: e.text,
            mandatory: true ? '0' : '1',
            questiontype: e.questiontypeid,
            options: this.fb.array([]),
          })
        )
        .forEach((e: any) => {
          x.push(e);
        });
    });
  }

  addDataToSection(inspectionData: any) {
    let sec: FormArray = this.section();
    inspectionData.section.forEach((e: any) => {
      sec.push(
        this.fb.group({
          sectionindex: e.sectionindex,
          sectionname: e.sectionname,
          subsection: this.fb.array([]),
        })
      );

      this.addDataToSubSection(e.sectionindex, e.subsection);
    });
  }

  addDataToSubSection(sectionindex: any, subsection: any) {
    let subsectionArray = this.subsections(sectionindex);
    subsection.forEach((ss: any) => {
      subsectionArray.push(
        this.fb.group({
          subsectionindex: ss.subsectionindex,
          subsectionname: ss.subsectionname,
          questions: this.fb.array([]),
        })
      );
      this.addDataToQuestions(sectionindex, ss.subsectionindex, ss.questions);
    });
  }

  addDataToQuestions(sectionindex: any, subsectionindex: any, questions: any) {
    let questionArray = this.questions(sectionindex, subsectionindex);
    questions.forEach((q: any) => {
      questionArray.push(
        this.fb.group({
          questionindex: q.questionindex,
          questionid: q.questionid,
          question: q.question,
          mandatory: q.mandatory,
          questiontype: q.questiontype,
          options: this.fb.array([]),
        })
      );
      this.addDataToOptions(
        sectionindex,
        subsectionindex,
        q.questionindex,
        q.options
      );
    });
  }

  addDataToOptions(
    sectionindex: any,
    subsectionindex: any,
    questionindex: any,
    options: any
  ) {
    let optionArray = this.options(
      sectionindex,
      subsectionindex,
      questionindex
    );
    options.forEach((opt: any) => {
      optionArray.push(
        this.fb.group({
          key: opt.key,
          value: opt.value,
          rating: opt.rating,
        })
      );
    });
  }

  selectInspection() {
    let id: any = window.history.state.data.id;
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // payload for service

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: id,
    };
    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.inspection
      .CRUDInspection(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          this.inspectionData = JSON.parse(data);
          console.log('Select Inspection', this.inspectionData);
          this.erroMessage = response.ResponseDesc;
          this.addDataToSection(this.inspectionData);
        }
      });
  }

  updateInspection(value: any) {
    // console.log('Update Inspection', value);
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'U',
      id: this.inspectionData.id,
      name: value.name,
      description: value.description,
      section: value.section,
    };
    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.inspection
      .CRUDInspection(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);

        if (response.ResponseCode === '0') {
          this.router.navigate(['dashboard/inspection/inspection-list']);
          this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {  message: response.ResponseDesc }
        });          this.router.navigate(['/dashboard/inspection/inspection-list']);
          // console.log(response.ResponseDesc, 'Update inspection');
        } else {
          this.erroMessage = response.ResponseDesc;

          // console.log(this.erroMessage, 'Update inspection Failed');
        }
      });
  }

  getTypeOfQuestion() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
    };
    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.inspection
      .CRUDTypeOfQuestion(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);
        if (response.ResponseCode === '0') {
          let res = this.encrypt.decryptionAES(response.ResponseData);
          let data = JSON.parse(res);
          this.questionType = data.typeofquestion;
          console.log(this.questionType, 'questionType');
        }
      });
  }
}
