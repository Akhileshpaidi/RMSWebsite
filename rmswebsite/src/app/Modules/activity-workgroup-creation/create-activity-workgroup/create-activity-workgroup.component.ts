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
  FormArray,
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

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  interface Role {
    rolE_ID: number;
    rolE_NAME: string;
    // other properties
  }

@Component({
  selector: 'app-create-activity-workgroup',
  templateUrl: './create-activity-workgroup.component.html',
  styleUrls: ['./create-activity-workgroup.component.scss']
})
export class CreateActivityWorkgroupComponent {
  yourform: FormGroup;
  createworkgroup: any;
  entity:any;
  unitlocation:any;
  department:any;
  isGridBoxOpened:boolean;
  isViewMode: boolean = false;
  EntityID:any;
  taskid:any;
  roles: Role[] = []; 
  roleData: Role[] = []; // Added roles property
  selectedRole: any; // Added selectedRole property
  UnitLocationID:any;
  Selectedunit:any;
  selectionType: string = '';
  unit_location_Master_id: any;
  dataSource1:any;
  gridColumns1=['entity_Master_Name'];
  selectedOption1: any[] = [];
  gridColumns2=['unit_location_Master_name'];
  selectedOption2: any[] = [];
  //gridColumns3=['department_Master_name','unit_location_Master_name','entity_Master_Name'];
  gridColumns3: any[] = [
    { dataField: 'department_Master_name', caption: 'Department' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
];
  selectedOption3: any[] = [];
  userdata:any;




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
  ) {
    this.isGridBoxOpened=false;
    this.yourform = this.fb.group({
  
    });}

    ngOnInit(): void {


      this.createworkgroup=this.fb.group({
        nameactivity:['',Validators.required],
        Activitydesc:[''],
       // entity:['',Validators.required],
       // unitlocation:['',Validators.required],
        department:['',Validators.required],
        roles: ['',Validators.required] 
      });


      let user: any = this.session.getUser();
      // console.log(user)
           this.userdata = JSON.parse(user); //userdata.profile.userid
         //  alert(JSON.stringify(this.userdata))
           console.log("userid", this.userdata.profile.userid);
        


      this.loadRoles();



      // this.entity={  paginate: true,
      //   store: new CustomStore({
      //       key: 'entity_Master_id',
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
      //  };



       this.department={
        paginate: true,
        store: new CustomStore({
          key: 'locationdepartmentmappingid',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            //this.http.get(URL + '/departmentlocationmapping/GetdepartmentmappingDetails/')
            this.http.get(URL + '/departmentlocationmapping/GetdepartmentmappingDetails/' + this.userdata.profile.userid, {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
        
      };
      

      this.dataSource1={
        paginate: true,
        store: new CustomStore({
          key: 'activity_Workgroup_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/ActivityWorkgroup/GetActivityDetails', {headers})
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
    
    // getUnitLocation(e: any) {
    //   console.log("selected Entity_Master_id : ", e.value);
    //   //   this.EntityID = e.value;
    //      this.EntityID = e.value.join(',');
    //       this.Selectedunit=null;  
    //      this.unitlocation={
    //        paginate: true,
    //        store: new CustomStore({
    //          key: 'unit_location_Master_id',
    //          loadMode: 'raw',
    //          load:()=>{
    //            return new Promise((resolve, reject) => {
    //            this.http.get(URL + '/UnitLocationMaster/GetMultipleUnitLocations/'+this.EntityID, {headers})
    //              .subscribe((res: any) => {
    //                (resolve(res));
    //              }, (err) => {
    //                reject(err);
    //              });
    //        });
    //        },
    //      }),
           
    //      };
    //  }

     loadRoles() {
      this.http.get<Role[]>(BASE_URL + '/RoleDetails/GetcomplainceRoleDetails').subscribe(
        (roles) => {
          this.roleData = roles;
  
          // Initialize form controls dynamically
          this.roleData.forEach(role => {
            this.createworkgroup.addControl(role.rolE_ID.toString(), this.fb.control(false));
          });
        },
        (err) => {
         
          console.error('Error fetching roles:', err);
        }
      );
    }
    
  // getDepartment(e:any){
  //   console.log("selected Entity_Master_id : ", e.value);
  //   //   this.EntityID = e.value;
  //      this.unit_location_Master_id = e.value.join(',');
  //       this.Selectedunit=null; 
  //   this.department={
  //     paginate: true,
  //     store: new CustomStore({
  //       key: 'locationdepartmentmappingid',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/departmentlocationmapping/GetdepartmentmappingDetails/'+this.unit_location_Master_id, {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
      
  //   };
  // }

  // Method to switch to view mode
  showViewMode() {
    this.isViewMode = true;
  }
  
  // Method to switch back to form mode
  showFormMode() {
    this.isViewMode = false;
  }
  

  showInvalidFieldsAlert() {
    let invalidFields = '';
    if (this.createworkgroup.controls['department'].invalid) {
      invalidFields += '-  Enter Department\n';
    }
    // if (this.createworkgroup.controls['entity'].invalid) {
    //   invalidFields += '- Enter Entity \n';
    // }
  
     if (this.createworkgroup.controls['roles'].invalid) {
       invalidFields += '- Select  Role \n';
     }
    if (this.createworkgroup.controls['nameactivity'].invalid) {
      invalidFields += '- Enter Activity Name\n';
    }
  
    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields:\n${invalidFields}`,
        },
      });
    }
  }
    onSave(value:any) {



      console.log(this.createworkgroup.value);

      if (this.createworkgroup.invalid) {
        this.showInvalidFieldsAlert();
        return;
        
      }



      const payload = {

        name_ActivityWorkgroup: value.nameactivity,
        desc_ActivityWorkgroup: value.Activitydesc,
       // entity_ids: value.entity.join(','),
       // unitlocation_ids: value.unitlocation.join(','),
       locationdepartmentmappingid: value.department.join(','),
        roles: value.roles, // Include the selected roles
        createdby:this.userdata.profile.userid
      };
  
    //  alert(JSON.stringify(payload))
      console.log('payload', payload);
   
   
      this.http.post(URL + '/ActivityWorkgroup/InsertActivityWorkgroupDetails', payload, { headers })
      .subscribe({
        next: (response: any) => {
            console.log(response, 'response');
            this.dialog.open(DaidailogeComponent, {
                width: '550px',
                data: { message: "Data Updated Successfully" },
            });
            this.reloadComponent();
            this.createworkgroup.reset();
        },
        error: (error: any) => {
          error: (error: any) => {
            console.error('Error updating status:', error);
            if (error.status === 409) { // Conflict status code
              this.dialog.open(DaidailogeComponent,{   width: '550px',
              data: { message: "Record already exists with the same combination of Activity name , Department , Role ." },
          });  
            } else {
              this.dialog.open(DaidailogeComponent,{   width: '550px',
              data: { message:"An error occurred while processing your request." },
          });  
            }
        }
      }
    });
    }

    isInternalSelection(): boolean {
    
      return this.selectionType === 'Admin';
    }
    
    isExternalSelection(): boolean {
     
      return this.selectionType === 'functional';
    }
    setSelectionType(type: 'Admin' | 'functional') {
      this.selectionType = type;
    }


    reloadComponent() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
    Cancel(){
      this.reloadComponent();
    }

    exportGrid(e:any) {
      if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        worksheet.addRow(['Activity Workgroup List']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ActivityWorkgroup.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("Activity Workgroup List", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('ActivityWorkgroup.pdf');
        });
      }
    }
}
