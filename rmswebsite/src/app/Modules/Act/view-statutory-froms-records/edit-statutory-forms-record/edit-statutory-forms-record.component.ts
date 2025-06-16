import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-edit-statutory-forms-record',
  templateUrl: './edit-statutory-forms-record.component.html',
  styleUrls: ['./edit-statutory-forms-record.component.scss']
})
export class EditStatutoryFormsRecordComponent {
  
  statutoryformsid:any;
  UpdateForm:FormGroup;
  actname: any;
  rulename: any;
  maxReferences: number = 5;
  userdata: any;
  files: File[] = []; 
  actid:any;
SelectedAct:any;
replacedFiles:any=[];
  erroMessage: any;


  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,
    private ref: ChangeDetectorRef,
    private session: SessionService,public dialog :MatDialog,
     private zone: NgZone,
    private formBuilder: FormBuilder,

){
  this.UpdateForm = this.formBuilder.group({
    actregulatoryid:['',Validators.required],
    act_rule_regulatory_id:['',Validators.required],
    recordformsname:['',Validators.required],
    recordformsdesc:[''],
    applicationrefernce:[''],
    references: this.formBuilder.array([])
  })
}
ngOnInit(): void {
  this.route.queryParams.subscribe(queryParams => {
    this.statutoryformsid = queryParams['statutoryformsid']; // Make sure this key matches the one in editAct
    console.log(queryParams['statutoryformsid']);
    //alert(queryParams['actregulatoryid']);
    this.retrieveFiles(this.statutoryformsid);
  });


  let user: any = this.session.getUser();
   
  this.userdata = JSON.parse(user);

  console.log("userid", this.userdata.profile.userid);

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
retrieveFiles(statutoryformsid: any): void {
  this.http.get(`${BASE_URL}/statutory/GetstatutoryDetailsnyid/${statutoryformsid}`)
    .subscribe((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        //alert(JSON.stringify(data))
        console.log(data)
        const pubList = data[0];
        this.UpdateForm.controls['actregulatoryid'].setValue(pubList.actid);
        this.UpdateForm.controls['act_rule_regulatory_id'].setValue(pubList.ruleid);
        this.UpdateForm.controls['recordformsname'].setValue(pubList.statutoryname);
        this.UpdateForm.controls['recordformsdesc'].setValue(pubList.statutoryDesc);
        this.UpdateForm.controls['applicationrefernce'].setValue(pubList.applicationrefer)
//alert(pubList.globalactId)
      // Populate references form array
      if (Array.isArray(pubList.statutoryFiles)) {
        pubList.statutoryFiles.forEach((file: any) => {
        
          this.addReferenceField(file);
        });
      }
    } else {
      // Handle empty response or other cases
    }
  }, error => {
    console.error('Error occurred while retrieving data:', error);
  });
}

get references(): FormArray {
return this.UpdateForm.get('references') as FormArray;
}

addReferenceField(file?: any): void {
  if (this.references.length < this.maxReferences) {
    const referenceGroup = this.formBuilder.group({
      statutory_forms_filemaster_id: [file ? file.statutory_forms_filemaster_id : null],
      referenceType: [file ? (file.filecategory === 'Weblink' ? 'weblink' : 'file') : ''],
      referencetypeValue: [file && file.filecategory === 'Weblink' ? file.filepath : ''],
      file_attachment: [file && file.filecategory === 'FileAttach' ? file.filename : ''],
      isNew: [!file] 
    });

    this.references.push(referenceGroup);
  } else {
    alert('You can add up to 5 references only.');
  }
}



removeReferenceField(index: number,statutory_forms_filemaster_id:any): void {

  if (statutory_forms_filemaster_id == 0){
    this.references.removeAt(index);
  }
  if (statutory_forms_filemaster_id !== 0) {
    // If bare_act_id is not 0, make an HTTP POST request to remove the file
    this.http.post(`${BASE_URL}/statutoryfrom/removestatutoryfrom/${statutory_forms_filemaster_id}`, {})
      .subscribe(
        (data: any) => {
          // Handle the response data if needed
          this.references.removeAt(index);
          console.log('File removed successfully:', data);
        },
        (error) => {
          // Handle errors that occur during the HTTP request
          console.error('Error occurred while removing file:', error);
        }
      );
  }  else{
  //  this.references.removeAt(index);
  }
//this.references.removeAt(index);
}

