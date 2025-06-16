import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-strat-inspection',
  templateUrl: './strat-inspection.component.html',
  styleUrls: ['./strat-inspection.component.scss'],
})
export class StratInspectionComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
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
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImages: any[] = [];
  selectedImage: any[] = [];

  @ViewChild('imageDialog') imageDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  serverUrl= 'http://4.240.89.114:7001/api/DOC/UploadDoc';

  constructor(
    private fb: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    private router: Router,
    public dialog: MatDialog,private httpClient: HttpClient
  ) {
    this.getInspection();
  }

  ngOnInit() {
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
          response: new FormControl(),
          options: this.fb.array([]),
          question: [q.question, q.mandatory == 0 ? Validators.required : []],
          files: '',
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
          console.log(this.inspectionData, 'inspection data');
        }
      });
  }

  draftInspection(data: any) {
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
      inspectionstatus: 'D',
      nextreviewdate: '',
      inspectionassignid: id,
      response: trimData,
    };
    console.log('Draft payload', trimData);

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
          this.erroMessage = response.ResponseDesc;
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: this.erroMessage },
          });
          console.log(this.erroMessage, 'Draft inspection Failed');
        }
      });
    this.getInspection();
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
            response: q.response,
            rating: 0,
            files: '',
          });
        });
      });
    });

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionstatus: 'S',
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
          }); // console.log(this.erroMessage, 'Submit inspection Failed');
        }
      });
  }

  draft(data: any) {
    this.draftInspection(data);
    this.dialog.open(DaidailogeComponent, {
      width: '550px',
      data: { message: 'Inspection data is saved to Draft' },
    });
    this.router.navigate(['dashboard/inspection/inspector-inspection-list']);
  }

  exportform() {
    const data = document.getElementById('contentToConvert');
    if (!data) {
      return;
    }

    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const imgWidth = 208;
      const pageHeight = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        contentDataURL,
        'PNG',
        15,
        position + 10,
        imgWidth - 20,
        imgHeight - 20
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addPage();
        pdf.addImage(
          contentDataURL,
          'PNG',
          15,
          position + 10,
          imgWidth - 20,
          imgHeight - 20
        );
        heightLeft -= pageHeight;
      }

      pdf.save('MYPdf.pdf');
    });
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        if (this.previews.length < 4) {
          this.previews.push(reader.result as string);
        } else {
          this.previews.push(reader.result as string);
          this.currentImageIndex = 0;
        }
      };
    }
  }
  
  removeImage(image: any) {
    const index = this.selectedImages.indexOf(image);
    if (index !== -1) {
      this.selectedImages.splice(index, 1);
    }
  }

  onFileSelected() {
    const files: FileList = this.fileInput.nativeElement.files;
    if (files && files.length > 0) {
      // handle the selected files here
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const reader: FileReader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          const imageSrc: string = (<FileReader>e.target).result as string;
          this.selectedImages.push(imageSrc);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onUploadClicked(secIndex:any) {
    // handle the upload button click here
    console.log('Upload button clicked!');
    let id: any = window.history.state.data;
    const files: FileList = this.fileInput.nativeElement.files;
    if (files && files.length > 0) {

 // handle the selected files here
 for (let i = 0; i < files.length; i++) {
  const file: File = files[i];
  const reader: FileReader = new FileReader();
  reader.onload = (e: ProgressEvent) => {
    const imageSrc: string = (<FileReader>e.target).result as string;
    // this.selectedImage.push(imageSrc);
    const fileExtension = file.name.split('.')[1];

  // payload for service
  let payload = {
    authid: this.sessionData.profile.authid,
    inspectionassignid: id,
    secno:secIndex,
    filename:file.name,
    filetype:fileExtension
  };
  console.log('Image upload payload', payload);
  
  // encrypted Payload
  let encryptedPayload: any = {
    requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
  };

  const formData = new FormData();
  formData.append('req', JSON.stringify(encryptedPayload));
  formData.append('file', imageSrc); 

  let counter = 0; // initialize counter to zero
  const totalFiles = files.length; // get the total number of files

   // Calling Api
      this.inspection
      .imageUpload(formData)
      .subscribe((response: any) => {
        // console.log('response', response);

        if (response.ResponseCode === '0') {
          counter++; // increment counter for successful upload
          if (i === files.length - 1) {

          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          }); 
        }
        } else {
          if (i === files.length - 1) {

          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          }); }
        }
      });
  }
  reader.readAsDataURL(file);

} 
  }}



  onImageClicked(image: string) {
    this.dialogRef = this.dialog.open(this.imageDialog, {
      data: image,
    });

    this.dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog box closed!');
    });
  }

  onCloseClicked() {
    this.dialogRef.close();
  }
}
