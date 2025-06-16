import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
import CustomStore from 'devextreme/data/custom_store';



const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
@Component({
  selector: 'app-editriskstatement',
  templateUrl: './editriskstatement.component.html',
  styleUrls: ['./editriskstatement.component.scss']
})
export class EditriskstatementComponent {
  maxReferences: number = 5;
  replacedFiles:any=[];
  files: File[] = []; 

  erroMessage:any;
  maxFiles: number = 1; 
  maxSize: number = 5 ; 
    maxDocuments: number = 1; 
    maxSizeInMB: number = 5; 
  Statement:any;
  fileAttach: File[]  = [];
  parentRows: ParentRow[] = [];
  weblink:string[] =[];
  isfileAttachUploaded = false;
  viewStatement:any;
  viewriskstatement:any;
  isRiskListVisible:any;
  compliance_details:number | undefined;
  Statementrisk:any;
  riskStatementID:any;
  userdata:any;
  GridColumns: any[] = [
    {
      dataField: 'riskStatementName',
      caption: 'Risk Statement Name'
    },
    
    {
      dataField: 'riskDescription',
      caption: 'Risk Description'
    },
   
    {
      caption: 'Views',
      cellTemplate: 'viewButtonTemplate',
      fixed: true, 
      fixedPosition: 'right' 
    }
   
   
   
  ];

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private zone: NgZone,
 
  ) 
  {
    this.Statement = this.fb.group({
      riskstatement: [''],
      riskdescription: [''],
      references: this.fb.array([])
    });
    
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.riskStatementID = queryParams['riskStatementID']; // Make sure this key matches the one in editAct
      console.log(queryParams['riskStatementID']);
      //alert(queryParams['actregulatoryid']);
      this.retrieveFiles(this.riskStatementID);
    });
  
  
    let user: any = this.session.getUser();
     
    this.userdata = JSON.parse(user);
  
    console.log("userid", this.userdata.profile.userid);
  }
  retrieveFiles(riskStatementID: any): void {
    this.http.get(`${BASE_URL}/RiskStatement/GetRiskStatementByID/${riskStatementID}`)
      .subscribe((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
         // alert(JSON.stringify(data))
          console.log(data)
          const pubList = data[0];
          alert(JSON.stringify(pubList))

          this.Statement.controls['riskstatement'].setValue(pubList.riskStatementName);
          this.Statement.controls['riskdescription'].setValue(pubList.riskDescription);
 
        if (Array.isArray(pubList.actfiles)) {
          pubList.actfiles.forEach((file: any) => {
          
            this.addReferenceField(file);
          });
        }
      } else {
      }
    }, error => {
      console.error('Error occurred while retrieving data:', error);
    });
  }
  
addReferenceField(file?: any): void {
  if (this.references.length < this.maxReferences) {
    const referenceGroup = this.fb.group({
      statementFileID: [file ? file.statementFileID : null],
      referenceType: [file?file.filecategory:''],
      referencetypeValue: [file && file.filecategory === 'Weblink' ? file.filePath : ''],
      referenceText: [file && file.filecategory === 'Text' ? file.filePath : ''],
      file_attachment: [file && file.filecategory === 'FileAttach' ? file.fileName : ''],
     
    });
    this.references.push(referenceGroup);
  } else {
    alert('You can add up to 5 references only.');
  }
}



removeReferenceField(index: number,statementFileID:any): void {
  if (statementFileID == 0) {
    this.references.removeAt(index);
  }

  if (statementFileID !== 0) {
    this.http.post(`${BASE_URL}/RiskStatement/removeRiskStatement/${statementFileID}`, {})
      .subscribe(
        (data: any) => {
          this.references.removeAt(index);
          console.log('File removed successfully:', data);
        },
        (error) => {
          console.error('Error occurred while removing file:', error);
        }
      );
  }  else{
  }
}

onReferenceTypeChange(type: string, index: number): void {
const control = this.references.at(index);

if (type === 'Weblink') {
  control.get('referencetypeValue')?.setValidators(Validators.required);
  control.get('filepath')?.clearValidators();
  control.get('referenceText')?.clearValidators();
} else if (type === 'FileAttach') {
  control.get('referencetypeValue')?.clearValidators();
  control.get('filepath')?.setValidators(Validators.required);
  control.get('referenceText')?.clearValidators();

}
else{
  control.get('referencetypeValue')?.clearValidators();
  control.get('filepath')?.clearValidators();
  control.get('referenceText')?.setValidators(Validators.required);

}

control.get('referencetypeValue')?.updateValueAndValidity();
control.get('filepath')?.updateValueAndValidity();
control.get('referenceText')?.updateValueAndValidity();

}
 
onMainFileSelected(event: Event, index: number): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    this.references.at(index).get('file_attachment')?.setValue(file.name);
    this.files[index] = file; // Store the file 
    if(this.references.at(index).get('statementFileID')?.value!=0){
      this.replacedFiles.push(this.references.at(index).get('statementFileID')?.value)
    }
  }
  }
  onweblink(event:any,index:number){
    this.replacedFiles.push(this.references.at(index).get('statementFileID')?.value)
  }

 reloadComponent() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
 Cancel(){
  this.router.navigate(['/dashboard/Risk_Library/viewlistriskstatement']);
}

get references(): FormArray {
  return this.Statement.get('references') as FormArray;
}
onSubmit()
{
  if (this.Statement.valid) {
    //const userId = this.userdata.profile.userid;
    const formData: FormData = new FormData();
    alert(JSON.stringify(this.Statement.value))
    alert(JSON.stringify(this.Statement.value.riskstatement))
    formData.append('riskstatement', this.Statement.value.riskstatement);
    formData.append('riskdescription', this.Statement.value.riskdescription);
    formData.append('riskStatementID', this.riskStatementID);


    const weblinkValues: string[] = [];
    const TextFieldValues: string[] = [];
    const referencesArray = this.references as FormArray;
    console.log(referencesArray);

    referencesArray.controls.forEach((control, index) => {
      const referenceType = control.get('referenceType')?.value;
      const referencetypeValue = control.get('referencetypeValue')?.value;
      const referenceText = control.get('referenceText')?.value;

      if (referenceType === 'Weblink' && referencetypeValue) {
        weblinkValues.push(referencetypeValue);
      } 
      else if (referenceType === 'Text' && referenceText) {
        TextFieldValues.push(referenceText);
      }
      else if (referenceType === 'FileAttach') {
        const file = this.files[index];
        if (file) {
        //  alert(index)
          formData.append(`fileAttach[${index}]`, file);
          console.log(`Appended file at index ${index}:`, file);

        }
      }
    });
    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    }
    if (TextFieldValues.length > 0) {
      formData.append('Text', TextFieldValues.join(';'));
    }
    this.http.post(`${BASE_URL}/RiskStatement/UpdateRiskStatement`, formData, {
      params: new HttpParams().set('riskStatementID', this.riskStatementID)
    })
      .subscribe(response => {
        this.replacedFiles.forEach((statementFileID:any)=>{
          this.http.post(`${BASE_URL}/RiskStatement/removeRiskStatement/${statementFileID}`, {})
          .subscribe(
            (data: any) => {
              console.log('File removed successfully:', data);
            },
            (error) => {
              console.error('Error occurred while removing file:', error);
            }
          );});

          this.erroMessage ="Risk statement Updated Successfully";
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
        //alert('Act Updated successfully!');
        this.router.navigate(['/dashboard/CreateRisk_Document/viewlistriskstatement']);
      }, error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      });
  }
 
}
okClicked2(e:any){
  alert(e)
}
}
interface ParentRow {
  referenceType: string;
}
