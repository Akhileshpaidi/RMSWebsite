import { Component,ViewChild,ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-createcontrolstatement',
  templateUrl: './createcontrolstatement.component.html',
  styleUrls: ['./createcontrolstatement.component.scss'],
})
export class CreatecontrolstatementComponent {
  isPanelVisible: boolean = false;
  dynamicForm: FormGroup;
  userdata:any;
  //source: FormGroup;
  conrolprincple:any;
  erroMessage:any;
  iCount:any=1;
  bCount:any=1;
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
//  fields: FormArray;
  additionalSubValues: string[] = []; 

  constructor(private fb: FormBuilder, private http: HttpClient,private session: SessionService, public dialog: MatDialog,  private ref: ChangeDetectorRef,
    private router: Router) {
    // this.dynamicForm = this.fb.group({
    //   fields: this.fb.array([]),
    // });
    // this.source = this.fb.group({
    //  // references: this.fb.array([this.createReference()])
    // });
    this.dynamicForm = this.fb.group({
      objective: ['', Validators.required],
      briefdesc: [''],
      detaileddesc:[''],
      checkboxField:[''],
      additionalsub1:[''],
      controlmeasure:[''],
      checkboxField2:[''],
      fields:this.fb.array([]),
      references: this.fb.array([])
    });
    this.dynamicForm.valueChanges.subscribe(() => {
      this.updateAdditionalSubValues();
    });

    // Initial update to populate the dropdown
    this.updateAdditionalSubValues();

  
      this.conrolprincple={
        paginate: true,
        store: new CustomStore({
          key: 'risk_admin_inter_contr_Principles_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/risk_admin_controller/getintercontrprinciplecontrolstatment',{headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
        
      };
  }
  ngOnInit(): void {

    let user: any = this.session.getUser();
 
         this.userdata = JSON.parse(user);
      
         console.log("userid", this.userdata.profile.userid);
        
        }
  createField(): FormGroup {
    return this.fb.group({
      additionalsub: ['', Validators.required],
      checkboxField2: [false],
      dependentid: [{ value: '', disabled: true }, Validators.required]
    });
  }
  createReference(): FormGroup {
    return this.fb.group({
      referenceType: [''],
      referencetypeValue: [''],
      file_attachment: ['']
    });
  }
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }
  addField() { 
    this.iCount++;
    if(this.fields.length<99) {
    const field = this.createField();
    this.fields.push(field);

    field.get('checkboxField2')?.valueChanges.subscribe((checked: boolean) => {
      const dependentField = field.get('dependentid');
      if (checked) {
        dependentField?.enable();  
      } else {
        dependentField?.disable();  
      }
    });}
  }
  removeField(index: number) {
    this.iCount--;
    this.fields.removeAt(index);
    this.updateAdditionalSubValues();
  }
  updateAdditionalSubValues(): void {
    // Get the value of additionalsub1
    const additionalSub1Value = this.dynamicForm.get('additionalsub1')?.value;

    // Get the values of all additionalsub fields in the form array
    const additionalSubArrayValues = this.fields.controls
      .map(control => control.get('additionalsub')?.value)
      .filter(value => value); // Exclude empty or null values

    // Combine additionalsub1 and additionalsub fields into a single array
    this.additionalSubValues = [additionalSub1Value, ...additionalSubArrayValues].filter(value => value);
  }
  onCheckboxChange(event:any) {
    console.log('Sub-Control Checked:', event.target.checked);
  this.isPanelVisible = event.target.checked;
  }
  onCheckboxToggle(index: number): void {
    const field = this.fields.at(index);
  
    // Enable or disable the dependent ID field based on checkbox value
    const isChecked = field.get('checkboxField2')?.value;
    if (isChecked) {
      field.get('dependentid')?.enable();
    } else {
      field.get('dependentid')?.disable();
    }
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
  //  onWebLinkInput(weblink: string) {
  //   // Validate the web link format
  //   alert(weblink)
  //   const pattern: RegExp = /^(https?:\/\/)?(www\.)?[a-z0-9]+\.[a-z]{2,}\/?/;
  //   if (!pattern.test(weblink)) {
  //     // Handle invalid web link format
  //     // For example:
  //     // this.weblinkErrorMessage = 'Invalid web link format. Please enter a valid URL starting with "https://www."';
  //     return;
  //   }
  
  //   // Web link is valid, assign it to the variable
  //   this.weblink .push(weblink);
  // }
  onReferenceTypeChange(defaultValue:string,j:number): void {
    const selectedValue = defaultValue;
    //alert(selectedValue)
    const referenceType = this.dynamicForm.get('referenceType')?.value;
    const additionalReferences = this.dynamicForm.get('additionalReferences') as FormArray;
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
  addReferenceField(): void {
    if(this.bCount<=4){this.bCount++;} else{}
 
    if(this.references.length<5){
     const referenceGroup = this.createReference(); 
     this.references.push(referenceGroup);
   }
     else{
       alert("Only 5 Add References need to be Add")
     }
     
  //this.parentRows.push({referenceType:''});
  
   }
   removeReferenceField(index:number){
    if(this.bCount<0){} else{
      this.bCount--;
    }
     this.references.removeAt(index);
   }
  get references(): FormArray {
    return this.dynamicForm.get('references') as FormArray;
  }
  onSubmit() {
    if (this.dynamicForm.valid) {
      const userId = this.userdata.profile.userid;
      console.log('Form is valid. Preparing to submit...');
  
      // Log the form data as a structured object
      // const formDataObject = {
      //   objective: this.dynamicForm.value.objective,
      //   briefdesc: this.dynamicForm.value.briefdesc,
      //   detaileddesc: this.dynamicForm.value.detaileddesc,
      //   checkboxField: this.dynamicForm.value.checkboxField,

      //   additionalsub1: this.dynamicForm.value.additionalsub1,
      //   checkboxField2: this.dynamicForm.value.checkboxField2,
      //   controlmeasureid: this.dynamicForm.value.controlmeasure,
      //   fields: this.dynamicForm.get('fields')?.value,
      //   references: this.dynamicForm.get('references')?.value,
      //   fileAttach: this.fileAttach.map(file => file.name),
      //   weblink: this.weblink,
      // };
  
     // console.log('Form Data:', formDataObject);
  
      // Prepare FormData for submission
      const formData: FormData = new FormData();

      // Prepare FormData as you have done
      formData.append('control_objective_heading', this.dynamicForm.value.objective);
      formData.append('control_brief_description', this.dynamicForm.value.briefdesc);
      formData.append('control_detailed_description', this.dynamicForm.value.detaileddesc);
      formData.append('addsubcontrolcheckboxField', this.dynamicForm.value.checkboxField);
      formData.append('additionalsub1', this.dynamicForm.value.additionalsub1);
      formData.append('controlmeasureid', this.dynamicForm.value.controlmeasure);
      formData.append('userid',userId);
  
      // Append files
      if (this.fileAttach.length > 0) {
        this.fileAttach.forEach((file, index) => {
          formData.append(`fileAttach[${index}]`, file);
        });
      }
  
      // Append dynamic fields
      const fieldsArray = this.dynamicForm.get('fields')?.value;
      //alert(JSON.stringify(fieldsArray))
      ///console.log(fieldsArray);
      if (fieldsArray && fieldsArray.length > 0) {
        fieldsArray.forEach((field: any, index: number) => {
          formData.append(`fields[${index}][sub_control_name]`, field.additionalsub || '');
          //alert(JSON.stringify( field.additionalsub))
          formData.append(`fields[${index}][checkboxField2]`, field.checkboxField2 ? 'true' : 'false');
          if (field.dependentid) {
            formData.append(`fields[${index}][dependentid]`, field.dependentid);
          }
        });
      }
      formData.append('fields', JSON.stringify(fieldsArray));
      
       // Handling weblink values
    const weblinkValues: string[] = [];
    const referencesArray = this.dynamicForm.get('references')?.value;
    console.log(referencesArray);
    alert(JSON.stringify(referencesArray))
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

  
  
      // Log FormData entries
      console.log('FormData submitted:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

//alert(JSON.stringify(formData) )
    this.http.post(URL + '/controlstatment/Insertcontrolstatment', formData)
          .subscribe((response: any) => {
            this.erroMessage ="Control statment created Successfully";
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
      
      // Uncomment the below line to send the form data to the server
      // this.http.post(URL, formData).subscribe(response => console.log('Success', response));
  
    } else {
      console.log('Form is invalid');
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
}
