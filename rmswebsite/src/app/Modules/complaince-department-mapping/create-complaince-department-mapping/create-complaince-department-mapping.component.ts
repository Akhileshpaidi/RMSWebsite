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


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-create-complaince-department-mapping',
  templateUrl: './create-complaince-department-mapping.component.html',
  styleUrls: ['./create-complaince-department-mapping.component.scss']
})
export class CreateComplainceDepartmentMappingComponent {
  yourForm: FormGroup;
  userdata: any;
  locationDepartment: any;
  Departmentlocation: any;
  selectionType: string = '';
  Department:any;
  Entity:any;
  location:any;
  entitylocation:any;
  unitlocation:any;
  departmentlocation:any;
  dataSource1:any;
  selectedEntityLocation:any;
  selectedOption:any[] = [];
  selectedOption1:any[] = [];
  EntityID: any;
  Selectedunit:any;
  EntityID1: any;
  Selectedunit1:any;
  gridColumns: any = ['unit_location_Master_name'];
  gridColumns1:any[]=[{ dataField: 'department_Master_name', caption: 'Department Name'}];





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
    this.Departmentlocation = this.fb.group({
    
      department:['',Validators.required],
      entity:['',Validators.required],
      location:['',Validators.required],
     
    
    });

    
    let user: any = this.session.getUser();
// console.log(user)
     this.userdata = JSON.parse(user); //userdata.profile.userid
   //  alert(JSON.stringify(this.userdata))
     console.log("userid", this.userdata.profile.userid);


    this.locationDepartment=this.fb.group({

     
      entitylocation:['',Validators.required],
      unitlocation:['',Validators.required],
      departmentlocation:['',Validators.required],
   
    });

this.Department={ 
  store: new CustomStore({
  key: 'department_Master_id',
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
this.departmentlocation={ 
  store: new CustomStore({
  key: 'department_Master_id',
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

this.Entity={ 
  store: new CustomStore({
  key: 'entity_Master_id',
  loadMode: 'raw',
  load:()=>{return new Promise((resolve, reject) => {
    this.http.get(URL + '/departmentlocation/getentityid/' + this.userdata.profile.userid, {headers})
      .subscribe(res => {
       (resolve(res));

      }, (err) => {
        reject(err);
      });
});
},
}),
};
this.entitylocation={
  store: new CustomStore({
    key: 'entity_Master_id',
    loadMode: 'raw',
    load:()=>{return new Promise((resolve, reject) => {
      this.http.get(URL + '/departmentlocation/getentityid/' + this.userdata.profile.userid, {headers})
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
    store: new CustomStore({
      key: 'locationdepartmentmappingid',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/locationdepartmentmapping/GetlocationdepartmentmappingDetailsbyid/' + this.userdata.profile.userid, {headers})
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
    if (this.Departmentlocation.controls['department'].invalid) {
      invalidFields += '-  Enter Department\n';
    }
    if (this.Departmentlocation.controls['entity'].invalid) {
      invalidFields += '- Enter Entity \n';
    }
  
    if (this.Departmentlocation.controls['location'].invalid) {
      invalidFields += '- Enter Location\n';
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
  showInvalidFieldsAlert1() {
    let invalidFields = '';
    if (this.locationDepartment.controls['entitylocation'].invalid) {
      invalidFields += '-  Enter Entity\n';
    }
    if (this.locationDepartment.controls['unitlocation'].invalid) {
      invalidFields += '-  Enter Unit Location\n';
    }
  
    if (this.locationDepartment.controls['departmentlocation'].invalid) {
      invalidFields += '- Enter Department Location\n';
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

  createUser(value: any) {
    console.log(value, 'user created');
  
    if (this.Departmentlocation.invalid) {
      this.showInvalidFieldsAlert();
      return;
      
    }
  
    const payload = {
      departmentid: value.department.toString(),
      entityid:parseInt(value.entity),
      unitlocationid:value.location.join(","),
    
     createdby:this.userdata.profile.userid

    };
   // alert(JSON.stringify(payload))
    console.log('payload', payload);
 
 
    this.http.post(URL + '/departmentlocationmapping/InsertdepartmentlocationmappingDetails', payload)
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
         
          window.location.reload();
          this.Departmentlocation.reset();
      },
      error: (error: any) => {
        console.error('Error updating status:', error);
        if (error.status === 409) { // Conflict status code
          this.dialog.open(DaidailogeComponent,{   width: '550px',
          data: { message: " Record already exists with the same combination of entity, unit location, and department" },
      });  
        } else {
          this.dialog.open(DaidailogeComponent,{   width: '550px',
          data: { message:  "Error: An error occurred while processing your request."},
      }); 
        }
    }
  });

  }
  createexternal(value:any){

    console.log(value, 'user created External');
    if (this.locationDepartment.invalid) {
      this.showInvalidFieldsAlert1();
      return;
    }

    const payload = {
    
      entityid:parseInt( value.entitylocation),
      unitlocationid:value.unitlocation.toString(),
      departmentid:value.departmentlocation.join(','), 
 
     createdby:this.userdata.profile.userid
    };
 //  alert(JSON.stringify(payload))
    console.log('payload', payload);
 
 
    this.http.post(URL + '/locationdepartmentmapping/InsertlocationdepartmentmappingDetails', payload, { headers })
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
          this.locationDepartment.reset();
      },
      error: (error: any) => {
          console.error('Error updating status:', error);
          if (error.status === 409) { // Conflict status code
            this.dialog.open(DaidailogeComponent,{   width: '550px',
            data: { message: "Record already exists with the same combination of entity, unit location, and department." },
        });  
          } else {
            this.dialog.open(DaidailogeComponent,{   width: '550px',
            data: { message:"An error occurred while processing your request." },
        });  
          }
      }
  });
  }

  getunitlocation(event: any) {
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("selected Entity_Master_id : ", event.value);
    this.EntityID = event.value;
     this.Selectedunit=null; 
    this.location={
      paginate: true,
      store: new CustomStore({
        key: 'unit_location_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + `/departmentlocation/getunitlocationid?userid=${this.userdata.profile.userid}&entityids=${this.EntityID}`, {headers})
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
  getunitlocation1(event:any){
    console.log("selected Entity_Master_id : ", event.value);
    this.EntityID = event.value;
     this.Selectedunit=null;  
    this.unitlocation={
      paginate: true,
      store: new CustomStore({
        key: 'unit_location_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + `/departmentlocation/getunitlocationid?userid=${this.userdata.profile.userid}&entityids=${this.EntityID}`, {headers})
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
    
    return this.selectionType === 'Departmentlocation';
  }
  
  isExternalSelection(): boolean {
   
    return this.selectionType === 'locationDepartmentg';
  }
  setSelectionType(type: 'Departmentlocation' | 'locationDepartmentg') {
    this.selectionType = type;
  }


  
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Department Location Mapping List']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Departmentlocationmapping.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("Department Location Mapping List", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Departmentlocationmapping.pdf');
      });
    }
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
}

