import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';

import { MatSort } from '@angular/material/sort';



const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


  export interface User {
    id: string;
    userName: string;
    emplyeeId: string;
    userRole: any;
    status: string;
    edit: string;
  }

@Component({
  selector: 'app-viewtpiuser',
  templateUrl: './viewtpiuser.component.html',
  styleUrls: ['./viewtpiuser.component.scss']
})
export class ViewtpiuserComponent {
  displayedColumns = [
    'usR_ID',
   // 'entityname',
   // 'unit_location_Master_name',
   // 'department_Master_name',
    
    'name',
    'designation',
    'emailid',
    'mobilenumber',
   // 'roleNames',
    'edit',
    'status',
    'remove',

    
  ];
  
  checked: any;
  sessionData: any;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true })

  paginator!: MatPaginator;
  erroMessage: any;
  roles: any[] | undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private user: UserService,
    private encrypt: EncryptionService,
    public dialog: MatDialog
  ) {
   
  }

  ngOnInit() {
   // window.location.reload();
    this.getUserList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  searchTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filterValues = filterValue.split(' ');
  
    // Apply filter to the dataSource for each word
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      // Convert the data item to a flat string.
      const dataStr = Object.values(data).join(' ').toLowerCase();
      // Check if every element in filterValues array is included in the dataStr
      return filterValues.every(filterWord => dataStr.includes(filterWord));
    };
  
    this.dataSource.filter = filterValue;
  
    // If the dataSource has a paginator, reset to the first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  editUser(element: any) {
    console.log('edit user', element);
   // alert(JSON.stringify(element))
    this.router.navigate(['dashboard/schedule-assessment-internal/update-tpa-user'], {
      state: { data: element },
    });
  }

  createUser() {
    this.router.navigate(['dashboard/schedule-assessment-internal/create-tpa-user']);
  }

  getUserList() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
    };
    console.log('payload', payload);

    // encrypted Payload 
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api


    this.http.get<any[]>(URL + '/createtpauserDetails/GetcreatetpauserDetails', { headers })
    .subscribe({
      next: (res) => {
        this.roles = res; // Assign the response to roles
        console.log('createuser API Response:', res);


        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
       
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });

    // this.user.UserSummary(encryptedPayload).subscribe((response: any) => {
    //   console.log(response, 'response');

    //   if (response.ResponseCode === '0') {
    //     let userList = this.encrypt.decryptionAES(response.ResponseData);
    //     let data = JSON.parse(userList);
    //     // this.dataSource = data.users;
    //     this.dataSource = new MatTableDataSource(data.users);
    //     this.dataSource.paginator = this.paginator;
    //     console.log(data, 'userList');
    //   } else {
    //     this.erroMessage = response.ResponseDesc;
    //   }
    // });
  }

  changeStatus(element: any): void {
    // getting AuthId
    // let user: any = this.session.getUser();
    // this.sessionData = JSON.parse(user);

    // let payload = {
    //   authid: this.sessionData.profile.authid,
    //   mode: 'C',
    //   id: element.id,
    //   status: value.checked ? '0' : '1',
    // };

    // console.log('payload', payload);

    // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };

    // Calling Api

    // const dialogRef = this.dialog.open(ToasterComponent, {
    //   width: '550px',
    //   data: {
    //     title: 'Change Status',
    //     message: `Are you sure you want to change the status of this user ?`,
    //   },
    // });
   
    element.status = element.status === 'Active' ? 'Inactive' : 'Active';
    const headers = {
      'Content-Type': 'application/json', // Adjust content type as needed
    };
  //alert(userId);
    // Make the HTTP DELETE request
    this.http.delete(URL + '/createtpauserDetails/DeletecreatetpauserDetails?userid='+ element.tpauserid, { headers })
      .subscribe({
        next: (response: any) => {
          const message = `Status changed to ${element.status}`;
          //alert(message);

          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: message },
          });
  
          dialogRef.afterClosed().subscribe(() => {
            if (response.ResponseCode === '0') {
              this.router.navigate(['/dashboard/user']);
            }
          });
          
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
  
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: 'An error occurred while deleting the user.' },
          });
        }
      });

    // this.user.CRUDUser(encryptedPayload).subscribe((response: any) => {
    //   console.log(response, 'response');
    //   if (response.ResponseCode === '0') {
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    //     this.reloadComponent();
    //   } else {
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    //     this.reloadComponent();
    //   }
    // });
  }

  removeUser(element: any) {
    console.log(element, 'removr inspection ');
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'D',
      id: element.id,
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.user.CRUDUser(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '250px',
          data: { message: response.ResponseDesc },
        });

        // window.location.reload();
      } else {
        this.erroMessage = response.ResponseDesc;
        this.dialog.open(DaidailogeComponent, {
          width: '250px',
          data: { message: this.erroMessage },
        });
      }
    });
  }

  openDialog(userId: string): void {
    

    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '550px',
      data: {
        title: 'Delete Item?',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) { // User clicked "OK" in the confirmation dialog
        const headers = {
          'Content-Type': 'application/json', // Adjust content type as needed
        };

        // Make the HTTP DELETE request
        this.http.delete(URL + '/createtpauserDetails/DeletetpacreateDetails?userid=' + userId, { headers })
          .subscribe({
            next: (response: any) => {
              console.log('Delete response:', response);

              const resultDialog = this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: response.ResponseDesc },
              });

              resultDialog.afterClosed().subscribe(() => {
                if (response.ResponseCode === '0') {

                  window.location.reload();
                //  this.router.navigate(['/dashboard/']);

                // this.reloadComponent();
                 
                }
              });
              this.reloadComponent();
              
            },
            error: (error: any) => {
              console.error('Error deleting user:', error);

              const errorDialog = this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: 'An error occurred while deleting the user.' },
              });
            }
          });
          window.location.reload();
      }
    });
  }



  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
