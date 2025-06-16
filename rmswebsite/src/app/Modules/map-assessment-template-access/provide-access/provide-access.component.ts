import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../user/user-list/user-list.component';
import userData from '../../../Common/dummy-data/user.json';
import roleData from '../../../Common/dummy-data/role.json';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ReportService } from 'src/app/core/services/report/report.service';

import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import themes from 'devextreme/ui/themes';
import { Service } from '../../report/report-list/app.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, lastValueFrom } from 'rxjs';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-provide-access',
  templateUrl: './provide-access.component.html',
  styleUrls: ['./provide-access.component.scss']
})
export class ProvideAccessComponent {
  data: any[] = [
    {ID:1, CompanyName: 'Allow User to use the Assessment Template'},
    {ID: '2',  CompanyName: 'Allow User to make edit in the Assessment Template'},
    // { ID: 1, CompanyName: 'Allow User to use the Assessment Template'},
    // { ID: 2, CompanyName: 'Allow User to make edit in the Assessment Template'},
    // Add more data items as needed
  ];

 
  Useridvalue:any;
  userid:any;
  gridBoxValue: any;
  selectedRowKeys: any[] = [];
  EntityName:any;
  EntityID:any;
  Selectedunit:any;
  UnitMaster:any;
  Userinfo:any;
  gridDataSource:any = [];
  griddatajson:any;
  isGridBoxOpened: boolean = false;
 Ass_ProvideAccess_form:any;
grantcheckbox:any;
  selectedOption:any[]=[];
  selectedOption1:any[]=[];
  isUserBoxOpened:boolean;
  unit_location_Master_id: any;
  assessmentbuilderid:any;
  erroMessage:any;
  gridColumns: any = [
    { dataField: 'ass_template_id' , caption: 'Assessment Template ID'},
     {dataField:'verson_no',caption:'Version Number' ,alignment: 'center'},
    { dataField: 'assessment_name', caption: 'Assessment Name' },
    { dataField: 'type_Name', caption: 'Type Name' },
    { dataField: 'subType_Name', caption: 'Sub Type Name' },
    { dataField: 'competency_Name', caption: 'Competency Skill Level' },
    {
      dataField: 'created_date',
      caption: 'Created Date',
      alignment: "right",
      width: 180,
      dataType: "date",
      format: {
        type: "custom",
        formatter: function(date:any) {
          if (date) {
            const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
            const month = date.toLocaleString('default', { month: 'short' }); // Short month
            const year = date.getFullYear();
            return `${day} ${month} ${year}`; // Format: "12 Dec 2024"
          }
          return "";
        }
      },
      filterValue: null,
      customizeText: function(cellInfo:any) {
        // Ensures consistent display in filter dropdown
        if (cellInfo.value) {
          const date = new Date(cellInfo.value);
          const day = String(date.getDate()).padStart(2, '0'); 
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          return `${day} ${month} ${year}`;
        }
        return "";
      }
    }
    ,
    
    {dataField:'firstname',caption:'Author Name'},
    {dataField:'total_questions',caption:'Total Number of Questions',alignment: 'center'},
    {dataField:'total_estimated_time',caption:'Estimated Time(in Minutes)',alignment: 'center'},
   
    { dataField: 'keywords', caption:'KeyWords'}];  

  //   '', '', '',
  // 'competency_Name','','Assessment from Date','Assessment To Date','keywords'

