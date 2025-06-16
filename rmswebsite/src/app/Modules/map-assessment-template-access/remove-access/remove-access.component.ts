import { Component, NgZone } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDropDownBoxModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-remove-access',
  templateUrl: './remove-access.component.html',
  styleUrls: ['./remove-access.component.scss']
})
export class RemoveAccessComponent {
  
  public tmperiod:any[]=[
    {id:1,name:' Allow User to use the Assessment Template'},
    {id:2,name:'Allow User to make edit in the Assessment Template'},
  ];

  treeBoxValue: string;
  gridDataSource: any;
  griddatajson:any;
  selectedOption:any=[];
    gridBoxValue: number[] = [];            // Value for drop-down
gridBoxSelectedKeys: string[] = [];  // Value for selectedRowKeys
  Ass_editProvideAccess_form:any;
  selectedRowKeys: any[] = [];
  Userinfo:any;
  User:any;
  Userid1:any;
  userid:any;
  erroMessage:any;
  assessementtempid:any;
  isGridBoxOpened: boolean;
  isUserBoxOpened:boolean;
  // gridColumns: any = ['assessement_ProvideAccessID', 'assessementTemplateID', 'entityMasterID','user_id','unitLocationMasterID','assessment_builder_id',
  // gridColumns: any = [
  //   {dataField:'assessement_ProvideAccessID',caption :'Assessement_ProvideAccessID'},
  //   { dataField: 'assessementTemplateID' , caption: 'Assessment Template ID'},
  //   { dataField: 'assessment_name', caption: 'Assessment Name' },
  
  //   {dataField:'total_questions',caption:'Total Number of Questions'},
  //   {dataField:'total_estimated_time',caption:'Estimated Time'},
  //   {dataField:'verson_no',caption:'Version Number'},];
  gridColumns: any = [
  {dataField:'assessement_ProvideAccessID',caption :'Assessement_ProvideAccessID',visible: false},
  { dataField: 'assessementTemplateID' , caption: 'Assessment Template ID'},
  {dataField:'verson_no',caption:'Version Number',alignment: 'center'},
  { dataField: 'assessment_name', caption: 'Assessment Name' },
 { dataField: 'type_Name', caption: 'Type Name' },
    { dataField: 'subType_Name', caption: 'Sub Type Name' },
    { dataField: 'competency_Name', caption: 'Competency Skill Level' },
    {dataField:'firstname',caption:'Author Name'},
  {dataField:'total_questions',caption:'Total Number of Questions' ,alignment: 'center'},
  {dataField:'total_estimated_time',caption:'Estimated Time(in Minutes)',alignment: 'center'},
  ,];
usergridColumns: any[] = ['userloactionmappingID','firstname','entity_Master_Name','unit_location_Master_name'];

