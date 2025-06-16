import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';

@Component({
  selector: 'app-review-inspection',
  templateUrl: './review-inspection.component.html',
  styleUrls: ['./review-inspection.component.scss'],
})
export class ReviewInspectionComponent implements OnInit {
  inspectioForm!: FormGroup;
  inspectionFields!: any[];
  sessionData: any;
  isLinear = false;
  previous = false;
  inspectionData: any;
  erroMessage: any;
  radio: any;
  id: any;
  checked = false;
  ans: any;
  previews: string[] = [];
  currentImageIndex: number = 0;
  showSlider: boolean = false;
  constructor(
    private fb: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.getInspection();
  }

  ngOnInit(): void {
    this.inspectioForm = this.fb.group({
      inspectionname: '',
      bridgename: '',
      buid: '',
      startdate: '',
      enddate: '',
      nextreviewdate: '',
      description: '',
      section: this.fb.array([]),
    });
  }

  getInspection() {
    // this.id = window.history.state.data.id;
    this.id = window.history.state.data;
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionid: this.id,
    };
    console.log('getInspection payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // console.log('getInspection encryptedPayload', encryptedPayload);

    // Calling Api
    this.inspection
      .getInspectionById(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          this.inspectionData = JSON.parse(data);
          this.addDataToSection(this.inspectionData);
          let trimData: any[] = [];
          this.inspectionData.section.forEach((sec: any) => {
            sec.subsection.forEach((subsec: any) => {
              subsec.questions.forEach((q: any) => {
                q.options.forEach((o: any) => {
                  if (o.key == q.response) {
                    trimData.push({
                      key: o.key,
                      response: q.response,
                    });
                  }
                });
              });
            });
          });
          console.log(this.inspectionData, 'Get inspection data');
        }
      });
  }

  section(): FormArray {
    return this.inspectioForm.get('section') as FormArray;
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
          mandatory: q.mandatory,
          questiontype: q.questiontype,
          response: q.response,
          options: this.fb.array([]),
          question: [q.question, q.mandatory == 0 ? Validators.required : []],
          files: '',
          review: new FormControl(),
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

  goForward(stepper: MatStepper) {
    this.previous = true;
    stepper.next();
  }

  goBackrward(stepper: MatStepper) {
    stepper.previous();
  }

  draftInspection(data: any) {
    this.getInspection();
    let id: any = window.history.state.data;
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let trimData: any[] = [];
    console.log('form Data', data);

    data.section.forEach((sec: any) => {
      sec.subsection.forEach((subsec: any) => {
        subsec.questions.forEach((q: any) => {
          trimData.push({
            questionid: q.questionid,
            response: q.response,
            rating: 0,
            files: q.files,
          });
        });
      });
    });

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionstatus: 'A',
      nextreviewdate: '',
      inspectionassignid: id,
      response: trimData,
    };
    console.log('Draft Inspection Payload', trimData);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.inspection
      .submitInspection(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);

        if (response.ResponseCode === '0') {
          console.log(response.ResponseDesc, 'Draft inspection');
        } else {
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          });
          // console.log(this.erroMessage, 'Draft inspection Failed');
        }
      });
  }

  submitInspection(data: any) {
    if (this.inspectioForm.invalid) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: 'Please fill All the compulsory fields' },
      });
      return;
    }
    let id: any = window.history.state.data;

    console.log('assigned inspection id', id);
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let trimData: any[] = [];
    data.section.forEach((sec: any) => {
      sec.subsection.forEach((subsec: any) => {
        subsec.questions.forEach((q: any) => {
          trimData.push({
            questionid: q.questionid,
            reviewerremark: q.review,
          });
        });
      });
    });

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionstatus: 'R',
      nextreviewdate: '',
      inspectionassignid: id,
      response: trimData,
    };
    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.inspection
      .submitInspection(encryptedPayload)
      .subscribe((response: any) => {
        // console.log('response', response);

        if (response.ResponseCode === '0') {
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          }); // console.log(response.ResponseDesc, 'Submit inspection');
          this.router.navigate([
            'dashboard/inspection/inspector-inspection-list',
          ]);
        } else {
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          });
          // console.log(this.erroMessage, 'Submit inspection Failed');
        }
      });
  }

  reject(data: any) {
    this.draftInspection(data);

    this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: 'Inspection Form is Rejected' },
    });
    this.router.navigate(['dashboard/inspection/inspector-inspection-list']);
  }

  exportform() {
    console.log('exporting form');
  }
}
