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
  FormArray,
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
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { A, C } from '@angular/cdk/keycodes';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-create-compliance-user-mapping',
  templateUrl: './create-compliance-user-mapping.component.html',
  styleUrls: ['./create-compliance-user-mapping.component.scss']
})
export class CreateComplianceUserMappingComponent {
  maplocation:any;
  yourForm: FormGroup;
  import:any;
  create:any;
  userdata: any;
  actname:any;
  categorylaw:any;
  naturelaw:any;
  regulatory:any;
  jurisdiction:any;
  country:any;
  state:any;
  district:any;
  stateId: any;
  department:any;
  selectedentity: any;
  CountryId: any;
  complaincetype:any;
  frequency:any;
  dataSource: any;
  dataGrid: any;
  selection:any;
  selection1:any;
  selection2:any;
  selection4:any;
  attachmentformatallow:any;
  checker_auth:any;
  selectedcountry: any;
  selectedOption3:any[]=[];
  panelvisible:boolean=false;
  auditworkflow:any;
  approveactivitys:any;
  approveactivity:any;
  gridColumns3: any[] = [
    { dataField: 'department_Master_name', caption: 'Department' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
     { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
];
  updated_user: any;
  review_user:any;
  approve_user: any;
  monitor_user:any;
  Audit_user:any;
  view_user:any;
  Remediation_user:any;
  backup_user:any;
  no_of_Reminders:any;
  no_of_Escalations:any;
  no_of_Reminderheadings:any;

  rows: any[] = [];
  columns:any[]=[];
  levelcolumns:any[]=[];
//--datasource--//
updateusername:any;
reviewusername:any;
approveusername:any;users: any[] = [];
  monitoredselected:any[]=[];
  monitorusername:any;
auditorusername:any;
viewusername:any;viewuserselected:any[]=[];
Remediationusername:any;
backupusername:any;
updateuserid:any;
remediupdateuserid:any;
Periodicityds:Array<{id:string,text:string}>=[];
Notificationmailds:any;
audit:any;
bothreviewapprove:any;
review_username:any;
updatereviewapproveuser:any;
updatereviewapproveaudituser:any;
monitoruserid:any;
level2ds:any;level2userselected:any[]=[];
levelsds:any;
level2users:any;
level_1_userid:any;
levelsusers:any;
levelsdsarray:any[]=[];levelsuserselected:any[]=[];
forminvalidfields:string[]=[];
erroMessage: any;
minDate: Date = new Date();
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
    scheduleron: ['OriginalDueDate'], // Default to Original Due Date
    effective_start_date: [null, Validators.required], // Mandatory start date
    effective_end_date: [null], // Optional end date
  });
  }

  ngOnInit(): void {
    this.import = this.fb.group({
      department:[],
      Actname:[''],
      categorylaw:[''],
      naturelaw:[''],
      regulatoryAuthority:[''],
      jurisdictioncategory:[''],
      country:[''],
      state:[''],
      distict:[''],
      frequency:[''],
      complaincetype:[''],
      holiday_factor:[''],
      Attachment_mandatory:[''],
      attachmentformatallow:'',
      pdf:'', doc:'',  xls:'',  ppt:'',  com_zip:'',
      auditworkflow:'',
      checker_auth:'',reviewactivity:'',approveactivity:'',bothreviewapprove:'',
      checkbox_no_of_escalations:'',noofescalations:['',
        [
        Validators.required,
        Validators.min(2),
        Validators.max(10)]
      ],
      checkbox_no_of_attachements:'',noofattchements:['', [
        Validators.required,
        Validators.min(2),
        Validators.max(10)]],
      checkbox_no_of_remind_req:'',
      noofremindersrequired:['', [
        Validators.required,
        Validators.min(2),
        Validators.max(10)]],

      scheduleron: ['OriginalDueDate'],
      Periodicityofoverduereminder: ['',Validators.required],
      level_1_username:['',Validators.required],
      Notificationmailds:[''],
      reviewuser:['',Validators.required],
      approverruser:'',updateuser:['',Validators.required],monitoruser:['',Validators.required],audituser:'',viewuser:'',remidationuser:['',Validators.required],backupuser:'',
      noofremindersalertdaysoverdue:'',Notification_overduereminder:'',
      level1check:false,level2check:false,level1checkOverduereminder:false,level2checkOverduereminder:false,level_2_username:['',Validators.required],
        reminders:this.fb.array([]),
        level1remainders:this.fb.array([]),
        level2remainders:this.fb.array([]),
        levels:this.fb.array([]),
        effective_start_date:['',Validators.required],
        effective_end_date:['']
      //  effective_end_date:['',[this.dateTodayOrFutureValidator]],
    });
    this.Periodicityds=[
      { id:'BDD(ex)',text:'BDD(ex) – Before Due Date (t-) excluding due date' },
      { id:'BDD(in)',text:'BDD(in) – Before Due Date (t-) including due date'  },
      { id:'ODD',text:'ODD – On Due Date (t)'  },
      { id:'ADD(ex)',text:'ADD(ex) – After Due Date (t+) excluding due date'  },
      { id:'ADD(in)',text:'ADD(in) – After Due Date (t+) including due date'  }

 ];
 this.Notificationmailds={
  paginate: true,
  store: new CustomStore({
    key: 'notificationMailAlertid',
    loadMode: 'raw',
    load:()=>{return new Promise((resolve, reject) => {
      this.http.get(URL + '/ComplainceUserMappingController/GetNotificationMailAlerts', {headers})
        .subscribe(res => {
         (resolve(res));

        }, (err) => {
          reject(err);
        });
  });
  },
}),

};
// change of api
this.updateusername = { 
  paginate: true,
  store: new CustomStore({
    key: 'usR_ID',
    loadMode: 'raw',
    load: () => {
      return new Promise((resolve, reject) => {
        this.http.get(
          URL + '/ComplainceUserMappingController/GetcomplainceendUsers?rolename=End User' +
          "&&locationdepartmentmappingids=" + localStorage.getItem('complianceLocationPairs') +
          "&&companycomplianceids=" + localStorage.getItem('companycomplianceids') ,
          { headers }
        ).subscribe(
          res => resolve(res),
          err => reject(err)
        );
      });
    },
  }),
};

// api by kavya
// this.updateusername={
//   paginate: true,
//   store: new CustomStore({
//     key: 'usR_ID',
//     loadMode: 'raw',
//     load:()=>{return new Promise((resolve, reject) => {
//       this.http.get(URL + '/createuser/getuserdetails', {headers})
//         .subscribe(res => {
//          (resolve(res));

//         }, (err) => {
//           reject(err);
//         });
//   });
//   },
// }),

// };

    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);

         this.actname={
     paginate: true,
          store: new CustomStore({
              key: 'act_rule_regulatory_id',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/rulesandregulatory/GetrulesandregulatoryDetails', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };
         this.categorylaw={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/catageorylaw/Getcatageorylaws', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };
         this.naturelaw={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/LawType/GetLawTypeDetails', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };
        this.regulatory={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/regulatoryauthority/GetregulatoryauthorityDetails', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };

         this.jurisdiction={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/Jurisdiction/GetJurisdiction', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };

         this.complaincetype={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/Compliance/GetCompliancetypeDetails', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };

         this.frequency={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/frequencymasterforuser/GetfrequencyDetailsuser', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };

         this.country={
          paginate: true,
          store: new CustomStore({
              key: 'jurisdiction_country_id',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/Country/GetCountries', {headers})
                  .subscribe(res => {
                   (resolve(res));

                  }, (err) => {
                    reject(err);
                  });
            });
            },
          }),
         };
         this.department={
          paginate: true,
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
    }

    isStartDateInvalid(): boolean {
      return (
        this.import.get('effective_start_date')?.touched &&
        this.import.get('effective_start_date')?.hasError('required')
      );
    }
    dateTodayOrFutureValidator(control: any) {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight

      if (selectedDate < today) {
        return { invalidDate: true }; // Invalid if date is before today
      }
      return null; // Valid date if today or later
    }
        getstate(event:any){
          console.log("selected Type id: ", event.value);
         // alert(event.value)
          this.CountryId = event.value;
          this.selectedcountry=null;
          this.state={
            paginate: true,
            store: new CustomStore({
              key: 'id',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/StateModels/GetStateDetails/'+this.CountryId, {headers})
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
        getdistrict(event:any){
          console.log("selected Type id: ", event.value);
          this.stateId = event.value;
          this.selectedentity=null;
          this.district={
            paginate: true,
            store: new CustomStore({
              key: 'jurisdiction_location_id',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/JurisdictionLocationModel/GetDistrictDetails/'+this.stateId, {headers})
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
        getdepartment(event:any){
       //   alert(event.value)
         localStorage.setItem('locationdepartmentmappingids',event.value);
        // alert(localStorage.getItem('locationdepartmentmappingids'))
        }

        handleSelectionChanges(event:any){


          const companyComplianceIds:any=[];
           
          
          (event.selectedRowsData as any[]).forEach((item:any)=>{
           // companyComplianceIds.push(item.create_company_compliance_id);
           if (!companyComplianceIds.includes(item.create_company_compliance_id)) {
            companyComplianceIds.push(item.create_company_compliance_id); // Add only if not already present
        }
          });
          const complianceIdsArray = Array.from(companyComplianceIds);
          const commaSeparatedString = complianceIdsArray.join(',');

          localStorage.setItem('companycomplianceids',commaSeparatedString);
      //  alert(localStorage.getItem('companycomplianceids'))
        const locationdepartmentmappingIds:any=[];
        (event.selectedRowsData as any[]).forEach((item:any)=>{
          locationdepartmentmappingIds.push(item.compliance_location_Mapping_id);
        });
        const locationdepIdsArray = Array.from(locationdepartmentmappingIds);
        const locdepcommaSeparatedString = locationdepIdsArray.join(',');

        localStorage.setItem('locationdepartmentmappingids',locdepcommaSeparatedString);
        // let locationarray:any=[]
        // locationarray.push(localStorage.getItem('locationdepartmentmappingids'))
        // alert(locationarray);


         // ✅ ADDITION: Storeing of departmentlocationmapping id
 const compliancelocationMappingPairs: any[] = [];
(event.selectedRowsData as any[]).forEach((item: any) => {
  if (item.locationdepartmentmappingid && !compliancelocationMappingPairs.includes(item.locationdepartmentmappingid)) {
    compliancelocationMappingPairs.push(item.locationdepartmentmappingid);
  }
});
const locMappingString = compliancelocationMappingPairs.join(',');
localStorage.setItem('complianceLocationPairs', locMappingString);
//alert(locMappingString);
this.updateusername = {
  paginate: true,
  store: new CustomStore({
    key: 'usR_ID',
    loadMode: 'raw',
    load: () => {
      return new Promise((resolve, reject) => {
        this.http.get(
          URL + '/ComplainceUserMappingController/GetcomplainceendUsers?rolename=End User' +
          "&&locationdepartmentmappingids=" + localStorage.getItem('complianceLocationPairs') +
          "&&companycomplianceids=" + localStorage.getItem('companycomplianceids'),
          { headers }
        ).subscribe(
          res => resolve(res),
          err => reject(err)
        );
      });
    },
  }),
};


this.panelvisible=true;
//alert(locdepcommaSeparatedString)
        }
        reminders():FormArray{
          return this.import.get('reminders') as FormArray;
        }
        level1remainders():FormArray{
          return this.import.get('level1remainders') as FormArray;

        }
        level2remainders():FormArray{
          return this.import.get('level2remainders') as FormArray;

        }
        levels():FormArray{
          return this.import.get('levels') as FormArray;
        }
        levelremainderss(index:number):FormArray{
          return this.levels().at(index).get('reminders') as FormArray;

        }
  showInvalidFieldsAlert() {
    let invalidFields = '';
    if (this.import.controls['actname'].invalid) {
      invalidFields += '- Select Act Name  \n';
    }
    if (this.import.controls['categorylaw'].invalid) {
      invalidFields += '- Select categorylaw  \n';
    }
    if (this.import.controls['naturelaw'].invalid) {
      invalidFields += '- Select naturelaw  \n';
    }
    if (this.import.controls['regulatoryAuthority'].invalid) {
      invalidFields += '- Select regulatoryAuthority  \n';
    }
    if (this.import.controls['jurisdictioncategory'].invalid) {
      invalidFields += '- Select jurisdictioncategory  \n';
    }
    if (this.import.controls['country'].invalid) {
      invalidFields += '- select country';
    }
    if (this.import.controls['state'].invalid) {
      invalidFields += '- Select state \n';
    }

    if (this.import.controls['district'].invalid) {
      invalidFields += '- Select districte\n';
    }
    if (this.import.controls['frequency'].invalid) {
      invalidFields += '- Select frequency \n';
    }
    if (this.import.controls['complaincetype'].invalid) {
      invalidFields += '- Select compliance Type\n';
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

    console.log(value,'values passing ')

    if (this.import.invalid) {
      this.showInvalidFieldsAlert();
      return;

    }



  }
  search(value:any){
    const payload = {
      rule_id: value.Actname,
      category_of_law_id: value.categorylaw,
      law_type_id: value.naturelaw,
      regulatory_authority_id: value.regulatoryAuthority,
      jursdiction_category_id: value.jurisdictioncategory,
      country_id: value.country,
      state_id: value.state,
      jursdiction_Location_id: value.distict,
      frequency_period_id: value.frequency,
      compliance_type_id: value.complaincetype,
      createdby:this.userdata.profile.userid,
      locationdepartmentmappingid:value.department
    };

    console .log( payload)
//alert('Search Data:'+JSON.stringify(payload))
    this.dataSource = this.makeAsyncDataSource3(this.http, payload);
}
  makeAsyncDataSource3(http:HttpClient,params:any) {
    //this.griddatajson1
    return new CustomStore({
      loadMode: 'raw',
     key: 'compliance_location_Mapping_id',
      load() {
        return lastValueFrom(http.get(`${URL}`+'/ComplainceUserMappingController/Getcompanycompliance'
      ,{params: params,
      headers: headers}));
      },
    });
  }

  Selection(): boolean {

    return this.selection === 'visible';
  }
  setSelection(event:any ) {
    this.selection = event.target.checked?'visible':'';
  }
  Selection1(): boolean {

    return this.selection1 === 'visible1';
  }
  setSelection1(event:any ) {
    this.selection1 = event.target.checked?'visible1':'';
  }

  Selection2(): boolean {

    return this.selection2 === 'visible2';
  }
  setSelection2(event:any ) {
    this.selection2 = event.target.checked?'visible2':'';
  }

  Selection4(): boolean {

    return this.selection4 === 'visible4';
  }
  setSelection4(event:any) {
    this.selection4 = event.target.checked?'visible4':'';
  }
  attachmentformatallowselection(): boolean {

    return this.attachmentformatallow === 'attachformatvisible';
  }
  attachmentformatallowed(event:any) {
    this.attachmentformatallow = event.target.checked ?'attachformatvisible':'';
  }
  checkauditselection():boolean{

    return this.auditworkflow=='auditsvisible';
  }
  checker_audit(event:any){
    this.auditworkflow=event.target.checked?'auditsvisible':'';
  }

  checker_authselection(): boolean {

    return this.checker_auth === 'checker_authvisible';
  }
  checker_authed(event:any ) {
    this.checker_auth = event.target.checked?'checker_authvisible':'';
  }
  check_approveselection():boolean{
return this.approveactivity==='approvevisible';
  }
  check_approve(event:any){
this.approveactivity=event.target.checked?'approvevisible':'';
  }
  check_bothselection():boolean{
    return this.bothreviewapprove==='bothreviewapprovevisible';
  }
  check_both(event:any){
    this.bothreviewapprove=event.target.checked?'bothreviewapprovevisible':'';
  }
  checkCombinedCondition(): boolean {
    return this.check_approveselection() || this.check_bothselection();
  }
  updateuserselection(): boolean {
    return this.updated_user === 'updatevisible';
}
updateuser(event: any) {
  this.updated_user = event.target.checked ? 'updatevisible' : '';
  this.updateusername={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/createuser/getuserdetails', {headers})
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
getupdateuser(event:any){
let userid:any=event.value;
this.updateuserid=event.value
this.remediupdateuserid=event.value
this.updateusername.
store.load({ filter: ['usR_ID', '=', event.value] })
  .then((data: any) => {
    // Check if the data is an array and has at least one item
    if (Array.isArray(data) && data.length > 0) {
      // Access the first object in the array
      const firstItem = data[0];
      console.log(JSON.stringify(firstItem));

      // Check if the firstItem has the property 'firstname'
      if (firstItem && 'firstname' in firstItem) {
        let firstname: any = firstItem.firstname;

        // Set the value of the control 'level_1_username'
        this.import.controls['level_1_username'].setValue(firstname);
        this.level_1_userid=event.value;

      } else {
        console.error('The first item does not have a firstname property.');
      }
    } else {
      console.error('No data found or data is not in the expected format.');
    }
  })
  .catch((error: any) => {
    // Handle any errors that occur during the load process
    console.error('An error occurred while loading data:', error);
  });

   this.level2ds={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ComplainceUserMappingController/GetEscalationUsers?userid='+this.updateuserid, {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),

  };

  if(this.updateuserid!=''||this.updateuserid!=undefined){
    this.Remediationusername={
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceendUsers?rolename=Remediator'+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids'), {headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err);
            });
      });
      },
    }),

    };}
    else{
      alert('Please Select Update User')
    }


}
// updateuser(checked: boolean) {
//     this.updated_user = checked ? 'updatevisible' : '';
// }
  reviewuserselection(): boolean {

    return this.review_user === 'reviewvisible';
  }
  reviewuser(event:any ) {
  this.review_user = event.target.checked ? 'reviewvisible' : '';
let rolename:any='Reviewer';

  this.reviewusername={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updateuserid, {headers})
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
  getupdatereviewuser(event:any){
this.review_username=this.updateuserid+',' +event.value
this.updatereviewapproveuser=this.updateuserid+','+this.review_username
  }
 approveuserselection(): boolean {

    return this.approve_user === 'approvevisible';
  }


  approveuser(event:any ) {
  this.approve_user = event.target.checked ? 'approvevisible' : '';

  let rolename:any='Approver'
  this.bothreviewapprove=this.import.get('bothreviewapprove').value;

  if(this.bothreviewapprove==true){

    // rolename='reviewer'
    // this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('locationdepartmentmappingids')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updateuserid, {headers})
    // .subscribe(res => {
    // let resdata:any[]=res as any;


    //   this.approveusername={
    //     paginate: true,
    //     store: new CustomStore({
    //       key: 'usR_ID',
    //       loadMode: 'raw',
    //       load:()=>resdata.filter((item)=>{

    //         return item.usR_ID==this.import.get('reviewuser').value})

    //     })
    //     }
    //   });

    this.approveusername = {
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename=' + rolename +
              "&&locationdepartmentmappingids=" + localStorage.getItem('complianceLocationPairs') +
              "&&companycomplianceids=" + localStorage.getItem('companycomplianceids') +
              "&&userid=" + this.review_username, { headers })
              .subscribe(res => {
                let resdata: any[] = res as any[];

                // Get the additional user ID from somewhere, for example from the form control
                const additionalUserId = this.import.get('reviewuser').value;


    let rolename:any='reviewer'
    this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('locationdepartmentmappingids')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updateuserid, {headers})
    .subscribe((res: any) => {
      this.users = res;
      const user:any=res.find((u: { usR_ID: any; }) => u.usR_ID === additionalUserId);
      console.log(user)
      console.log(user.firstname)


      const userExists = resdata.some(item => item.usR_ID === additionalUserId);

                // If the user does not exist, add it to the response data
                if (!userExists) {
                  console.log("username:" + user.firstname)
                  resdata.push({
                    usR_ID: additionalUserId,
                    firstname:  user.firstname
                  });
                }

                resolve(resdata);
              },
              err => {
                reject(err);
              });
    });
                // Check if the additional user ID exists in the response data

          });
        }
      })
    };


    }
  else{
  this.approveusername={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.review_username, {headers})
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
  }
  getupdatereviewapproveuser(event:any){
this.updatereviewapproveuser=this.updateuserid+','+this.review_username+','+event.value
  }
  monitoruserselection(): boolean {

    return this.monitor_user === 'monitorvisible';
  }
  monitoruser(event:any) {
    this.monitor_user = event.target.checked ? 'monitorvisible' : '';
    let rolename:any='Monitor';

  this.monitorusername={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updateuserid, {headers})
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
  getmonitoruserid(event:any){
this.monitoruserid=event.value
  }
  audituserselection(): boolean {

    return this.Audit_user === 'Auditvisible';
  }
  Audituser( event:any ) {
    this.Audit_user = event.target.checked ?'Auditvisible':'';
    let rolename:any='Compliance Auditor';
    this.auditorusername={
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updatereviewapproveuser, {headers})
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
  getupdatereviewapproveaudituser(event:any){
    this.updatereviewapproveaudituser=this.updateuserid+','+this.review_username+','+this.updatereviewapproveuser+','+this.monitoruserid+','+event.value;
  }
  viewuserselection(): boolean {

    return this.view_user === 'viewvisible';
  }
  viewuser(event:any ) {
    this.view_user = event.target.checked ?'viewvisible':'';
    let rolename:any='Viewer';
//alert(this.updatereviewapproveaudituser)
  this.viewusername={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updatereviewapproveaudituser, {headers})
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
  remidationuserselection(): boolean {

    return this.Remediation_user === 'Remediationvisible';
  }
  Remediationuser(event:any) {
    this.Remediation_user = event.target.checked?'Remediationvisible':'';

   let rolename:any='Remediator';
if(this.updateuserid!=''||this.updateuserid!=undefined){
    this.Remediationusername={
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceendUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids'), {headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err);
            });
      });
      },
    }),

    };}
    else{
      alert('Please Select Update User')
    }

  }
  getremideuser(event:any){
    this.remediupdateuserid=event.value+','+this.updateuserid
  }
  backupuserselection(): boolean {

    return this.backup_user === 'backupvisible';
  }
  backupuser(event:any ) {
    this.backup_user = event.target.checked?'backupvisible':'';
let rolename:any='End User';
  this.backupusername={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
     //   this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceRemidiationUsers?userid='+this.updateuserid+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs'), {headers})
     this.http.get(URL + '/ComplainceUserMappingController/GetcomplainceUsers?rolename='+rolename+"&&locationdepartmentmappingids="+localStorage.getItem('complianceLocationPairs')+"&&companycomplianceids="+localStorage.getItem('companycomplianceids')+"&&userid="+this.updateuserid, {headers})
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
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  Cancel(){
    this.reloadComponent();
  }

  mapconfig(){
  //alert(1)
    this.audit=this.import.get('auditworkflow').value;
   this.approveactivitys=this.import.get('approveactivity').value;
   this.bothreviewapprove=this.import.get('bothreviewapprove').value;
  //  alert(this.import.get('holiday_factor').value)
    this.generateRowsAndColumns();

if(this.approveactivity==true)
    this.approveactivity==='approvevisible';
else
this.approveactivity==='';
if(this.audit==true)
  this.auditworkflow==='auditsvisible';
  else
   this.auditworkflow==='';
if( this.bothreviewapprove==true){
  this.approveactivity==='approvevisible';
  this.import.controls['approverruser'].setValue(this.import.get('reviewuser').value)
}

if(this.import.get('noofescalations').value>10){

  alert("Please Enter Maxmimum Number Upto 10");
  this.import.get('noofescalations')?.reset();

}
if(this.import.get('noofattchements').value>10){
  alert("Please Enter Maxmimum Number Upto 10");
  this.import.get('noofattchements')?.reset();
}
if(this.import.get('noofremindersrequired').value>10){
  alert("Please Enter Maxmimum Number Upto 10");
  this.import.get('noofremindersrequired')?.reset();
}
    let formdata:any[]=[];
    formdata.push({
      Include_Holiday_Factor:(this.import.get('holiday_factor').value)!=""?this.import.get('holiday_factor').value:false,
      Make_Attachement_Mandatory:this.import.get('Attachment_mandatory').value!=""?this.import.get('Attachment_mandatory').value:false,
      Attachement_Format_Allowed:this.import.get('attachmentformatallow').value!=""?this.import.get('attachmentformatallow').value:false,

      PDF:this.import.get('pdf').value!=""?this.import.get('pdf').value:false,
      doc_docx:this.import.get('doc').value!=""?this.import.get('doc').value:false,

      xls_xlsx:this.import.get('xls').value!=""?this.import.get('xls').value:false,

      ppt_pptx:this.import.get('ppt').value!=""?this.import.get('ppt').value:false,

      compressed_zip:this.import.get('com_zip').value!=""?this.import.get('com_zip').value:false,
      Include_Audit_Workflow:this.import.get('auditworkflow').value!=""?this.import.get('auditworkflow').value:false,

      Include_Authorization_Workflow_required:this.import.get('checker_auth').value!=""?this.import.get('checker_auth').value:false,

      Include_Review_Activity_Workflow:this.import.get('reviewactivity').value!=""?this.import.get('reviewactivity').value:false,

      Include_Approve_Activity_Workflow:this.import.get('approveactivity').value!=""?this.import.get('approveactivity').value:false,

      Include_Review_Approve_by_Same_User:this.import.get('bothreviewapprove').value!=""?this.import.get('bothreviewapprove').value:false,
      No_of_Escalations:parseInt(this.import.get('noofescalations').value),

      No_of_Attachements:parseInt(this.import.get('noofattchements').value),
      No_of_Reminders:parseInt(this.import.get('noofremindersrequired').value),
      company_compliance_ids:localStorage.getItem('companycomplianceids')


    })
   // alert(JSON.stringify(formdata))
    console.log(JSON.stringify(formdata))

    // this.http.post(URL + '/ComplainceUserMappingController/insertcompalinceusermapp',formdata[0],{headers})
    // .subscribe((response: any) => {
    //   console.log('Data Save Succefully ', response);
    // window.alert('Data Saved Successfully');
    //   this.reloadComponent();
    // },
    // (error: any) => {

    //   window.alert('Error Saving Data');
    // });



  }
  useractivitymap(){

    //alert(this.import.get('updateuser').value)
    let formdata:any[]=[];
    formdata.push({
      Include_Holiday_Factor:(this.import.get('holiday_factor').value)!=""?this.import.get('holiday_factor').value:false,
      Make_Attachement_Mandatory:this.import.get('Attachment_mandatory').value!=""?this.import.get('Attachment_mandatory').value:false,
      Attachement_Format_Allowed:this.import.get('attachmentformatallow').value!=""?this.import.get('attachmentformatallow').value:false,

      PDF:this.import.get('pdf').value!=""?this.import.get('pdf').value:false,
      doc_docx:this.import.get('doc').value!=""?this.import.get('doc').value:false,

      xls_xlsx:this.import.get('xls').value!=""?this.import.get('xls').value:false,

      ppt_pptx:this.import.get('ppt').value!=""?this.import.get('ppt').value:false,

      compressed_zip:this.import.get('com_zip').value!=""?this.import.get('com_zip').value:false,
      Include_Audit_Workflow:this.import.get('auditworkflow').value!=""?this.import.get('auditworkflow').value:false,

      Include_Authorization_Workflow_required:this.import.get('checker_auth').value!=""?this.import.get('checker_auth').value:false,

      Include_Review_Activity_Workflow:this.import.get('reviewactivity').value!=""?this.import.get('reviewactivity').value:false,

      Include_Approve_Activity_Workflow:this.import.get('approveactivity').value!=""?this.import.get('approveactivity').value:false,

      Include_Review_Approve_by_Same_User:this.import.get('bothreviewapprove').value!=""?this.import.get('bothreviewapprove').value:false,
      No_of_Escalations:parseInt(this.import.get('noofescalations').value),

      No_of_Attachements:parseInt(this.import.get('noofattchements').value),
      No_of_Reminders:parseInt(this.import.get('noofremindersrequired').value),
      OverdueReminderDays:parseInt(this.import.get('noofremindersalertdaysoverdue').value),
      OverdueReminderPeriodicity:this.import.get('Periodicityofoverduereminder').value,
      OverdueReminderNotification:this.import.get('Notification_overduereminder').value,
      Apply_Scheduler_On:this.import.get('scheduleron').value,
      Effective_StartDate:this.import.get('effective_start_date').value,
      Effective_EndDate:this.import.get('effective_end_date').value,
      company_compliance_ids:localStorage.getItem('companycomplianceids')





    })

    let useractivityformdata:any[]=[];

    useractivityformdata.push({
      UpdateActivity:this.import.get('updateuser').value!=""?parseInt(this.import.get('updateuser').value):0,
      ReviewActivity:this.import.get('reviewuser').value!=""?parseInt(this.import.get('reviewuser').value):0,
      ApproveActivity:this.import.get('approverruser').value!=""?parseInt(this.import.get('approverruser').value):0,
      MonitorActivity:this.import.get('monitoruser').value!=""?(this.import.get('monitoruser').value).join(','):0,
      AuditActivity:this.import.get('audituser').value!=""?parseInt(this.import.get('audituser').value):0,
      ViewActivity:this.import.get('viewuser').value!=""?this.import.get('viewuser').value.join(','):0,
      RemediationActivity:this.import.get('remidationuser').value!=""?parseInt(this.import.get('remidationuser').value):0,
      BackupUserActivity:this.import.get('backupuser').value!=""?parseInt(this.import.get('backupuser').value):0,

    })
    //alert(JSON.stringify(useractivityformdata))
    let savedata={'ComplainceUserMapping':formdata[0],'ComplainceUserActivityMapping':useractivityformdata[0]};
   // alert(JSON.stringify(savedata))
    //   this.http.post(URL + '/ComplainceUserMappingController/insertcompalinceusermapp',savedata,{headers})
    // .subscribe((response: any) => {
    //   console.log('Data Save Succefully ', response);
    // window.alert('Data Saved Successfully');
    //   this.reloadComponent();
    // },
    // (error: any) => {

    //   window.alert('Error Saving Data');
    // });
  }

  SaveEscalations(){
    //alert(JSON.stringify(this.reminders().value))
    //alert(JSON.stringify(this.levels().value))
    let formdata:any[]=[];
    let startDate:any;
    let EndDate:any;

    if (this.import.get('effective_start_date').value !== null) {
      startDate = new Date(this.import.get('effective_start_date').value).toISOString().slice(0, 19).replace('T', ' ');
     console.log(this.import.get('effective_start_date').value);
   } else {
     console.log('startDate is null');
   }
   if (this.import.get('effective_end_date').value !== null) {
    EndDate = new Date(this.import.get('effective_end_date').value).toISOString().slice(0, 19).replace('T', ' ');
   console.log(this.import.get('effective_end_date').value);
 } else {
   console.log('startDate is null');
 }
    formdata.push({
      Include_Holiday_Factor:(this.import.get('holiday_factor').value)!=""?this.import.get('holiday_factor').value:false,
      Make_Attachement_Mandatory:this.import.get('Attachment_mandatory').value!=""?this.import.get('Attachment_mandatory').value:false,
      Attachement_Format_Allowed:this.import.get('attachmentformatallow').value!=""?this.import.get('attachmentformatallow').value:false,

      PDF:this.import.get('pdf').value!=""?this.import.get('pdf').value:false,
      doc_docx:this.import.get('doc').value!=""?this.import.get('doc').value:false,

      xls_xlsx:this.import.get('xls').value!=""?this.import.get('xls').value:false,

      ppt_pptx:this.import.get('ppt').value!=""?this.import.get('ppt').value:false,

      compressed_zip:this.import.get('com_zip').value!=""?this.import.get('com_zip').value:false,
      Include_Audit_Workflow:this.import.get('auditworkflow').value!=""?this.import.get('auditworkflow').value:false,

      Include_Authorization_Workflow_required:this.import.get('checker_auth').value!=""?this.import.get('checker_auth').value:false,

      Include_Review_Activity_Workflow:this.import.get('reviewactivity').value!=""?this.import.get('reviewactivity').value:false,

      Include_Approve_Activity_Workflow:this.import.get('approveactivity').value!=""?this.import.get('approveactivity').value:false,

      Include_Review_Approve_by_Same_User:this.import.get('bothreviewapprove').value!=""?this.import.get('bothreviewapprove').value:false,
      No_of_Escalations:parseInt(this.import.get('noofescalations').value),

      No_of_Attachements:parseInt(this.import.get('noofattchements').value),
      No_of_Reminders:parseInt(this.import.get('noofremindersrequired').value),
      OverdueReminderDays:parseInt(this.import.get('noofremindersalertdaysoverdue').value),
      OverdueReminderPeriodicity:this.import.get('Periodicityofoverduereminder').value,
      OverdueReminderNotification:this.import.get('Notification_overduereminder').value,
      Apply_Scheduler_On:this.import.get('scheduleron').value,
    //  Effective_StartDate:startDate,
      //Effective_EndDate:EndDate,
      company_compliance_ids:localStorage.getItem('companycomplianceids'),




    })

    let useractivityformdata:any[]=[];
let staticlevelvalues:any[]=[];

staticlevelvalues.push({
  levelindex:0,
  levelcheck:this.import.value.level1check,
  levelcheckusername:[parseInt(this.level_1_userid)],
  levelcheckOverduereminder:this.import.value.level1checkOverduereminder,
  reminders:this.level1remainders().value
});
staticlevelvalues.push({
  levelindex:1,
  levelcheck:this.import.value.level2check,
  levelcheckusername:this.import.value.level_2_username,
  levelcheckOverduereminder:this.import.value.level2checkOverduereminder,
  reminders:this.level2remainders().value
});
staticlevelvalues.push(...this.levels().value)
//alert(JSON.stringify(staticlevelvalues));
    useractivityformdata.push({
      UpdateActivity:this.import.get('updateuser').value!=""?parseInt(this.import.get('updateuser').value):0,
      ReviewActivity:this.import.get('reviewuser').value!=""?parseInt(this.import.get('reviewuser').value):0,
      ApproveActivity:this.import.get('approverruser').value!=""?parseInt(this.import.get('approverruser').value):0,
      MonitorActivity:this.import.get('monitoruser').value!=""?(this.import.get('monitoruser').value).join(','):0,
      AuditActivity:this.import.get('audituser').value!=""?parseInt(this.import.get('audituser').value):0,
      ViewActivity:this.import.get('viewuser').value!=""?this.import.get('viewuser').value.join(','):0,
      RemediationActivity:this.import.get('remidationuser').value!=""?parseInt(this.import.get('remidationuser').value):0,
      BackupUserActivity:this.import.get('backupuser').value!=""?parseInt(this.import.get('backupuser').value):0,

    })
    let escalationformdata:any=[];
    escalationformdata.push({
    Remindervalues:this.reminders().value,
    LevelValues:staticlevelvalues,
    //staticlevelvalues:staticlevelvalues,
  })
   //alert(JSON.stringify(escalationformdata))
   let savedata={'ComplainceUserMapping':formdata[0],'ComplainceUserActivityMapping':useractivityformdata[0],'ComplainceEscalation':escalationformdata[0]};
   //alert(JSON.stringify(savedata))
console.log(JSON.stringify(escalationformdata))
  // this.http.post(URL + '/ComplainceUserMappingController/insertcompalinceusermapp',savedata,{headers})
  //   .subscribe((response: any) => {
  //     console.log('Data Save Succefully ', response);
  //   window.alert('Data Saved Successfully');
  //     this.reloadComponent();
  //   },
  //   (error: any) => {

  //     window.alert('Error Saving Data');
  //   });

  }

  Submit(){

    this.forminvalidfields=[];
    let invalidFields: any[] = [];
    invalidFields = invalidFields.concat(
      Object.keys(this.import.controls)
      .filter(key => this.import.get(key).invalid)
      .map(key => {
     switch(key) {
      case 'company_compliance_ids': return 'Company Compliance IDs';
       case 'Include_Holiday_Factor': return 'Include Holiday Factor';
       case 'Make_Attachement_Mandatory': return 'Make Attachment Mandatory';
       case 'Attachement_Format_Allowed': return 'Attachment Format Allowed';
       case 'PDF': return 'PDF';
       case 'doc_docx': return 'DOC/DOCX';
       case 'xls_xlsx': return 'XLS/XLSX';
       case 'ppt_pptx': return 'PPT/PPTX';
       case 'compressed_zip': return 'Compressed ZIP';
       case 'Include_Audit_Workflow': return 'Include Audit Workflow';
       case 'Include_Authorization_Workflow_required': return 'Include Authorization Workflow Required';
       case 'Include_Review_Activity_Workflow': return 'Include Review Activity Workflow';
       case 'Include_Approve_Activity_Workflow': return 'Include Approve Activity Workflow';
       case 'Include_Review_Approve_by_Same_User': return 'Include Review Approve by Same User';
       case 'No_of_Escalations': return 'Number of Escalations';
       case 'No_of_Attachements': return 'Number of Attachments';
       case 'No_of_Reminders': return 'Number of Reminders';
       case 'OverdueReminderDays': return 'Overdue Reminder Days';
       case 'OverdueReminderPeriodicity': return 'Overdue Reminder Periodicity';
       case 'OverdueReminderNotification': return 'Overdue Reminder Notification';
       case 'UpdateActivity': return 'Update Activity';
       case 'ReviewActivity': return 'Review Activity';
       case 'ApproveActivity': return 'Approve Activity';
       case 'MonitorActivity': return 'Monitor Activity';
       case 'AuditActivity': return 'Audit Activity';
       case 'ViewActivity': return 'View Activity';
       case 'RemediationActivity': return 'Remediation Activity';
       case 'BackupUserActivity': return 'Backup User Activity';
       case 'Apply_Scheduler_On': return 'Apply Scheduler On';
       case 'Effective_StartDate': return 'Effective Start Date';
      // case 'Effective_EndDate': return 'Effective End Date';

       default: return key;
     }
   }));


   invalidFields=invalidFields.filter((item:string)=>item.trim()!="");
 this.forminvalidfields=invalidFields;
 if(this.forminvalidfields.length>0){
   this.erroMessage = `Please provide valid information for the following fields: ${this.forminvalidfields.join(', ')}`;

   // Open the DaidailogeComponent with the error message
   this.dialog.open(DaidailogeComponent, {
     width: '900px',
     data: { message: this.erroMessage }
   });

 }
 else{
  let formdata: any[] = [];
let startDate: any;
let endDate: any;

const startDateValue = this.import.get('effective_start_date').value;
const endDateValue = this.import.get('effective_end_date').value;

if (startDateValue) {
  try {
    startDate = new Date(startDateValue).toISOString().slice(0, 19).replace('T', ' ');
    console.log('Effective Start Date:', startDate);
  } catch (error) {
    console.error('Invalid Start Date:', startDateValue);
    startDate = "";  // Set as empty or handle as per your requirements
  }
} else {
  startDate = "";
  console.log('Start Date is null or empty');
}

if (endDateValue) {
  try {
    endDate = new Date(endDateValue).toISOString().slice(0, 19).replace('T', ' ');
    console.log('Effective End Date:', endDate);
  } catch (error) {
    console.error('Invalid End Date:', endDateValue);
    endDate =null;  // Set as empty or handle as per your requirements
  }
} else {
  endDate = null;
  console.log('End Date is null or empty');
}

    formdata.push({
      Include_Holiday_Factor:(this.import.get('holiday_factor').value)!=""?this.import.get('holiday_factor').value:false,
      Make_Attachement_Mandatory:this.import.get('Attachment_mandatory').value!=""?this.import.get('Attachment_mandatory').value:false,
      Attachement_Format_Allowed:this.import.get('attachmentformatallow').value!=""?this.import.get('attachmentformatallow').value:false,

      PDF:this.import.get('pdf').value!=""?this.import.get('pdf').value:false,
      doc_docx:this.import.get('doc').value!=""?this.import.get('doc').value:false,

      xls_xlsx:this.import.get('xls').value!=""?this.import.get('xls').value:false,

      ppt_pptx:this.import.get('ppt').value!=""?this.import.get('ppt').value:false,

      compressed_zip:this.import.get('com_zip').value!=""?this.import.get('com_zip').value:false,
      Include_Audit_Workflow:this.import.get('auditworkflow').value!=""?this.import.get('auditworkflow').value:false,

      Include_Authorization_Workflow_required:this.import.get('checker_auth').value!=""?this.import.get('checker_auth').value:false,

      Include_Review_Activity_Workflow:this.import.get('reviewactivity').value!=""?this.import.get('reviewactivity').value:false,

      Include_Approve_Activity_Workflow:this.import.get('approveactivity').value!=""?this.import.get('approveactivity').value:false,

      Include_Review_Approve_by_Same_User:this.import.get('bothreviewapprove').value!=""?this.import.get('bothreviewapprove').value:false,
      No_of_Escalations:parseInt(this.import.get('noofescalations').value),

      No_of_Attachements:parseInt(this.import.get('noofattchements').value),
      No_of_Reminders:parseInt(this.import.get('noofremindersrequired').value),
      OverdueReminderDays:parseInt(this.import.get('noofremindersalertdaysoverdue').value),
      OverdueReminderPeriodicity:this.import.get('Periodicityofoverduereminder').value,
      OverdueReminderNotification:this.import.get('Notification_overduereminder').value,
      Apply_Scheduler_On:this.import.get('scheduleron').value,
      Effective_StartDate:startDate,
      Effective_EndDate:endDate,
      company_compliance_ids:localStorage.getItem('companycomplianceids'),
      compliance_location_Mapping_ids:localStorage.getItem('locationdepartmentmappingids'),
      CreatedBy:parseInt(this.userdata.profile.userid),


    })

    let useractivityformdata:any[]=[];
let staticlevelvalues:any[]=[];

staticlevelvalues.push({
  levelindex:0,
  levelcheck:this.import.value.level1check,
  levelcheckusername:[parseInt(this.level_1_userid)],
  levelcheckOverduereminder:this.import.value.level1checkOverduereminder,
  reminders:this.level1remainders().value
});
staticlevelvalues.push({
  levelindex:1,
  levelcheck:this.import.value.level2check,
  levelcheckusername:this.import.value.level_2_username,
  levelcheckOverduereminder:this.import.value.level2checkOverduereminder,
  reminders:this.level2remainders().value
});
staticlevelvalues.push(...this.levels().value)
//alert(JSON.stringify(staticlevelvalues));
    useractivityformdata.push({
      UpdateActivity:this.import.get('updateuser').value!=""?parseInt(this.import.get('updateuser').value):0,
      ReviewActivity:this.import.get('reviewuser').value!=""?parseInt(this.import.get('reviewuser').value):0,
      ApproveActivity:this.import.get('approverruser').value!=""?parseInt(this.import.get('approverruser').value):0,
      MonitorActivity:this.import.get('monitoruser').value!=""?(this.import.get('monitoruser').value).join(','):0,
      AuditActivity:this.import.get('audituser').value!=""?parseInt(this.import.get('audituser').value):0,
      ViewActivity:this.import.get('viewuser').value!=""?this.import.get('viewuser').value.join(','):0,
      RemediationActivity:this.import.get('remidationuser').value!=""?parseInt(this.import.get('remidationuser').value):0,
      BackupUserActivity:this.import.get('backupuser').value!=""?parseInt(this.import.get('backupuser').value):0,

    })
    let escalationformdata:any=[];
    escalationformdata.push({
    Remindervalues:this.reminders().value,
    LevelValues:staticlevelvalues,
    //staticlevelvalues:staticlevelvalues,
  })
   //alert(JSON.stringify(escalationformdata))
   let savedata={'ComplainceUserMapping':formdata[0],'ComplainceUserActivityMapping':useractivityformdata[0],'ComplainceEscalation':escalationformdata[0]};
   //alert(JSON.stringify(savedata))
console.log(JSON.stringify(escalationformdata))

console.log(JSON.stringify(savedata))
  this.http.post(URL + '/ComplainceUserMappingController/insertcompalinceusermapp',savedata,{headers})
    .subscribe((response: any) => {
      console.log('Data Save Succefully ', response);
    window.alert('Data Saved Successfully');
      this.reloadComponent();
    },
    (error: any) => {

      window.alert('Error Saving Data');
    });
  }
  }
//============== Valdiations ==============
get noofremindersrequired() {
  return this.import.get('noofremindersrequired');
}
get noofattchements() {
  return this.import.get('noofattchements');
}
get noofescalations() {
  return this.import.get('noofescalations');
}
  //------------- Escalation Matrix ---------------------- //

  generateRowsAndColumns() {

    if(this.no_of_Reminders=="" || this.no_of_Reminders==undefined){
    this.no_of_Reminders=this.import.get('noofremindersrequired').value;
    this.no_of_Reminderheadings=this.import.get('noofremindersrequired').value;
  }
  else
  {
    this.no_of_Reminders==0;
    this.no_of_Reminderheadings=0;
    this.no_of_Reminders=this.import.get('noofremindersrequired').value;
    this.no_of_Reminderheadings=this.import.get('noofremindersrequired').value;
  }
 if( this.no_of_Escalations==""||  this.no_of_Escalations==undefined)
    this.no_of_Escalations=this.import.get('noofescalations').value;
  else{
    this.no_of_Escalations==0;
    this.no_of_Escalations=this.import.get('noofescalations').value;

  }
    this.rows = [];
  this.columns = [];
  this.levelcolumns = [];
      for (let i = 0; i < this.no_of_Reminders; i++) {
      const row = [];
      for (let j = 0; j < this.no_of_Reminderheadings; j++) {
        row.push({});
      }
      this.rows.push(row);
    }

    // Generating column headers dynamically

    let reminders:FormArray=this.reminders();
    let level1remainders:FormArray=this.level1remainders();
    let level2remainders:FormArray=this.level2remainders();
    let levels:FormArray=this.levels();
    reminders.clear();
    level1remainders.clear();
    level2remainders.clear();
    levels.clear();
    for (let k = 0; k < this.no_of_Reminderheadings; k++) {
      this.columns.push(k + 1);
      reminders.push(this.fb.group({
        remindersindex:k,
        reminderalertdays:null,
        Periodicityofoverduereminder:'',
        levelcheckOverduereminder:false,
        Notification_overduereminder:0
      }));
      level1remainders.push(this.fb.group({
        remindersindex:k,
        levelcheckOverduereminder:false,
      }));
      level2remainders.push(this.fb.group({
        remindersindex:k,
        levelcheckOverduereminder:false,
      }));
    }
    for (let a = 0; a < this.no_of_Escalations; a++) {
      this.levelcolumns.push(a + 1);
      let remarr:FormArray=this.fb.array([]);
      for (let k = 0; k < this.no_of_Reminderheadings; k++) {
        remarr.push(this.fb.group({
          remindersindex:k,
          levelcheckOverduereminder:false
        }));
      }
      levels.push(
        this.fb.group({
          levelindex:a+2,
          levelcheck:false,
          levelcheckusername:null,
          levelcheckOverduereminder:false,
          reminders:remarr
        })
      )
    }

  }

  getlevel2user(event:any){
this.level2users=this.updateuserid+','+event.value

    this.levelsds={
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ComplainceUserMappingController/GetEscalationUsers?userid='+this.level2users, {headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err);
            });
      });
      },
    }),

    };
    const emptyds={
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/ComplainceUserMappingController/GetEmptyEscalationUsers?userid='+1, {headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err);
            });
      });
      },
    }),

    };
    this.levelcolumns.forEach((element:any)=>{
      this.levelsdsarray.push([]);
    });
    this.levelsdsarray.push(this.levelsds);
    this.levelsdsarray[0]=this.levelsds;

  }

   getlevelsuser(event:any,row1:number){
    console.log("levelsusers"+this.levelsusers)
    console.log("updateuserid"+this.updateuserid)
    console.log("event"+event.value)
    console.log("levelsusers"+this.levelsusers)
    if(this.levelsusers!=undefined)
    this.levelsusers=this.levelsusers+','+event.value
  else
  this.levelsusers=this.level2users+','+this.updateuserid+','+event.value

  this.levelsds={
    paginate: true,
    store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/ComplainceUserMappingController/GetEscalationUsers?userid='+this.levelsusers, {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),

  };


 for(var i=row1+1;i<this.levelcolumns.length;i++){
  this.levelsdsarray[i]=[];
 }
 this.levelsdsarray[row1+1]=this.levelsds;
 //this.import.controls["levelcheck"+row1+1]?.setValue('');

  }



}
