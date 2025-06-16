import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';



const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
@Component({
  selector: 'app-supadmin-act-regulator-master',
  templateUrl: './supadmin-act-regulator-master.component.html',
  styleUrls: ['./supadmin-act-regulator-master.component.scss']
})
export class SupadminActRegulatorMasterComponent {
  yourform: FormGroup;
  actForm: any;
  parentRows: ParentRow[] = [];
  userdata:any;
  erroMessage:any;
  @ViewChild('fileAttachInput') fileAttachInput!: ElementRef;
  fileAttach: File[]  = [];
  weblink:string[] =[];
  isfileAttachUploaded = false;
  maxFiles: number = 1; // default value
maxSize: number = 5 ; // default 5MB in bytes

maxDocuments: number = 1;  // Default value
  maxSizeInMB: number = 5;   // Default value
  allowedFileTypes: string = '';
  FileTypes: string = '';
  
  loadingConfig: boolean = true;

  constructor(private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private zone: NgZone,
 
  ) {



    // this.actForm = this.fb.group({
    //   actregulatoryname:['',Validators.required],
    //   actrequlatorydescription:[''],
    //   referenceType: [''], 
    //   referencetypeValue: [''],
    //   // referencetypeValue1: [''],
    //   file_attachment: [''],
    //   references: this.fb.array([])
      
    // });

    this.actForm = this.fb.group({
      actregulatoryname: ['', Validators.required],
      actrequlatorydescription: [''],
      references: this.fb.array([])
    });


    this.yourform = this.fb.group({
  
    });

    
  }

    ngOnInit(): void {
     
      let user: any = this.session.getUser();
   
           this.userdata = JSON.parse(user);
        
           console.log("userid", this.userdata.profile.userid);
      
  }
  ngAfterViewInit() {

  }

onMainFileSelected(event: any,referenceIndex: number) {
  const file: File = event.target.files[0]; // Assuming you only want one file for the mainFile
  if (file) {
    if (file.size > this.maxSize * 1024 * 1024) {
    //  this.mainErrorMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
      return;
    }
    // Check for allowed file types here if necessary
    this.fileAttach.push(file);
    const referenceFormGroup = this.references.controls[referenceIndex] as FormGroup;
    referenceFormGroup.get('file_attachment')?.setValue(file.name);
    console.log('Form Value:', referenceFormGroup.value);
   // this.mainErrorMessage = ''; 
   // this.isMainFileUploaded = true; // Reset any previous errors
  }
}

 // Method to handle web link input
 onWebLinkInput(weblink: string) {
  // Validate the web link format
  alert(weblink)
  const pattern: RegExp = /^(https?:\/\/)?(www\.)?[a-z0-9]+\.[a-z]{2,}\/?/;
  if (!pattern.test(weblink)) {
    // Handle invalid web link format
    // For example:
    // this.weblinkErrorMessage = 'Invalid web link format. Please enter a valid URL starting with "https://www."';
    return;
  }

  // Web link is valid, assign it to the variable
  this.weblink .push(weblink);
}

onSubmit() {
  if (this.actForm.valid) {
    const userId = this.userdata.profile.userid;
    const formData: FormData = new FormData();
    formData.append('actregulatoryname', this.actForm.value.actregulatoryname);
    formData.append('actrequlatorydescription', this.actForm.value.actrequlatorydescription);
    formData.append('userid',userId);
     // Handling file attachments
     if (this.fileAttach.length > 0) {
      this.fileAttach.forEach((file, index) => {
        formData.append(`fileAttach[${index}]`, file);
      });
    }

    // Handling weblink values
    const weblinkValues: string[] = [];
    const referencesArray = this.actForm.get('references').value;
    console.log(referencesArray);
    for (let i = 0; i < referencesArray.length; i++) {
      const referenceType = referencesArray[i].referenceType;
      if (referenceType === 'weblink') {
        const weblinkValue = referencesArray[i].referencetypeValue;
        console.log(weblinkValue)
        if (weblinkValue) {
          weblinkValues.push(weblinkValue);
        }
      }
    }

    // Appending weblink values to formData
    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    } 

    // Check if both fileAttach and references are provided
    //** Remove the Document valiadtion **/
    // if (this.fileAttach.length === 0 && weblinkValues.length === 0) {
    //   this.erroMessage = "Please upload either a File Attach or a weblink Document file before submitting.";
    //   console.error('No main file selected');
    //   this.dialog.open(DaidailogeComponent, {
    //     width: '400px',
    //     data: { message: this.erroMessage }
    //   });
    //   return;
    // }
    // Sending formData to server
    this.http.post(URL + '/SupAdmin_ActRegulatory/InsertActRegulatory', formData,{headers})
      .subscribe((response: any) => {
        this.erroMessage ="Act Regulatory created Successfully";
        const dialogRef = this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: { message: this.erroMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        });
        // Handle response
      }, (error: HttpErrorResponse) => {
        console.error('Error status code:', error.status);
        console.error('Error details:', error.error);
      });
  }
}

