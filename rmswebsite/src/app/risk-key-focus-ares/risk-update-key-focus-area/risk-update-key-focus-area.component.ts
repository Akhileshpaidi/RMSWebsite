import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Updatekeyfocus} from 'src/app/inspectionservices.service';
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
import { lastValueFrom } from 'rxjs';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-update-key-focus-area',
  templateUrl: './risk-update-key-focus-area.component.html',
  styleUrls: ['./risk-update-key-focus-area.component.scss']
})
export class RiskUpdateKeyFocusAreaComponent {
  yourForm: FormGroup;
  keyfocus:any;
  keyfocusdata:any;
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
  gridColumns1: any = [{dataField:'keyfousname',caption:'Key Focus Name'},
    {dataField:'BusinessProcessName',caption:'Business Process name'},
    {dataField:'riskbusinessname',caption:'Business Name'},
    {dataField:'entity_Master_Name',caption:'Entity Name'},
    {dataField:'unit_location_Master_name',caption:'Unit Location Name'},
    {dataField:'department_Master_name',caption:'Department Name'}];
    unitlocation:any;
    departmentlocationinfo:Updatekeyfocus=new Updatekeyfocus();
  selectedValue:any;
  bpmaturity: any;

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

        this.keyfocusdata={
          store: new CustomStore({
            key: 'keyfocusareaid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/KeyFocusArea/GetKeyFocusAreaDetails', {headers})
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

      this.http.get(URL+'/KeyFocusArea/GetKeyFocusAreaDetailsbyid/'+data).subscribe((data:any)=>{
        if (Array.isArray(data) && data.length > 0) {
         
          const PubList:any = data[0]; 
       
          console.log(PubList)
        this.keyfocus.controls['keyfousname'].setValue(PubList.keyfousname);
        this.keyfocus.controls['keyfousdescription'].setValue(PubList.keyfousdescription);
        this.keyfocus.controls['entity'].setValue(PubList.entityid);
        this.keyfocus.controls['location'].setValue(parseInt(PubList.unitlocationid));
        this.keyfocus.controls['businessid'].setValue(PubList.riskBusinessfunctionid);  
        this.keyfocus.controls['businessProcessid'].setValue(parseInt(PubList.businessprocessID));  
        this.keyfocus.controls['department'].setValue(PubList.departmentid);
        this.keyfocus.controls['bpmaturity'].setValue(PubList.bpmaturity);

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
  if (this.keyfocus.controls['keyfousname'].invalid) {
    invalidFields += '-  Enter Key Focus Name\n';
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

SubmitUpdateForm(data: any = {}) {
 
  this.keyfocus.updateValueAndValidity();


  this.http.get(URL + '/KeyFocusArea/GetKeyFocusAreaDetailsbyid/' + this.selectedValue).subscribe((response: any) => {
    console.log('API Response:', response);
  alert ( JSON.stringify(response) )
      const keyfocusareaid =   response[0].keyfocusareaid;

      this.updateFormParameters((parseInt(keyfocusareaid)));

      const updateData = {
        RIskKeyfocusAreaModels: this.departmentlocationinfo,
      };

      console.log('Update Data:', updateData);
 alert(JSON.stringify(updateData))
      let encryptedPayload = {
        requestdata: this.encrypt.encryptionAES(JSON.stringify(updateData)),
      };
      console.log('encryptedPayload', encryptedPayload);

      this.http.put(URL + '/KeyFocusArea/UpdateKeyFocusAreaDetails', encryptedPayload, { headers }).subscribe({
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


updateFormParameters(keyfocusareaid: number) {

this.departmentlocationinfo.keyfocusareaid = keyfocusareaid;
this.departmentlocationinfo.keyfousname = this.keyfocus.value.keyfousname;
this.departmentlocationinfo.keyfousdescription = this.keyfocus.value.keyfousdescription;
this.departmentlocationinfo.entityid = this.keyfocus.value.entity;
this.departmentlocationinfo.departmentid= this.keyfocus.value.department;
this.departmentlocationinfo.unitlocationid = this.keyfocus.value.location;
this.departmentlocationinfo.riskBusinessfunctionid = this .keyfocus.value.businessid;
this.departmentlocationinfo.businessprocessID = this.keyfocus.value.businessProcessid.toString();
this.departmentlocationinfo.bpmaturity = this.keyfocus.value.bpmaturity;
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
