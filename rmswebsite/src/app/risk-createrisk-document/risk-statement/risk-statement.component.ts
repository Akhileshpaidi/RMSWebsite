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
import CustomStore from 'devextreme/data/custom_store';



const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
@Component({
  selector: 'app-risk-statement',
  templateUrl: './risk-statement.component.html',
  styleUrls: ['./risk-statement.component.scss']
})
export class RiskStatementComponent {
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

  constructor(private http: HttpClient,
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
    
   
    this.viewStatement = {
      paginate: true,
      store: new CustomStore({
        key: 'riskStatementID',
        loadMode: 'raw',
        load: () => {
      
                  return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskStatement/GetRiskStatement', { headers })
              .subscribe(res => {
           //    this.compliance_details = (res as any[]).length;
                resolve(res);
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
  onReferenceTypeChange(defaultValue:string,j:number): void {
    const selectedValue = defaultValue;
    alert(selectedValue)
    const referenceType = this.Statement.get('referenceType').value;
    const additionalReferences = this.Statement.get('references') as FormArray;
    additionalReferences.clear();
    if (additionalReferences.length < 4) {
      if (selectedValue === 'weblink') {
        additionalReferences.push(this.createReferenceControl('weblink'));
      
      } else if (selectedValue === 'file') {
        additionalReferences.push(this.createReferenceControl('file'));
      }
      else if (selectedValue === 'Text') {
        additionalReferences.push(this.createReferenceControl('Text'));
      }
    } else {
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
            value: [''], 
            fileValue: [''] 
        });
    }
    else if (type === 'Text') {
      return this.fb.group({
          type: [type],
          value: [''], 
          fileValue1: [''] 
      });
  }
    return this.fb.group({
        type: [''],
        value: ['']
    });
}
onMainFileSelected(event: any,referenceIndex: number) {
  const file: File = event.target.files[0]; 
  if (file) {
    if (file.size > this.maxSize * 1024 * 1024) {
         return;
    }
   
    this.fileAttach.push(file);
    const referenceFormGroup = this.references.controls[referenceIndex] as FormGroup;
    referenceFormGroup.get('file_attachment')?.setValue(file.name);
    console.log('Form Value:', referenceFormGroup.value);
    }
}
addReferenceField(): void {
 
  if(this.references.length<5){
   const referenceGroup = this.fb.group({
    referenceType: [''],
     referencetypeValue: [''],
     file_attachment: [''],
     referenceText: ['']
   });
   this.references.push(referenceGroup);
 }
   else{
     alert("Only 5 Add References need to be Add")
   }
   
 }
 reloadComponent() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
 Cancel(){
  this.router.navigate(['dashboard/Risk_Library/viewlistriskstatement'])
}
removeReferenceField(index:number){
  this.references.removeAt(index);
}
get references(): FormArray {
  return this.Statement.get('references') as FormArray;
}
onSubmit()
{
  if (this.Statement.valid) {
    const userId = this.userdata.profile.userid;
    const formData: FormData = new FormData();
    //alert(JSON.stringify(this.Statement.value))
    //alert(JSON.stringify(this.Statement.value.riskstatement))
    formData.append('riskstatement', this.Statement.value.riskstatement);
    formData.append('riskdescription', this.Statement.value.riskdescription);
    formData.append('userid',userId);
     if (this.fileAttach.length > 0) {
      this.fileAttach.forEach((file, index) => {
        formData.append(`fileAttach[${index}]`, file);
      });
    }
    const weblinkValues: string[] = [];
    const referencesArray = this.Statement.get('references').value;
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

    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    } 
   
    const TextFieldValues: string[] = [];
    const referencesArray2 = this.Statement.get('references').value;
    console.log(referencesArray2);
    for (let i = 0; i < referencesArray2.length; i++) {
      const referenceTypetext = referencesArray2[i].referenceType;
      if (referenceTypetext === 'Text') {
        const FieldValue = referencesArray2[i].referenceText;
        console.log(FieldValue)
        if (FieldValue) {
          TextFieldValues.push(FieldValue);
        }
      }
    }

    if (TextFieldValues.length > 0) {
      formData.append('Text', TextFieldValues.join(';'));
    } 
    this.http.post(URL + '/RiskStatement/InsertRiskStatement', formData,{headers})
      .subscribe((response: any) => {
        this.erroMessage ="Risk Statement created Successfully";
        const dialogRef = this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: { message: this.erroMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['dashboard/CreateRisk_Document/viewlistriskstatement'])
        });
     
      }, (error: HttpErrorResponse) => {
        console.error('Error status code:', error.status);
        console.error('Error details:', error.error);
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
