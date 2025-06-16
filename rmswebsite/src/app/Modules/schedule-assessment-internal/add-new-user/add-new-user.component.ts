import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { ChangeDetectorRef, NgZone } from '@angular/core';
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
//import { ExitNav } from 'src/app/assessment-service.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent {
  createUserForm!: FormGroup;
  pipe = new DatePipe('en-US');
  usergridColumns2: any = ['firstname','entity_Master_Name','unit_location_Master_name'];
  usergridColumns: any = ['firstname','entity_Master_Name','unit_location_Master_name'];
  departmentColumns:any=['department_Master_name'];
  gridColumns: any = ['assessment_name', 'type_Name', 'subType_Name',
  'competency_Name','created_date','keywords'];
  selectedDepartmentNames: string[] = [];
  department_Master_id:any;
  UserDatasource:any;
  isUserBoxOpened:boolean=false;
  selectedOption1:any[]=[];
  selectedOption11:any;
  selectedOption12:any;
  selectedOption:any[] = [];
  roles: any=[];
  userid:any;
  UserDataSource:any[] = [];
  gridBoxValue:number[] = [];
  //modules:any=[];
  DocumentTypeData:any;
  reloadPage:any;
  //taskuserdata:any;
 // selectionType: 'internal' | 'external' = 'internal';
 selectionType: string = '';
  yourForm: FormGroup;
  sessionData: any;
  erroMessage: any;
  selectedentity:any;
  hide = true;
  hide1 = true;
  EntityName:any;
  Page_Type:any;
  UnitMaster:any; 
  EntityID: any;
  Departmentmaster:any;
  unit_location_Master_id:any;
  Selecteduser:any;
  reloadComponent: any;
