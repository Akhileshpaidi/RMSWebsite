import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { DxDropDownBoxModule, DxListComponent, DxListModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';



const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-bulk-upload-questions',
  templateUrl: './bulk-upload-questions.component.html',
  styleUrls: ['./bulk-upload-questions.component.scss']
})
export class BulkUploadQuestionsComponent {

  SubjectData:any;
  subjectId:any;
  TopicData:any;
  Selectedtopic:any;
  CheckLevelData:any;
  checklevel_weightage: number = 0.01;
  ExcelFile: File | null = null;
  bulkUploadForm:FormGroup;
  selectedFile: File| null  = null;

constructor(private http: HttpClient,private formBuilder: FormBuilder,private ref: ChangeDetectorRef){
  
  
  this.bulkUploadForm = this.formBuilder.group({
    subjectid: [null, Validators.required],  // Add more form controls if needed
    topicid: [null, Validators.required],
    check_level: [null, Validators.required],
    checklevel_weight: [0.01, [Validators.required, Validators.min(0.01), Validators.max(10)]],
    file: [null, Validators.required]
  });
  
  
  
  this.SubjectData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/Subject/GetSubjectDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };


  this.CheckLevelData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/CompetencyCheckLevel/GetCompetencyCheckLevelDetails', {headers})
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



getSubTypes(event: any) {
  console.log("selected Type id: ", event.value);
  this.subjectId = event.value;
   this.Selectedtopic=null;  
  this.TopicData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/topic/GettopicDetailsById/'+this.subjectId, {headers})
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




 async handleCheckLevelChange(event: any){
  let check_level_id= event.value;

  try {
    const response = await fetch(URL+'/CompetencyCheckLevel/GetCompetencyCheckLevelDetailsByID?check_level_id='+check_level_id); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Do something with the response data

 // Check if data is an array and not empty
 if (Array.isArray(data) && data.length > 0) {
// Access the first object in the array (assuming there's only one)
const firstItem = data[0];
// Access properties within the object
const check_Level_Weightage = firstItem.check_Level_Weightage;
this.checklevel_weightage = check_Level_Weightage;
this.ref.detectChanges();
// You can now use these values in your application
 } else {
console.log("No data received or empty response.");
}  
    
} catch (error) {
    console.error('An error occurred:', error);
  }
}


onFileSelected(event: any) {
  const fileInput = event.target;
  this.selectedFile = event.target.files[0];
  //alert(this.selectedFile)

  // if (fileInput.files && fileInput.files.length > 0) {
  //   //const selectedFile = fileInput.files[0];
  //   this.selectedFile =fileInput.target.files[0];
  //   alert(this.selectedFile)
  //   // Check file type if needed
  //   // if (this.selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
  //   //   alert('Please select a valid Excel file.');
  //   //   return;
  //   // }

  //   // Instead of patching the value, you should handle the file selection within your form controls.
  //   // Assuming 'file' is a FormControl in your bulkUploadForm FormGroup.
  //   //this.bulkUploadForm.controls['file'].setValue(this.selectedFile);
  // }
 // this.ExcelFile = fileInput;
}


// SubmitForm() {
//   if (this.bulkUploadForm.invalid) {
//     notify('Please fill out all the required fields and select a file.', 'error');
//     return;
//   }

//   const formData = new FormData();
  
//   formData.append('subjectid', this.bulkUploadForm.value.subjectid);
//   formData.append('topicid', this.bulkUploadForm.value.topicid);
//   formData.append('check_level', this.bulkUploadForm.value.check_level);
//   formData.append('score_weightage', this.bulkUploadForm.value.checklevel_weight);
//   formData.append('file', this.bulkUploadForm.value.file);

//   console.log('this is form data', formData);

//   this.http.post(URL + '/QuestionBank/UpdateBulkQuestions', formData)
//     .subscribe(
//       (response: any) => {
//         console.log('Data Saved Successfully ', response);
//         window.alert('Data Saved Successfully');
//         this.bulkUploadForm.reset();
//       },
//       (error: any) => {
//         console.error('Error Saving Data', error);
//         window.alert('Error Saving Data');
//       }
//     );
// }
// onFileSelected(event: any) {
//   const fileInput = event.target;

//   if (fileInput.files && fileInput.files.length > 0) {
//     this.bulkUploadForm.patchValue({ file: fileInput.files[0] });
//   }
// }

SubmitForm() {
  if (this.bulkUploadForm.invalid) {
    notify('Please fill out all the required fields and select a file.', 'error');
    return;
  }

  const formData = new FormData();
  
  formData.append('subjectid', this.bulkUploadForm.value.subjectid);
  formData.append('topicid', this.bulkUploadForm.value.topicid);
  formData.append('check_level', this.bulkUploadForm.value.check_level);
  formData.append('score_weightage', this.bulkUploadForm.value.checklevel_weight);

  let userId:any = localStorage.getItem('USERID');
  let userIdInt = parseInt(userId, 10);
  if (!isNaN(userIdInt)) {
      formData.append('userid', userIdInt.toString());
  } else {
      console.error('Invalid USERID');
  }
  

  // Check if this.selectedFile is not null before appending
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  } else {
    notify('Please select a file.', 'error');
    return;
  }

  console.log('this is form data', formData);
  formData.forEach((value, key) => {
    console.log(key, value);
  });

  // Set the Content-Type header to undefined, letting the browser set it automatically
  const headers = new HttpHeaders();
  // headers.append('Content-Type', 'multipart/form-data');

  this.http.post(URL + '/QuestionBank/UpdateBulkQuestions', formData, { headers })
    .subscribe(
      (response: any) => {
        console.log('Data Saved Successfully ', response);
        window.alert('Data Saved Successfully');
        this.bulkUploadForm.reset();
      },
      (error: any) => {
        console.error('Error Saving Data', error);
        window.alert('Error Saving Data');
      }
    );
}




downloadExcelFile() {
  const apiUrl = URL + '/QuestionBank/DownloadExcelFile';

  this.http.get(apiUrl, { responseType: 'arraybuffer' })
    .subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = 'exceldownloadformat.xlsx';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Use setTimeout to delay revoking the object URL to ensure it's not revoked before the download is complete
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    }, error => {
      console.error('Error downloading Excel file:', error);
    });
}







}

