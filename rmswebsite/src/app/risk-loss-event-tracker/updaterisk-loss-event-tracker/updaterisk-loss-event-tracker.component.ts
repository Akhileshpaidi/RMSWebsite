import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Updatelossevent} from 'src/app/inspectionservices.service';
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
  selector: 'app-updaterisk-loss-event-tracker',
  templateUrl: './updaterisk-loss-event-tracker.component.html',
  styleUrls: ['./updaterisk-loss-event-tracker.component.scss']
})
export class UpdateriskLossEventTrackerComponent {
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
  selectedOption:any;
  UserDatasourceSecondDropdown:any
  isUserBoxOpened:boolean=false;
  isGridBoxOpened:boolean;
  losseventdata:any;
  usergridColumns: any = ['firstname'];
  gridColumns1: any = [{dataField:'losseventname',caption:'Loss Event Name'},
    {dataField:'riskbusinessname',caption:'Business Function Name'},
    {dataField:'entity_Master_Name',caption:'Entity Name'},
    {dataField:'unit_location_Master_name',caption:'Unit Location Name'},
    {dataField:'department_Master_name',caption:'Department Name'}];
    unitlocation:any;
    departmentlocationinfo:Updatelossevent=new Updatelossevent();
  selectedValue:any;
  isUserBoxOpened1:boolean=false;
  start:any = 1;
  selectedIDs: any;
  end:any =  999999999999999;
  format = (value: unknown) => `${value}`;
  entityid:any;
 

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
  }  gridBox_displayExpr(usR_ID: any ) {

    return usR_ID && `${usR_ID.firstname} `;
    }

    gridBox_displayExprExemptionUser(usR_ID:any) {
  
      return usR_ID && `${usR_ID.firstname} `;
      }
    ngOnInit(): void {
      this.keyfocus = this.fb.group({
        losseventname:['',Validators.required, Validators.maxLength(150)],
        description:[],
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

          this.losseventdata={
            store: new CustomStore({
              key: 'losseventtrackerid',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/losseventtracker/GetlosseventtrackerDetails', {headers})
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
          this.selectedOption1 = selectedUserIds; // Sync selection to the form control
          this.keyfocus.controls['MapUserList'].setValue(selectedUserIds);
          this.ref.detectChanges(); // Force change detection if needed
      }
      
      
      // Function to filter out selected users from the second dropdown
      getNotSelectedUsers(selectedUserIds: number[]): void {
        // Load all users and filter out the ones that are selected in the first dropdown
        this.UserDatasource.store.load().then((data: any[]) => {
            const filteredData = data.filter(user => !selectedUserIds.includes(user.usR_ID));
            this.UserDatasourceSecondDropdown = filteredData; // Update the second dropdown's datasource
            console.log("Filtered users for the second dropdown: ", this.UserDatasourceSecondDropdown);
            
            this.keyfocus.controls['exemptionUser'].setValue(filteredData.map(user => user.usR_ID));
    
            this.ref.detectChanges();
            
        });
    }
      // Event handler for when the selection changes in the second dropdown
      selectedlisttoremove(e: any): void {
        if (!e || !e.value) return; // Handle case where no value is selected
    
        const selectedIds = e.value.map((item: any) => item.usR_ID).filter((id: any) => id); // Extract IDs from selection
        if (selectedIds.length === 0) return;
    
        this.selectedOption2 = selectedIds;
        this.ref.detectChanges();

        // For GET bind
       this.selectedOption2 = selectedIds;
  this.keyfocus.controls['exemptionUser'].setValue(selectedIds);
       
        this.ref.detectChanges(); // Trigger change detection manually if needed
    }

    // get loss details 
    getUpdateFormData(event:any){

      console.log("selected Type id: ", event.value);
      this.isGridBoxOpened = false;
      const data:any=event.value;
    
      this.selectedValue=event.value; 
    
          this.http.get(URL+'/losseventtracker/GetlosseventtrackerDetailsnyid/'+data).subscribe((data:any)=>{
         //   alert(data.length);
         //   alert(data[0].entityid);
            if (Array.isArray(data) && data.length > 0) {
             
              const PubList:any = data[0]; 
       //    alert(JSON.stringify(PubList))
              console.log(PubList)
            //  alert(JSON.stringify( PubList.reportingusers))
              alert(JSON.stringify(PubList.additionalusers))
              const additionalUsersArray = PubList.additionalusers ? PubList.additionalusers.split(',').map(Number) : [];
              this.keyfocus.controls['entity'].setValue(PubList.entityid);
              this.keyfocus.controls['location'].setValue(PubList.unitlocationid);
              this.keyfocus.controls['department'].setValue(PubList.departmentid);
              this.keyfocus.controls['description'].setValue(PubList.desc);
              this.keyfocus.controls['businessid'].setValue(PubList.riskBusinessfunctionid);

              const reportingUsersArray = PubList.reportingusers ? PubList.reportingusers.split(',').map(Number) : [];
           
        
              this.UserDatasource.store.load().then((users: any[]) => {
                // Filter out the users based on IDs
                const reportingUsers = users.filter(user => reportingUsersArray.includes(user.usR_ID));
                const additionalUsers = users.filter(user => additionalUsersArray.includes(user.usR_ID));
                
        
                // Update the form controls to contain the objects, not just the IDs
                this.keyfocus.controls['MapUserList'].setValue(reportingUsers.map(user => user.usR_ID));
                this.keyfocus.controls['exemptionUser'].setValue(additionalUsers.map(user => user.usR_ID));
        
                // Set the selected row keys for both data grids
                this.selectedOption1 = reportingUsers.map(user => user.usR_ID);
                this.selectedOption2 = additionalUsers.map(user => user.usR_ID);
        
                // Trigger change detection
                this.ref.detectChanges();
            });

            this.keyfocus.controls['startValue'].setValue(PubList.startValue);
            this.keyfocus.controls['endValues'].setValue(PubList.endValues);
            this.keyfocus.controls['losseventname'].setValue(PubList.losseventname);
           
                 // Handle the mapuser and addmapuser as comma-separated values
      

              // Trigger change detection
              this.ref.detectChanges();
    
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

        
SubmitUpdateForm(data: any = {}) {
 
  this.keyfocus.updateValueAndValidity();


  this.http.get(URL + '/losseventtracker/GetlosseventtrackerDetailsnyid/' + this.selectedValue).subscribe((response: any) => {
    console.log('API Response:', response);
  alert ( JSON.stringify(response) )
      const losseventtrackerid =   response[0].losseventtrackerid;

      this.updateFormParameters((parseInt(losseventtrackerid)));

      const updateData = {
        risklosseventtrackermodels: this.departmentlocationinfo,
      };

      console.log('Update Data:', updateData);
 alert(JSON.stringify(updateData))
      let encryptedPayload = {
        requestdata: this.encrypt.encryptionAES(JSON.stringify(updateData)),
      };
      console.log('encryptedPayload', encryptedPayload);

      this.http.put(URL + '/losseventtracker/UpdatelosseventtrackerDetails', encryptedPayload, { headers }).subscribe({
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


updateFormParameters(losseventtrackerid: number) {

this.departmentlocationinfo.losseventtrackerid = losseventtrackerid;
this.departmentlocationinfo.losseventname = this.keyfocus.value.losseventname;
this.departmentlocationinfo.losseventdescription = this.keyfocus.value.description;
this.departmentlocationinfo.entityid = this.keyfocus.value.entity;
this.departmentlocationinfo.departmentid= this.keyfocus.value.department;
this.departmentlocationinfo.unitlocationid = this.keyfocus.value.location;
this.departmentlocationinfo.riskBusinessfunctionid = this .keyfocus.value.businessid;
this.departmentlocationinfo.reportingusers = this.keyfocus.value.MapUserList.toString();
this.departmentlocationinfo.additionalusers = this.keyfocus.value.exemptionUser.toString();
this.departmentlocationinfo.startValue = this.keyfocus.value.startValue;
this.departmentlocationinfo.endValues = this.keyfocus.value.endValues;
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