  get filteredData() {
    return this.data;
  }
  usergridColumns: any[] = [
    { dataField: 'firstname', caption: 'First Name' },
    { dataField: 'Department_Master_name', caption: 'Department' },
    { dataField: 'entity_Master_Name', caption: 'Entity Name' },
    { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
  ];
  usergridColumns1: any[] = [
    { dataField:'user_location_mapping_id'},
    { dataField: 'firstname', caption: 'Username' },
    { dataField: 'department_Master_name', caption: 'Department' },
    { dataField: 'entity_Master_Name', caption: 'Entity Name' },
    { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
    {dataField:'roleNames',caption:'Roles'}
  ];

  dropdownOptions={
    paginate :true,
    store:new CustomStore({
      key :'ass_User_PermissionListid',
      loadMode:'raw',
      load:()=>{return new Promise((resolve,reject)=>{
        this.http.get(URL + '/UserRightsPermission/ass_user_permissionlist', {headers})
        .subscribe(res => {
         (resolve(res));

        }, (err) => {
          reject(err);
        });
  });
  },
}),
};
  onSelectionChanged(selectedItems: any[]) {
    this.selectedRowKeys = selectedItems.map(item => item.ID);
    

  }
  constructor(private http: HttpClient,
    private ref: ChangeDetectorRef,
    private fb:FormBuilder,
    private session: SessionService,
    private router:Router,
    public dialog: MatDialog,
    private cdr:ChangeDetectorRef
    ){ 
           const storedData:any = localStorage.getItem('user');
      const parsedData = JSON.parse(storedData);
    
    //UserId
    const Userid = parsedData ? parsedData.profile.userid : null;
    console.log('User id:', Userid);
    this.Useridvalue=Userid;

  this.EntityName={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Adddocument/getentity/' + this.userid , {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
    this.isUserBoxOpened=false;
   
    this.gridDataSource = this.makeAsyncDataSource(this.http, this.Useridvalue);
   
    this.Ass_ProvideAccess_form=this.fb.group({
      Assessment_id:['', Validators.required],
      Entity_Master_id:['', Validators.required],
      Unit_location_Master_id:['', Validators.required],
      documentperm:['', Validators.required],
      isCheckedUsertrack:[''],
      usrname:['', Validators.required],
    })
}
 
ngOnInit():void{
  const user: any = this.session.getUser();
  const userdata = JSON.parse(user);
  this.userid = userdata.profile.userid;
 
}

getUnitLocation(event: any) {
  console.log("selected Entity_Master_id : ", event.value);
  this.EntityID = event.value;
   this.Selectedunit=null;  
  this.UnitMaster={
    paginate: true,
    store: new CustomStore({
      key: 'Value',
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
 gridBox_displayExpr1(usR_ID:any) {
  //   return usR_ID && `${usR_ID.firstname} <${usR_ID.lastname}
  //   <${usR_ID.unit_location_Master_id}>
  // <${usR_ID.rolE_ID}> `;
  return usR_ID && `${usR_ID.firstname} `;
  }
 gridBox_displayExpr(item: any) {
  // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
  return item.assessment_name;
 }
 getUserData(event: any) {
  
  console.log("selected Type id: ", event.value);
   // this.selectedValue = event.value;
   const data:any=event.value;
  this.unit_location_Master_id = data;

  this.Userinfo = {
    paginate: true,
    store: new CustomStore({
      key: 'user_location_mapping_id',
      loadMode: 'raw',
      load: () => {
        return new Promise((resolve, reject) => {
          this.http.get(URL + '/AssessmentUserLocationMapping/AssessmentGetuserDetailsbyUser/' + this.unit_location_Master_id, { headers })
          .subscribe(
            (res: any) => {
              // Filter out the user with the specific ID
              const filteredRes = res.filter((user:any) => user.usR_ID !== this.userid); 
              resolve(filteredRes);
            },
            (err) => {
              reject(err);
            }
          );
                });
      },
    }),
  };
  }
 makeAsyncDataSource(http: HttpClient,userid:any) {
  return new CustomStore({
    loadMode: 'raw',
    key: 'ass_template_id',
    load: () => {
      return lastValueFrom(
        http.get(`${URL}/Assessment/GetActiveAssesmentbyuser/`+userid, { headers })
      ).catch((error) => {
        console.error("Data load failed", error);
        throw error;
      });
    },
  });
}

  onGridBoxOptionChanged(e:any) {
   
    if (e.name === 'value') {
  
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    

      if (e.value && this.gridDataSource) {
      // alert('1')
       this.gridDataSource.load({ filter: ['ass_template_id', '=', e.value] }).then((data: any) => {
        // Handle the retrieved data
        if (Array.isArray(data) && data.length > 0) {
          // Access the first object in the array (assuming there's only one)
          const firstItem = data[0];
         console.log(JSON.stringify(firstItem));
       this.assessmentbuilderid=firstItem.assessment_builder_id;
       //this.Ass_ProvideAccess_form.controls['Assessment_id'].setValue (firstItem.assessment_name);

       } });
        // Here, this.filteredData contains the filtered data based on the selected item
        // You can further process this data or perform actions based on your requirements
      }
    }}
  onCheckboxChange(event:any) {
    
  this.grantcheckbox = event.target.checked;
  
  }
  ProvideAccessSave(){
    this.Ass_ProvideAccess_form.patchValue({
      Assessment_id:this.gridBoxValue
    })

   // const invalidFields = [];
  const controls = this.Ass_ProvideAccess_form.controls;
 
  let invalidFields = Object.keys(this.Ass_ProvideAccess_form.controls)
  .filter(key => this.Ass_ProvideAccess_form.get(key).invalid)
  
  .map(key => {
    switch(key) {
      case 'Assessment_id': return 'Select Assessement Template';

      case 'Entity_Master_id': return 'Select Entity ';
      case 'Unit_location_Master_id': return 'Select Unit Location';
      case 'documentperm': return 'Select UserPermission Right(s)';
      case 'usrname': return 'Select User(s)';
     
      
      // ... other cases for other field names
      default: return key; // Return the key itself if no user-friendly name is needed
    }
    
  });
  

  
 
  if (invalidFields.length > 0) {

    this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
   
      // Open the DaidailogeComponent with the error message
      this.dialog.open(DaidailogeComponent, {
        width: '900px',
        data: { message: this.erroMessage }
      });``
        // Optionally set form errors if needed
       // this.Ass_ProvideAccess_form.setErrors({ invalidFields: true });
     // alert(`Please provide valid information for the following fields: ${invalidFields.join(', ')}`);
      return; 

  }
    if (this.Ass_ProvideAccess_form.valid) {

      let formData: any;
   //   alert(JSON.stringify(this.Ass_ProvideAccess_form.value))ids
   const asstempids:any=this.Ass_ProvideAccess_form.value.Assessment_id;
   let count:number=0;
   asstempids.forEach((element:any) => {

    if (element && this.gridDataSource) {
      // alert('1')
       this.gridDataSource.load({ filter: ['ass_template_id', '=', element] }).then((data: any) => {
        // Handle the retrieved data
        if (Array.isArray(data) && data.length > 0) {
          // Access the first object in the array (assuming there's only one)
          const firstItem = data[0];
         console.log(JSON.stringify(firstItem));
       this.assessmentbuilderid=firstItem.assessment_builder_id;
       //this.Ass_ProvideAccess_form.controls['Assessment_id'].setValue (firstItem.assessment_name);

       } });
        // Here, this.filteredData contains the filtered data based on the selected item
        // You can further process this data or perform actions based on your requirements
      }
  
      formData = {
        
       
        AssessementTemplateID:  element.toString(),
        EntityMasterID: parseInt(this.Ass_ProvideAccess_form.value.Entity_Master_id),

        UnitLocationMasterID:parseInt( this.Ass_ProvideAccess_form.value.Unit_location_Master_id),
        UserloactionmappingID:this.Ass_ProvideAccess_form.value.usrname.join(','),

        Access_Permissions: this.Ass_ProvideAccess_form.value.documentperm.join(','),

        // GrantUserPermission: this.grantcheckbox?'1':'0',
       // assessment_builder_id: parseInt(this.Ass_ProvideAccess_form.value.Assessment_id.join(','))
        assessment_builder_id:parseInt(this.assessmentbuilderid),
        createdby: this.userid 
      };
     //alert('Form Data:'+JSON.stringify(formData));

      this.http.post(URL + '/Assessment/ProvideAccess',formData)
      .subscribe((response: any) => {
        console.log('Data Save Succefully ', response);
        if(response!='successfully'){
         
          window.alert(response);
            return;
            
        }
        else{
        
          count++;
          if(count== asstempids.length){
            this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: 'Data Saved successfully' },
          });
           // alert("Updated Data Successfully");
           // this.reloadComponent();
            
             this.Ass_ProvideAccess_form.reset();
             this.reloadComponent();
          this.gridDataSource = this.makeAsyncDataSource(this.http,this.Useridvalue);
          }
        }
        
        // Handle the response from the server if needed
        

      },
      (error: any) => {
       
        window.alert('Error Saving Data');
      });
    });
   
    
    }
    else{
     alert('invalid form');
     }

    }

    reloadComponent() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }


