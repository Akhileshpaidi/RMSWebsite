import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../user/user-list/user-list.component';
import userData from '../../../Common/dummy-data/user.json';
import roleData from '../../../Common/dummy-data/role.json';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';

export interface role {
  id: string;
  roleName: string;
  modules: any;
  access: any;
  status: string;
  edit: string;
  typemodule:string;
}



const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent {
  public module = 'Inventory Management';
  public access = 'Write';
  checked: any;
  sessionData: any;
  displayedColumns = ['srno','roletype', 'roleName','typemodule', 'edit', 'status', 'remove'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  erroMessage: any;
  roles: any[] | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private role: RoleService,
    private encrypt: EncryptionService,
    public dialog: MatDialog
  ) {
    this.gerRoleList();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    // this.components.forEach(component => {
    //   const isChecked = this.componentids.includes(component.id) && component.status === '1';
    //   (this.access.get('componentname') as FormArray).push(this.fb.control(isChecked));
    // });
  }
  
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // editRole(element: any) {
  //   console.log('edit role', element);
  //   this.router.navigate(['dashboard/role/update-role'], {
  //     state: { data: element },
  //   });
  // }
  editRole(element: any) {
    console.log('edit role', element);
    const roleId = element.rolE_ID;
    const taskid=element.task_id;
    // const roletypeid = element.roletypeid;
    //alert ("roleid=" +roleId+ "taskid="+taskid+"roletypeid="+roletypeid);
    localStorage.setItem('roleid',roleId); 
    localStorage.setItem('taskid',taskid);
    //localStorage.setItem('roletypeid',roletypeid);
    //this.router.navigate(['dashboard/role/update-role', { roleId: roleId }]);
    //this.router.navigate(['dashboard/role/update-role']);
    this.router.navigate(['dashboard/role/update-role'], { queryParams: { reload: true }});
    
  }
  
  createRole() {
    this.router.navigate(['dashboard/role/create-role']);
  }

  gerRoleList() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
    };
    console.log('payload', payload);

    // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api

    this.http.get<any[]>(URL + '/RoleDetails/GetRoleDetails', { headers })
      .subscribe({
        next: (res) => {
          this.roles = res; // Assign the response to roles
          //alert(res);
          console.log('Roles API Response:', res);


          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
        }
      });


    // this.role.roleSummary(encryptedPayload).subscribe((response: any) => {
    //   console.log(response, 'response');

    //   if (response.ResponseCode === '0') {
    //     let roleList = this.encrypt.decryptionAES(response.ResponseData);

    //     let data = JSON.parse(roleList);
    //     console.log(data, 'roleList');

    //     // this.dataSource = data.rolesummary;
    //     this.dataSource = new MatTableDataSource(data.rolesummary);
    //     this.dataSource.paginator = this.paginator;
    //     console.log(this.dataSource, 'roleList');
    //   } else {
    //     this.erroMessage = response.ResponseDesc;
    //   }
    // });
  }

  changeStatus(value: any, element: any) {

 //alert(JSON.stringify(element))
    // const dialogRef = this.dialog.open(ToasterComponent, {
    //   width: '550px',
    //   data: {
    //     title: 'Change Status',
    //     message: `Are you sure you want to change the status of this user ?`,
    //   },
    // });
    
    element.rolE_STATUS = element.rolE_STATUS === '0' ? '1' : '0';
    const headers = {
      'Content-Type': 'application/json', // Adjust content type as needed
    };
    // let status
    // let message
    // if(element.rolE_STATUS == 0){

    //   status="Active"
    //  message = `Status changed to ${status}`;

    // }
    // else if(element.rolE_STATUS == 1){
    //  status ="InActive"
    //  message = `Status changed to ${status}`;
    // }
    // const dialogRef = this.dialog.open(DaidailogeComponent, {
    //   width: '550px',
    //   data: { message: message },
    // });
    // Make the HTTP DELETE request
    this.http.delete(URL + '/roleDetails/UpdateroleStatus?roleid='+ element.rolE_ID, { headers })
      .subscribe({
        next: (response: any) => {
         
         // alert(message);


  
          // dialogRef.afterClosed().subscribe(() => {
          //   if (response.ResponseCode === '1') {
          //     this.router.navigate(['/dashboard/role']);
          //   }
          // });
        },
        error: (error: any) => {
          console.error('Error deleting Role:', error);
  
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: 'An error occurred while deleting the Role.' },
          });
        }
      });
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

    // // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };

    // // Calling Api
    // this.role.CRUDRole(encryptedPayload).subscribe((response: any) => {
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

  removeRole(element: any) {
    console.log(element, 'removr role ');
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

    this.role.CRUDRole(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        window.location.reload();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  // openDialog(element: any) {
  //   const dialogRef = this.dialog.open(ToasterComponent, {
  //     width: '550px',
  //     data: {
  //       title: 'Delete Item?',
  //       message: 'Are you sure you want to delete this item?',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result, 'The dialog was closed');

  //     if (result == true) {
  //       this.removeRole(element);
  //       this.reloadComponent();
  //     } else {
  //       console.log('Somthing went wrong');
  //     }
  //   });
  // }

  openDialog(rolE_ID: string): void {
    
console.log(rolE_ID)
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
        this.http.delete(URL + '/RoleDetails/DeleteRole?Role_id='+ rolE_ID, { headers })
          .subscribe({
            next: (response: any) => {
              console.log('Delete response:', response);

              const resultDialog = this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: response.ResponseDesc },
              });

              resultDialog.afterClosed().subscribe(() => {
                alert("delete")
                // if (response.ResponseCode === '0') {
                  this.reloadComponent();
                  this.router.navigate(['/dashboard/role']);
                  
                //}
              });
            },
            error: (error: any) => {
              console.error('Error deleting Role:', error);

              const errorDialog = this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: 'An error occurred while deleting the Role.' },
              });
            }
          });
      }
    });
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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
}     