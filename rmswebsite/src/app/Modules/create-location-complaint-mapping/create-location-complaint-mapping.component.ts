import { Component, OnInit } from '@angular/core';
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
import { lastValueFrom } from 'rxjs';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-create-location-complaint-mapping',
  templateUrl: './create-location-complaint-mapping.component.html',
  styleUrls: ['./create-location-complaint-mapping.component.scss']
})
export class CreateLocationComplaintMappingComponent implements OnInit {

  maplocation:any;
  yourForm: FormGroup;
  import:any;
  create:any;
  actname:any;
  userdata: any;
  actrulename:any;
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
  industrytype:any;
  businesssector:any;
  dataSource: any;
  dataGrid: any;
  selection:any;
  selection1:any;
  selection2:any;
  selectedcountry: any;
  selectedOption3: any[] = [];
  gridColumns3: any[] = [
    { dataField: 'department_Master_name', caption: 'Department' },
    { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
     { dataField: 'entity_Master_Name', caption: 'Entity' },
    
];
  SelectedAct: any;
  actid: any;
  nameofact:any;
  rulename: any;
  ruleid: any;
  Selectedrule: any;
  selectedComplianceIds: any[]=[];




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

    });
  }

  ngOnInit(): void {
    this.import = this.fb.group({

      categorylaw:[''],
      actRulename :[''],
      naturelaw:[''],
      regulatoryAuthority:[''],
      jurisdictioncategory:[''],
      country:[''],
      state:[''],
      distict:[''],
      business:[''],
      industury:['']


    });
    this.maplocation = this.fb.group({
      complianceid:['',Validators.required],
      department:['',Validators.required]

    })

    let user: any = this.session.getUser();
// console.log(user)
     this.userdata = JSON.parse(user); //userdata.profile.userid
   //  alert(JSON.stringify(this.userdata))
     console.log("userid", this.userdata.profile.userid);

     this.actrulename={
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

     this.industrytype={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/industrytype/GetindustrytypeDetails', {headers})
              .subscribe(res => {
               (resolve(res));

              }, (err) => {
                reject(err);
              });
        });
        },
      }),
     };
     this.businesssector={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Businesssector/GetBusinesssectorDetails', {headers})
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

    //  this.dataSource={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'Value',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/', {headers})
    //           .subscribe(res => {
    //            (resolve(res));

    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    //  };

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
  
 
  getdistrict (event:any){
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
  


  showInvalidFieldsAlert() {
    let invalidFields = '';
    // if (this.import.controls['actname'].invalid) {
    //   invalidFields += '- Select Act Name  \n';
    // }
    // if (this.import.controls['categorylaw'].invalid) {
    //   invalidFields += '- Select categorylaw  \n';
    // }
    // if (this.import.controls['naturelaw'].invalid) {
    //   invalidFields += '- Select naturelaw  \n';
    // }
    // if (this.import.controls['regulatoryAuthority'].invalid) {
    //   invalidFields += '- Select regulatoryAuthority  \n';
    // }
    // if (this.import.controls['jurisdictioncategory'].invalid) {
    //   invalidFields += '- Select jurisdictioncategory  \n';
    // }
    // if (this.import.controls['country'].invalid) {
    //   invalidFields += '- select country';
    // }
    // if (this.import.controls['state'].invalid) {
    //   invalidFields += '- Select state \n';
    // }

    // if (this.import.controls['district'].invalid) {
    //   invalidFields += '- Select districte\n';
    // }
    // if (this.import.controls['business'].invalid) {
    //   invalidFields += '- Select business category\n';
    // }
    // if (this.import.controls['industury'].invalid) {
    //   invalidFields += '- Select industury Type\n';
    // }


    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields:\n${invalidFields}`,
        },
      });
    }
  }
  makeAsyncDataSource3(http:HttpClient,params:any) {
    //this.griddatajson1
    return new CustomStore({
      loadMode: 'raw',
     key: 'create_company_compliance_id',
      load() {
        return lastValueFrom(http.get(`${URL}`+'/globalcompanycompliance/Getcompanycompliance'
      ,{params: params,
      headers: headers}));
      },
    });
  }
  createUser(value: any) {

    console.log(value,'values passing ')

    if (this.import.invalid) {
      this.showInvalidFieldsAlert();
      return;

    }

    const payload = {
    
      category_of_law_id: value.categorylaw,
      rule_id:value.actRulename,
      law_type_id: value.naturelaw,
      regulatory_authority_id: value.regulatoryAuthority,
      jursdiction_category_id: value.jurisdictioncategory,
      country_id: value.country,
      state_id: value.state,
      jursdiction_Location_id: value.distict,
      business: value.business,
      industury: value.industury,
   
    };

    console .log( payload)
    //alert(JSON.stringify(payload))
    

    this.dataSource = this.makeAsyncDataSource3(this.http, payload);

  //   this.http.get(`${URL}/globalcompanycompliance/Getcompanycompliance`, { params: payload })
  //  .subscribe(
  //    (res: any) => {
  //     console.log('API Response:', res);
  //     alert( JSON .stringify(res.data))
  //      this.dataSource = res.data;
  //    },
  //    (error) => {
  //      console.error('Error fetching data:', error);
        
  //    }
  //  );
  }

  showInvalidFieldsAlert1() {
    let invalidFields = '';
    if (this.maplocation.controls['complianceid'].invalid) {
      invalidFields += '- Select Compliance  \n';
    }
    if (this.maplocation.controls['department'].invalid) {
      invalidFields += '- Select department  \n';
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
  createmapp(value: any) {

    
    console.log(value,'values passing ')

    if (this.maplocation.invalid) {
      this.showInvalidFieldsAlert1();
      return;

    }
    const payload:{}={

      companycomplianceid: value.complianceid.join(',').toString(),
      locationdepartmentmappingid:value.department.join(',').toString(),
      createdby:parseInt(this.userdata.profile.userid)
    }

   //alert(JSON.stringify(payload))
    console.log('payload', payload);
 
 
    this.http.post(URL + '/compliancelocation/insertcompliancelocation', payload, { headers })
    .subscribe({
      next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
              width: '550px',
              data: { message: "Data Updated Successfully" },
          });
          this.reloadComponent();
          this.maplocation.reset();
      },
      error: (error: any) => {
        error: (error: any) => {
          console.error('Error updating status:', Error);
          if (error.status === 409) { // Conflict status code
            this.dialog.open(DaidailogeComponent,{   width: '550px',
            data: { message: "Record already exists with the same combination  ." },
        });  
          } else {
            this.dialog.open(DaidailogeComponent,{   width: '550px',
            data: { message:"An error occurred while processing your request." },
        });  
          }
      }
    }
  });


  }


  Selection(): boolean {

    return this.selection === 'visible';
  }
  setSelection(type: 'visible' ) {
    this.selection = type;
  }
  Selection1(): boolean {

    return this.selection1 === 'visible1';
  }
  setSelection1(type: 'visible1' ) {
    this.selection1 = type;
  }

  Selection2(): boolean {

    return this.selection2 === 'visible2';
  }
  setSelection2(type: 'visible2' ) {
    this.selection2 = type;
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

  // Method to handle checkbox value change
  handleSelectionChanges(event: any) {
    try {
      console.log('Event:', event);
  
      const selectedRows = event.selectedRowsData;
      if (selectedRows.length > 0) {
        const selectedComplianceIds = selectedRows
          .filter((item: any) => item.create_company_compliance_id !== undefined)
          .map((item: any) => item.create_company_compliance_id);
  
        // Set the array of IDs directly to the form control
        this.maplocation.get('complianceid')?.setValue(selectedComplianceIds);
      } else {
        this.maplocation.get('complianceid')?.setValue(null);
      }
  
      console.log('Selected Rows:', selectedRows);
    } catch (error) {
      console.error('Error in handleSelectionChanges:', error);
    }
  }
  
  


}
