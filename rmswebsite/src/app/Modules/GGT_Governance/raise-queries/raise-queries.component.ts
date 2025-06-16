import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../user/user-list/user-list.component';
import userData from '../../../Common/dummy-data/user.json';
import roleData from '../../../Common/dummy-data/role.json';
import { EncryptionService } from 'src/app/core/encryption.service';
import CustomStore from 'devextreme/data/custom_store';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface MenuItem {
  menuItemName: string;
  components: ComponentWithMenu[];
}

interface ComponentWithMenu {
  menuItemIndex: number;
  menuItemName: string;
  //componentIndex: number;
  id: number;
  name: string;
  description: string;
  status: string;
  mandatory: string;
  rowspan?: number;
}
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-raise-queries',
  templateUrl: './raise-queries.component.html',
  styleUrls: ['./raise-queries.component.scss']
})
export class RaiseQueriesComponent {
  modules: any[] = [];
  selectedModule:any;
  mainmenu:any[] = [];
  selectedMainmenu:any;
  menuItems: any[] = []; // Original data from API
  uniqueMenuItems: any[] = []; // Filtered unique menu items
  //selectedMenuItem: number | string = 'All'; 
  tasks:any;
  selectedMenuItem:any;
  filteredComponents: any[] = []; // Components filtered based on selection
  selectedComponent: string = '';
  components: ComponentWithMenu[] = [];
  originalData: ComponentWithMenu[] = [];
  dataSource = new MatTableDataSource<ComponentWithMenu>([]);
  userdata:any;
  reportingperson:any;
  selectedReporting:any;
  form: FormGroup;
  selectedImportance: string = '';
  filesdata:any;
  files: File[] = [];


   @ViewChild('attachments') attachmentsInput!: ElementRef;
   //@ViewChild('issueDetails') textarea!: ElementRef;
   @ViewChild('Obj_Doc') textarea!: ElementRef;

   selectedReportingPersonId:any;
   selectedReportingPersonEmail:any;
   selectedReportingPersonName:any;
   trackingNo:any;

  importanceLevels = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'low', label: 'Low' }
  ];

constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private role: RoleService,
    private encrypt: EncryptionService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.gerRoleList();
    this.form = this.fb.group({
      queryImportance: ['',Validators.required],
      taskid: ['',Validators.required],
      menuItem: ['',Validators.required],
      componentid: ['',Validators.required],
      reportingpersonid: ['',Validators.required],
      subjectTitle: ['',Validators.required],
      issueDetails: ['',Validators.required],
      attachments: [''] 
    });
  }

  ngOnInit() {
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    //alert(JSON.stringify(this.userdata.profile.useremailid))
   

    this.tasks={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/CustomerRegController/GetModules', {headers})
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
  onInput() {
    this.resize();
   }
   private resize() {
     const textareaElement = this.textarea.nativeElement;
     //textareaElement.style.overflow = 'hidden';
     textareaElement.style.height = 'auto';
     textareaElement.style.height = textareaElement.scrollHeight + 'px';
   }
  gerRoleList() {
  this.http.get<any[]>(URL + '/CustomerRegController/GetModules', { headers })
        .subscribe({
          next: (res) => {
            this.modules = res; // Assign the response to roles
            console.log('Roles API Response:', res);
  
          },
          error: (err) => {
            console.error('Error fetching roles:', err);
          }
        });
      }
  onModuleChange(event: any) {
  
     this.selectedModule = event.value;
     console.log('Selected Module ID:', this.selectedModule);
    // const params = new HttpParams().set('module_id', this.selectedModule);
     const params = new HttpParams()
     .set('module_id',this.selectedModule)
     .set('locationid',this.userdata.profile.Unit_location_Master_id)
     .set('userid',this.userdata.profile.userid);
    
     this.http.get<any[]>(URL + '/RoleDetails/GetComponentsList/', { headers, params }).subscribe({
       next: (res) => {
        this.menuItems = this.flattenComponents(res);
        this.getUniqueMenuItems();
          console.log('typemodule mainmenu:',  this.menuItems);
       },
       error: (err) => {
         console.error('Error fetching typemodule:', err);
       }
     });

     this.http.get(BASE_URL + '/UserMaster/GetUserMasterDetailsModuleWise/',{headers,params}).subscribe(
           (data) => {
             this.reportingperson = data;
             //alert(JSON.stringify(this.reportingperson))
           },
           (err) => {
             console.error('Error fetching roles:', err);
           }
         );
    
  }
  onReportingPersonChange(event: any) {
    this.selectedReportingPersonId = event.value;
    // Find the selected user from the reportingperson list
    const selectedUser = this.reportingperson.find((user:any) => user.usR_ID === this.selectedReportingPersonId);
    // Store the email if user exists
    if (selectedUser) {
      this.selectedReportingPersonEmail = selectedUser.emailid;
      this.selectedReportingPersonName = selectedUser.firstname;
    }
  }
  getUniqueMenuItems() {
    const uniqueMap = new Map();

    this.menuItems.forEach(item => {
      if (!uniqueMap.has(item.menuItemIndex)) {
        uniqueMap.set(item.menuItemIndex, { 
          menuItemIndex: item.menuItemIndex, 
          menuItemName: item.menuItemName 
        });
      }
    });

    this.uniqueMenuItems = Array.from(uniqueMap.values());
  }
  filterComponents() {
    const selectedMenu = this.form.get('menuItem')?.value;
    //this.filteredComponents = this.modules.filter(module => module.task_id === selectedMenu);
    this.filteredComponents = this.menuItems.filter(item => item.menuItemIndex === selectedMenu);
    //alert(JSON.stringify(this.filteredComponents))
  }
  private flattenComponents(menuItems: MenuItem[]): ComponentWithMenu[] {
    let flattenedComponents: ComponentWithMenu[] = [];
    let currentMenuItemName = '';
    let rowspan = 0;
  
    menuItems.forEach((menuItem, menuItemIndex) => {
      menuItem.components.forEach((component, componentIndex) => {
        if (menuItem.menuItemName !== currentMenuItemName) {
          if (rowspan > 0) {
            flattenedComponents[flattenedComponents.length - rowspan].rowspan = rowspan;
          }
          currentMenuItemName = menuItem.menuItemName;
          rowspan = 1;
        } else {
          rowspan++;
        }
  
        flattenedComponents.push({
          menuItemIndex: menuItemIndex + 1,
          menuItemName: menuItem.menuItemName,
          id: component.id,
          name: component.name,
          description: component.description,
          status: '',
          mandatory: '',
          rowspan: 0 // Initialize rowspan to 0
        });
      });
    });
  
    if (rowspan > 0) {
      flattenedComponents[flattenedComponents.length - rowspan].rowspan = rowspan;
    }
  
    return flattenedComponents;
  }
 // files: File[] = [];

 onFileSelected(event: any) {
  const selectedFiles: FileList = event.target.files;

  // Ensure the files array does not exceed 5 files
  if (this.files.length + selectedFiles.length <= 5) {
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }

    console.log('Selected files:', this.files);
   // alert(`You have selected ${this.files.length} file(s).`);
  } else {
    alert("You can only upload a maximum of 5 files.");
  }
}



  removeFile(index: number) {
    this.files.splice(index, 1);
  }
  generateTrackingNo(): string {
    const timestamp = new Date().getTime();
    return 'TRK' + timestamp; // Example: TRK171234567890
  }
   
  // submitForm(value: any) {
  //   console.log(value, 'user created');
  //   if (this.form.valid) {
  //     const trackingNo = this.generateTrackingNo();
  //     this.trackingNo = trackingNo;
  
  //     let userid = this.userdata.profile.userid;
  //     let reportingPersonEmail = this.selectedReportingPersonEmail;
  //     let userEmail = this.userdata.profile.useremailid;
  
  //     const formDatas = {
  //       ...this.form.value,
  //       trackingNo,
  //       userid,
  //       reportingPersonEmail,
  //       userEmail
  //     };
  
  //     this.http.post(BASE_URL + '/UserMaster/InsertRaiseQueryDetails/', formDatas).subscribe(response => {
  //       console.log('Form submitted successfully:', response);
  
  //       // Save files only if they exist
  //       const files = this.attachmentsInput?.nativeElement?.files;
  //       if (files && files.length > 0) {
  //         this.savefiles(); // optional, non-blocking
  //       }
  
  //       // Show success message and reload regardless of file upload
  //       console.log('Query Added Successfully');
  //       //location.reload();
  //     });
  
  //     this.sendIssueNotification();
  //   } else {
  //     alert('Please fill in all required fields.');
  //   }
  // }
  
  // savefiles() {
  //   const formData = new FormData();
  //   const files = this.attachmentsInput?.nativeElement?.files;
  
  //   if (files && files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("file", files[i]);
  //     }
  //   }
  
  //   // Append required data regardless of file upload
  //   formData.append("uploadedBy", this.selectedReportingPersonName);
  //   formData.append("userid", this.userdata.profile.userid);
  //   formData.append("trackingNo", this.trackingNo);
  
  //   this.http.post(BASE_URL + '/UserMaster/UploadFile/', formData)
  //     .subscribe({
  //       next: (response) => {
  //         console.log("Upload success:", response);
  //         alert('Query Added Successfully');
  //         location.reload();
  //       },
  //       error: (error) => {
  //         console.error("Upload failed:", error);
  //       }
  //     });
  // }
  submitForm(value: any) {
    if (this.form.valid) {
      const trackingNo = this.generateTrackingNo();
      this.trackingNo = trackingNo;
  
      let userid = this.userdata.profile.userid;
      let reportingPersonEmail = this.selectedReportingPersonEmail;
      let userEmail = this.userdata.profile.useremailid;
  
      const formDatas = {
        ...this.form.value,
        trackingNo,
        userid,
        reportingPersonEmail,
        userEmail
      };
  
      // Prepare FormData for file upload
      const formData = new FormData();
  
      // Check if files are selected
      if (this.files.length > 0) {
        
        //alert(`You are about to upload ${this.files.length} file(s).`);
  
        // Append each file to the FormData
        this.files.forEach((file, index) => {
          formData.append("file", file);  // Append each file to FormData
        });
  
        // Append other form fields to FormData
        formData.append("uploadedBy", this.selectedReportingPersonName);
        formData.append("userid", userid);
        formData.append("trackingNo", trackingNo);
      } else {
       // alert("Please upload at least one file.");
       // return; // Exit early if no files are selected
      }
  
      // First, submit form data
      this.http.post(BASE_URL + '/UserMaster/InsertRaiseQueryDetails/', formDatas).subscribe(response => {
        console.log('Form submitted successfully:', response);
        //this.sendIssueNotification();
        // Now, submit files
        this.http.post(BASE_URL + '/UserMaster/UploadFile/', formData).subscribe(
          res => {
            console.log('Files uploaded successfully');
            alert('Query Added Successfully');
            location.reload();  // Reload page or redirect after successful upload
          },
          err => {
            console.error('File upload error:', err);
           // alert('Error uploading files.');
          }
        );
      });
      
     
      
      // Send the issue notification after file upload
      
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  
  



  
  sendIssueNotification() {
    const requestData = {
      reportingPersonEmail: this.selectedReportingPersonEmail,
      //documentNames : ['Document1.pdf', 'Document2.pdf'],
      issueTitle: 'Query/Issue Details',
      issueDescription: 'New Issue Raised',
      senderId: this.userdata.profile.userid,
      reportingPersonId: this.selectedReportingPersonId,
      baseUrl: 'http://localhost:4200/dashboard/GGT_Governance/review-query-status'
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
  sendFormDataToBackend(formData: FormData) {
    // Example of sending form data to .NET API
    fetch('https://your-api-endpoint/api/submitForm', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  }

  submitForm1() {
    const formData = new FormData();
    formData.append('importance', this.form.get('importance')?.value);
    formData.append('module', this.form.get('module')?.value);
    formData.append('menuItem', this.form.get('menuItem')?.value);
    formData.append('component', this.form.get('component')?.value);
    formData.append('reportingPerson', this.form.get('reportingPerson')?.value);
    formData.append('subjectTitle', this.form.get('subjectTitle')?.value);
    formData.append('issueDetails', this.form.get('issueDetails')?.value);

    this.files.forEach((file, index) => {
      formData.append('files', file);
    });
    console.log("Form Data",formData)
    // this.http.post('YOUR_BACKEND_API_URL', formData).subscribe(response => {
    //   console.log('Form submitted successfully:', response);
    // });

    // if (this.form.invalid) {
    //   alert(JSON.stringify(this.form.value))
    //   return; // Prevent submission if form is invalid
    // }
  
    // const trackingNo = this.generateTrackingNo();
    // alert(JSON.stringify(trackingNo))
    // alert(JSON.stringify(this.form.value))
    // const formData = {
    //   ...this.form.value,
    //   trackingNo,
    // };
    
  
    // this.apiService.submitData(formData).subscribe(
    //   (response) => {
    //     console.log('Data saved successfully:', response);
    //     this.sendNotification(formData);
    //   },
    //   (error) => {
    //     console.error('Error saving data:', error);
    //   }
    // );
  }
  
}
