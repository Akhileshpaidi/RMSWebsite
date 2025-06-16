import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Updateactivityworkgroup} from 'src/app/inspectionservices.service';
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
  selector: 'app-update-activity-workgroup',
  templateUrl: './update-activity-workgroup.component.html',
  styleUrls: ['./update-activity-workgroup.component.scss']
})
export class UpdateActivityWorkgroupComponent {
  yourform: FormGroup;
  UpdateForm:any;
  selectedOption:any;
  activity:any;
  department:any;
  userdata:any;
  selectedOption3:any;
  activityworkgroupinfo:Updateactivityworkgroup=new Updateactivityworkgroup();
  selectedValue:any;
  isGridBoxOpened1:boolean
  isGridBoxOpened:boolean
  gridColumns:any[]=[
  { dataField: 'name_ActivityWorkgroup', caption: 'Name of Activity' },
  { dataField: 'unigueActivityid', caption: 'Activity ID' },
  { dataField: 'entity_Master_Name', caption: ' Entity Name ' },
  { dataField: 'unit_location_Master_name', caption: 'Unit Location Name' },
  { dataField: 'department_Master_name', caption: 'Department Name' },
  { dataField: 'rolE_NAME', caption: 'Role Name' },
  
   ]
  gridColumns3: any[] = [
    { dataField: 'department_Master_name', caption: 'Department' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
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
) {
  this.isGridBoxOpened1=false;
  this.isGridBoxOpened =false;
  this.yourform = this.fb.group({

  });}

  ngOnInit(): void {


    this.UpdateForm=this.fb.group({
      nameactivity:['',Validators.required],
      Activitydesc:[''],
      department:['',Validators.required],
      roles: [''] 
    });
    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);

         this.department={
          paginate: true,
          store: new CustomStore({
            key: 'locationdepartmentmappingid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/departmentlocationmapping/GetdepartmentmappingDetails/' + this.userdata.profile.userid, {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
          
        };

        this.activity={
          paginate: true,
          store: new CustomStore({
            key: 'activity_Workgroup_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/ActivityWorkgroup/GetActivitybyid/'+this.userdata.profile.userid, {headers})
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
  
        this.http.get(URL+'/ActivityWorkgroup/GetActivityWorkgroupbyid/'+data).subscribe((data:any)=>{
          if (Array.isArray(data) && data.length > 0) {
           
            const PubList = data[0]; 
           // alert(JSON.stringify(PubList));
            console.log(PubList)
         
          this.UpdateForm.controls['nameactivity'].setValue(PubList.name_ActivityWorkgroup);
        
          this.UpdateForm.controls['Activitydesc'].setValue(PubList.desc_ActivityWorkgroup);
   
          console.log("locationdepartmentmappingid before passing:", PubList.locationdepartmentmappingid);

          this.UpdateForm.controls['department'].setValue(PubList.locationdepartmentmappingid);
          this.ref.detectChanges();
          this.UpdateForm.controls['roles'].setValue(PubList.rolE_NAME);
        } else {
          // Data is either not an array or it's empty
          // Handle this case as needed
        }
    
          })
        }  
        

        SubmitUpdateForm(data: any = {}) {
          // Trigger validation and update form validity
          this.UpdateForm.updateValueAndValidity();
      
          // Log the data being sent to the server
          console.log('Data being sent:', this.activityworkgroupinfo);
      
          // Make HTTP request to get the user_workgroup_mapping_id
          this.http.get(URL + '/ActivityWorkgroup/GetActivityWorkgroupbyid/' + this.selectedValue)
            .subscribe((response: any) => {
              console.log('API Response:', response); // Log the response data
      
              // Extract user_workgroup_mapping_id from the response
              const activity_Workgroup_id = response[0].activity_Workgroup_id;
              const roles = response[0].roles;
              const unigueActivityid =response[0].unigueActivityid
      
              // Update form parameters based on retrieved user_workgroup_mapping_id
              this.updateFormParameters((parseInt(activity_Workgroup_id)),roles,unigueActivityid);
      
              // Make the HTTP PUT request to update the data
              alert(this.activityworkgroupinfo)
              this.http.put(URL + '/ActivityWorkgroup/UpdateActivityWorkgroupDetails', this.activityworkgroupinfo, { headers })
                .subscribe({
                  next: () => {
                    console.log('Data Updated Successfully');
                    this.dialog.open(DaidailogeComponent, {
                      width: '550px',
                      data: { message: "Data Updated Successfully" },
                    });
                    this.reloadComponent();
                  },
                  error: (error: any) => {
                    console.error('Error updating status:', error);
                    let errorMessage = "Record already exists with the same combination of nameof Activity, department, and department.";
                    this.dialog.open(DaidailogeComponent, {
                      width: '550px',
                      data: { message: JSON.stringify(error.error) },
                    });
                    this.reloadComponent();
                  }
                });
            }, (error: any) => {
              console.error('Error fetching activity_Workgroup_id', error);
            });
      }
      
      
        
    
      updateFormParameters(activity_Workgroup_id: number,roles:any,unigueActivityid:string) {
        this.activityworkgroupinfo.activity_Workgroup_id = activity_Workgroup_id;
        this.activityworkgroupinfo.name_ActivityWorkgroup = this.UpdateForm.value.nameactivity;
        this.activityworkgroupinfo.desc_ActivityWorkgroup = this.UpdateForm.value.Activitydesc;
    
        // Check if department is an array
        if (Array.isArray(this.UpdateForm.value.department)) {
            this.activityworkgroupinfo.locationdepartmentmappingid = this.UpdateForm.value.department.join(',');
        } else {
            // Handle the case when department is not an array
            // For example, you can set it to an empty string or any default value
            this.activityworkgroupinfo.locationdepartmentmappingid = '';
        }
        this.activityworkgroupinfo.roles = roles
        this.activityworkgroupinfo.unigueActivityid=unigueActivityid
        // this.activityworkgroupinfo.roles = this.UpdateForm.value.roles;
        this.activityworkgroupinfo.createdby = this.userdata.profile.userid;
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
