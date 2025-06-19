import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Updatecompliancemaping} from 'src/app/inspectionservices.service';
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
  selector: 'app-update-location-complaint-mapping',
  templateUrl: './update-location-complaint-mapping.component.html',
  styleUrls: ['./update-location-complaint-mapping.component.scss']
})
export class UpdateLocationComplaintMappingComponent implements OnInit {
  yourForm: FormGroup;
  isGridBoxOpened:boolean;
  compliancelocation: any;
  compliancelocationmap:any;
  userdata: any;
  department:any
  selectedValue: any;
  selectedOption1:any;
  selectedIDs: any;
  selectedOption3: any[] = [];
//   gridColumns3: any[] = [
//     { dataField: 'department_Master_name', caption: 'Department' },
//     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
//      { dataField: 'entity_Master_Name', caption: 'Entity' },
    
// ];
compliancedepartmentinfo:Updatecompliancemaping=new Updatecompliancemaping();

gridColumns1: any = [
  {dataField:'company_compliance_id',caption:'Company Compliance ID'},
  {dataField: 'compliance_name', caption:'Compliance Name' },
  {dataField :'actregulatoryname', caption:'Act Name'},
  {dataField :'act_rule_name', caption:'Rule Name'},
  {dataField: 'department_Master_name', caption: 'Department' },
  {dataField: 'unit_location_Master_name', caption: 'Unit Location' },
  {dataField: 'entity_Master_Name', caption: 'Entity' },
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
    private cdr: ChangeDetectorRef
    //private service:ExitNav,
  ) {
    this.isGridBoxOpened = false;
    this.yourForm = this.fb.group({
  
    });
  
  }
  ngOnInit(): void {
    this.compliancelocationmap = this.fb.group({
    
      department:['',Validators.required],
     // compliance:['',Validators.required]
     
    
    });
    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);

     this.department={ 
          store: new CustomStore({
          key: 'locationdepartmentmappingid',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/locationdepartmentmapping/GetlocationdepartmentmappingDetailsbyid/'+this.userdata.profile.userid, {headers})
              .subscribe(res => {
               (resolve(res));
        
              }, (err) => {
                reject(err);
              });
        });
        },
        }),
        };
        this.compliancelocation={ 
          store: new CustomStore({
          key: 'compliance_location_Mapping_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/compliancelocation/Getcompliancelocation', {headers})
              .subscribe(res => {
               (resolve(res));
//alert(JSON.stringify(res))            
  }, (err) => {
                reject(err);
              });
        });
        },
        }),
        };
}

gridBox_displayExpr(item: any) {
  //return item && `${item.question} <${item.subject_Name}`;
  return item.compliance_name;
 }
getUpdateFormData(event:any){

  console.log("selected Type id: ", event.value);
  this.isGridBoxOpened = false;
  const data:any=event.value;

      this.selectedValue=event.value; 

      this.http.get(URL+'/compliancedepartmentmapping/GetcompliancedepartmentmappingDetailsbyid/'+data).subscribe((data:any)=>{
        if (Array.isArray(data) && data.length > 0) {
         
          const PubList = data[0]; 
         ///alert(JSON.stringify(PubList));
          console.log(PubList)
       
          this.compliancelocationmap.controls['department'].setValue(PubList.locationdepartmentmappingid);
          this.selectedIDs = PubList.locationdepartmentmappingid;
          this.ref.detectChanges();
        // this.Departmentlocation.controls['department'].setValue(PubList.locationdepartmentmappingid);
        

        // this.selectedIDs = PubList.locationdepartmentmappingid;

        // // Fetch unitlocationid based on entity selection
        // this.fetchUnitLocationId(PubList.entityid);
        // this.ref.detectChanges();
      
    } else {
      // Data is either not an array or it's empty
      // Handle this case as needed
    }

      })
    } 

    SubmitUpdateForm() {
    //  alert('bharath')
      this.compliancelocationmap.updateValueAndValidity();

     


  this.http.get(URL + '/compliancedepartmentmapping/GetcompliancedepartmentmappingDetailsbyid/' + this.selectedValue).subscribe((response: any) => {
      console.log('API Response:', response); 
    
      const companycomplianceid = response[0].companycomplianceid;
     const compliance_location_Mapping_id = response[0].compliance_location_Mapping_id;
     const companycompliancemappingid = response[0].companycompliancemappingid;
      alert(companycomplianceid)
      this.updateFormParameters(compliance_location_Mapping_id,companycomplianceid,companycompliancemappingid);

      const updateData = {
        compliancelocationmappingmodels: this.compliancedepartmentinfo,
      };

      console.log('Update Data:', updateData);
    
      this.http.put(URL + '/locationcompliancemapping/UpdatelocationcompliancemappingDetails',updateData, { headers }).subscribe({
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
    updateFormParameters(compliance_location_Mapping_id: number,companycomplianceid:string,companycompliancemappingid:string) {
     
      this.compliancedepartmentinfo.compliance_location_Mapping_id = compliance_location_Mapping_id;
      this.compliancedepartmentinfo.companycomplianceid = companycomplianceid.toString();
      this.compliancedepartmentinfo.companycompliancemappingid =companycompliancemappingid.toString();
      this.compliancedepartmentinfo.locationdepartmentmappingid =  this.compliancelocationmap.value.department.toString();
      
     this.compliancedepartmentinfo.createdby = this.userdata.profile.userid;
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
