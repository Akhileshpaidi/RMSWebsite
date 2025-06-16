import { Component,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-view-review-query-status',
  templateUrl: './view-review-query-status.component.html',
  styleUrls: ['./view-review-query-status.component.scss']
})
export class ViewReviewQueryStatusComponent {
 trackingId: string | null = null;
  queryData:any;
  @ViewChild('attachments') attachmentsInput!: ElementRef;
  @ViewChild('Obj_Doc') textarea!: ElementRef;
  files: File[] = [];
   form: FormGroup;
   filedata:any;
   fileList: any[] = [];
   fileListReview:any[] = [];
  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,private fb: FormBuilder) {
    this.form = this.fb.group({
      queryImportance: [''],
      taskid: [''],
      menuItem: [''],
      componentid: [''],
      reportingpersonid: [''],
      subjectTitle: [''],
      issueDetails: [''],
      resolutionCategory: [''],
      resolutionDetails: [''],
      resolutionfiles: [''],
      status: [''],
      createdDate: [''],
      trackingNo: [''],
      userid: [''],
    });
  }

  ngOnInit() {
    const savedData = localStorage.getItem('selectedReviewQuery');
    if (savedData) {
      this.queryData = JSON.parse(savedData);
      console.log("Review query data",this.queryData)
      const params = new HttpParams()
               .set('trackingNo',this.queryData.trackingNo);
               this.http.get<any[]>(URL + '/UserMaster/GetFiles/', { headers, params }).subscribe({
                 next: (res) => {
                  this.fileList=res;
                  //this.menuItems = this.flattenComponents(res);
                 },
                 error: (err) => {
                   console.error('Error fetching typemodule:', err);
                 }
               });
               //Review File Attachments
         this.http.get<any[]>(URL + '/UserMaster/GetReviewFiles/', { headers, params }).subscribe({
          next: (res) => {
           this.fileListReview=res;
           //this.menuItems = this.flattenComponents(res);
          },
          error: (err) => {
            console.error('Error fetching typemodule:', err);
          }
        });
      // if (!Array.isArray(this.queryData.resolutionfiles)) {
      //   this.queryData.resolutionfiles = [this.queryData.resolutionfiles];
      // }
      // console.log("query resolutionfiles data",this.queryData.resolutionfiles)
    } else {
      console.warn("No data found, redirecting...");
      this.router.navigate(['/']); // Redirect if no data
    }
   
  }
  onInput() {
    this.resize();
   }
   private resize() {
     const textareaElement = this.textarea.nativeElement;
     //textareaElement.style.overflow = 'hidden';
     textareaElement.style.height = 'auto';
     textareaElement.style.height = textareaElement.scrollHeight + 'px';
   }

  onFileSelected(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles.length + this.files.length > 5) {
      alert('Maximum 5 uploads allowed.');
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
    // const selectedFiles = Array.from(event.target.files) as File[];

    // if (this.files.length + selectedFiles.length > 5) {
    //   alert("You can only upload up to 5 files.");
    //   return;
    // }

    // this.files.push(...selectedFiles);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
  
  onSubmit1() {
    // Get form values
    const resolutionCategory = (document.getElementById("resolutionCategory") as HTMLSelectElement).value;
    const resolutionDetails = (document.getElementById("resolutionDetails") as HTMLTextAreaElement).value;
    const resolutionfiles = this.attachmentsInput?.nativeElement?.files;
    //const resolutionfiles = (document.getElementById("attachments") as HTMLInputElement).files;
    const status ='Closed';
    console.log('resolutionCategory',resolutionCategory);
    console.log('resolutionDetails',resolutionDetails);
    console.log('resolutionfiles',resolutionfiles);
  
    // Validate fields
    if (!resolutionCategory) {
      alert("Please select a resolution category.");
      return;
    }
    if (!resolutionDetails.trim()) {
      alert("Please enter resolution details.");
      return;
    }
    if (resolutionfiles && resolutionfiles.length > 5) {
      alert("Maximum 5 attachments are allowed.");
      return;
    }
  
    // Prepare form data
    const trackingNo=this.queryData.trackingNo;
    const formData = new FormData();
    formData.append('trackingNo', trackingNo);
    formData.append("resolutionCategory", resolutionCategory);
    formData.append("resolutionDetails", resolutionDetails);
    formData.append("status",status);
    
    if (resolutionfiles) {
      for (let i = 0; i < resolutionfiles.length; i++) {
        formData.append("resolutionfiles", resolutionfiles[i]);
      }
    }
  
    //const trackingNo=this.queryData.trackingNo;
     const filesdata=this.queryData.filesdata;
    // this.form.patchValue({
    //   queryImportance: this.queryData.queryImportance,
    //   taskid: this.queryData.taskid,
    //   menuItem: this.queryData.menuItem,
    //   componentid: this.queryData.componentid,
    //   reportingpersonid: this.queryData.reportingpersonid,
    //   subjectTitle: this.queryData.subjectTitle,
    //   issueDetails: this.queryData.issueDetails,
    //   createdDate:this.queryData.createdDate,
    //   userid:this.queryData.userid,
    //   filesdata:this.queryData.filesdata,
    //   status:'Closed',
    //   trackingNo:trackingNo
    // });
    // const formData = {
    //   ...this.form.value,
    //   resolutionCategory,
    //   resolutionDetails,
    //   resolutionfiles,
    //   filesdata
      
    // };
  
    // // Simulate API call (Replace with actual API call)
    // console.log("Submitting form data...", formData);
  
    const params = new HttpParams()
  .set('trackingNo', trackingNo)
  .set('resolutionCategory', resolutionCategory)
  .set('resolutionDetails', resolutionDetails)
  .set('resolutionfiles', resolutionfiles)  // Ensure filesdata is a string or handle it properly
  .set('status', 'Closed');

console.log("Submitting params data...", params.toString());

// Make API call
this.http.put(BASE_URL + '/UserMaster/UpdateRaiseQueryDetails', {}, { params }).subscribe(
  (response) => {
    alert("Query Updated successfully!");
    console.log(response);
  },
  (error) => {
    alert("Error submitting form.");
    console.error(error);
  }
);

  }
  
  onSubmit(){
    const resolutionCategory = (document.getElementById("resolutionCategory") as HTMLSelectElement).value;
    const resolutionDetails = (document.getElementById("resolutionDetails") as HTMLTextAreaElement).value;

    if (!resolutionCategory) {
      alert("Please select a Resolution Category.");
      return;
    }
  
    if (!resolutionDetails || resolutionDetails.length < 5) {
      alert("Please enter Resolution Details with at least 5 characters.");
      return;
    }

    const formData = new FormData();

// Append text fields
formData.append("trackingNo", this.queryData.trackingNo);
formData.append("resolutionCategory", resolutionCategory);
formData.append("resolutionDetails", resolutionDetails);
formData.append("status", "Closed");

// Append files
const files = this.attachmentsInput?.nativeElement?.files;
if (files && files.length > 0) {
  for (let i = 0; i < files.length; i++) {
    formData.append("resolutionFiles", files[i]);  // 'resolutionFiles' should match API parameter name
  }
}
if (!files || files.length === 0) {
  alert("Please upload at least one file.");
  return;
}
// Make API call using FormData
this.http.put(BASE_URL + '/UserMaster/UpdateRaiseQueryDetails', formData).subscribe(
  (response) => {
   
    console.log(response);
    setTimeout(() => {
      this.savefiles();
    }, 1000); // Delay by 1 second
  },
  (error) => {
    alert("Error submitting form.");
    console.error(error);
  }
);
this.sendIssueNotification();

  }

  sendIssueNotification() {
    const requestData = {
      reportingPersonEmail: this.queryData.userEmail,
      //documentNames : ['Document1.pdf', 'Document2.pdf'],
      issueTitle: 'Query/Issue Details',
      issueDescription: 'Issue Resolved',
      senderId: this.queryData.reportingpersonid,
      reportingPersonId: this.queryData.userid,
      baseUrl: 'http://localhost:4200/dashboard/GGT_Governance/view-query'
      // 'https://example.com/dashboard/issues'
    };

    this.http.post(BASE_URL + '/UserMaster/SendAccessMail/', requestData).subscribe(response => {
      console.log('Notification sent successfully:', response);
      
    });
    // this.notificationService.sendNotification(requestData).subscribe({
    //   next: (response) => {
    //     console.log('Notification sent successfully:', response);
    //   },
    //   error: (error) => {
    //     console.error('Error sending notification:', error);
    //   }
    // });
  }
  
  savefiles()
  {
    // Send data to RaisequeryFiles
    const formDatas = new FormData();
    const files = this.attachmentsInput?.nativeElement?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formDatas.append("file", files[i]);  // 'resolutionFiles' should match API parameter name
      }
    }
