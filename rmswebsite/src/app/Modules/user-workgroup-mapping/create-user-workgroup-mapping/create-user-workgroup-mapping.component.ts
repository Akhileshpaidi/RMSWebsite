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
  RequiredValidator,
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

@Component({
  selector: 'app-create-user-workgroup-mapping',
  templateUrl: './create-user-workgroup-mapping.component.html',
  styleUrls: ['./create-user-workgroup-mapping.component.scss']
})
export class CreateUserWorkgroupMappingComponent {
  yourForm: FormGroup;
  createworkgroup:any;
  userdata:any;
  username:any;
  activity:any;
  dataSource1:any;
  selectedOption3:any[]=[];
  selectedOption4:any[] = [];
  gridColumns4:any[] =[{ dataField: 'firstname', caption:'Username' }]
  gridColumns3: any[] = [
    { dataField: 'name_ActivityWorkgroup', caption: 'Name Of Activity' },
    { dataField: 'unigueActivityid', caption: 'Activity Workgroup ID' },
    { dataField: 'department_Master_name', caption: 'Department' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
     { dataField: 'rolE_NAME', caption: 'Role Name' },
];

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
  
  
  }


  ngOnInit(): void {
    this.createworkgroup = this.fb.group({
    
      name:['',Validators.required],
      userdesc:[''],
      activity:['',Validators.required],
      user:['',Validators.required]
    
    });
    
    let user: any = this.session.getUser();
// console.log(user)
     this.userdata = JSON.parse(user); //userdata.profile.userid
   //  alert(JSON.stringify(this.userdata))
     console.log("userid", this.userdata.profile.userid);

     this.activity={
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

    this.username={ 
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

    this.dataSource1={
      paginate: true,
      store: new CustomStore({
        key: 'user_workgroup_mapping_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/useractivitymapping/GetuserActivityDetails', {headers})
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


  showInvalidFieldsAlert() {
    let invalidFields = '';
    if (this.createworkgroup.controls['name'].invalid) {
      invalidFields += '-  Enter Name Of user Workgroup Mapping\n';
    }
    if (this.createworkgroup.controls['activity'].invalid) {
      invalidFields += '- Select Activity  \n';
    }
  
    if (this.createworkgroup.controls['user'].invalid) {
      invalidFields += '- Select User Name\n';
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
  onSave(value: any) {
    console.log(value, 'user created');
  
    if (this.createworkgroup.invalid) {
      this.showInvalidFieldsAlert();
      return;
      
    }
  
    const payload = {
    
      user_workgroup_mapping_name: value.name,
      user_workgroup_mapping_desc : value.userdesc,
      activityworkgroup_id : parseInt(value.activity),
      userid : value. user.join(','),
      createdby:this.userdata.profile.userid


    };
    alert(JSON.stringify(payload))
    console.log('payload', payload);
 
 
    this.http.post(URL + '/useractivitymapping/InsertuseractivitymappingDetails', payload)
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
         this.reloadComponent();
          window.location.reload();
         // this.createworkgroup.reset();
      },
      error: (error: any) => {
        console.error('Error updating status:', error);
        if (error.status === 409) { // Conflict status code
          this.dialog.open(DaidailogeComponent,{   width: '550px',
          data: { message: " Record already Exists" },
      });  
        } else {
          this.dialog.open(DaidailogeComponent,{   width: '550px',
          data: { message:  "Error: An error occurred while processing your request."},
      }); 
        }
    }
  });

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
      worksheet.addRow(['user Workgroup mapping List']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "user Workgroup mapping.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("user Workgroup mapping List", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('user Workgroup mapping.pdf');
      });
    }
  }
}

