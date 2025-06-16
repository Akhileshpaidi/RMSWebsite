import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Import other necessary modules...
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


interface Role {
  rolE_ID: number;
  rolE_NAME: string;
  roletype:number;
  // other properties
}

export interface User {
  usR_ID: string;
  name: string;
  emailid: string;
  mobilenumber: string; // Ensure types are consistent with your actual data.
  roles: string;
  roleData: any;
  designation: string | null; // Based on your data, this can be null.
  entityname: string;
  unit_location_Master_name: string;
  department_Master_name: string;
  roleNames: string;
  usR_STATUS: string;
}
@Component({
  
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss']
})

export class AddUserRoleComponent implements OnInit {
  User: User[] = [];
  EntityName: any;
  UnitMaster: any;
  createUserForm: FormGroup;
  selectedUser: any;
  selectedRoles: number[] = [];
  userDetailsVisible: boolean = false;
  userDetailsVisible1: boolean = false;
  usR_ID: any;
  dataSource1:any;
  role: any;
  taskuserdata:any;
  reloadComponent: any;
  EntityID: any;
  enitytpa:any;
  tpausername:any;
  tpaenity:any;
  selectionType:number= 1;
  selectedentity: any;
  username: any;
  roleData: Role[] = [];
  payload:any;
  router: any;
  cdr: any;
  ChangeDetectorRef: any;
  taskid: any;
 
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createUserForm = this.fb.group({
      module:['',Validators.required],
      User: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
    //  startDate: [null, Validators.required], 
     // endDate: [null, Validators.required],
      roles: [[]]
    });
  }



  loadRoles(taskid: any, roletype: any):void {
    let params = new HttpParams()
    .set('taskid',this.taskid)
    .set('roletype',roletype.toString());
   
    this.http.get<Role[]>(BASE_URL + '/RoleDetails/GetRoleDetailsbyid/',{headers,params}).subscribe(
      (roles) => {
        this.roleData = roles;

        // Initialize form controls dynamically
        this.roleData.forEach(role => {
          this.createUserForm.addControl(role.rolE_ID.toString(), this.fb.control(false));
        });
      },
      (err) => {
        console.error('Error fetching roles:', err);
      }
    );
  }
 
  ngOnInit(): void {
   // this.gettask();
    this.getUsers();
    this.getEntityNames();
  //  this.loadRoles( this.taskid);
    this.dataSource1 = new CustomStore({
      key: 'user_location_mapping_id',
    
      load: () => this.sendRequest1(URL + '/Adduserrole/GetAdduserroleDetails'),
    
      remove: (key) => this.sendRequest1(URL + '/Adduserrole/deleteAdduserroleDetails', 'DELETE', {
        key
    })
  });
    
    this.tpaenity={
      paginate: true,
      store: new CustomStore({
        key: 'tpaenityid',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(BASE_URL + '/tpaentity/GettpaentityMasterDetails')
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    }
    this.EntityName = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(BASE_URL + '/UnitMaster/GetEntityNames')
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };

    this.username = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(BASE_URL + '/UserMaster/GetuserMasterDetails')
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };

    this.taskuserdata={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(BASE_URL + '/TaskMaster/GetTaskMasterDetails')
              .subscribe(res => {
                resolve(res);
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
          });
          case 'DELETE':
           // alert(data1.key)
            return new Promise((resolve, reject) => {
              this.http.delete(url+'?id='+data1.key)
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
              });
              
        }}

        onRoleTypeChange(roletype:number){
          this.loadRoles( this.taskid,roletype);
            
        }
   
  getUsers() {
    this.http.get<User[]>(BASE_URL + '/UserMaster/GetActiveUserDetails')
      .subscribe((res) => {
        this.User = res;
        console.log('User API Response:', res);
      }, (err) => {
        console.error('Error fetching users:', err);
      });
  }
  // gettask(){
  //   this.http.get<any[]>(BASE_URL + '/UserMaster/GetuserMasterDetails')
  //     .subscribe((res) => {
  //       this.EntityName = res;
  //       console.log('taskName API Response:', res);
  //     }, (err) => {
  //       console.error('Error fetching taskName:', err);
  //     });
  // }

  getEntityNames() {
    this.http.get<any[]>(BASE_URL + '/UnitMaster/GetEntityNames')
      .subscribe((res) => {
        this.EntityName = res;
        console.log('EntityName API Response:', res);
      }, (err) => {
        console.error('Error fetching EntityName:', err);
      });
  }
  onTaskValueChanged(event: any): void {
    this.taskid = event.value;
    //this.EntityID= null;
    this.selectedentity=null;
    //this.username=null;
    this.loadRoles(this.taskid , this.selectionType);
  }
   // for tpa user based on tpa entity
  gettpauser (event: any) {
    console.log("selected Type id: ", event.value);
    this.enitytpa = event.value;
    
    this.tpausername = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(BASE_URL + '/UserMaster/GettpauserDetails/' + this.enitytpa)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };
  }
     // get unit location based on entity
  getUnitLocation (event: any) {
    console.log("selected Type id: ", event.value);
    this.EntityID = event.value;
    this.selectedentity = null;
    this.UnitMaster = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(BASE_URL + '/UnitLocationMaster/GetUnitLocationDetails/' + this.EntityID)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };
  }
     // get roles based on selection
  getuserroles(event:any){
  //  alert(event.value);
    this.http.get(BASE_URL+'/Adduserrole/GetAdduserroleDetailsforselected/'+'?unitLocationId='+event.value+'&&userId='+this.createUserForm.value.User+'&&entityId='+this.createUserForm.value.country+'&&taskid='+this.createUserForm.value.module)
    .subscribe(res => {
   //   alert(JSON.stringify(res));
      this.selectedRoles = Array.isArray(res) ? res.map(Number) : [Number(res)];    }, (err) => {
      console.error("API call error: ", err);
    });
    
  }
     // for  user Details
  onUserSelect(event: any) {
    console.log("onUserSelect event:", event);
    if (event && event.value) {
      console.log("onUserSelect value:", event.value);
      this.usR_ID = event.value;
      this.http.get<User[]>(BASE_URL + '/UserLocationMapping/GetuserDetailsbyUserID?userid=' + this.usR_ID)
        .subscribe(res => {
          this.selectedUser = res[0];
          console.log(this.selectedUser);
          this.changeDetector.detectChanges();
          console.log(this.selectedUser?.usR_ID);
          console.log(this.selectedUser?.firstname);
          this.userDetailsVisible = true;
        }, (err) => {
          console.error("API call error: ", err);
        });
    }
  }
    // for tpa user Details
  ontpaUser(event:any){
    console.log("ontpaUserSelect event:", event);
    if (event && event.value) {
      console.log("ontpaUserSelect value:", event.value);
      this.usR_ID = event.value;
      this.http.get<User[]>(BASE_URL + '/UserMaster/GetusertpaMasterDetails?userid=' + this.usR_ID)
        .subscribe(res => {
          this.selectedUser = res[0];
          console.log(this.selectedUser);
          this.changeDetector.detectChanges();
          console.log(this.selectedUser?.usR_ID);
          console.log(this.selectedUser?.firstname);
          this.userDetailsVisible1 = true;
        }, (err) => {
          console.error("API call error: ", err);
        });
  }}
  onUserChange(event: any) {
    const selectedUserId = event.value;
    this.selectedUser = this.User.find(user => user.usR_ID === selectedUserId);
  }

  toggleCheckbox(roleId: number): void {
    const index = this.selectedRoles.indexOf(roleId);
    if (index !== -1) {
      this.selectedRoles.splice(index, 1);
    } else {
      this.selectedRoles.push(roleId);
    }
  }

  // onSave() {
  //   console.log('Roles value:', this.createUserForm.get('roles'));
  //   console.log('Form status:', this.createUserForm.status);
  //   console.log('Form validity:', this.createUserForm.valid);

  //   // Output form control errors for debugging
  //   Object.keys(this.createUserForm.controls).forEach(key => {
  //     const controlErrors = this.createUserForm.get(key)?.errors;
  //     if (controlErrors != null) {
  //       Object.keys(controlErrors).forEach(keyError => {
  //         console.error(`Control ${key} has error ${keyError} with value ${controlErrors[keyError]}`);
  //       });
  //     }
  //   });

  //   if (this.createUserForm.valid) {
  //     const formData = this.createUserForm.value;
  //     console.log('Form values:', formData);

      

  //     // Assuming roles should be sent as an array in the payload
  //      this.payload = {
  //       usR_ID: formData.User,
  //       unit_location_Master_id: formData.state,
  //       roLE_ID: Object.keys(formData)
  //       .filter(key => this.selectedRoles.includes(+key))  // Filter by selected roles directly
  //       .join(","),
  //       entity_Master_id: formData.country,
  //       user_location_mapping_End_Date: formData.endDate,
  //       user_location_mapping_start_Date: formData.startDate
  //     };
  //     console.log('payload values',this.payload)

  //     // Assuming you have an API endpoint to receive the data
  //     const apiUrl = BASE_URL + '/Adduserrole/InsertAdduserroleDetails';

  //     this.http.post(apiUrl, this.payload,{headers}).subscribe(
  //       (response) => {
  //         console.log('Data saved successfully ', response);
  //         window.alert('Data saved successfully');

  //         // Additional logic if needed, e.g., resetting form or updating data source
  //         this.createUserForm.reset();
  //         this.reloadComponent();
  //       },
  //       (error) => {
  //         console.error('Error saving data', error);
  //         window.alert('Error saving data');
  //       }
  //     );
  //   } else {
  //     console.warn('Form is not valid. Please check the form fields.');
  //   }
  // }
  onSave() {
    console.log('Form status:', this.createUserForm.status);
    console.log('Form validity:', this.createUserForm.valid);
  
    // Output form control errors for debugging
    Object.keys(this.createUserForm.controls).forEach(key => {
      const controlErrors = this.createUserForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.error(`Control ${key} has error ${keyError} with value ${controlErrors[keyError]}`);
        });
      }
    });
  
    if (this.createUserForm.valid) {
      const formData = this.createUserForm.value;
      console.log('Form values:', formData);


      const payload = {
        USR_ID: formData.User,
        Unit_location_Master_id: formData.state,
        ROLE_ID: this.selectedRoles.join(","),  // Use selectedRoles array directly
        Entity_Master_id: formData.country,
        taskID:formData.module
      //  user_location_mapping_End_Date: formData.endDate,
       // user_location_mapping_start_Date: formData.startDate
      };
  
      console.log('Payload values:', JSON.stringify(payload));
  
     
      // Assuming you have an API endpoint to receive the data
    
    
      this.http.put(URL+ '/Adduserrole/UpdateAdduserroleDetails', payload,{headers}).subscribe(
        (response) => {
          console.log('Data saved successfully ', response);
          window.alert('Data saved successfully');
  
          
      this.dataSource1 = new CustomStore({
        key: 'user_location_mapping_id',
      
        load: () => this.sendRequest1(URL + '/Adduserrole/GetAdduserroleDetails'),
        
    });
          
       
        
         
        this.createUserForm.reset();
        // this.reloadComponent();
        window.location.reload();
        //this.ChangeDetectorRef.detectChanges();

      //   this.router.navigateByUrl('/dashboard/inspection/add-user-role', { skipLocationChange: true }).then(() => {
      //     this.router.navigate(['/dashboard/inspection/add-user-role']);
      //  });
        },
        (error) => {
          console.error('Error saving data', error);
          window.alert('Error saving data');
         } );
        }else {
      console.warn('Form is not valid. Please check the form fields.');
    }
  }

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['User Role Mapping List']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "UserMappinglist.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("User Role Mapping List", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('UserMappinglist.pdf');
      });
    }
  }
  Cancel(){
    window.location.reload();
   // this.router.navigate(['/inspection/add-user-role']);
  }
  isInternalSelection(): boolean {
    
    return this.selectionType === 1;
  }
  
  isExternalSelection(): boolean {
   
    return this.selectionType === 2;
  }
  setSelectionType(roletype: number) {
    this.selectionType = roletype;
    this.resetForm();  // reset of Form
  }
  // reset of Form
  resetForm() {
    this.createUserForm.reset();
    this.selectedUser = null;
    this.userDetailsVisible = false;
    this.userDetailsVisible1 = false;
    this.selectedRoles = [];
  }
  }
