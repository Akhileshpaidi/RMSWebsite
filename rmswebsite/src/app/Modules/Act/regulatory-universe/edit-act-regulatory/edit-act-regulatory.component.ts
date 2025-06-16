import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

@Component({
  selector: 'app-edit-act-regulatory',
  templateUrl: './edit-act-regulatory.component.html',
  styleUrls: ['./edit-act-regulatory.component.scss']
})
export class EditActRegulatoryComponent {
  actregulatoryid:any;
  UpdateForm:FormGroup;
  maxReferences: number = 5;
  userdata: any;
  files: File[] = []; 
  globalactId: any;
  createddate: any;
  createdby: any;
  replacedFiles:any=[];
  erroMessage: any;


  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,
    private ref: ChangeDetectorRef,   public dialog: MatDialog,
    private session: SessionService,
     private zone: NgZone,
    private formBuilder: FormBuilder,

){
  this.UpdateForm = this.formBuilder.group({
    actname:['',Validators.required] ,
    actdesc:[''],
    references: this.formBuilder.array([])
  })
}
ngOnInit(): void {
  this.route.queryParams.subscribe(queryParams => {
    this.actregulatoryid = queryParams['actregulatoryid']; // Make sure this key matches the one in editAct
    console.log(queryParams['actregulatoryid']);
    //alert(queryParams['actregulatoryid']);
    this.retrieveFiles(this.actregulatoryid);
  });


  let user: any = this.session.getUser();
   
  this.userdata = JSON.parse(user);

  console.log("userid", this.userdata.profile.userid);
}

retrieveFiles(actregulatoryid: any): void {
  this.http.get(`${BASE_URL}/actregulations/GetactregulationsDetailsnyid/${actregulatoryid}`)
    .subscribe((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
       // alert(JSON.stringify(data))
        console.log(data)
        const pubList = data[0];
        this.UpdateForm.controls['actname'].setValue(pubList.actregulatoryname);
        this.UpdateForm.controls['actdesc'].setValue(pubList.actrequlatorydescription);
this.globalactId = pubList.globalactId;
this.createdby = pubList.createdby;
this.createddate =pubList.createddate;
//alert(pubList.globalactId)
      // Populate references form array
      if (Array.isArray(pubList.actfiles)) {
        pubList.actfiles.forEach((file: any) => {
        
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
      bare_act_id: [file ? file.bare_act_id : null],
      referenceType: [file ? (file.filecategory === 'Weblink' ? 'weblink' : 'file') : ''],
      referencetypeValue: [file && file.filecategory === 'Weblink' ? file.filepath : ''],
      file_attachment: [file && file.filecategory === 'FileAttach' ? file.filename : ''],
     
    });

    this.references.push(referenceGroup);
  } else {
    alert('You can add up to 5 references only.');
  }
}



removeReferenceField(index: number,bare_act_id:any): void {
  // alert(bare_act_id);
  if (bare_act_id == 0) {
    this.references.removeAt(index);
  }

  // Check if bare_act_id is not equal to 0
  if (bare_act_id !== 0) {
    // If bare_act_id is not 0, make an HTTP POST request to remove the file
    this.http.post(`${BASE_URL}/Actregulatory/removeActregulatoryDetails/${bare_act_id}`, {})
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
   //this.references.removeAt(index);
  }
 // this.references.removeAt(index);
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
  this.files[index] = file; // Store the file 
  if(this.references.at(index).get('bare_act_id')?.value!=0){
    this.replacedFiles.push(this.references.at(index).get('bare_act_id')?.value)
  }
}
}
onweblink(event:any,index:number){
  this.replacedFiles.push(this.references.at(index).get('bare_act_id')?.value)
}


   
SubmitUpdateForm(): void {
  if (this.UpdateForm.valid) {
    console.log(this.UpdateForm.value);
    //alert(JSON.stringify(this.UpdateForm.value));
    const formData = new FormData();
    formData.append('actregulatoryname', this.UpdateForm.value.actname);
    formData.append('actrequlatorydescription', this.UpdateForm.value.actdesc);
    formData.append('updatedby', this.userdata.profile.userid);
    formData.append('global_act_id', this.globalactId);
    formData.append('createdBy', this.createdby);
    formData.append('createddate', this.createddate);



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
        //  alert(index)
          formData.append(`fileAttach[${index}]`, file);
          console.log(`Appended file at index ${index}:`, file);

        }
      }
    });

    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    }
//alert(JSON.stringify(this.replacedFiles))

  // alert('About to submit form data to API. Confirm?' + JSON.stringify(  formData));
   console.log(formData)

    this.http.post(`${BASE_URL}/actregulations/UpdateActRegulatory`, formData, {
      params: new HttpParams().set('actregulatoryid', this.actregulatoryid)
    })
      .subscribe(response => {
        this.replacedFiles.forEach((bare_act_id:any)=>{
          this.http.post(`${BASE_URL}/Actregulatory/removeActregulatoryDetails/${bare_act_id}`, {})
          .subscribe(
            (data: any) => {
              console.log('File removed successfully:', data);
            },
            (error) => {
              console.error('Error occurred while removing file:', error);
            }
          );});

          this.erroMessage ="Act Regulator Updated Successfully";
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
        //alert('Act Updated successfully!');
        this.router.navigate(['/dashboard/Actregulation/viewActregulator']);
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
  this.router.navigate(['/dashboard/Actregulation/viewActregulator']);
}

}