onReferenceTypeChange(type: string, index: number): void {
const control = this.references.at(index);

if (type === 'weblink') {
  control.get('referencetypeValue')?.setValidators(Validators.required);
  control.get('filepath')?.clearValidators();
} else if (type === 'file') {
  control.get('referencetypeValue')?.clearValidators();
  control.get('filepath')?.setValidators(Validators.required);
}

control.get('referencetypeValue')?.updateValueAndValidity();
control.get('filepath')?.updateValueAndValidity();
}

onMainFileSelected(event: Event, index: number): void {
const fileInput = event.target as HTMLInputElement;
const file = fileInput.files?.[0];
if (file) {
  this.references.at(index).get('file_attachment')?.setValue(file.name);
  this.files[index] = file; // Store the file object
  if(this.references.at(index).get('statutory_forms_filemaster_id')?.value!=0){
    this.replacedFiles.push(this.references.at(index).get('statutory_forms_filemaster_id')?.value)
  }
}
}

onweblink(event:any,index:number){
  this.replacedFiles.push(this.references.at(index).get('statutory_forms_filemaster_id')?.value)
}
showInvalidFieldsAlert() {
  let invalidFields = '';
  if (this.UpdateForm.controls['actregulatoryid'].invalid) {
    invalidFields += '- act Name\n';
  }
  if (this.UpdateForm.controls['act_rule_regulatory_id'].invalid) {
    invalidFields += '- act_rule_name\n';
  }


  if (this.UpdateForm.controls['recordformsname'].invalid) {
    invalidFields += '-  Record Form Name\n';
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
SubmitUpdateForm(): void {
  if (this.UpdateForm.invalid) {
    this.showInvalidFieldsAlert();
    return;
    
  }
  if (this.UpdateForm.valid) {
    console.log(this.UpdateForm.value);
  //  alert(JSON.stringify(this.UpdateForm.value));

    const formData = new FormData();
    formData.append('actregulatoryid', this.UpdateForm.value.actregulatoryid);
    formData.append('act_rule_regulatory_id', this.UpdateForm.value.act_rule_regulatory_id);
    formData.append('recordformsname', this.UpdateForm.value.recordformsname);
    formData.append('recordformsdesc', this.UpdateForm.value.recordformsdesc);
    formData.append('applicationrefernce', this.UpdateForm.value.applicationrefernce);
    formData.append('updatedby', this.userdata.profile.userid);

    

    const weblinkValues: string[] = [];
    const referencesArray = this.references as FormArray;
    console.log(referencesArray);

    referencesArray.controls.forEach((control, index) => {
      const referenceType = control.get('referenceType')?.value;
      const referencetypeValue = control.get('referencetypeValue')?.value;

      if (referenceType === 'weblink' && referencetypeValue) {
        weblinkValues.push(referencetypeValue);
      } else if (referenceType === 'file') {
        const file = this.files[index];
        if (file) {
          formData.append(`fileAttach[${index}]`, file);
        }
      }
    });

    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    }

   //alert('About to submit form data to API. Confirm?' + JSON.stringify(  formData));
   console.log(formData)

    this.http.post(`${BASE_URL}/statutory/Updatestatutory`, formData, {
      params: new HttpParams().set('statutoryformsid', this.statutoryformsid)
    })
    .subscribe(response => {
      this.replacedFiles.forEach((statutory_forms_filemaster_id:any)=>{
        this.http.post(`${BASE_URL}/statutoryfrom/removestatutoryfrom/${statutory_forms_filemaster_id}`, {})
        .subscribe(
          (data: any) => {
            console.log('File removed successfully:', data);
          },
          (error) => {
            console.error('Error occurred while removing file:', error);
          }
        );});
      console.log('Response:', response);

      this.erroMessage ="Satutory Form Updated  successfully";
      const dialogRef = this.dialog.open(DaidailogeComponent, {
        width: '400px',
        data: { message: this.erroMessage }
      });
      //alert('Act Updated  successfully!');
      this.router.navigate(['/dashboard/Actregulation/viewstatutoryforms']);
    }, error => {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    });
  } else {
    alert('Form is invalid. Please check the fields and try again.');
  }
}

Cancel(): void {
  // Implement cancel functionality if needed
  this.router.navigate(['/dashboard/Actregulation/viewstatutoryforms']);
}
Back(){
  this.router.navigate(['/dashboard/Actregulation/viewstatutoryforms']);
}
}