formDatas.append("uploadedBy", this.queryData.reportingPersonName);
formDatas.append("userid", this.queryData.reportingpersonid);
formDatas.append("trackingNo", this.queryData.trackingNo);
console.log('Form1 Data:', formDatas);
console.log('Form Files Data:', formDatas);
this.http.post(BASE_URL +'/UserMaster/ReviewUploadFile/', formDatas) 
  .subscribe(response => {
    console.log("Upload success:", response);
    alert("Query Updated successfully!");
    //location.reload();
    this.router.navigate(['/dashboard/Review-Query']);
  }, error => {
    console.error("Upload failed:", error);
  });
  }

  getDownloadUrl(fileName: string): string {
      const params = new HttpParams()
           .set('fileName',fileName);
           this.http.get<any[]>(URL + '/UserMaster/download/', { headers, params }).subscribe({
             next: (res) => {
              this.filedata=res;
              //this.menuItems = this.flattenComponents(res);
             },
             error: (err) => {
               console.error('Error fetching typemodule:', err);
             }
           });
           return this.filedata;
     // return URL+`/UserMaster/download/${fileName}`;
    }  

    downloadFile(fileId: number) {
      window.location.href = URL +`/UserMaster/DownloadFile/${fileId}`;
    }
    downloadReviewFile(fileId: number) {
      window.location.href = URL +`/UserMaster/DownloadReviewFile/${fileId}`;
    }
    goBack() {
      window.history.back(); // This will take the user to the previous page
    }

}