tbluser:any;
  Documentcategory:any;
  docTypeID: any;
  Doc_CategoryID: any;
  Selectedtopic: any;
  Documentsubcategory: any;
  UserDatasourceSecondDropdown:any;
  UserDatasourceSecondDropdown1:any;
  gridBoxValue1: number[] = [];
   isUserBoxOpened1: boolean;
   isUserBoxOpened6:boolean;
   isUserBoxOpened7:boolean;
  selectedOption2:any[]=[];
  SelecteduserName:number[] = [];
  isGridBoxOpened: boolean = false;
  gridDataSource5:any;
  TpaEntityNamedatasocurce: any;
  tpauser:any;
  createUserForm1 !: FormGroup;
  TpaEntityNamedatasocurce1: any;
  tpauser1: any;
  EntityName1: any;
  UnitMaster1:any;
  Departmentmaster1: any;
  UserDatasource1:any;
  tpaenityid: any;
  selectetpa: any;
  selectetpa1: any;
  personrequstingdatasource: any;
  personrequstingdatasource1: any;
  currentDate: string = new Date().toISOString().split('T')[0];
  userdata: any;


  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private fb: FormBuilder,
    private role: RoleService,
    public dialog: MatDialog,
    private zone: NgZone,
    private ref: ChangeDetectorRef,
    //private service:ExitNav,
  ) 
  {
    this.yourForm = this.fb.group({
  
    });
    this.isUserBoxOpened1=false;
    this.isGridBoxOpened = false;
    this.isUserBoxOpened6=false;
    this.isUserBoxOpened7=false;


    this.http.get<any[]>(URL + '/userDetails/GetuserDetails', { headers })
    .subscribe(res => {
      this.UserDataSource = res;
  
      // Initialize the form after data is fetched
     
    }, (err) => {
      // Handle errors
    });
    
   
  }
  
  gridBox_displayExpr5(item: any) {
    // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
    return item.assessment_name;
   }
   gridBox_displayExpr22(usR_ID:any){
    return usR_ID && `${usR_ID.firstname} `;
  }
   gridBox_displayExpr21(usR_ID:any){
    return usR_ID && `${usR_ID.firstname} `;
  }
  gridBox_displayExprExemptionUser(usR_ID:any) {
    //   return usR_ID && `${usR_ID.firstname} <${usR_ID.lastname}
    //   <${usR_ID.unit_location_Master_id}>
    // <${usR_ID.rolE_ID}> `;
    return usR_ID && `${usR_ID.firstname} `;
    }
    getNotSelectedUsers1(selectedUserIds: any[]): void {
      // Fetch users who are not selected in the first dropdown
     
    
     // Extract usR_ID values from the objects in selectedUserIds
       const UsrIds = selectedUserIds.map(user => user.usR_ID);
       console.log("Selected User IDs:", UsrIds);
       // Simulate an asynchronous operation (replace this with your actual async logic)
       setTimeout(() => {
        let datasouce = this.UserDatasource1;
    
        // Filtering in-memory array
        datasouce = datasouce.filter((user: any) => {
          return !UsrIds.includes(user.usR_ID);
        });
    
        // Now, datasouce contains only the not selected users
        this.UserDatasourceSecondDropdown1 = datasouce;
    
        console.log("not selected usrs ", this.UserDatasourceSecondDropdown1);
    
        // Run the change detection inside Angular's zone
        this.zone.run(() => {
          this.ref.detectChanges();
        });
      }, 0);
    
    }
    getNotSelectedUsers(selectedUserIds: any[]): void {
      // Fetch users who are not selected in the first dropdown
     
    
     // Extract usR_ID values from the objects in selectedUserIds
       const UsrIds = selectedUserIds.map(user => user.usR_ID);
       console.log("Selected User IDs:", UsrIds);
       // Simulate an asynchronous operation (replace this with your actual async logic)
       setTimeout(() => {
        let datasouce = this.UserDatasource;
    
        // Filtering in-memory array
        datasouce = datasouce.filter((user: any) => {
          return !UsrIds.includes(user.usR_ID);
        });
    
        // Now, datasouce contains only the not selected users
        this.UserDatasourceSecondDropdown = datasouce;
    
        console.log("not selected usrs ", this.UserDatasourceSecondDropdown);
    
        // Run the change detection inside Angular's zone
        this.zone.run(() => {
          this.ref.detectChanges();
        });
      }, 0);
    
    }
    onUserSelectionChange1(event: any): void {
      // Assuming event.value contains the selected user IDs from the first dropdown
      this.SelecteduserName = [];
      const selectedUserIds: any[] = event.value;
      this.selectedOption1=event.value;
      const selectedUserNames: number[] = [];
     // this.UserDatasource={};
      for (const userId of selectedUserIds) {
        selectedUserNames.push(userId);
      if (selectedUserIds && selectedUserIds.length > 0) {
        this.getNotSelectedUsers1(selectedUserIds);
      } else {
        // Handle the case when no users are selected in the first dropdown
        //this.UserDatasourceSecondDropdown = [];
      }
    }
    }
    onUserSelectionChange(event: any): void {
      // Assuming event.value contains the selected user IDs from the first dropdown
      this.SelecteduserName = [];
      const selectedUserIds: any[] = event.value;
      this.selectedOption1=event.value;
      const selectedUserNames: number[] = [];
     // this.UserDatasource={};
      for (const userId of selectedUserIds) {
        selectedUserNames.push(userId);
      if (selectedUserIds && selectedUserIds.length > 0) {
        this.getNotSelectedUsers(selectedUserIds);
      } else {
        // Handle the case when no users are selected in the first dropdown
        //this.UserDatasourceSecondDropdown = [];
      }
    }
    }
    getdepartment1(event:any){
      this.unit_location_Master_id = event.value;
      this.Selecteduser=null;
      this.Departmentmaster1={
       paginate: true,
       store: new CustomStore({
           key: 'department_Master_id',
           
           loadMode: 'raw',
           load:()=>{return new Promise((resolve, reject) => {
             this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetailsById/'+this.unit_location_Master_id,{headers})
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
  getdepartment(event:any){
    this.unit_location_Master_id = event.value;
    this.Selecteduser=null;
    this.Departmentmaster={
     paginate: true,
     store: new CustomStore({
         key: 'department_Master_id',
         
         loadMode: 'raw',
         load:()=>{return new Promise((resolve, reject) => {
           this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetailsById/'+this.unit_location_Master_id,{headers})
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
 
 onDepartmentSelectionChange1(event:any): void {
  const department_Master_id = event.value;
this.selectedDepartmentNames = [];
const selectedDepartments: number[] = [];
this.UserDatasource1={};
for (const DepartmentId of department_Master_id) {
 
    selectedDepartments.push(DepartmentId);

   // this.selectedSubjectIDs.push(subject.subject_id);
  
}

this.department_Master_id = selectedDepartments;
this.getusers1();

}
 onDepartmentSelectionChange(event:any): void {
  const department_Master_id = event.value;
this.selectedDepartmentNames = [];
const selectedDepartments: number[] = [];
this.UserDatasource={};
for (const DepartmentId of department_Master_id) {
 
    selectedDepartments.push(DepartmentId);

   // this.selectedSubjectIDs.push(subject.subject_id);
  
}

this.department_Master_id = selectedDepartments;
this.getusers();

}
getsubDocTypes(event: any) {
  console.log("selected Type id: ", event.value);
  this.Doc_CategoryID = event.value;
   this.Selectedtopic=null;  
  this.Documentsubcategory={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.Doc_CategoryID, {headers})
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

 getDocTypes(event: any) {
  console.log("selected Type id: ", event.value);
  this.docTypeID = event.value;
   this.Selectedtopic=null;  
  this.Documentcategory={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+this.docTypeID, {headers})
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
  
  getusers():void{
    if (this.department_Master_id.length === 0) {
  
      return;
    }
    
    const queryParams = this.department_Master_id.map((id: any) => `USR_ID=${id}`).join('&');
  
    this.http.get<any[]>(`${URL}/DepartmentMaster/GetUserDetailsById?${queryParams}`, { headers })
    .subscribe((res: any[]) => {
      console.log('Topic Data API Response:', res);
      this.UserDatasource=res;
      //alert(JSON.stringify(res));
  
    }, (err) => {
      console.error('Error fetching data:', err);
    });
  }
  getusers1():void{
    if (this.department_Master_id.length === 0) {
  
      return;
    }
    
    const queryParams = this.department_Master_id.map((id: any) => `USR_ID=${id}`).join('&');
  
    this.http.get<any[]>(`${URL}/DepartmentMaster/GetUserDetailsById?${queryParams}`, { headers })
    .subscribe((res: any[]) => {
      console.log('Topic Data API Response:', res);
      this.UserDatasource1=res;
      //alert(JSON.stringify(res));
  
    }, (err) => {
      console.error('Error fetching data:', err);
    });
  }
  
  ngOnInit(): void {
    let userID: any = this.session.getUser();

    this.userdata = JSON.parse(userID);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
    localStorage.setItem('USERID',this.userdata.profile.userid);
   localStorage.getItem('USERID');
    this.userid=this.userdata.profile.userid;

    this.createUserForm = this.fb.group({
      requstingperson1:['',Validators.required],
      DocumentType:['',Validators.required],
      DocumentCategory:['',Validators.required],
      DocumentSubCategory:['',Validators.required],
      tpaEntityName:['',Validators.required],
      tpauser:['',Validators.required],
      tpaDescription1:['',Validators.required],
      enityname: ['', Validators.required],
      unitlocation: ['', Validators.required],
     
      department: ['', [Validators.required]],
     // roles: ['', Validators.required],
     //modules:['',Validators.required],
     
      exemptionUser: [],
     MapUserList: [],
     ExemptedReason: [],
      //country: ['', Validators.required],
   

    //  dob: ['', Validators.required],
    });

    this.EntityName={
              paginate: true,
              store: new CustomStore({
                  key: 'Value',
                  loadMode: 'raw',
                  load:()=>{return new Promise((resolve, reject) => {
                    this.http.get(URL + '/UnitMaster/GetEntityNames/'+this.userid, {headers})
                      .subscribe(res => {
                       (resolve(res));
            
                      }, (err) => {
                        reject(err);
                      });
                });
                },
              }),
            };

    
    let user: any = this.session.getUser();
// console.log(user)
     this.userdata = JSON.parse(user); //userdata.profile.userid
   //  alert(JSON.stringify(this.userdata))
     console.log("userid", this.userdata.profile.userid);


    this.createUserForm1=this.fb.group({

      requstingperson:['',Validators.required],
      tpaEntityNameexternal:['',Validators.required],
      tpauserexternal:['',Validators.required],
      tpaDescription:['',Validators.required],
      EntityMaster: ['', Validators.required],
      UnitLoc: ['', Validators.required],
    //   department1: ['', [Validators.required]],
    //   exemptionUser1: [],
    //  MapUserList1: ['', [Validators.required]],
    //  ExemptedReason1: [],
    });
    
  this.TpaEntityNamedatasocurce1={
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
    
  //  this.tpauser1={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/createtpauserDetails/GetcreatetpauserDetails', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };
   this.TpaEntityNamedatasocurce={
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
   this.personrequstingdatasource1={
    paginate: true,
    store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/createuser/getuserdetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
   this.personrequstingdatasource={
    paginate: true,
    store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/createuser/getuserdetailsbyunit', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

    
  this.EntityName1={
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
 
    this.Documentcategory={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+this.docTypeID, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

    this.DocumentTypeData={
   
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails', {headers})
              .subscribe(res => {
               (resolve(res));
             
              }, (err) => {
                reject(err)
               // alert(JSON.stringify(err))
                
               //console.error('HTTP error:', err);
              });
        });
        },
      }),
    };

    this.gridDataSource5={
   
      paginate: true,
      store: new CustomStore({
          key: 'ass_template_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Assessment/GetActiveAssesment', {headers})
              .subscribe(res => {
               (resolve(res));
             
              }, (err) => {
                reject(err)
               // alert(JSON.stringify(err))
                
               //console.error('HTTP error:', err);
              });
        });
        },
      }),
    };
    
  }
  gridBox_displayExpr1(usR_ID: any ) {
    //   return usR_ID && `${usR_ID.firstname} <${usR_ID.lastname}
    //   <${usR_ID.unit_location_Master_id}>
    // <${usR_ID.rolE_ID}> `;
    
    return usR_ID && `${usR_ID.firstname} `;
    }

  gridBox_displayExpr(usR_ID: any ) {
    //   return usR_ID && `${usR_ID.firstname} <${usR_ID.lastname}
    //   <${usR_ID.unit_location_Master_id}>
    // <${usR_ID.rolE_ID}> `;
    
    return usR_ID && `${usR_ID.firstname} `;
    }

    onGridBoxOptionChanged1(e: { name: string; }) {
      if (e.name === 'value') {
        this.isUserBoxOpened1 = false;
        this.ref.detectChanges();
      }
    }

    
showInvalidFieldsAlert1() {
  let invalidFields = '';
  if (this.createUserForm1.controls['requstingperson'].invalid) {
    invalidFields += '-  Enter Person Requesting\n';
  }
  if (this.createUserForm1.controls['tpaEntityNameexternal'].invalid) {
    invalidFields += '-  TPA Entity Name\n';
  }

  if (this.createUserForm1.controls['tpauserexternal'].invalid) {
    invalidFields += '-  TPA user\n';
  }

  if (this.createUserForm1.controls['tpaDescription'].invalid) {
    invalidFields += '- TPA Description\n';
  }
  // if (this.createUserForm1.controls['enityname1'].invalid) {
  //   invalidFields += '- Entity Name\n';
  // }
  // if (this.createUserForm1.controls['unitlocation1'].invalid) {
  //   invalidFields += '- unit location\n';
  // }
  // if (this.createUserForm1.controls['department1'].invalid) {
  //   invalidFields += '- Enter Business \n';
  // }
  // if (this.createUserForm1.controls['MapUserList1'].invalid) {
  //   invalidFields += '- Select User to map\n';
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
  
  showInvalidFieldsAlert() {
    let invalidFields = '';
 if (this.createUserForm.controls['DocumentType'].invalid) {
      invalidFields += '- DocumentTypeID\n';
    }

    if (this.createUserForm.controls['DocumentCategory'].invalid) {
      invalidFields += '-  DocumentCategory\n';
    }

    if (this.createUserForm.controls['DocumentSubCategory'].invalid) {
      invalidFields += '- DocumentSubCategory\n';
    }
    if (this.createUserForm.controls[' requstingperson1'].invalid) {
      invalidFields += '-  Enter Person Requesting\n';
    }

    if (this.createUserForm.controls['tpaEntityName'].invalid) {
      invalidFields += '- TPA Entity Name\n';
    }
    if (this.createUserForm.controls['tpauser'].invalid) {
      invalidFields += '- TPA user\n';
    }
    if (this.createUserForm.controls['enityname'].invalid) {
      invalidFields += '- Entity Name\n';
    }
    if (this.createUserForm.controls['unitlocation'].invalid) {
      invalidFields += '- unit location\n';
    }
    if (this.createUserForm.controls['department'].invalid) {
      invalidFields += '- Department \n';
    }
    if (this.createUserForm.controls['MapUserList'].invalid) {
      invalidFields += '- Select User to map\n';
    }
    if (this.createUserForm.controls['tpaDescription1'].invalid) {
      invalidFields += '- Enter TPA Description User \n';
    }
    // if (this.createUserForm.controls['ExemptedReason'].invalid) {
    //   invalidFields += '- Select Exempted Reason\n';
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
  
    if (this.createUserForm.invalid) {
      this.showInvalidFieldsAlert();
      return;
      
    }
    

   
    // getting AuthId
   // let user: any = this.session.getUser();
   // this.sessionData = JSON.parse(user);

  
   
    // Payload
    const payload = {
      //authid: this.sessionData.profile.authid,
      //mode: 'I',
      // firstname: value.firstname,
      // emailid: value.emailid,
      // department_Master_id: value.city,
      // unit_location_Master_id: value.state,
      // entity_Master_id: value.country,
    
      // taskids:value.modules.join(",")
     // :Value.assettempletid,

      docTypeID: value. DocumentType,
      doc_CategoryID:value.DocumentCategory,
      doc_SubCategoryID:value.  DocumentSubCategory,
      requstingperson:value.requstingperson1.join(","),
      tpaenityid:value. tpaEntityName,
      tpauserid:value.tpauser,
      tpaenitydescription :value.tpaDescription1,
      entity_Master_id:value. enityname,
      unit_location_Master_id:value. unitlocation,
      department_Master_id:value. department.join(","),
     usr_ID :value.MapUserList.map((user: { usR_ID: any; }) => user.usR_ID).join(","),
     //excludedusrid:  value.exemptionUser.map((user: { usR_ID: any; }) => user.usR_ID).join(","),
     excludedusrid: value.exemptionUser && value.exemptionUser.length > 0
     ? value.exemptionUser.map((user: { usR_ID: any; }) => user.usR_ID).join(",")
     : null,
     exculededdescription :value.ExemptedReason ,
     riskAssesserid:this.userdata.profile.userid

    };
    alert(JSON.stringify(payload))
    console.log('payload', payload);
 
 
    this.http.post(URL + '/sheduledAssessmentmappeduser/InsertsheduledAssessmentmappeduser', payload, { headers })
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
          this.createUserForm.reset();
      },
      error: (error: any) => {
          console.error('Error updating status:', error);
      }
  });

  }
  createexternal(value:any){

    console.log(value, 'user created External');
    if (this.createUserForm1.invalid) {
      this.showInvalidFieldsAlert1();
      return;
    }

    const payload = {
      requstingperson:value.requstingperson.join(","),
      tpaenityid:value. tpaEntityNameexternal,
      tpauserid:value.tpauserexternal,
      tpaenitydescription:value.tpaDescription, 
      entity_Master_id:value. EntityMaster,
      unit_location_Master_id:value. UnitLoc,
  //     department_Master_id:value. department1.join(","),
  //    usr_ID :value.MapUserList1.map((user: { usR_ID: any; }) => user.usR_ID).join(","),
  //  //  excludedusrid:  value.exemptionUser1.map((user: { usR_ID: any; }) => user.usR_ID).join(","),
  //  excludedusrid: value.exemptionUser1 && value.exemptionUser1.length > 0
  //    ? value.exemptionUser1.map((user: { usR_ID: any; }) => user.usR_ID).join(",")
  //    : null,
  //    exculededdescription :value.ExemptedReason1, 
     riskAssesserid:this.userdata.profile.userid
    };
   // alert(JSON.stringify(payload))
    console.log('payload', payload);
 
 
    this.http.post(URL + '/tpaexternalmappedunlockedscope/Insertstpaexternalmappedunlockedscope', payload, { headers })
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
          this.createUserForm1.reset();
      },
      error: (error: any) => {
          console.error('Error updating status:', error);
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
   getUnitLocation1(event: any) {
    console.log("selected Type id: ", event.value);
    this.EntityID = event.value;
    this.selectedentity=null;  
    this.UnitMaster1={
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
   gettpausers(event:any){
    console.log("selected Type id: ", event.value);
    this.tpaenityid= event.value;
    this.selectetpa=null;
    this.tpauser={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/createtpauserDetails/Getcreatetpauserbyid/'+this.tpaenityid, {headers})
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
   gettpausers1(event:any){
    console.log("selected Type id: ", event.value);
    this.tpaenityid= event.value;
    this.selectetpa1=null;
    this.tpauser1={
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/createtpauserDetails/Getcreatetpauserbyid/'+this.tpaenityid, {headers})
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


  isInternalSelection(): boolean {
    // Add your logic to determine if internal form should be shown
    return this.selectionType === 'internal';
  }
  
  isExternalSelection(): boolean {
    // Add your logic to determine if external form should be shown
    return this.selectionType === 'external';
  }
  setSelectionType(type: 'internal' | 'external') {
    this.selectionType = type;
  }
}
