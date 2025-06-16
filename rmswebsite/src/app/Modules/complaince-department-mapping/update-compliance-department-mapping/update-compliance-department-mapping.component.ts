import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Updatedepartmentmaping} from 'src/app/inspectionservices.service';
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
  selector: 'app-update-compliance-department-mapping',
  templateUrl: './update-compliance-department-mapping.component.html',
  styleUrls: ['./update-compliance-department-mapping.component.scss']
})
export class UpdateComplianceDepartmentMappingComponent {
  yourForm: FormGroup;
  EntityID: any;
  Selectedunit:any;
  userdata:any;
  Department:any;
  Entity:any;
  location:any;
  selectedOption:any;
  selectedOption1:any;
  Departmentlocation:any;
  departmentlocationinfo:Updatedepartmentmaping=new Updatedepartmentmaping();
  selectedValue:any;
  gridColumns: any = ['unit_location_Master_name'];
  gridColumns1: any = ['department_Master_name','entity_Master_Name','unit_location_Master_name'];
  isGridBoxOpened: boolean;
  selectedIDs: any;
  unitlocation:any;
  isGridBoxOpened1:boolean;

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
    this.isGridBoxOpened1 = false;
    this.isGridBoxOpened = false;
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

     this.Department={ 
          store: new CustomStore({
          key: 'department_Master_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/locationdepartmentmapping/GetlocationdepartDetails/' + this.userdata.profile.userid, {headers})
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
getUpdateFormData(event:any){

  console.log("selected Type id: ", event.value);
  this.isGridBoxOpened = false;
  const data:any=event.value;

      this.selectedValue=event.value; 

      this.http.get(URL+'/locationdepartmentmapping/GetdepartmentmappingDetailsbyid/'+data).subscribe((data:any)=>{
        if (Array.isArray(data) && data.length > 0) {
         
          const PubList = data[0]; 
         // alert(JSON.stringify(PubList));
          console.log(PubList)
       
        this.Departmentlocation.controls['entity'].setValue(PubList.entityid);
      
        this.Departmentlocation.controls['location'].setValue(parseInt(PubList.unitlocationid));
       // this.Departmentlocation.controls['location'].setValue(PubList.unitlocationid);
        

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
    
    
  
SubmitUpdateForm(data: any = {}) {
 
  this.Departmentlocation.updateValueAndValidity();


  this.http.get(URL + '/locationdepartmentmapping/GetdepartmentmappingDetailsbyid/' + this.selectedValue).subscribe((response: any) => {
      console.log('API Response:', response); 
      const locationdepartmentmappingid =   response[0].locationdepartmentmappingid;
      const departmentid = response[0].departmentid;

     // alert(locationdepartmentmappingid+''+departmentid)
      this.updateFormParameters((parseInt(locationdepartmentmappingid)),departmentid);

      const updateData = {
        Departmentlocationmappingmodels: this.departmentlocationinfo,
      };

      console.log('Update Data:', updateData);
      this.http.put(URL + '/locationdepartmentmapping/UpdatelocationdepartmentmappingDetails', updateData, { headers }).subscribe({
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


updateFormParameters(locationdepartmentmappingid: number,departmentid:string) {

this.departmentlocationinfo.locationdepartmentmappingid = locationdepartmentmappingid;
this.departmentlocationinfo.entityid = this.Departmentlocation.value.entity;
this.departmentlocationinfo.departmentid=departmentid;
this.departmentlocationinfo.unitlocationid = this.Departmentlocation.value.location.join(',');
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