reloadComponent() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
Cancel(){
  this.reloadComponent();
}


  onReferenceTypeChange(defaultValue:string,j:number): void {
    const selectedValue = defaultValue;
    //alert(selectedValue)
    const referenceType = this.actForm.get('referenceType').value;
    const additionalReferences = this.actForm.get('additionalReferences') as FormArray;
    additionalReferences.clear();
    if (additionalReferences.length < 4) {
      if (selectedValue === 'weblink') {
        additionalReferences.push(this.createReferenceControl('weblink'));
      
      } else if (selectedValue === 'file') {
        additionalReferences.push(this.createReferenceControl('file'));
      }
    } else {
     // alert('Maximum limit reached for additional references');
    }
  }

  addReferenceField(): void {
 
   if(this.references.length<5){
    const referenceGroup = this.fb.group({
      referenceType: [''],
      referencetypeValue: [''],
      file_attachment: ['']
    });
    this.references.push(referenceGroup);
  }
    else{
      alert("Only 5 Add References need to be Add")
    }
    
 //this.parentRows.push({referenceType:''});
 
  }
  removeReferenceField(index:number){
    this.references.removeAt(index);
  }
 
  createReferenceControl(type: string): FormGroup {
    if (type === 'weblink') {
        return this.fb.group({
            type: [type],
            value: ['']
        });
    } else if (type === 'file') {
        return this.fb.group({
            type: [type],
            value: [''], // For storing the file name (if needed)
            fileValue: [''] // For storing the actual file (if needed)
        });
    }

    // Default case when type is neither 'weblink' nor 'file'
    return this.fb.group({
        type: [''],
        value: ['']
    });
}
// references():FormArray{
//   return this.actForm.get('references') as FormArray;
// }

get references(): FormArray {
  return this.actForm.get('references') as FormArray;
}

newreferences():FormGroup{
  

  return this.fb.group({
    //key:this.references().length,
    referenceType: ['', Validators.required],
    Weblink:[''],
    file_attachment:''
  })
   
  }

  get additionalReferences(): FormArray {
    return this.actForm.get('additionalReferences') as FormArray;
  }

  onFileSelected(event: any, index: number): void {
    const fileInput = event.target;
    const additionalReferencesArray = this.actForm.get('additionalReferences') as FormArray;
    
    if (fileInput.files && fileInput.files.length > 0) {
      const referenceValueControl = additionalReferencesArray.at(index).get('fileValue');
      if (referenceValueControl) {
        referenceValueControl.setValue(fileInput.files[0].name);
        // You can also store the file itself for further processing if needed
        // referenceValueControl.setValue(fileInput.files[0]);
      }
    } else {
      // Handle case when no file is selected
    }
  }
}
interface ParentRow {
  referenceType: string;
}
