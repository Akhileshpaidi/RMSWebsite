import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { UserPassResetComponent } from 'src/app/Modules/user/user-pass-reset/user-pass-reset.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import CustomStore from 'devextreme/data/custom_store';
//import { MatDialog } from '@angular/material/dialog';

import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { TpaUserPassResetComponentComponent } from '../tpa-user-pass-reset-component/tpa-user-pass-reset-component.component';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-updatetpiuser',
  templateUrl: './updatetpiuser.component.html',
  styleUrls: ['./updatetpiuser.component.scss']
})
export class UpdatetpiuserComponent {
  userData: any;
  selectedroles: any;
  pipe = new DatePipe('en-US');
  roles: any;
  allSelected = true;
  rolelist:any=[];
  EntityName:any;
  TPAEntityName:any;
  UnitMaster:any; 
  EntityID: any;
  selectedValue: any;
  Departmentmaster:any;
  designations: { id: number, name: string }[] = [
    { id: 1, name: 'Tp Risk Assessor/Partner' },
    { id: 2, name: 'AuditManager-TPA' },
    { id: 3, name: 'Subordinate-TPA' },
    // Add more items as needed
  ];

  updateUserForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    emailid: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    mobilenumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
  tpadescription: new FormControl('', [Validators.required]),
    Designation: new FormControl('', [Validators.required]),
  country: new FormControl('', [Validators.required]),
  });

  sessionData: any;
  erroMessage: any;
  roleid: any;
  entity_Master_id:any;
  unit_location_Master_id:any;
  forgotPassEROR: any;
  selecteddob: any;
  entity: any;
  selectedentity:any;
  department_Master_id:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private fb: FormBuilder,
    private role: RoleService,
    public dialog: MatDialog
    
  ) {
    
    this.selectUser();
    this.getMetaData();
  }

  ngOnInit(): void {
    const userData = window.history.state.data;
    this.userData = userData;
  }

  showInvalidFieldsAlert() {
    let invalidFields = '';

    if (this.updateUserForm.controls['firstname'].invalid) {
      invalidFields += '- UserName\n';
    }

    if (this.updateUserForm.controls['username'].invalid) {
      invalidFields += '- User Login\n';
    }

    if (this.updateUserForm.controls['emailid'].invalid) {
      invalidFields += '- Email\n';
    }

    // if (this.updateUserForm.controls['roles'].invalid) {
    //   invalidFields += '- Role\n';
    // }

    if (this.updateUserForm.controls['mobilenumber'].invalid) {
      invalidFields += '- Mobilenumber\n';
    }

    // if (this.updateUserForm.controls['employeeId'].invalid) {
    //   invalidFields += '- Employee ID\n';
    // }

    if (this.updateUserForm.controls['designation'].invalid) {
      invalidFields += '- Designation\n';
    }

    // if (this.updateUserForm.controls['state'].invalid) {
    //   invalidFields += '- State\n';
    // }

    // if (this.updateUserForm.controls['country'].invalid) {
    //   invalidFields += '- Country\n';
    // }

    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields:\n${invalidFields}`,
        },
      });
    }
  }

  updateUser(value: any) {
    // Check if the form is valid
    if (this.updateUserForm.invalid) {
      this.showInvalidFieldsAlert();
      return;
    }
    
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let a = value.roles;

    // let x: any = a.map((e: any) => {
    //   const foundRole = this.roles.find((r: any) => r.rolename === e);
    //   return foundRole ? foundRole.id : null;
    // });
    // this.roleid = x.filter((id: any) => id !== null);
    // payload
    let payload = {
     // authid: this.sessionData.profile.authid,
      //mode: 'U',
      tpauserid: this.userData.tpauserid,
      tpausername: value.firstname,
      USR_LOGIN: value.username,
      tpaemailid: value.emailid,
      Designation: value.Designation,
      tpamobilenumber: value.mobilenumber,
      tpaenityid:value.country,
      tpadescription:value.tpadescription,
      address:value.address,
     // defaultrole: value.roles[0],
     // roles: value.roles.join(","),
      status: "Active",
      // dob: value.dob,
     // dob: this.pipe.transform(value.dob, 'dd.MM.yyyy'),
    };
    console.log('payload', payload);

    // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    // this.http.post(URL + '/createuserDetails/InsertcreateuserDetails', payload)
    // .subscribe(
    //     (response: any) => {
    //         alert('Data saved successfully ');
    //         console.log('Data saved successfully:', response);
    //     },
    //     (error: any) => {
    //         console.error('Error saving data:', error);
    //     }
    // );
    this.http.put(URL + '/createtauserDetails/UpdatetpacreateuserDetails', payload, { headers })
  .subscribe({
      next: (response: any) => {
        console.log(response, 'response');
        
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Data Updated Successfully" },
          });
          this.router.navigate(['/dashboard/schedule-assessment-internal/view-tpa-user']);
        
       
      },
      
      error: (error: any) => {
        console.error('Error updating status:', error);
      }
    });
    // this.user.CRUDUser(encryptedPayload).subscribe((response: any) => {
    //   // console.log('response', response);
    //   if (response.ResponseCode === '0') {
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    //     this.router.navigate(['/dashboard/user']);
    //   } else
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    // });
  }
  openChangeStatusConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '550px',
      data: {
        title: 'Change Status',
        message: `Are you sure you want to edit the User details ?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // User confirmed, proceed with selecting the user
        this.selectUser();
      }
    });
  }

  selectUser() {
    let id: any = window.history.state.data.tpauserid;
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // payload for service

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: id,
    };
