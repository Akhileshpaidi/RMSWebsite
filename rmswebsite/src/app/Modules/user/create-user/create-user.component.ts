import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
// import { passwordMatchValidator } from 'path-to-validator-file';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUserForm!: FormGroup;
  pipe = new DatePipe('en-US');
  roles: any=[];
  modules:any=[];
  reloadPage:any;
  //taskuserdata:any;
  yourForm: FormGroup;
  sessionData: any;
  erroMessage: any;
  selectedentity:any;
  hide = true;
  hide1 = true;
  EntityName:any;
  UnitMaster:any; 
  EntityID: any;
  Departmentmaster:any;
  reloadComponent: any;
tbluser:any;


  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private fb: FormBuilder,
    private role: RoleService,
    public dialog: MatDialog
  ) 
  {
    this.yourForm = this.fb.group({
    //  roles: [], // Initialize with default values if needed
      // other form controls...
    });
    // this.createUserForm1 = this.fb.group({
    //   username: ['', [Validators.required], [this.usernameValidator.bind(this)]]
    // });
  }
  
  // get confirmPasswordMismatch() {
  //   return (this.createUserForm.get('createPassword')?.dirty || this.createUserForm.get('cnfirmPassword')?.dirty) && this.createUserForm.hasError('confirmedDoesNotMatch');
  // }


  usernameValidator() {
    
    const username = this.createUserForm.get('username')?.value
    
    this.http.get<any[]>(URL + '/UserName/GetUserName?userlogin='+username, { headers })
    .subscribe({
      next: (res) => {
       
       let result:any=res;
       if(result==1){
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {
            message: `User Login Name Already Exists`,
          },
        });
       }
       

      
      },
      error: (err) => {
        console.error('Error fetching Username:', err);
      }
    });
   
   
      
    
    }

   
  

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstname: ['', Validators.required],
      username: ['', Validators.required],
      //username1: ['', Validators.required],
      emailid: ['', [Validators.required,Validators.email]],
     // roles: ['', Validators.required],
     modules:['',Validators.required],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
     // employeeId: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      createPassword: this.password,
      cnfirmPassword: this.confirmPassword,
      Designation:['']
    //  dob: ['', Validators.required],
    });
    

    //this.getMetaData();
      this.taskuserdata();
    // this.taskuserdata={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'Value',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/TaskMaster/GetTaskMasterDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };
    this.EntityName={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UnitMaster/GetEntityNames', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
   
   

    this.Departmentmaster={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetails', {headers})
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
  get password(): FormControl {
    return new FormControl(null, [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/),
    ]);
  }

  get confirmPassword(): FormControl {
    return new FormControl(null, [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/),
    ]);
  }
  confirmPasswordMismatch(): boolean {
    const createPassword = this.createUserForm.get('createPassword')?.value;
    const confirmPassword = this.createUserForm.get('cnfirmPassword')?.value;
  
    return createPassword !== confirmPassword;
  }
  
  showInvalidFieldsAlert() {
    let invalidFields = '';

    if (
      this.createUserForm.controls['createPassword'].value !==
      this.createUserForm.controls['cnfirmPassword'].value
    ) {
      invalidFields += '- Passwords do not match\n';
    }

    if (this.createUserForm.controls['firstname'].invalid) {
      invalidFields += '- User Name\n';
    }

    if (this.createUserForm.controls['username'].invalid) {
      invalidFields += '- User Login\n';
    }

    if (this.createUserForm.controls['emailid'].invalid) {
      invalidFields += '- Email\n';
    }

    // if (this.createUserForm.controls['roles'].invalid) {
    //   invalidFields += '- Role\n';
    // }

    if (this.createUserForm.controls['mobilenumber'].invalid) {
      invalidFields += '- mobilenumber\n';
    }

    if (this.createUserForm.controls['modules'].invalid) {
      invalidFields += '- Module ID\n';
    }

    if (this.createUserForm.controls['city'].invalid) {
      invalidFields += '- Department Name\n';
    }

    if (this.createUserForm.controls['state'].invalid) {
      invalidFields += '- Unit Location\n';
    }

    if (this.createUserForm.controls['country'].invalid) {
      invalidFields += '- Entity Name\n';
    }

    if (this.createUserForm.controls['createPassword'].invalid) {
      invalidFields += '- Create Password\n';
    }

    if (this.createUserForm.controls['cnfirmPassword'].invalid) {
      invalidFields += '- Confirm Password\n';
    }
    // if (this.createUserForm.controls['usR_LOGIN'].invalid) {
    //   invalidFields += '- User login Alerady Exist\n';
    // }

    // if (this.createUserForm.controls['dob'].invalid) {
    //   invalidFields += '- Date of Birth\n';
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

  createUser(value: any) {
    console.log(value, 'user created');
    // Check if the form is valid
    if (this.createUserForm.invalid) {
      this.showInvalidFieldsAlert();
      return;
      
    }
    
    //this.checkuser();
  
    const createPassword = this.createUserForm.get('createPassword')?.value;
    const confirmPassword = this.createUserForm.get('cnfirmPassword')?.value;
    if(createPassword !== confirmPassword)
    {
      alert('Password dont match')
      return;
    }
    
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // encrypted Passqord
    let encryptedPassword = {
      requestdata: this.encrypt.encryptionAES(value.createPassword),
    };
    const desig = this.createUserForm.get('Designation')?.value;
   
    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      firstname: value.firstname,
     usR_LOGIN : value.username,
      emailid: value.emailid,
      Designation:desig,
     // employeeid: value.employeeId,
      mobilenumber: value.mobilenumber,
      password: encryptedPassword.requestdata,
      department_Master_id: value.city,
      unit_location_Master_id: value.state,
      entity_Master_id: value.country,
      defaultrole: '3',
      taskids:value.modules.join(","),
      typeofuser:'1',
      isFirstLogin:'0',
   //   roles: value.roles.join(","),
     //dob: this.pipe.transform(value.dob, 'dd/MM/yyyy'),
    };
   // alert(JSON.stringify(payload))
    console.log('payload', payload);
 
    // encrypted Payload
    // let encryptedPayload = {
    //   requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    // };
    //console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    const usR_LOGIN = this.createUserForm.get('username')?.value
   
    this.http.get<any[]>(URL + '/UserName/GetUserName?userlogin='+usR_LOGIN, { headers })
    .subscribe({
      next: (res) => {
       
       let result:any=res;
       if(result==1){
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {
            message: `User Login Name Already Exists`,
          },
        });
       }

       else{
        this.http.post(URL + '/createuserDetails/InsertcreateuserDetails', payload)
        .subscribe(
          (response: any) => {
            this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: {
                message: `Data saved successfully`,
                
              },
              
            });
            alert('user created successfully ');
            // console.log('Data saved successfully:', response);
            //this.reloadComponent();
            window.location.reload();
            this.createUserForm.reset()
          },
                    (error: any) => {
                        console.error('Error saving data:', error);
                    }
                    
                );
       }
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });
   
           
    // this.user.CRUDUser(payload).subscribe((response: any) => {
    //   console.log('response', response);
    //   if (response.ResponseCode === '0') {
    //     this.erroMessage = response.ResponseDesc;
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    //     this.router.navigate(['/dashboard/user']);
    //   } else {
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '550px',
    //       data: { message: response.ResponseDesc },
    //     });
    //   }
    // });
  }
   taskuserdata(){
    this.http.get<any[]>(URL + '/TaskMaster/GetTaskMasterDetails', { headers })
        .subscribe({
          next: (res) => {
            this.modules= res; // Assign the response to roles
            console.log('modules API Response:', res);
          },
          error: (err) => {
            console.error('Error fetching modules:', err);
          }
        });
  }
  // getMetaData() {
  //   this.http.get<any[]>(URL + '/RoleDetails/GetRoleDetails', { headers })
  //     .subscribe({
  //       next: (res) => {
  //         this.roles = res; // Assign the response to roles
  //         console.log('Roles API Response:', res);
  //       },
  //       error: (err) => {
  //         console.error('Error fetching roles:', err);
  //       }
  //     });
  // }

  // checkSelectedRoles() {
  //   // Use the get method to retrieve the 'roles' FormControl
  //   const rolesControl = this.yourForm.get('roles');

  //   if (rolesControl) {
  //     const selectedRoles = rolesControl.value;
  //     const selectedRolesString = selectedRoles.join(', '); // Create a comma-separated string

  //     // Display an alert with the selected values
  //     alert(`Selected Roles: (${selectedRolesString})`);
  //   }
  // }

  // optionClicked(element: any) {
  //   alert(JSON.stringify(element))
  //   // Handle the click event on an option
  //   console.log('Option clicked:', element);
  
  //   const rolesControl = this.yourForm.get(element);
  
  //   if (rolesControl && rolesControl.value) {
  //     const selectedRoles = rolesControl.value;
  //     const selectedRolesString = selectedRoles.join(', '); // Create a comma-separated string
  // alert()
  //     console.log('Selected Roles:', selectedRolesString);
  
  //     // Display an alert with the selected values
  //     alert(`Selected Roles: (${selectedRolesString})`);
  //   }
  // }
  
  checkuser() {
    const usR_LOGIN = this.createUserForm.get('USR_LOGIN')?.value
   alert(usR_LOGIN)
    this.tbluser={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/UserName/GetUserName?userlogin='+usR_LOGIN, {headers})
            .subscribe(res => {
             (resolve(res));
  alert(res)
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      
    };
   }
  getUnitLocation(event: any) {
    console.log("selected Type id: ", event.value);
    this.EntityID = event.value;
    this.selectedentity=null;  
    this.UnitMaster={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails/'+this.EntityID, {headers})
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

  Cancel(){
    this.router.navigate(['/dashboard/user']);
  }
}
