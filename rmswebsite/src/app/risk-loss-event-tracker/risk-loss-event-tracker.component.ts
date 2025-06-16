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
  selector: 'app-risk-loss-event-tracker',
  templateUrl: './risk-loss-event-tracker.component.html',
  styleUrls: ['./risk-loss-event-tracker.component.scss']
})
export class RiskLossEventTrackerComponent {
  yourForm: FormGroup;
  keyfocus:any;
  dataSource1:any;
  userdata: any;
  Department:any;
  Entity:any;
  location:any;
  businessdunctionid:any;
  EntityID: any;
  unitid:any;
  Selectedunit:any;
  department:any;
  selecteddepartment:any;
  selectedbus:any;
  depid:any;
  businessprocess:any;
  business:any;
  SelecteduserName:number[] = [];
  selectedOption2:any[]=[];
  selectedOption1:any[]=[];
  UserDatasource:any;
  UserDatasourceSecondDropdown:any
  isUserBoxOpened:boolean=false;
  usergridColumns: any = ['firstname'];
  isUserBoxOpened1:boolean=false;
  start:any = 1;

  end:any =  999999999999999;

  format = (value: unknown) => `${value}`;
   

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
  }  gridBox_displayExpr(usR_ID: any ) {

    return usR_ID && `${usR_ID.firstname} `;
    }

    gridBox_displayExprExemptionUser(usR_ID:any) {
  
      return usR_ID && `${usR_ID.firstname} `;
      }
    ngOnInit(): void {
      this.keyfocus = this.fb.group({
        losseventname:['',Validators.required, Validators.maxLength(150)],
        losseventdescription:[],
        department:['',Validators.required],
        entity:['',Validators.required],
        location:['',Validators.required],
        businessid:['',Validators.required],
        startValue:['',Validators.required],
        endValues:['',Validators.required],
        MapUserList:['',Validators.required],
        exemptionUser:['',Validators.required],
      });
      let user: any = this.session.getUser();
      // console.log(user)
           this.userdata = JSON.parse(user); //userdata.profile.userid
         //  alert(JSON.stringify(this.userdata))
           console.log("userid", this.userdata.profile.userid);
           this.isUserBoxOpened1=false;
           
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

          this.UserDatasource={ 
            store: new CustomStore({
            key: 'usR_ID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/userDetails/GetuserDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
          
                }, (err) => {
                  reject(err);
                });
          });
          },
          }),
          };

          this.dataSource1 = new CustomStore({
            key: 'losseventtrackerid',
          
            load: () => this.sendRequest1(URL + '/losseventtracker/GetlosseventtrackerDetails'),
          
            remove: (key) => this.sendRequest1(URL + '/losseventtracker/Deletelosseventtracker', 'DELETE', {
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
        onUserSelectionChange(event: any): void {
          const selectedUserIds = event.value || []; // Extract selected user IDs
      
          // Log the selectedUserIds to check its structure
          console.log("Selected User IDs:", selectedUserIds);
      
          // Ensure selectedUserIds is an array of IDs
          if (Array.isArray(selectedUserIds) && selectedUserIds.length > 0) {
              // Use selectedUserIds directly, no need to map
              this.getNotSelectedUsers(selectedUserIds);
          } else {
              // Reset the second dropdown to include all users if nothing is selected in the first dropdown
         
          }
      }
      
      
      // Function to filter out selected users from the second dropdown
      getNotSelectedUsers(selectedUserIds: number[]): void {
        // Load all users and filter out the ones that are selected in the first dropdown
        this.UserDatasource.store.load().then((data: any[]) => {
            const filteredData = data.filter(user => !selectedUserIds.includes(user.usR_ID));
            this.UserDatasourceSecondDropdown = filteredData; // Update the second dropdown's datasource
            console.log("Filtered users for the second dropdown: ", this.UserDatasourceSecondDropdown);
        });
    }
      // Event handler for when the selection changes in the second dropdown
      selectedlisttoremove(e: any): void {
        if (!e || !e.value) return; // Handle case where no value is selected
    
        const selectedIds = e.value.map((item: any) => item.usR_ID).filter((id: any) => id); // Extract IDs from selection
        if (selectedIds.length === 0) return;
    
        this.selectedOption2 = selectedIds;
        this.ref.detectChanges(); // Trigger change detection manually if needed
    }
        showInvalidFieldsAlert() {
          let invalidFields = '';
          if (this.keyfocus.controls['losseventname'].invalid) {
            invalidFields += '-  Enter loss event name\n';
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
          if (this.keyfocus.controls['startValue'].invalid) {
            invalidFields += '- Enter Start Value\n';
          }
          if (this.keyfocus.controls['endValues'].invalid) {
            invalidFields += '- Enter End Values\n';
          }
          if (this.keyfocus.controls['MapUserList'].invalid) {
            invalidFields += '-  Map Reporting User(s)\n';
          }
          if (this.keyfocus.controls['exemptionUser'].invalid) {
            invalidFields += '- Map Additional User(s)\n';
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
          //console.log( this.keyfocus.value.MapUserList)
          //const MapUserId: number[] = this.keyfocus.value.MapUserList?.map((user: any) => user.usR_ID) || [];
        
          if (this.keyfocus.invalid) {
            this.showInvalidFieldsAlert();
            return;
            
          }
        
          const payload = {
            losseventname:value.losseventname,
            losseventdescription:value.losseventdescription,
            departmentid: value.department,
            entityid:value.entity,
            unitlocationid:value.location,
            riskBusinessfunctionid:value.businessid, 
            startValue: value.startValue,
            endValues:value.endValues,
            reportingusers:value.MapUserList.toString(),
            additionalusers:value.exemptionUser.toString(),
           createdby:this.userdata.profile.userid
      
          };
          alert(JSON.stringify(payload))
          console.log('payload', payload);
          let encryptedPayload = {
            requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
          };
          console.log('encryptedPayload', encryptedPayload);
       
          this.http.post(URL + '/losseventtracker/InsertlosseventtrackerDetails', encryptedPayload)
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

            if (error.status === 409) { // Conflict: Duplicate record exists
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: "Record already exists with the same combination of entity, unit location, department, loss event name ,startvalue,end value , Loss Event Description" },
              });
          } else if (error.status === 400) { // Bad Request: Validation error or other client-side issue
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: error.error || "Invalid input data. Please check your entries and try again." },
              });
          } else if (error.status === 500) { // Internal Server Error
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: "Server error. Please try again later." },
              });
          } else { // Generic error handling for other status codes
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: "An error occurred while processing your request. Please try again." },
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
    worksheet.addRow(['Loss Event Tracker ']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "lossevent.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text("Loss event Tracker", 80,10); // Adjust the position as needed
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('losseventtracker .pdf');
    });
  }
}
}