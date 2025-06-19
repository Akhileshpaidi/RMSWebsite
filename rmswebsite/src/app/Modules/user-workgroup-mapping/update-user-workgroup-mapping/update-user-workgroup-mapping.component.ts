import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Updateuseractivity,RepositoryFiles} from 'src/app/inspectionservices.service';
import { FormBuilder, FormControl, FormGroup,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { ImportRemedyComponent } from '../../report/import-remedy/import-remedy.component';
import { ReportService } from 'src/app/core/services/report/report.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';


import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ProvideAccess} from 'src/app/inspectionservices.service';
import { Validators } from '@angular/forms';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxFormModule } from 'devextreme-angular';

import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent,
} from 'devextreme-angular';

import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';




export interface Tag  {
  name: string;
}
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-update-user-workgroup-mapping',
  templateUrl: './update-user-workgroup-mapping.component.html',
  styleUrls: ['./update-user-workgroup-mapping.component.scss']
})
export class UpdateUserWorkgroupMappingComponent {
  yourForm:any
  selectedOption4:any;
  selectedOption3:any;
  isGridBoxOpened: boolean;
  activity:any;
  username:any;
  userdata:any;
  useractivityinfo:Updateuseractivity=new Updateuseractivity();
  selectedValue:any;
  UpdateForm:any;
  gridColumns4:any[] =[
    { dataField: 'user_workgroup_mapping_name', caption: 'user_workgroup_mapping_name' },
    { dataField: 'useractivitymappingunigueid', caption: 'User Activity Workgroup ID' },
    { dataField: 'name_ActivityWorkgroup', caption:'ActivityWorkgroup Name' },
    { dataField: 'firstname', caption:'Username' },
    { dataField: 'department_Master_name', caption: 'Department' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
     { dataField: 'rolE_NAME', caption: 'Role Name' }
  
  ]
  gridColumns3: any[] = [
    { dataField: 'name_ActivityWorkgroup', caption: 'Name Of Activity' },
    { dataField: 'unigueActivityid', caption: 'Activity Workgroup ID' },
    { dataField: 'department_Master_name', caption: 'Department' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
     { dataField: 'rolE_NAME', caption: 'Role Name' }
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
) 
{
  this.isGridBoxOpened = false;
  this.yourForm = this.fb.group({


  });
}
ngOnInit(): void {



  this.UpdateForm = this.fb.group({
    name:['',Validators.required],
    userdesc:[''],
    activity:['',Validators.required],
    user:['',Validators.required]
  })
  let user: any = this.session.getUser();
// console.log(user)
     this.userdata = JSON.parse(user); //userdata.profile.userid
   //  alert(JSON.stringify(this.userdata))
     console.log("userid", this.userdata.profile.userid);


  this.activity={
    paginate: true,
    store: new CustomStore({
      key: 'activity_Workgroup_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ActivityWorkgroup/GetActivityDetails', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
    
  };

  this.username={ 
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/useractivitymapping/GetuserDetails', {headers})
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

      this.http.get(URL+'/useractivitymapping/GetuserActivityDetailsbyid/'+data).subscribe((data:any)=>{
        if (Array.isArray(data) && data.length > 0) {
         
          const PubList = data[0]; 
       //   alert(JSON.stringify(PubList));
       let activitytypeid=PubList.activityworkgroup_id;
        this.UpdateForm.controls['name'].setValue(PubList.user_workgroup_mapping_name);
        this.UpdateForm.controls['userdesc'].setValue(PubList.user_workgroup_mapping_desc);

      
      // console.log("Activity ID before passing:", PubList.activityworkgroup_id);
      // this.activity = this.makeAsyncDataSource(this.http, PubList.activityworkgroup_id);
      // this.ref.detectChanges();
      console.log("Activity ID before passing:", PubList.activityworkgroup_id);
      this.activity = this.makeAsyncDataSource(this.http, PubList.activityworkgroup_id);

      // Set the value for the activity dropdown field
      this.UpdateForm.controls['activity'].setValue(PubList.activityworkgroup_id);

      this.ref.detectChanges();
    } else {
      // Data is either not an array or it's empty
      // Handle this case as needed
    }

      })
    }    


    makeAsyncDataSource(http:HttpClient,activityid:any) {
      console.log("Activity ID:", activityid); 
      return new CustomStore({
        loadMode: 'raw',
        key: 'activityworkgroup_id',
        load: () => {
          const url = `${URL}/ActivityWorkgroup/GetActivityDetailsbyid/${activityid}`;
          return lastValueFrom(http.get(url, { headers }));
        },
      });
    }
   
    SubmitUpdateForm(data: any = {}) {
      // Trigger validation and update form validity
      this.UpdateForm.updateValueAndValidity();
  
      // Make HTTP request to get the user_workgroup_mapping_id
      this.http.get(URL + '/useractivitymapping/GetuserActivityDetailsbyid/' + this.selectedValue).subscribe((response: any) => {
          console.log('API Response:', response); // Log the response data
  
          // Extract user_workgroup_mapping_id from the response
          const user_workgroup_mapping_id =   response[0].user_workgroup_mapping_id;
 // alert(user_workgroup_mapping_id)
          // Update form parameters based on retrieved user_workgroup_mapping_id
          this.updateFormParameters(parseInt(user_workgroup_mapping_id));
  
          // Create the update data object
          const updateData = {
              useractivitymappingmodels: this.useractivityinfo,
          };
  
          // Log and send the updateData to the API
          console.log('Update Data:', updateData);
          this.http.put(URL + '/useractivitymapping/UpdateuseractivitymappingDetails', updateData, { headers }).subscribe((data: any) => {
              alert("Updated Data Successfully");
              this.reloadComponent();
          }, (error: any) => {
              console.error('Error updating user activity mapping:', error);
          });
      }, (error: any) => {
          console.error('Error fetching user_workgroup_mapping_id', error);
      });
  }
  
    

updateFormParameters(user_workgroup_mapping_id: number) {
  this.useractivityinfo.user_workgroup_mapping_id = user_workgroup_mapping_id;
  this.useractivityinfo.user_workgroup_mapping_name = this.UpdateForm.value.name;
  this.useractivityinfo.user_workgroup_mapping_desc = this.UpdateForm.value.userdesc;
  this.useractivityinfo.activityworkgroup_id = this.UpdateForm.value.activity.toString();
  this.useractivityinfo.createdby = this.userdata.profile.userid;
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