  dropdownOptions:any;
  constructor(private http: HttpClient, private ref: ChangeDetectorRef,private session: SessionService,
    private fb:FormBuilder, private zone: NgZone, private router:Router,private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    
    ) {
     //UserId
     const user: any = this.session.getUser();
     const userdata = JSON.parse(user);
     this.userid = userdata.profile.userid;
     const id =  this.userid

    this.treeBoxValue = '1_1';
    
    this.isGridBoxOpened = false;
    this.isUserBoxOpened=false;
    this.gridDataSource = this.makeAsyncDataSource(this.http,this.userid );
    this.Ass_editProvideAccess_form=this.fb.group({
     // assessement_ProvideAccessID:['', Validators.required],
      entity_Master_Name:['', Validators.required],
      unit_location_Master_name:['', Validators.required],
      access_Permissions:['', Validators.required],
     
    // grantUserPermission:['',Validators.],
      firstname:['', Validators.required],
    })
   this.dropdownOptions={
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
  }
  makeAsyncDataSource(http:HttpClient,id:any) {
    this.griddatajson
    return new CustomStore({
      loadMode: 'raw',
      key: 'assessement_ProvideAccessID',
      load:()=> {
        return lastValueFrom(http.get(`${URL}/Assessmentprovide/Getassessmentprovideacess/`+id, { headers }));
      },
    });
  }

  makeAsyncDataSource3(http:HttpClient,usR_ID:any) {
  
    return new CustomStore({
      loadMode: 'raw',
      key: 'ass_User_PermissionListid',
      load() {

        const url = `${URL}/UserRightsPermission/ass_user_permissionlist?usR_ID=`+usR_ID;
        return lastValueFrom(http.get(url, { headers }));
      },
    });
  }
  onSelectionChanged(selectedItems: any[]) {
    this.selectedRowKeys = selectedItems.map(item => item.ID);
    

  }
  onuserchange(e:any){
    if (e.name === 'value') {
    //this.Userid1 = e.value;
    this.Userid1= parseInt(e.value.join(''));
  }
  }
  makeAsyncDataSource10(http: HttpClient){
      
    return new CustomStore({
      loadMode: 'raw',
      key: 'userloactionmappingID',
      load: () => {
        const url =URL+ "/Assessment/GetAssUsersByAssTemp?AssessementTemplateID=" + this.assessementtempid;
       // alert(url)
        return lastValueFrom(http.get(url, { headers }));
     
      },
    });
   }
  onGridBoxOptionChanged(e:any) {
   
    if (e.name === 'value') {
  
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
        let ass_provideaccessid=e.value;
     localStorage.setItem('ass_provideaccessid',ass_provideaccessid);
     this.gridDataSource.load({ filter: ['assessement_ProvideAccessID', '=', e.value] }).then((data: any) => {
      // Handle the retrieved data
      if (Array.isArray(data) && data.length > 0) {
        // Access the first object in the array (assuming there's only one)
        const firstItem = data[0];
     this.assessementtempid=firstItem.assessementTemplateID;
     
     } });
    // alert(JSON.stringify(ass_provideaccessid))
     this.Userinfo=this.makeAsyncDataSource10(this.http);

     this.http.get(URL + '/Assessment/GetAssessementProvideAccessByID?ass_provideaccessid='+ass_provideaccessid, {headers})
      .subscribe((response: any) => {
      
        if (Array.isArray(response) && response.length > 0) 
        {
          // Data is an array and has at least one element
          const ProvideAccess = response[0]; // Access the first element of the array
         // this.subjectId=questionbank.subjectid;
       //   alert(JSON.stringify(ProvideAccess));
          this.User= this.makeAsyncDataSource10(this.http);
          console.log(this.User)
          this.Userid1=ProvideAccess.userloactionmappingID;
     //     alert(JSON.stringify(this.Userid1))
          
          this.User.load().then((data:any)=>{
           console.log(JSON.stringify(data));
            this.zone.run(() => {
             
             
              
              this.Ass_editProvideAccess_form.controls['firstname'].setValue(ProvideAccess.firstname);
              this.selectedOption=ProvideAccess.firstname;
              this.ref.detectChanges();
  
    
     
            });
          });
          this.Ass_editProvideAccess_form.controls['entity_Master_Name'].setValue(ProvideAccess.entity_Master_Name);
          this.Ass_editProvideAccess_form.controls['unit_location_Master_name'].setValue (ProvideAccess.unit_location_Master_name);
          this.Ass_editProvideAccess_form.controls['unit_location_Master_name'].setValue (ProvideAccess.unit_location_Master_name);
          //this.Ass_editProvideAccess_form.controls['firstname'].setValue (ProvideAccess.firstname);
          const accessPermissionsString = ProvideAccess.access_Permissions;


let UserId = ProvideAccess.access_Permissions.split(',').map(Number);

if(UserId==1||UserId==2){
  this.dropdownOptions= this.makeAsyncDataSource3(this.http,UserId);       
this.dropdownOptions.load().then((data: any) => {    
  this.zone.run(() => {
  this.Ass_editProvideAccess_form.controls['access_Permissions'].setValue(ProvideAccess.ass_User_PermissionListid);
  this.ref.detectChanges();
  this.selectedRowKeys = UserId;
});
});
}
else{
  this.dropdownOptions= this.makeAsyncDataSource3(this.http,UserId);       
  this.dropdownOptions.load().then((data: any) => {    
    this.zone.run(() => {
    this.Ass_editProvideAccess_form.controls['access_Permissions'].setValue(ProvideAccess.ass_User_PermissionListid);
    this.ref.detectChanges();
     const selectedIDs = data.map((option: { ass_User_PermissionListid: any; }) => option.ass_User_PermissionListid);
     //alert(selectedIDs)
     this.selectedRowKeys = selectedIDs;
  });
  });

}

        }
  });

  }
        
    }

    gridBox_displayExpr(item: any) {
      // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
      return item.assessment_name;
     }
  onClick(){
    this.reloadComponent();
  }
  selectOption1(event: any) {
    // handle the selection change here
    console.log( event.value);
    
  }
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


ProvideAccessRemove() {
  const controls = this.Ass_editProvideAccess_form.controls;

  let invalidFields = Object.keys(controls)
    .filter(key => controls[key].invalid)
    .map(key => {
      switch (key) {
        case 'assessement_ProvideAccessID': return 'Select Assessment Template';
        case 'access_Permissions': return 'Select User Permission Right(s)';
        case 'firstname': return 'Select User';
        default: return key;
      }
    });

  if (invalidFields.length > 0) {
    this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
    this.dialog.open(DaidailogeComponent, {
      width: '900px',
      data: { message: this.erroMessage }
    });
    this.Ass_editProvideAccess_form.setErrors({ invalidFields: true });
    return;
  }

  const isConfirmed = confirm('Are you sure you want to remove all user access rights for the selected user and template(s)? This action will be tracked in the Audit Log.');
  if (!isConfirmed) {
    return;
  }

  const selectedId = this.gridBoxValue.length ? this.gridBoxValue[0] : null;
  if (!selectedId) {
    this.erroMessage = 'No assessment selected.';
    this.dialog.open(DaidailogeComponent, {
      width: '900px',
      data: { message: this.erroMessage }
    });
    return;
  }

  const apiUrl = `${URL}/Assessment/GetAssessementProvideAccessByID?ass_provideaccessid=${selectedId}`;

  this.http.get<any[]>(apiUrl).subscribe(response => {
    if (response && response.length > 0) {
      const provideAccess = response[0];
      const formData = {
        Assessement_ProvideAccessID:this.Ass_editProvideAccess_form.value.assessement_ProvideAccessID,
        AssessementTemplateID: this.assessementtempid,
        UserloactionmappingID: this.Userid1.toString(),
      };
  // alert(JSON.stringify(formData))
      this.http.post(URL + '/Assessment/RemoveAssProvideAccess', formData).subscribe(() => {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: 'Assessment Permission Removed Successfully' }
        });
        this.Ass_editProvideAccess_form.reset();
        this.reloadComponent();
      }, error => {
        window.alert('Error Saving Data');
      });
    }
  }, error => {
    window.alert('Failed to fetch assessment access details.');
  });
}

