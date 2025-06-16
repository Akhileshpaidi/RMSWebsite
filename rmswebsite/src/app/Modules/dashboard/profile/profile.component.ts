import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { ResetPassDialogComponent } from '../reset-pass-dialog/reset-pass-dialog.component';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { catchError, map } from 'rxjs/operators';
import { throwError,Observable  } from 'rxjs';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  userid:any;
  disabled: boolean = true;
  userdata2:any;
  dataSource1:any=[];
 
  view_Hepl_Desk:any;
  downloadService:any;
  GridColumns: any[] = [
    {
      caption: 'Serial No.',
      
      fixedPosition: 'left',
      cellTemplate: 'serialNumberTemplate'
    },
    {
      dataField: 'task_name',
      caption: 'Module'
    },
   {
      dataField: 'rolE_NAME',
      caption: 'Role Name'
    },
    {
      dataField: 'fileName',
      caption: 'File Name'
    },
    {
      caption: 'Actions',
      cellTemplate: 'viewButtonTemplate',
      fixed: true, 
      fixedPosition: 'right' 
    }
 
  ];
  createUserForm: FormGroup = new FormGroup({
    firstname: new FormControl({ value: '', disabled: true }),
    userlogin: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
    role: new FormControl({ value: '', disabled: true }),
    employer: new FormControl({ value: '', disabled: true }),
    employeeId: new FormControl({ value: '', disabled: true }),
    departmentName: new FormControl({ value: '', disabled: true }),
    state: new FormControl({ value: '', disabled: true }),
    country: new FormControl({ value: '', disabled: true }),
  });

  constructor(private http: HttpClient,
    private session: SessionService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  createUser() {
    this.router.navigate(['dashboard/user-list']);
    console.log('user created');
  }

  ngOnInit(): void {
    let userData: any = this.session.getUser();
    this.user = JSON.parse(userData);
    console.log('user details', this.user);


    let user: any = this.session.getUser();
   
           this.userdata2 = JSON.parse(user);
        
           console.log("userid", this.userdata2.profile.userid);

      

           this.userid =  this.userdata2.profile.userid;
          // alert(this.userid)
           const user23:number = this.userid
           //alert(user23)
           //const datas:any=this.sendRequest1(URL + '/Adduserrole/GetAdduserroleDetailsbyid/'+  user23.toString())
           this.dataSource1 = new CustomStore({
            key: 'user_location_mapping_id',
            load: () => this.sendRequest1(URL + '/Adduserrole/GetAdduserroleDetailsbyid/'+  user23),
           
          })
              this.view_Hepl_Desk={
                     paginate: true, 
                     store: new CustomStore({
                       key: 'helpdeskID',
                         loadMode: 'raw',
                         load:()=>{return new Promise((resolve, reject) => {
                          const userID:number = this.userid
                           this.http.get(URL + '/GettingRoleName/GettingRoleNameDetails/'+ userID, {headers})
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
          sendRequest1(url: string, method: string = 'GET', data1: any = {}): any {


            let result;
          
            switch(method) {
                case 'GET':
            
                    return new Promise((resolve, reject) => {
                      this.http.get(url, {headers})
                        .subscribe(res => {
                         (resolve(res));
                        }, (err) => {
                          reject(err);
                        });
                  });}}
        
          // loadData(): void {
          //   alert(this.userdata2.profile.userid)
          //   // const userid = this.userdata2.profile.userid;
          //   // const apiUrl = `${URL}/Adduserrole/GetAdduserroleDetailsbyid/${userid}`;
        
          //   // console.log("API URL:", apiUrl);
        
          //   this.dataSource1 = {
          //     paginate: true,
          //     store: new CustomStore({
          //       key: 'actregulatoryid',
          //       loadMode: 'raw',
          //       load: () => {
          //         return new Promise((resolve, reject) => {
          //           const userid = this.userdata2.profile.userid;
          //           const apiUrl = `${URL}/Adduserrole/GetAdduserroleDetailsbyid/${userid}`;

          //           console.log("API URL:", apiUrl);
          //           this.http.get(apiUrl, { headers })
          //             .subscribe(res => {
          //               console.log("API Response:", res);
          //               resolve(res);
          //             }, (err) => {
          //               console.error("API Error:", err);
          //               reject(err);
          //             });
          //         });
          //       },
          //     }),
          //   };
          // }
        
  openDialog(): void {
    let dialogRef = this.dialog.open(ResetPassDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  download(e: any): void {
      //alert(e.filePath);  // Check the filePath value
    
    const apiUrl = `${URL}/SupAdmin_ActRegulatory/superadminactruleDownLoadFiles?filePath=${e.filePath}`;
      this.http.get(apiUrl, { responseType: 'blob' }).pipe(
      catchError((error: any) => {
        console.error('Error occurred while downloading file:', error);
        return throwError('Something went wrong in file download. Please try again later.');
      })
    ).subscribe((res: Blob) => {
     
      console.log(res);
  
      const filenameFromUrl = this.extractFilenameFromUrl(e.filePath);
  
      const blob = new Blob([res], { type: res.type });
  
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filenameFromUrl; 
          document.body.appendChild(link);
      link.click();
        window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  }
  extractFilenameFromUrl(url: string): string {
    // Extract the filename part from the URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
