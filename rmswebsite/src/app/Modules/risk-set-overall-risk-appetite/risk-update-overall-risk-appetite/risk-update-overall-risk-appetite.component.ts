import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UpdateoverallriskAppetite} from 'src/app/inspectionservices.service';
import { FormBuilder, FormControl, FormGroup,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Validators } from '@angular/forms';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import CustomStore from 'devextreme/data/custom_store';
import { MatSliderChange } from '@angular/material/slider';
import { lastValueFrom } from 'rxjs';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-update-overall-risk-appetite',
  templateUrl: './risk-update-overall-risk-appetite.component.html',
  styleUrls: ['./risk-update-overall-risk-appetite.component.scss']
})
export class RiskUpdateOverallRiskAppetiteComponent {
  yourForm: FormGroup;
  keyfocus:any;
  riskappetite:any;
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
  selectedOption1:any;
  business:any;
  isGridBoxOpened:boolean;
  selectedIDs: any;
  start:any = 1;
  Appetite:any;
  format = (value: number | Date): string => `${value}%`;
  gridColumns1: any = [{dataField:'riskAppetitename',caption:'Risk Appetite Name',width: 100 },
    {dataField:'trolerancecoparison',caption:'Trolerance Name',width: 100 },
    {dataField:'entity_Master_Name',caption:'Entity Name',width: 100 },
    {dataField:'unit_location_Master_name',caption:'Unit Location Name',width: 100 },
    {dataField:'department_Master_name',caption:'Department Name',width: 100 },
    {dataField:'riskbusinessname',caption:'Business Function Name',width: 100 },
    {dataField:'BusinessProcessName',caption:'Business Process name',width: 100 },
    {dataField:'trigervalue',caption:'Tringer Value',width: 100 }];
    unitlocation:any;
    departmentlocationinfo:UpdateoverallriskAppetite=new UpdateoverallriskAppetite();
  selectedValue:any;
//  gridColumns: any = ['unit_location_Master_name'];
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
    this.isGridBoxOpened = false;
    this.yourForm = this.fb.group({
  
    });
  }
  ngOnInit(): void {
    this.keyfocus = this.fb.group({
      RiskAppetitename:['',Validators.required],
      trolerancecoparison:['',Validators.required],
      department:['',Validators.required],
      entity:['',Validators.required],
      location:['',Validators.required],
      businessid:['',Validators.required],
      businessProcessid:['',Validators.required],
      startValue:['',Validators.required],
      Acceptance:['',Validators.required]

     
    
    });
    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);

         this.Appetite ={
          store: new CustomStore({
            key: 'risk_admin_asscontracptCritid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/risk_asses_contr_accep_crit/Getrisk_admin_asscontracptcrit', {headers})
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

        this.riskappetite={
          store: new CustomStore({
            key: 'overallriskappititeid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/Riskoverallappitite/GetRiskoverallappititeDetails', {headers})
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
minValue: number = 1;
maxValue: number = 100;
currentValue: number = 1;



onSliderInput(event: MatSliderChange) {
  this.currentValue = event.value as number;
}

onSliderChange(event: MatSliderChange) {
  this.currentValue = event.value as number;
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
getUpdateFormData(event:any){

  console.log("selected Type id: ", event.value);
  this.isGridBoxOpened = false;
  const data:any=event.value;

  this.selectedValue=event.value; 

      this.http.get(URL+'/Riskoverallappitite/GetRiskoverallappititeDetailsid/'+data).subscribe((data:any)=>{
        if (Array.isArray(data) && data.length > 0) {
         
          const PubList:any = data[0]; 
       
          console.log(PubList)
        this.keyfocus.controls['RiskAppetitename'].setValue(PubList.riskAppetitename);
        this.keyfocus.controls['trolerancecoparison'].setValue(PubList.trolerancecoparison);
        this.keyfocus.controls['entity'].setValue(PubList.entityid);
        this.keyfocus.controls['location'].setValue(parseInt(PubList.unitlocationid));
        this.keyfocus.controls['businessid'].setValue(PubList.riskBusinessfunctionid);  
        this.keyfocus.controls['businessProcessid'].setValue(parseInt(PubList.businessprocessID));  
        this.keyfocus.controls['department'].setValue(PubList.departmentid);
        this.keyfocus.controls['startValue'].setValue(PubList.trigervalue);
        this.keyfocus.controls['Acceptance'].setValue(PubList.acceptanceid)
        this.selectedIDs = PubList.unitlocationid;

        // Fetch unitlocationid based on entity selection
        this.fetchUnitLocationId(PubList.entityid);
        this.ref.detectChanges();
      
    } else {
      // Data is either not an array or it's empty
      // Handle this case as needed
    }

      })
    }    
    fetchUnitLocationId(EntityID: any) {
      console.log("Entity ID before calling makeAsyncDataSource:", EntityID); // Check the value here
      this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails/' + EntityID).subscribe((unitLocationData: any) => {
        if (Array.isArray(unitLocationData) && unitLocationData.length > 0) {
          const unitlocationid = unitLocationData[0].unitlocationid;
          console.log("Entity ID before calling makeAsyncDataSource:", EntityID); // Check the value again
          // Call makeAsyncDataSource with unitlocationid and EntityID
          this.unitlocation = this.makeAsyncDataSource(unitlocationid, EntityID);
        } else {
          console.error("No unit location data found for EntityID:", EntityID);
          // Handle case where no unitlocationid is found for the entity
        }
      }, error => {
        console.error("Error fetching unit location data:", error);
        // Handle error
      });
    }
    
    makeAsyncDataSource(unitlocationid: any, EntityID: any) {
      console.log("Entity ID in makeAsyncDataSource:", EntityID); // Check the value here
      return new CustomStore({
        loadMode: 'raw',
        key: 'unit_location_Master_id',
        load: () => {
          const url = `${URL}/UnitLocationMaster/GetUnitLocationDetails/${EntityID}`;
          return lastValueFrom(this.http.get(url, { headers }));
        },
      });
    }
    showInvalidFieldsAlert() {
      let invalidFields = '';
      if (this.keyfocus.controls['RiskAppetitename'].invalid) {
        invalidFields += '-  Enter RiskAppetitename\n';
      }
      if (this.keyfocus.controls['trolerancecoparison'].invalid) {
        invalidFields += '-  Enter Objective of Overall Risk Tolerance comparison \n';
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
      if (this.keyfocus.controls['startValue'].invalid) {
        invalidFields += '- Enter Triger value\n';
      }
      if (this.keyfocus.controls['Acceptance'].invalid) {
        invalidFields += '- Enter Risk Appetite to track \n';
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

SubmitUpdateForm(data: any = {}) {
 
  this.keyfocus.updateValueAndValidity();


  this.http.get(URL + '/Riskoverallappitite/GetRiskoverallappititeDetailsid/' + this.selectedValue).subscribe((response: any) => {
    console.log('API Response:', response);
  alert ( JSON.stringify(response) )
      const overallriskappititeid =   response[0].overallriskappititeid;

      this.updateFormParameters((parseInt(overallriskappititeid)));

      const updateData = {
        riskoverallappititeModels: this.departmentlocationinfo,
      };

      console.log('Update Data:', updateData);
 alert(JSON.stringify(updateData))
      let encryptedPayload = {
        requestdata: this.encrypt.encryptionAES(JSON.stringify(updateData)),
      };
      console.log('encryptedPayload', encryptedPayload);

      this.http.put(URL + '/Riskoverallappitite/UpdateRiskoverallappititeDetails', encryptedPayload, { headers }).subscribe({
          next: () => {
              console.log('Data Updated Successfully');
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: "Data Updated Successfully" },
              });
              this.reloadComponent();
           
          },
          error: (error: any) => {
              console.log('Error updating status:', error.error);
              console.error('Error status:', error);
              let errorMessage = "Record already exists with the same combination of entity, unit location, and department.";
              this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: JSON.stringify( error.error )},
              });
              this.reloadComponent();
           
          }
      });
  }, (error: any) => {
      console.error('Error fetching user_workgroup_mapping_id', error);
  });
}


updateFormParameters(overallriskappititeid: number) {

this.departmentlocationinfo.overallriskappititeid = overallriskappititeid;
this.departmentlocationinfo.RiskAppetitename = this.keyfocus.value.RiskAppetitename;
this.departmentlocationinfo.trolerancecoparison = this.keyfocus.value.trolerancecoparison;
this.departmentlocationinfo.entityid = this.keyfocus.value.entity;
this.departmentlocationinfo.departmentid= this.keyfocus.value.department;
this.departmentlocationinfo.unitlocationid = this.keyfocus.value.location;
this.departmentlocationinfo.riskBusinessfunctionid = this .keyfocus.value.businessid;
this.departmentlocationinfo.businessprocessID = this.keyfocus.value.businessProcessid.toString();
this.departmentlocationinfo.trigervalue = this.keyfocus.value.startValue;
this.departmentlocationinfo.acceptanceid = this.keyfocus.Acceptance;
this.departmentlocationinfo.createdby = this.userdata.profile.userid;

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
