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
  selector: 'app-risk-key-focus-ares',
  templateUrl: './risk-key-focus-ares.component.html',
  styleUrls: ['./risk-key-focus-ares.component.scss']
})
export class RiskKeyFocusAresComponent {

  yourForm: FormGroup;
  keyfocus:any;
  userdata: any;
  Department:any;
  Entity:any;
  location:any;
  businessdunctionid:any;
  dataSource1:any;
  selectedOption:any[] = [];
  EntityID: any;
  unitid:any;
  Selectedunit:any;
  department:any;
  selecteddepartment:any;
  selectedbus:any;
  depid:any;
  businessprocess:any;
  business:any;
  bpmaturity:any;

  gridColumns: any = ['unit_location_Master_name'];
  gridColumnsbusiness:any =['businessProcessName']
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
      this.keyfocus = this.fb.group({
        keyfousname:['',Validators.required],
        keyfousdescription:[],
        department:['',Validators.required],
        entity:['',Validators.required],
        location:['',Validators.required],
        businessid:['',Validators.required],
        businessProcessid:['',Validators.required],
        bpmaturity:['',Validators.required]
      
      });
      let user: any = this.session.getUser();
      // console.log(user)
           this.userdata = JSON.parse(user); //userdata.profile.userid
         //  alert(JSON.stringify(this.userdata))
           console.log("userid", this.userdata.profile.userid);

           
           this.Entity={ 
            store: new CustomStore({
            key: 'entity_Master_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/KeyFocusArea/GetentityKeyFocusArea', {headers})
                .subscribe(res => {
                 (resolve(res));
          
                }, (err) => {
                  reject(err);
                });
          });
          },
          }),
          };

         this.bpmaturity={
          store: new CustomStore({
            key:'risk_admin_Iniassimpfactid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/initialAssessmentImpact/Getrisk_admin_iniassimpfact', {headers})
                .subscribe(res => {
                 (resolve(res));
          
                }, (err) => {
                  reject(err);
                });
          });
          },
          }) 
         };


          this.dataSource1 = new CustomStore({
            key: 'keyfocusareaid',
          
            load: () => this.sendRequest1(URL + '/KeyFocusArea/GetKeyFocusAreaDetails'),
          
            remove: (key) => this.sendRequest1(URL + '/KeyFocusArea/DeleteKeyFocusArea', 'DELETE', {
              key
          })
        });
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
  getunitlocation(event: any) {
    console.log("selected Entity_Master_id : ", event.value);
    this.EntityID = event.value;
     this.Selectedunit=null;  
    this.location={
      paginate: true,
      store: new CustomStore({
        key: 'unit_location_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/KeyFocusArea/GetunitKeyFocusArea/'+this.EntityID, {headers})
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
  getdepartment(event: any) {
    console.log("selected unit_location_Master_id: ", event.value);
    this.unitid = event.value;
    this.selecteddepartment=null;  
    this.Department={
      paginate: true,
      store: new CustomStore({
        key: 'department_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/KeyFocusArea/GetdeptKeyFocusArea/'+this.unitid, {headers})
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
  getbusiness(event:any){
    console.log("selected department_Master_id : ", event.value);
    this.depid = event.value;
    this.selectedbus=null;  
    this.business={
      paginate: true,
      store: new CustomStore({
        key: 'riskBusinessfunctionid',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/KeyFocusArea/GetbusiKeyFocusArea/'+this.depid, {headers})
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
  getbusinessprocesess(event:any){
    console.log("selected business processes : ", event.value);
    this.businessdunctionid = event.value;
    this.selectedbus=null;  
    this.businessprocess={ 
      paginate: true,
      store: new CustomStore({
        key: 'businessprocessID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/KeyFocusArea/GetbusprocesseiKeyFocusArea/'+this.businessdunctionid, {headers})
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
    if (this.keyfocus.controls['keyfousname'].invalid) {
      invalidFields += '-  Enter key focus Name\n';
    }
    if (this.keyfocus.controls['department'].invalid) {
      invalidFields += '-  Enter Department Name\n';
    }
    if (this.keyfocus.controls['entity'].invalid) {
      invalidFields += '- Enter Entity  Name\n';
    }
  
    if (this.keyfocus.controls['location'].invalid) {
      invalidFields += '- Enter Location Name\n';
    }
    if (this.keyfocus.controls['businessid'].invalid) {
      invalidFields += '- Enter Business Function Name\n';
    }
    if (this.keyfocus.controls['businessProcessid'].invalid) {
      invalidFields += '- Enter Business Function Name\n';
    }
    if (this.keyfocus.controls['bpmaturity'].invalid) {
      invalidFields += '- Enter Task Maturity\n';
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
  
    if (this.keyfocus.invalid) {
      this.showInvalidFieldsAlert();
      return;
      
    }
  
    const payload = {
      keyfousname:value.keyfousname,
      keyfousdescription:value.keyfousdescription,
      departmentid: value.department,
      entityid:value.entity,
      unitlocationid:value.location,
      riskBusinessfunctionid:value.businessid, 
      businessprocessID:value.businessProcessid.join(","),
      bpmaturity:value.bpmaturity,
     createdby:this.userdata.profile.userid

    };
   alert(JSON.stringify(payload))
    console.log('payload', payload);
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    console.log('encryptedPayload', encryptedPayload);
 
    this.http.post(URL + '/KeyFocusArea/InsertKeyFocusAreaDetails', encryptedPayload)
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
         
          window.location.reload();
          this.keyfocus.reset();
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
      worksheet.addRow(['Key Focus Area']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "keyfocus.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("key focus Area", 80,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Key Focus Area.pdf');
      });
    }
  }
}