//alert(JSON.stringify(id))
    this.http.get<any[]>(URL + '/UserName/GetIndividualtpaUserData?userid='+id, { headers })
      .subscribe({
        next: (res:any) => {
          res.forEach((element:any) => {

           // console.log('Date of Birth:', element.dob);

            // Assuming 'dob' is a string, parse it into a JavaScript Date object
           // const dobDate: Date = new Date(element.dob);
          
                    
  
            this.updateUserForm.patchValue({
              country:element.tpaenityid,
              firstname:element.tpausername,
              username:element.usR_LOGIN,
              mobilenumber:element.tpamobilenumber,
             // dob:dobDate,
             // roles:element.roles.split(",").map(Number),
              emailid:element.tpaemailid,
              Designation:element.designation,
             
              address:element.address,
             
            });
          });
          
          this.roles = res; // Assign the response to roles
          console.log('Roles API Response:', res);
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
        }
      });
    // console.log('payload', payload);

    // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };



    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    // this.user.CRUDUser(encryptedPayload).subscribe((response: any) => {
    //   // console.log('response', response);
    //   if (response.ResponseCode === '0') {
    //     let data = this.encrypt.decryptionAES(response.ResponseData);
    //     let selectInspectioData = JSON.parse(data);
    //     this.userData = selectInspectioData.users[0];
    //     this.erroMessage = response.ResponseDesc;
    //     this.selecteddob = new Date(
    //       this.pipe.transform(this.userData.dob, 'dd/MM/yyyy') ?? ''
    //     );
    //     console.log('selected user data', this.userData);

    //     let list: string[] = [];

    //     this.userData.roles.forEach((element: { rolename: any }) => {
    //       list.push(element.rolename);
    //     });

    //     this.selectedroles = list;
    //     // console.log(' selectedroles ', this.selectedroles);
    //   }
    // });
  }

  openDialog(): void {
    console.log('User ID before opening dialog:', this.userData?.tpauserid);
    let dialogRef = this.dialog.open(TpaUserPassResetComponentComponent, {
      data: {
        callback: this.callBack.bind(this),
        defaultValue: this.userData?.tpauserid,
        userId: this.userData?.tpauserid,
      },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  getMetaData() {

    this.http.get<any[]>(URL + '/RoleDetails/GetRoleDetails', { headers })
  .subscribe({
    next: (res) => {
      this.roles = res; // Assign the response to roles
      console.log('Roles API Response:', res);
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    }
  });

  this.http.get<any[]>(URL + '/DepartmentMaster/GetDepartmentMasterDetails', { headers })
  .subscribe({
    next: (res) => {
      this.Departmentmaster = res; // Assign the response to roles
      console.log('Roles API Response:', res);
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    }
  });

  this.http.get<any[]>(URL + '/UnitMaster/GetEntityNames', { headers })
  .subscribe({
    next: (res) => {
      this.EntityName = res; // Assign the response to roles
      console.log('Roles API Response:', res);
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    }
  });

  this.TPAEntityName={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/tpaentity/GettpaentityMasterDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

  // this.EntityName={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/UnitMaster/GetEntityNames', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };


  // this.Departmentmaster={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetails', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };
}

  callBack(id: number) {
    this.userData.id = id;
  }
  getUnitLocation(event: any) {
  // this.selectedentity=null;
    this.http.get<any[]>(URL + '/UnitLocationMaster/GetUnitLocationDetails?Entity_Master_id='+event.value, { headers })
    .subscribe({
      next: (res) => {
        this.UnitMaster = res; // Assign the response to roles
        console.log('Roles API Response:', res);
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });

    
   }

   getdat(event: any) {

    const data:any=event.value;

    this.selectedValue=event.value;

   const requestUrl = `${URL}/tpaentity/GettpaentityMasterbyid/${data}`;
   this.http.get(requestUrl).subscribe(
    (data: any) => {
      console.log('Response Data:', data);
    //alert(JSON.stringify(data));



     if (Array.isArray(data) && data.length > 0) {
        const PubList = data[0];
        //  alert(JSON.stringify(data))
        this.updateUserForm.controls['tpadescription'].setValue(PubList.tpadescription);
      } else {
      
      }


      (error: any) => {
        console.error('Error in HTTP request:', error);
      }

    })
  }
}
