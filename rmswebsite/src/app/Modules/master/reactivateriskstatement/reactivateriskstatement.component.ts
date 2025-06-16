import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {  HttpParams, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/core/Session/session.service';
import { RiskStatementModel } from 'src/app/inspectionservices.service';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
export interface Tag  {
  name: string;
}
@Component({
  selector: 'app-reactivateriskstatement',
  templateUrl: './reactivateriskstatement.component.html',
  styleUrls: ['./reactivateriskstatement.component.scss']
})
export class ReactivateriskstatementComponent {
  selectedValue:any;
  gridDataSource:any;
  visibleStepper:boolean=false;
  maxSize: number = 5 ; 
  fileAttach: File[]  = [];
  Riskform:any;
  isGridBoxOpened : boolean;
  erroMessage:any;
  userdata:any;
  AddDocumentinfo:RiskStatementModel=new RiskStatementModel();
  constructor(private http: HttpClient,private fb: FormBuilder, public dialog: MatDialog, private session: SessionService,)
  {
    this.Riskform = this.fb.group({
      riskstatement: [''],
      riskdescription: [''],
      references: this.fb.array([])
    });
    
    this.isGridBoxOpened = false;
    this.gridDataSource={
      paginate: true,
      store: new CustomStore({
          key: 'riskStatementID',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskStatement/GetReactivateRiskSatement', {headers})
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
  gridBox_displayExprDropdown(riskStatementID:any) {
    return riskStatementID && `${riskStatementID.riskStatementName} , ${riskStatementID.riskDescription} `;
  }
  ngOnInit(): void {
     
    let user: any = this.session.getUser();
 
         this.userdata = JSON.parse(user);
      
         console.log("userid", this.userdata.profile.userid);
    
}
  gridColumns:any=[ 
    {
    dataField: 'riskLibrarySeq',
    caption: 'RiskID'
        },   {
          dataField: 'riskStatementName',
          caption: 'Risk Statement Name'
              }, 
         {
            dataField: 'riskDescription',
            caption: 'Risk Description'
                },
       {
          dataField: 'createdOn',
          caption: 'CreatedOn'
              },
                  ]
  onDropdownValueChanged(event:any) {
    alert(1)
    this.visibleStepper=true;
     console.log("selected Type id: ", event.value);
     this.isGridBoxOpened = false;
    this.selectedValue=event.value; 
     this.http.get(URL+'/RiskStatement/GetRiskStatementByID/'+this.selectedValue).subscribe((data:any)=>{
        if (Array.isArray(data) && data.length > 0) {
      const PubList = data[0]; 
        // this.form.controls['Title_Doc'].setValue(PubList.title_Doc);
        //  this.form.controls['Sub_title_doc'].setValue(PubList.sub_title_doc);
        //  this.form.controls['Obj_Doc'].setValue(PubList.obj_Doc);    
       }
       
 
 
 
     })
  
    
   } 
   onSubmit(){

   
    if (this.Riskform.valid) {
      
      this.updateForm(this.selectedValue);
      this.http.post(URL+'/RiskSatement/ReactivateRiskSatement',this.AddDocumentinfo,{headers}).subscribe((data:any)=>{
      });
      const userId = this.userdata.profile.userid;
      const formData: FormData = new FormData();
     
      formData.append('riskstatement', this.Riskform.value.riskstatement);
      formData.append('riskdescription', this.Riskform.value.riskdescription);
      formData.append('userid',userId);
       if (this.fileAttach.length > 0) {
        this.fileAttach.forEach((file, index) => {
          formData.append(`fileAttach[${index}]`, file);
        });
      }
      const weblinkValues: string[] = [];
      const referencesArray = this.Riskform.get('references').value;
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
      const referencesArray2 = this.Riskform.get('references').value;
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
            window.location.reload();
          });
       
        }, (error: HttpErrorResponse) => {
          console.error('Error status code:', error.status);
          console.error('Error details:', error.error);
        });
    }
   
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
  get references(): FormArray {
    return this.Riskform.get('references') as FormArray;
  }
  removeReferenceField(index:number){
    this.references.removeAt(index);
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
   Cancel(){
    window.location.reload();
  }
  updateForm(riskStatementID:any)
  {
    let docid: number = parseInt(riskStatementID);
    this.AddDocumentinfo.riskStatementID=docid;
   // this.AddDocumentinfo.DisableReason=this.form.value.DisableReason; 
  
  }
}
