
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { FormArray, FormBuilder } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import {  ViewChild, ElementRef } from '@angular/core';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { throwError,Observable  } from 'rxjs';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';


import {
   FormGroup,
  
} from '@angular/forms';
import { HeplDesktModel } from 'src/app/inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


// export interface Tag  {
//   name: string;
// }
@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit{
  UsernameDB:any;
  TashOwnerDB:any;
  TaskOwner:any;
  TaskForm:any;
  erroMessage:any;
  errorMessages: string[] = [];
  maxDocuments: number = 1;  // Default value
  maxSizeInMB: number = 5;
   moduleID:any;
  actForm: any;
  maxSize: number = 5 ; 
  view_Hepl_Desk:any;
  fileAttach2: File[]  = [];
  selectedFiles: File[] = [];
  allowedFileTypes: string = '';
  apiData: any[] = [];
  references:any;
  downloadService:any;
    HelpDeskinfo:HeplDesktModel=new HeplDesktModel();
    selectedOption:any;
    helpdeskID:any;
 attachments: { file: File; nature_of_attachment: string }[] = []; 
//***** */
selectedFileName: string = ''; // Holds the selected file name
attachedFiles: string[] = [];
GridColumns: any[] = [
  {
    dataField: 'helpdeskID',
    caption: 'serial Number'
  },
  {
    dataField: 'task_name',
    caption: 'Module Name'
  },
 {
    dataField: 'rolE_NAME',
    caption: ' User Role Name'
  },
  {
    dataField: 'fileName',
    caption: 'File Name'
  },
  // {
  //   dataField: 'filePath',
  //   caption: 'File Path'
  // },
  {
    caption: 'Actions',
    cellTemplate: 'viewButtonTemplate',
    fixed: true, 
    fixedPosition: 'right' 
  }
  

  
 
 
 
];
    @ViewChild('fileInput') fileInput!: ElementRef; 
    @ViewChild('dataGrid') dataGrid: any;
  headers: HttpHeaders | { [header: string]: string | string[]; } | undefined;
  constructor(private http: HttpClient,private fb: FormBuilder,public dialog: MatDialog,)
{
   this.TaskForm = this.fb.group({
    TaskOwner:['',],
    rolename:['',],
    file:['',],
    references: this.fb.array([]),
     });

    
     this.TashOwnerDB={
      paginate: true,
      store: new CustomStore({
          key: 'task_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/TaskMaster/GetTaskMasterDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    console.log(JSON.stringify(res))
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
      this.view_Hepl_Desk={
           paginate: true, 
           store: new CustomStore({
             key: 'helpdeskID',
               loadMode: 'raw',
               load:()=>{return new Promise((resolve, reject) => {
                
                 this.http.get(URL + '/ViewHelpDesk/GetHelpDeskDetails', {headers})
                   .subscribe(res => {
                    (resolve(res));
                    console.log(JSON.stringify(res))
                    this.downloadService=res;
                   }, (err) => {
                     reject(err);
                   });
             });
             },
           }),
         };
 
         
}

getRolenames(e: any) {
   console.log("selected rolE_ID : ", e.value);
 this.moduleID = e.value;
   //alert(this.DeparmentID)
   this.UsernameDB = {
     paginate: true,
     store: new CustomStore({
         key: 'rolE_ID',
         loadMode: 'raw',
         load: () => {
             return new Promise((resolve, reject) => {
                            this.http.get(URL + '/RoleName/GetAddRoleNameDetails/'+this.moduleID, {headers})
                     .subscribe((res: any) => {
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
  console.log('Making API request...'); // Add this to confirm ngOnInit is running


  this.http.get(URL + '/ViewHelpDesk/GetHelpDeskDetails', {headers})
          .subscribe((response: any) => {
          //alert(JSON.stringify(response))
            if (Array.isArray(response) && response.length > 0) 
            {
              this.apiData =response;
              
            }
  
});
}

 
// ngOnInit(){

//   this.downloadService.getApiData().subscribe(
//     (res:any) => {
//       console.log('API Response:', res);  // Log the full response for debugging

//       if (Array.isArray(res)) {
//         this.apiData = res;  // Assuming the response is an array

//       } else {
//         console.error('API response is not an array:', res);
//       }
//     },
//     (error:any) => {
//       console.error('Error fetching data:', error);
//     }
//   );
// }

Submit(): void {
  if (this.TaskForm.valid) {
    
       // Prepare FormData
    const formData: FormData = new FormData();
    formData.append('task_id', this.TaskForm.value.TaskOwner);
    formData.append('ROLE_ID', this.TaskForm.value.rolename);

  
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        formData.append('file', file, file.name);  // 'file' is the key to match in the API
      }
    }
  
    this.http.post(URL + '/HelpDesk/AddHelpDesk', formData, { headers: headers })
      .subscribe(
        (response: any) => {
          console.log(JSON.stringify(response))
          
            this.erroMessage = response;
          
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
        });
          dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
          },
        (error) => {
          console.error('Error occurred:', error);
        }
        
      );
  } else {
    alert('This Task Name and Role Name combination already exists.');
  }
}
updateFormdata(helpdeskID:any)
{
  let DeskID: number = parseInt(helpdeskID);
  this.HelpDeskinfo.helpdeskID=DeskID;
 
  console.log("Updated HelpDeskID:", this.HelpDeskinfo.helpdeskID);

}
Delete(e: any ) {
 
   console.log("Helpdesk ID before proceeding:", this.helpdeskID); 
  // No validation check message, just proceed with the confirmation dialog
  const dialogRefConfirmation = this.dialog.open(ToasterComponent, {
    width: '550px',
    data: {
      title: 'Delete the Uploaded File?',
      message: 'Are you Sure you Want to Delete The File',
    },
  });

  dialogRefConfirmation.afterClosed().subscribe((result: boolean) => {
    if (result) {
     // this.updateFormdata(this.selectedOption);
      let DeskID: number = parseInt(e.helpdeskID);
      const payload = {
        helpdeskID: DeskID,
      };
//alert(parseInt(this.helpdeskID))
      // Perform the API call to deactivate the HelpDesk
      this.http.post(URL + '/HeplDesk/DeActivateHeplDesk', payload, { headers })
        .subscribe(
          (response: any) => {
            if (response == "Updated Successfully") {
              const message1 = "Data Deleted Successfully";
              const dialogRef = this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: message1 },
              });
            window.location.reload();

            } else {
              alert('Risk Statement Not Disabled');
            }
          },
          (error: any) => {
            alert('Error in saving');
            console.error('Error saving data:', error);
          }
        );
    }
  });
}

// Delete(data: any = {}) {
//   alert(1)

//  if (this.TaskForm.invalid)  {
//   alert('Form is invalid');
//     const dialogRefConfirmation = this.dialog.open(ToasterComponent, {
//       width: '550px',
//       data: {
//         title: 'Deactivate Risk Statement?',
//         message: 'Dear User, you have chosen to ‘Deactivate’ this risk statement. Kindly be aware that your action will affect the User accessibility, notification and alerts, and risk and control documents. Your action will also disable the assessment activity to be conducted in future. This action cannot be reversed, but however, you may ‘Re-activate’ the risk statements and add to risk library later, and all your mapping actions will be reset.',
//       },
//     });

//     dialogRefConfirmation.afterClosed().subscribe((result: boolean) => {
//       if (result) {
//         this.updateFormdata(this.selectedOption);
//         let DeskID: number = parseInt(this.helpdeskID);
       

//         let payload = {
//           riskStatementID: DeskID,
//         };

//         this.http.post(URL + '/HeplDesk/DeActivateHeplDesk', payload, { headers })
//           .subscribe(
//             (response: any) => {
//               if (response == "Updated Successfully") {
//                 const message1 = "Data Deleted Successfully";
//                 const dialogRef = this.dialog.open(DaidailogeComponent, {
//                   width: '550px',
//                   data: { message: message1 },
//                 });
//               } else {
//                 alert('Risk Statement Not Disabled');
//               }
              
//             },
//             (error: any) => {
//               alert('Error in saving');
//               console.error('Error saving data:', error);
//             }
//           );
//       }
//     });
//   }
// }



download(e: any): void {
    //alert(e.filePath);  // Check the filePath value
  
  const apiUrl = `${URL}/SupAdmin_ActRegulatory/superadminactruleDownLoadFiles?filePath=${e.filePath}`;

  // HTTP request to get the file as a Blob
  this.http.get(apiUrl, { responseType: 'blob' }).pipe(
    catchError((error: any) => {
      console.error('Error occurred while downloading file:', error);
      return throwError('Something went wrong in file download. Please try again later.');
    })
  ).subscribe((res: Blob) => {
    // Log the Blob response for debugging
    console.log(res);

    // Extract the filename from the URL (you can customize this if needed)
    const filenameFromUrl = this.extractFilenameFromUrl(e.filePath);

    // Create a Blob URL to trigger the download
    const blob = new Blob([res], { type: res.type });

    // Create a temporary link to trigger the download
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filenameFromUrl;  // Set the download attribute to the filename
    
    // Append the link to the document body, trigger the click, and remove the link
    document.body.appendChild(link);
    link.click();

    // Clean up: revoke the object URL and remove the link
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  });
}

  extractFilenameFromUrl(url: string): string {
    // Extract the filename part from the URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  onFileSelected(event: any) {
   
      const newFiles: FileList = event.target.files;
    this.errorMessages = []; 
  
    const allowedNewFiles = this.maxDocuments - this.selectedFiles.length;
  
   
    if (newFiles.length > allowedNewFiles) {
      this.errorMessages.push(`You can only upload ${this.maxDocuments}  files.`);
      return;
    }
  
   
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
  
     
      if (file.size > this.maxSizeInMB * 1024 * 1024) {
        this.errorMessages.push(`The file ${file.name} exceeds the size limit of ${this.maxSizeInMB}MB.`);
   
      } else {
        // Only add the file if there's room for more files
        if (this.selectedFiles.length < this.maxDocuments) {
          this.selectedFiles.push(file);
        } else {
          this.errorMessages.push(`You cannot upload more than ${this.maxDocuments} files.`);
          break; // Stop checking more files as we've reached the limit
        }
      }
    }
    const files: FileList | null = event.target?.files;
  
    // Add only new files to selectedFiles
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file && !this.isFileAlreadySelected(file.name)) {
          this.selectedFiles.push(file);
        }
      }
    }
  }
  isFileAlreadySelected(fileName: string): boolean {
    return this.selectedFiles.some(selectedFile => selectedFile.name === fileName);
  }
}