//   ProvideAccessRemove(){
   
//     const controls = this.Ass_editProvideAccess_form.controls;
//     let invalidFields = Object.keys(this.Ass_editProvideAccess_form.controls)
//     .filter(key => this.Ass_editProvideAccess_form.get(key).invalid)
    
//     .map(key => {
//       switch(key) {
//         case 'assessement_ProvideAccessID': return 'Select Assessement Template';
  
//         // case 'Entity_Master_id': return 'Select Entity ';
//         // case 'Unit_location_Master_id': return 'Select Unit Location';
//         case 'access_Permissions': return 'Select UserPermission Right(s)';
//         case 'firstname': return 'Select User';
       
        
//         // ... other cases for other field names
//         default: return key; // Return the key itself if no user-friendly name is needed
//       }
      
//     });
   
//     // for (const field in controls) {
//     //   if (controls[field].invalid) {
//     //     invalidFields.push(field);
//     //   }
//     // }
   
//     if (invalidFields.length > 0) {
  
//       this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
     
//         // Open the DaidailogeComponent with the error message
//         this.dialog.open(DaidailogeComponent, {
//           width: '900px',
//           data: { message: this.erroMessage }
//         });``
//           // Optionally set form errors if needed
//           this.Ass_editProvideAccess_form.setErrors({ invalidFields: true });
//        // alert(`Please provide valid information for the following fields: ${invalidFields.join(', ')}`);
//         return; 
  
//     }
//     const isConfirmed =confirm('Are you sure to remove this  All user access  rights will be removed/ disabled for the selected user and selected template(s), and the action should be tracked under Report/ Audit Log.?');
//     if(isConfirmed){
 

     
//     let formData: any;
 
//   //  let arrayToInt: number = parseInt(this.Userid1.join(''));
//  //   alert(JSON.stringify(this.Ass_editProvideAccess_form.value))
//     formData = {
     
//     //  Access_Permissions: this.Ass_editProvideAccess_form.value.access_Permissions.join(','),
//       Assessement_ProvideAccessID: parseInt(this.Ass_editProvideAccess_form.value.assessement_ProvideAccessID),
//       AssessementTemplateID: this.assessementtempid,
//       // EntityMasterID: parseInt(this.Ass_editProvideAccess_form.value.entity_Master_Name),
    
//       // UnitLocationMasterID:parseInt( this.Ass_editProvideAccess_form.value.unit_location_Master_name),
//       UserloactionmappingID: this.Userid1.toString(),
//     };
//       console.log('Form Data:', formData);
      

//       this.http.post(URL + '/Assessment/RemoveAssProvideAccess',formData)
//       .subscribe((response: any) => {
//         console.log('Assessement Permission Removed Succefully ', response);
//         // Handle the response from the server if needed
//         this.dialog.open(DaidailogeComponent, {
//           width: '550px',
//           data: { message: 'Assessement Permission Removed Succefully' },
//       });
//        // alert("Updated Data Successfully");
//        // this.reloadComponent();
//         //window.alert('Assessement Permission Removed Succefully');
//        this.Ass_editProvideAccess_form.reset();
//        window.location.reload();
//        this.reloadComponent();
//       },
//       (error: any) => {
       
//         window.alert('Error Saving Data');
//       });
//     }
//   }
  

  
}


