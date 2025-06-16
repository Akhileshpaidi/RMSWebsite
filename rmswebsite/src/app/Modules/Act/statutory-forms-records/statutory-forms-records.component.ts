import { Component, ElementRef, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
//import { ExitNav } from 'src/app/assessment-service.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-statutory-forms-records',
  templateUrl: './statutory-forms-records.component.html',
  styleUrls: ['./statutory-forms-records.component.scss']
})
export class StatutoryFormsRecordsComponent {
  yourform: FormGroup;
  addstatutory:any;
  actname: any;
  rulename: any;
  erroMessage:any;
  @ViewChild('fileAttachInput') fileAttachInput!: ElementRef;
  fileAttach: File[]  = [];
  weblink:string[] =[];
  isfileAttachUploaded = false;
  maxFiles: number = 1; // default value
maxSize: number = 5 ; 
allowedFileTypes: string = '';
FileTypes: string = '';
actid:any;
SelectedAct:any;
userdata:any;


  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private fb: FormBuilder,
    private role: RoleService,
    public dialog: MatDialog,
    private zone: NgZone,
    private ref: ChangeDetectorRef,
    //private service:ExitNav,
  ) {
    this.yourform = this.fb.group({
  
    });


  
  
    this.addstatutory=this.fb.group({
    
      actregulatoryid:['',Validators.required],
      act_rule_regulatory_id:['',Validators.required],
      recordformsname:['',Validators.required],
      recordformsdesc:[''],
      applicationrefernce:[''],
      Weblink: [''],
      file_attachment: [''],
      references: this.fb.array([])
     
     
   
    });
    this.actname={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Actregulatory/GetActregulatory', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
    //  this.rulename={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'Value',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/rulesandregulatory/GetrulesandregulatoryDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    //  };
  
  
  }

    ngOnInit(): void {

      let user: any = this.session.getUser();
   
    this.userdata = JSON.parse(user);
 
    console.log("userid", this.userdata.profile.userid);

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
    
    getRules(event: any) {
      console.log("selected Act : ", event.value);
      this.actid = event.value;
      //alert(this.actid)
       this.SelectedAct=null;  
      this.rulename={
        paginate: true,
        store: new CustomStore({
          key: 'act_rule_regulatory_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/rulesandregulatory/GetrulesandregulatoryByID/'+this.actid,{headers})
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
    
     showInvalidFieldsAlert() {
      let invalidFields = '';
      if (this.addstatutory.controls['actregulatoryid'].invalid) {
        invalidFields += '- act Name\n';
      }
      if (this.addstatutory.controls['act_rule_regulatory_id'].invalid) {
        invalidFields += '- act_rule_name\n';
      }
    
  
      if (this.addstatutory.controls['recordformsname'].invalid) {
        invalidFields += '- Recordform Name\n';
      }
      if (invalidFields) {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {
            message: `Please provide valid information for the following fields:\n${invalidFields}`,
          },
        });
      }
  
     }
    onSubmit() {
      if (this.addstatutory.invalid) {
        this.showInvalidFieldsAlert();
        return;
        
      }
      if (this.addstatutory.valid) {
        const userId = this.userdata.profile.userid;
        const formData: FormData = new FormData();
        formData.append('actregulatoryid', this.addstatutory.value.actregulatoryid);
        formData.append('act_rule_regulatory_id', this.addstatutory.value.act_rule_regulatory_id);
        formData.append('recordformsname', this.addstatutory.value.recordformsname);
        formData.append('recordformsdesc', this.addstatutory.value.recordformsdesc);
        formData.append('applicationrefernce', this.addstatutory.value.applicationrefernce);
        formData.append('userid',userId)
       
       
       
 // alert(JSON.stringify(formData))
          // Handling file attachments
     if (this.fileAttach.length > 0) {
      this.fileAttach.forEach((file, index) => {
        formData.append(`fileAttach[${index}]`, file);
      });
    }

    // Handling weblink values
    const weblinkValues: string[] = [];
    const referencesArray = this.addstatutory.get('references').value;
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
    // if (this.fileAttach.length === 0 && weblinkValues.length === 0) {
    //   this.erroMessage = "Please upload either a File Attach or a weblink Document file before submitting.";
    //   console.error('No main file selected');
    //   this.dialog.open(DaidailogeComponent, {
    //     width: '400px',
    //     data: { message: this.erroMessage }
    //   });
    //   return;
    // }
        console.log(formData);
        this.http.post(URL + '/statutoryfrom/Insertstatutoryfromdetails', formData)
          .subscribe((response: any) => {
            this.erroMessage ="Statutory Forms/Records created Successfully";
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


    onReferenceTypeChange(defaultValue:string,j:number): void {
      const selectedValue = defaultValue;
      //alert(selectedValue)
      const referenceType = this.addstatutory.get('referenceType').value;
      const additionalReferences = this.addstatutory.get('additionalReferences') as FormArray;
      additionalReferences.clear();
      if (additionalReferences.length < 4) {
        if (selectedValue === 'weblink') {
          additionalReferences.push(this.createReferenceControl('weblink'));
        
        } else if (selectedValue === 'file') {
          additionalReferences.push(this.createReferenceControl('file'));
        }
      } else {
        alert('Maximum limit reached for additional references');
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
   get references(): FormArray {
    return this.addstatutory.get('references') as FormArray;
  }
  newreferences():FormGroup{
  

    return this.fb.group({
      //key:this.references().length,
      referenceType: ['', Validators.required],
      Weblink:[''],
      file_attachment:''
    })
     
    }
    onFileSelected(event: any, index: number): void {
      const fileInput = event.target;
      const additionalReferencesArray = this.addstatutory.get('additionalReferences') as FormArray;
      
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
