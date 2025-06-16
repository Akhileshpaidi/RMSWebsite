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
  selector: 'app-risk-business-function-mapping',
  templateUrl: './risk-business-function-mapping.component.html',
  styleUrls: ['./risk-business-function-mapping.component.scss']
})
export class RiskBusinessFunctionMappingComponent {
  yourForm: FormGroup;
  Businessfunction:any;
  userdata: any;
  Department:any;
  Entity:any;
  location:any;
  dataSource1:any;
  selectedOption:any[] = [];
  EntityID: any;
  Selectedunit:any;
  gridColumns: any = ['unit_location_Master_name'];
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
    this.Businessfunction = this.fb.group({
      businessname:['',Validators.required],
      businessdescription:[],
      department:['',Validators.required],
      entity:['',Validators.required],
      location:['',Validators.required],
     
    
    });
    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);

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

        this.Entity={ 
          store: new CustomStore({
          key: 'entity_Master_id',
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

        // this.dataSource1={
        //   store: new CustomStore({
        //     key: 'riskBusinessfunctionid',
        //     loadMode: 'raw',
        //     load:()=>{return new Promise((resolve, reject) => {
        //       this.http.get(URL + '/RiskBusinessFunction/GetRiskBusinessFunctionDetails', {headers})
        //         .subscribe(res => {
        //          (resolve(res));
          
        //         }, (err) => {
        //           reject(err);
        //         });
        //   });
        //   },
        //   }),
        // };

        this.dataSource1 = new CustomStore({
          key: 'riskBusinessfunctionid',
        
          load: () => this.sendRequest1(URL + '/RiskBusinessFunction/GetRiskBusinessFunctionDetails'),
        
          remove: (key) => this.sendRequest1(URL + '/RiskBusinessFunction/DeleteRiskBusinessFunction', 'DELETE', {
            key
        })
      });
      
  }
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
      showInvalidFieldsAlert() {
        let invalidFields = '';
        if (this.Businessfunction.controls['businessname'].invalid) {
          invalidFields += '-  Enter Business Name\n';
        }
        if (this.Businessfunction.controls['department'].invalid) {
          invalidFields += '-  Enter Department\n';
        }
        if (this.Businessfunction.controls['entity'].invalid) {
          invalidFields += '- Enter Entity \n';
        }
      
        if (this.Businessfunction.controls['location'].invalid) {
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
      createUser(value: any) {
        console.log(value, 'user created');
      
        if (this.Businessfunction.invalid) {
          this.showInvalidFieldsAlert();
          return;
          
        }
      
        const payload = {
          riskbusinessname:value.businessname,
          riskbusinessdescription:value.businessdescription,
          departmentid: value.department,
          entityid:value.entity,
          unitlocationid:value.location.join(","),
         createdby:this.userdata.profile.userid
    
        };
       // alert(JSON.stringify(payload))
        console.log('payload', payload);

       // encrypted Payload
       let encryptedPayload = {
        requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
      };
      console.log('encryptedPayload', encryptedPayload);
     
     
        this.http.post(URL + '/RiskBusinessFunction/InsertRiskBusinessFunctionDetails', encryptedPayload)
        .subscribe({
          next: (response: any) => {
              console.log(response, 'response');
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: "Data Updated Successfully" },
              });
             
              window.location.reload();
              this.Businessfunction.reset();
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
          worksheet.addRow(['Business Function Mapping List']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "BusinessFunctionmapping.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("Business Function Mapping List", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('BusinessFunctionmapping.pdf');
          });
        }
      }
    
}
