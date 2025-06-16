import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToasterComponent } from '../Common/toaster/toaster.component';
import { FormControl, Validators } from '@angular/forms';
import { BASE_URL } from '../core/Constant/apiConstant';
import { SessionService } from '../core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
import { MatStepper } from '@angular/material/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { catchError, map } from 'rxjs/operators';
import { StepperService } from 'src/app/Common/daidailoge/stepper.service';
import { filter, lastValueFrom, Observable } from 'rxjs';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  
} from '@angular/forms';

import { throwError } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { RiskRegisterDailogeComponent } from '../Common/daidailoge/risk-register-dailoge/risk-register-dailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { RiskDailogeboxComponent } from '../Common/daidailoge/risk-dailogebox/risk-dailogebox.component';
import {  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
export interface Tag  {
  name: string;
}
imports: [
  BrowserModule,
  // Other modules
]
@Component({
  selector: 'app-risk-createrisk-document',
  templateUrl: './risk-createrisk-document.component.html',
  styleUrls: ['./risk-createrisk-document.component.scss']
})

export class RiskCreateriskDocumentComponent implements OnInit {
 
  @ViewChild('Obj_Doc') textarea!: ElementRef;
@ViewChild('stepper') stepper!:MatStepper;
@ViewChild('stepper') steppers!:MatStepper;
@ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
@ViewChild('chipListInput1') chipListInput1!: ElementRef<HTMLInputElement>;
forminvalidfields:string[]=[];
  value = 0;
  
  userdatalist:any;
   simpleProducts:string[] = [
  ];
  notifieremails:string[]=[];
 

  FrequencyDB=[
    {  Frequency_name: 'Yes' },
    { Frequency_name: 'No' }
  ]
  RiskAMLDB=[
    {  AML_name: 'Yes' },
    {  AML_name: 'No' }
  ]
  RiskFraudDB = [
    {  Fraud_name: 'Yes' },
    {  Fraud_name: 'No' }
  ];
  RiskLegalDB =[
    {  Legal_name: 'Yes' },
    {  Legal_name: 'No' }
  ]
  RiskOperationalDB =[
    {  Operational_name: 'Yes' },
    {  Operational_name: 'No' }
  ]
  ReputationalDB =[
    {  Reputational_name: 'Yes' },
    {  Reputational_name: 'No' }
  ]
  ModelDB =[
    {  Model_name: 'Yes' },
    {  Model_name: 'No' }
  ]
  ConductDB =[
    {  Conduct_name: 'Yes' },
    {  Conduct_name: 'No' }
  ]
  CyberDB =[
    {  Cyber_name: 'Yes' },
    {  Cyber_name: 'No' }
  ]
  ThirdDB =[
    {  Third_name: 'Yes' },
    {  Third_name: 'No' }
  ]
  ReportingDB =[
    {  Reporting_name: 'Yes' },
    {  Reporting_name: 'No' }
  ]
  FinancialDB =[
    {  Financialg_name: 'Yes' },
    {  Financialg_name: 'No' }
  ]
  public project4: any[] = [
    { id: 1, name: 'Days' },
    
    { id: 2, name: 'Week' },
    { id: 3, name: 'Month' },
    { id: 4, name: 'Year' }
   
    
  ];
  EntityMasterid:any;
  Unitid:any;
  TextBox2=false;
  userdata: any = [];
  minDate = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
  riskregister:any;
  FinancialValue: string = 'No'; 
  Reporting: string = 'No'; 
  defaultThirdValue ='No';
  defaultCyberValue ='No';
  defaultConductValue ='No';
  defaultModelValue ='No';
  defaultAMLValue ='No';
  defaultFraudValue = 'No';
  defaultLegalValue ='No';
  defaultOperationalValue='No';
  ReputationalValue='No';
  ImpactDB:any;
  fileAttach: File[]  = [];
  fileAttach2: File[]  = [];
  weblink:string[] =[];
  maxFiles: number = 1; // default value
maxSize: number = 5 ; // default 5MB in bytes
  actForm: any;
  TextBox1=true;
  visiblestepper:boolean = false;
  visible_Risk:boolean=true;
  hideStep1 = false;  
  DocumentTypeData:any;
  disablereferenceType: boolean = false; 
  register:boolean = true;
  BusinessProcessDB:any;
  BusinessImpactDB:any;
  UnitID:any;
  Deparment:any;
  FunctionDB:any;
  BusinessProcessL1DB:any;
  BusinessProcessL2DB:any;
  BusinessProcessL3DB:any;
  SelectedBusiness:any;
  SelectedBusinessL1:any;
  SelectedBusinessL2:any;
  SelectedBusinessprocess:any;
  TypeofriskDB:any;
  RiskOwnerDB:any;
  RiskClassificationDB:any;
  RiskCatergrisationDB:any;
  RiskCauselistDB:any;
  DeparmentID:any;
  businessprocessID:any;
  businessProcessL1ID:any;
  businessProcessL2ID:any;
  LikelihoodDB:any;
  RiskFrequencyDB:any;
  SelectedDepartment:any;
  sessionData: any;
  EntityNameDB:any;
  EntityID:any;
  Entity:any;
  Unit:any;
  RiskStatementID:any;
  Selectedunit:any;
  UnitLocationMaster:any;
  DepartmentDB:any;
   SelectedEntity:any;
  tagboxvalue:any;
  Document:any;
  Definition:any;
  Attributes:any;
  Consequences:any;
  Ownership:any;
  Review:any;
  Statement:any;
  CategoryL1DB:any;
  CategoryL2DB:any;
  CategoryL3DB:any;
  LETCID:any;
  categoryID:any;
  categoryLETCID:any;
  SelectedRisk:any;
  BusinessImpactID:any;
  FrequencyVisible:boolean =false;
  isPanelVisible: boolean = false;
  FinalPanelVisible:boolean =false;
  isdoclinkpanelVisible:boolean=false;
  EnterDayspanelVisible:boolean=false;
  EnterReminderspanelVisible:boolean=false;
  NotifierspanelVisible:boolean=false;
  AdditionalpanelVisible:boolean=false;
  SearchLibraryPanelVisible:boolean =false;
  LibraryPanelVisible:boolean =true;
  Riskstepper:boolean=false;

  Periodicityds:Array<{id:string,text:string}>=[];
  searchText: string = '';
  circleBoxColor: any;
  BoxColor:any;
  sliderBoxColor:any;
  docTypeID:any;
  SelectedDocType:any;
  DocumentCategoryData:any;
  doc_CategoryID:any;
  SelectedDocCategory:any;
  DocumentSubCategoryData:any;
  NatureOfDocument:any;
  Functionalhead:any;
  addOnBlur = true;
  gridDataSource: any;
  selectedOption:any;
  adddocId:any;
  erroMessage:any;
  riskMessage:any;
  Risk:any;
  isLinkCopied: boolean = false;
  tags: Tag[] = [];
  Userinfo:any;
  gridBoxValue1: number[] = [];
  DropdownBox2=true;
  docApprover :any;
  AddMoreVisible:any;
  usergridColumns: any = [  {
    dataField: 'firstname',
    caption: 'Name'
        },'department_Master_name'];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  attachmentsList: Array<{ fileName: string; fileCategory: string }> = [];
  
  stepperVisible: boolean = false;
  phoneno=false;
  public project1: any[] = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Confidential' }
  ];
  EntityColumns: any =[
    { dataField: 'entity_Master_id', caption: 'Entity ID',visible: true },
    { dataField: 'entity_Master_Name', caption: ' Name' },
    { dataField: 'entity_Master_Desc', caption: 'Description', visible: false},
  
    { dataField: 'entity_Master_Status', caption: 'Status' ,visible: false},
    { dataField: 'entity_Master_createdDate', caption: 'Created Date', dataType: 'date' ,visible: false}
  ]
  UnitLocationColumns: any =[
    { dataField: 'unit_location_Master_id', caption: 'ID',visible: false },
    { dataField: 'unit_location_Master_name', caption: 'Location Name' },
    { dataField: 'unit_location_Master_Desc', caption: 'Description', visible: false},
    { dataField: 'entity_Master_id', caption: 'Entity ID', visible: false},
    { dataField: 'entity_Master_Name', caption: 'Entity name' },
    { dataField: 'unit_location_Master_Status', caption: 'Status' ,visible: false},
    { dataField: 'unit_location_Master_createdDate', caption: 'Created Date', dataType: 'date' ,visible: false}
  ]
  router: any;
  payload:any;
  Keywords_tags:any;
  Approver:any;
  inherColorValue:any;
  isButtonVisible: boolean = false;
  isStatementStepper:boolean=false;
  tableRiskStatementID:any;
  riskpkid:number=0;
  FolderName:any;
  activityids:any;
  inherRiskRatingID: number | undefined;
finishriskregistery:any;
countriskstatments:number=0;
name: string = '';
private apiUrl = 'http://your-api-url/api/AddRiskRegister/GetAddRiskRegisterDetails'; // Your actual API URL
  pharameters: any;
  constructor(private http: HttpClient, private session: SessionService, private fb: FormBuilder,
    private formBuilder: FormBuilder, public dialog: MatDialog, private route: ActivatedRoute,private stepperService: StepperService
  )
  {
    this.http.get(URL + '/tblUsers/GettblUsersDetails', {headers})
        .subscribe(res => {
          this.userdatalist=res as any;
          this.simpleProducts.splice(0,this.simpleProducts.length)
          this.userdatalist.forEach((element:any) => {
            this.simpleProducts.push(element.firstname)
            
          });
       
    
      });
    this.riskregister = this.fb.group({
      Entity:['',Validators.required],
      Unit:['',Validators.required],
      Deparment:['',Validators.required],
      Business:['',Validators.required],
      BusinessProcess:['',Validators.required],
          RiskRegis:['',Validators.required],
      ObjectiveRisk:['',],
     

     
      
    });
  //  this.riskregister = this.fb.group({
  //     Entity:[''],
  //     Unit:[''],
  //     Deparment:[''],
  //     Business:['',],
  //     BusinessProcess:[''],
  //     BusinessL1:['',],
  //     BusinessL2:['',],
  //     BusinessL3:['',],
  //     SubProcess:[''],
  //     RiskRegis:['',],
  //     ObjectiveRisk:['',],
     

     
      
  //   });
   
    this.Definition = this.fb.group({
      references: this.fb.array([]),
      RiskStatement:['',Validators.required],
      RiskDiscrip:['',Validators.required],
      referenceType:['',],
      referencetypeValue:['',],
      referencetypeValue1:['',],
      file_attachment:['',],
      BusinessL1:['',Validators.required],
      BusinessL2:['',Validators.required],
      BusinessL3:['',Validators.required],
      SubProcess:[''],
     
    });
  this.Attributes = this.fb.group({
      AMLCompliance:['',Validators.required],
      RootCause:['',Validators.required],
      Typerisk:['',Validators.required],
      RiskClassification:['',Validators.required],
      Catergrisation:['',Validators.required],
      Causelist:['',Validators.required],
      ModelRisk:['',Validators.required],
      ConductRisk:['',Validators.required],
      ITandCyber:['',Validators.required],
      ThirdParty:['',Validators.required],
      Fraud:['',Validators.required],
      Legal:['',Validators.required],
      Operational:['',Validators.required],
      Reputational:['',Validators.required],
      FinancialReporting:['',Validators.required],
      FinancialCostImpact:['',Validators.required],
      Impact:['',Validators.required],
      Likelihood:['',Validators.required],
      InherColor:[''],
      PriorityColor:[''],
      IntensityColor:[''],
      InherentRiskRating: [{ value: null, disabled: true }],
      RiskActivityFrequency:[],
      Priority:[''],
      SliderValue:[''],
      Intensity:[''],
      
    });
    this.Consequences = this.fb.group({
      CategoryL1:['',Validators.required],
      CategoryL1Descrpt:['',],
      CategoryL2:['',Validators.required],
      CategoryL2Descrpt:['',],
      CategoryL3:['',Validators.required],
      CategoryL3Descrpt:['',],
      BusinessImpact:['',Validators.required],
      BusinessImpactDescript:['',],
      Priventive:[''],
   });
   this.Ownership = this.fb.group({
    OwnershipControl:['',Validators.required],
    BusinessProcessOwner:['',Validators.required],
    BusinessProcessFunctionHead:['',Validators.required],
    ReviewfrequencyCheck: [0], 
   
 });
 this.Review = this.fb.group({
  Frequency:['',],
  entervalueDays:['',],
  Period:['',],
  dropdown:['',],
  entervalue:['',],
  Def_Notifiers:['',],
  Add_Notifiers:['',],
  dropdown2:['',],
  entervalue2:[''],
  Def_Notifiers2:['',],
  Add_Notifiers2:['',],
  dropdown3:['',],
  entervalue3:[''],
  Def_Notifiers3:[''],
  Add_Notifiers3:[''],
  dropdown4:[''],
  entervalue4:[''],
  Def_Notifiers4:[''],
  Add_Notifiers4:[''],
  review_start_Date:['']
});
this.Statement = this.fb.group({
  NameRegisterrisk:[''],
  NoOfStatements:['',],
  DocTypeID:['',Validators.required],
  Doc_CategoryID:['',Validators.required],
  Doc_SubCategoryID:['',Validators.required],
  Doc_Approver:[''],
   Eff_Date:[''],
  Doc_Confidentiality:['',Validators.required],
  NatureOf_Doc_id:['',Validators.required],
  Doc_internal_num:['',],
  Docphysical:['',],
  Functionalhead:['',],
  Appetite:['',Validators.required],
  appestatement:['',Validators.required],
  documentpub:['',],
  Keywords:['',],
  references2: this.fb.array([]),
  referenceType2:['',],
  file_attachment2:['',],
  OtpMethod: [''],
});

this.gridDataSource={
  paginate: true,
  store: new CustomStore({
      key: 'riskStatementID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/RiskStatement/GetRiskStatement' , {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
};
    let user: any = this.session.getUser();
      this.sessionData = JSON.parse(user);
      this.EntityNameDB={
        paginate: true,
           store: new CustomStore({
            key: 'entity_Master_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Adddocument/getentity/' + this.sessionData.profile.userid ,{headers})
            //this.http.get(URL + '/UnitMaster/GetEntityNames' + this.sessionData.profile.userid  ,{headers})
                .subscribe(res => {
                  (resolve(res));
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.Userinfo={
        paginate: true,
        store: new CustomStore({
            key: 'usR_ID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/UserMaster/GetActiveUserDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.Functionalhead={
        paginate: true,
        store: new CustomStore({
          key: 'risk_admin_RiskAppetiteId',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/risk_admin_riskappetite/Getrisk_admin_riskappetite', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.BusinessProcessDB={
        paginate: true,
        store: new CustomStore({
          key: 'businessprocessID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/BusinessProcess/GetBusinessProcessDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.BusinessProcessL1DB={
        paginate: true,
        store: new CustomStore({
          key: 'businessProcessL1ID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/BusinessSubProcessL1/GetBusinessSubProcesssL1', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.BusinessProcessL2DB={
        paginate: true,
        store: new CustomStore({
          key: 'businessProcessL2ID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/BusinessSubProcessL2/GetBusinessSubProcesssL2', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.BusinessProcessL3DB={
        paginate: true, 
        store: new CustomStore({
          key: 'businessProcessL3ID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/BusinessSubProcessL3/GetBusinessSubProcesssL3', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };

      this.TypeofriskDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_Admin_typeOfRisk_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/typeofRisk/GettypeofRisk', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.RiskClassificationDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_classification_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/riskClassification/GetriskClassification', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.RiskCatergrisationDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_risk_categorization_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/risk_admin_risk_categorization/Getrisk_admin_risk_categorization', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.RiskCauselistDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_causeList_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/risk_admin_causelist/Getrisk_admin_causelist', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.ImpactDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_riskImpactRating_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/adminRiskImpact/GetadminRiskImpact', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.BusinessImpactDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_potenBussImpactid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/risk_admin_potenbussimpact/Getrisk_admin_potenbussimpact', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.LikelihoodDB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_likeoccfact_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/risk_admin_likeoccfact/Getrisk_admin_likeoccfact', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      // this.RiskFrequencyDB={
      //   paginate: true, 
      //   store: new CustomStore({
      //     key: 'activityid',
      //       loadMode: 'raw',
      //       load:()=>{return new Promise((resolve, reject) => {
      //         this.http.get(URL + '/adminactivityfrequency/Getadminactivityfrequency', {headers})
      //           .subscribe(res => {
      //            (resolve(res));
      
      //           }, (err) => {
      //             reject(err);
      //           });
      //     });
      //     },
      //   }),
      // };
      // this.RiskFrequencyDB = {
      //   paginate: true,
      //   store: new CustomStore({
      //     key: 'activityid',
      //     load: (loadOptions) => {
      //       // Here, you would handle filtering or loading data based on `loadOptions`
      //       return new Promise((resolve, reject) => {
      //         this.http.get(URL + '/adminactivityfrequency/Getadminactivityfrequency', { headers })
      //           .subscribe(
      //             (res: any) => {
      //               // Optionally apply filter logic here based on loadOptions
      //               resolve(res);
      //             },
      //             (err) => {
      //               reject(err);
      //             }
      //           );
      //       });
      //     }
      //   })
      // };
      this.RiskFrequencyDB = this.makeAsyncDataSource(this.http);
      this.CategoryL1DB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_LETC_L1_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/RiskSupAdminController/Getrisk_admin_letc_l1', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.CategoryL2DB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_letc_l2_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/RiskSupAdminController/Getrisk_admin_letc_l2', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.CategoryL3DB={
        paginate: true, 
        store: new CustomStore({
          key: 'risk_admin_LETC_l3_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/RiskSupAdminController/Getrisk_admin_letc_l3', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.DocumentTypeData={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.NatureOfDocument={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/NatureOfDocument/GetNatureOfDocumentDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
    
   


      // this.RiskOwnerDB={
      //   paginate: true, 
      //   store: new CustomStore({
      //     key: 'user_location_mapping_id',
      //       loadMode: 'raw',
      //         load:()=>{return new Promise((resolve, reject) => {
      //         this.http.get(URL + '/Riskuserlocationmapping/GetRiskuserlocationmapping', {headers})
      //           .subscribe(res => {
      //            (resolve(res));
      
      //           }, (err) => {
      //             reject(err);
      //           });
      //     });
      //     },
      //   }),
      // };
    this.http.get(URL + '/tblUsers/GettblUsersDetails', {headers})
    .subscribe(res => {
      this.userdatalist=res as any;
      this.simpleProducts.splice(0,this.simpleProducts.length)
      this.userdatalist.forEach((element:any) => {
        this.simpleProducts.push(element.firstname)
      });
   

  });

    this.Periodicityds=[
      { id:'BDD(ex)',text:'BDD(ex) – excluding due date' },
      { id:'BDD(in)',text:'BDD(in) – including due date'  },
         
 ];

  }
  makeAsyncDataSource(http: HttpClient) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'activityid',
      load: () => {
        return lastValueFrom(
          http.get(`${URL}/adminactivityfrequency/Getadminactivityfrequency`, { headers })
        ).catch((error) => {
          console.error("Data load failed", error);
          throw error;
        });
      },
    });
  }
  
  ngOnInit(): void {
   
    console.log('RiskCreateriskDocumentComponent initialized');
    this.stepperService.stepperVisible$.subscribe((isVisible) => {
     this.stepperVisible = isVisible;
    
     this.Statement.controls["NameRegisterrisk"].setValue(this.riskregister.get('RiskRegis').value)
     this.Statement.controls["NoOfStatements"].setValue(this.countriskstatments+1)
     
     
    });
   
    let user: any = this.session.getUser();
 
    this.userdata = JSON.parse(user);
 
    console.log("userid", this.userdata.profile.userid);

    this.riskregister.get('RiskRegis')?.valueChanges.subscribe((value: any) => {
      console.log('Textarea value changed:', value);

      // Call the API to check the value
      this.checkValueInDB( this.riskregister.get('RiskRegis').value);
    });
  }
  checkValueInDB(value: any){

    this.http.get(URL + '/Risk_AddRegisterController/checkregistername?nameofriskreg='+ this.riskregister.get('RiskRegis').value, {headers})
    .subscribe(
      res => {
        if(res==0){

       }
      else{
       // If the name exists, show an error dialog
       this.erroMessage = 'The name already exists. Please choose another.';
       this.dialog.open(DaidailogeComponent, {
         width: '400px',
         data: { message: this.erroMessage }
       });
      }
     
      
      },
      error => {
        // Handle error here and show an alert
        console.error('Error:', error); // Log the error for debugging
        alert('No acceptable values found for the specified range.');
      }
    );
  }
  copyLink(link: string) {
    const el = document.createElement('textarea');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.isLinkCopied = true;
    setTimeout(() => {
      this.isLinkCopied = false;
    }, 3000);
  }
  download(filePath: string, fileType: string): void {
    //alert(filePath)
    const apiUrl = `${URL}/actdownload/actDownLoadFiles?filePath=${filePath}`;
  
    this.http.get(apiUrl, { responseType: 'blob' }).pipe(
      catchError((error: any) => {
        console.error('Error occurred while downloading file:', error);
        return throwError('Something went wrong in file download. Please try again later.');
      })
    ).subscribe((res: Blob) => {
  console.log(res)
      const filenameFromUrl = this.extractFilenameFromUrl(filePath);
        const blob = new Blob([res], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filenameFromUrl;
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  }
  extractFilenameFromUrl(url: string): string {
    // Extract the filename part from the URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  sliderchange(event:any,data:any){
    data.setValue(event.value);
      }
    
      onInput() {
        this.resize();
       }
       private resize() {
        const textareaElement = this.textarea.nativeElement;
        //textareaElement.style.overflow = 'hidden';
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
      onFrequencyvisible(event:any){
      if (event.value == 'Yes') {
        this.FrequencyVisible = true; 
      } else if (event.value == 'No') {
        this.FrequencyVisible = false; 
      } else {
        this.FrequencyVisible = false; 
      }
      }
      onCheckboxChange(event: any) {

        console.log('Checkbox for Document review frequency changed:', event.target.checked);
        this.isPanelVisible = event.target.checked;
        //this.updateValidators();
        // alert(this.Review.get('ReviewfrequencyCheck') )
        const reviewFrequencycheck = event.target.checked ? 1 : 0;
        this.Ownership.get('ReviewfrequencyCheck').setValue(reviewFrequencycheck);
      
       
      }
    
      resetSearch(): void {
        this.searchText = '';
        // this.dataSource.data = [...this.originalData];
        // this.complianceCount = this.dataSource.data.length;
      }
      selectDocConfidentiality(event: any){

        console.log('Selected:', event.value);
    
        if (event.value === 'General') {
    
          // this.General = true;
    
          // this.confidential=false;
    
          this.phoneno=false;
          this.Statement.get('OtpMethod').setValue("N/A");
        }
    
        else {
    
          this.phoneno=true;
          this.Statement.get('OtpMethod').setValue("email");
          // this.General = false;
    
          // this.confidential=true;
    
        }
    
      }
    
     getDocCategory(event: any) {
        console.log("selected Type id: ", event.value);
        this.docTypeID = event.value;
         this.SelectedDocType=null;  
        this.DocumentCategoryData={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+this.docTypeID, {headers})
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
       getsubCategory(event: any) {
        console.log("selected Type id: ", event.value);
        this.doc_CategoryID = event.value;
         this.SelectedDocCategory=null;  
        this.DocumentSubCategoryData={
          paginate: true,
          store: new CustomStore({
              key: 'Value',
              loadMode: 'raw',
              load:()=>{return new Promise((resolve, reject) => {
                this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.doc_CategoryID, {headers})
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
  getUnitLocation(e: any) {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    console.log("selected Entity_Master_id : ", e.value);
    this.EntityID = e.value;
    this.Selectedunit = null;
     const entityParams = this.EntityID.map((id: number) => `entityids=${id}`).join('&');
     this.UnitLocationMaster = {
        paginate: true,
        store: new CustomStore({
            key: 'unit_location_Master_id',
            loadMode: 'raw',
            load: () => {
                return new Promise((resolve, reject) => {
                   this.http.get(URL + `/Adddocument/getunitlocation?userid=${this.sessionData.profile.userid}&${entityParams}`, { headers })
                 // this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails/'+this.EntityID, {headers})
                        .subscribe((res: any) => {
                            resolve(res);
                        }, (err) => {
                            reject(err);
                        });
                });
            },
        }),
    };
}
getDepartment(e: any) {
   let user: any = this.session.getUser();
  this.sessionData = JSON.parse(user);
  console.log("selected unit_location_Master_id : ", e.value);
  this.UnitID = e.value;
  this.SelectedDepartment = null;
   //const UnitParams = this.UnitID.map((id: number) => `unitids=${id}`).join('&');
   //alert(this.UnitID)
    this.DepartmentDB = {
      paginate: true,
      store: new CustomStore({
          key: 'department_Master_id',
          loadMode: 'raw',
          load: () => {
              return new Promise((resolve, reject) => {
                 //alert(`User ID is: ${this.UnitID}`);
               this.http.get(URL + '/RiskDeparment/GetRiskDeparment/'+this.UnitID, {headers})
                      .subscribe((res: any) => {
                          resolve(res);
                      }, (err) => {
                          reject(err);
                      });
              });
          },
      }),
     // filter: e.value ? ['entity_Master_id', '=', e.value] : null,
  };
  this.RiskOwnerDB={
    paginate: true, 
    store: new CustomStore({
      key: 'user_location_mapping_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          const Entity_Master_id= parseInt(this.riskregister.get('Entity')?.value) || 0;
          const Unit_location_Master_id= parseInt(this.riskregister.get('Unit')?.value) || 0;

          //this.http.get(URL + '/Riskuserlocationmapping/GetRiskuserlocationmapping/${EntityMasterid}/${Unitid}',  {headers})
          this.http.get(URL + '/Riskuserlocationmapping/GetRiskuserlocationmapping?EntityMasterid='+Entity_Master_id+'&&Unitid='+Unit_location_Master_id+'',  {headers})  
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
CategoryL1(e:any){
  console.log("selected risk_admin_LETC_L1_id : ", e.value);
  this.LETCID = e.value;
  this.SelectedRisk = null;
    this.http.get(URL + '/RiskDeparment/GetLossEventThreatCategoryL1/'+this.LETCID, {headers})
                    .subscribe((res: any) => {
                     console.log(JSON.stringify(res))
                        this.Consequences.controls['CategoryL1Descrpt'].setValue(res[0].risk_admin_LETC_L1_show_desc)
                    }, (err) => {
                        console.log(err);
                    });
          
}
CategoryL2(e:any){
  this.categoryID = e.value;
  
   this.http.get(URL + '/RiskDeparment/GetLossEventThreatCategoryL2/'+this.categoryID, {headers})
  .subscribe((res: any) => {
  console.log(JSON.stringify(res))
  this.Consequences.controls['CategoryL2Descrpt'].setValue(res[0].risk_admin_letc_l2_show_desc)
                    }, (err) => {
                      console.log(err);
                    });
        
       
}
CategoryL3(e:any){
  this.categoryLETCID = e.value;
 
                  this.http.get(URL + '/RiskDeparment/GetLossEventThreatCategoryL3/'+this.categoryLETCID, {headers})
                    .subscribe((res: any) => {
               this.Consequences.controls['CategoryL3Descrpt'].setValue(res[0].risk_admin_LETC_l3_desc)
                    }, (err) => {
                        console.log(err);
                    });
     
}
BusinessImpactValue(e:any){
  this.BusinessImpactID = e.value;
 
                  this.http.get(URL + '/RiskDeparment/Getriskpotenbussimpact/'+this.BusinessImpactID, {headers})
                    .subscribe((res: any) => {
               this.Consequences.controls['BusinessImpactDescript'].setValue(res[0].risk_admin_potenBussImpactdesc)
                    }, (err) => {
                        console.log(err);
                    });
           
}
getBusinessFunction(e: any) {
  console.log("selected department_Master_id : ", e.value);
 this.DeparmentID = e.value;
 this.SelectedBusiness = null;
   //alert(this.DeparmentID)
   this.FunctionDB = {
     paginate: true,
     store: new CustomStore({
         key: 'riskBusinessfunctionid',
         loadMode: 'raw',
         load: () => {
             return new Promise((resolve, reject) => {
                            this.http.get(URL + '/RiskBusinessFunction/GetRiskBusinessFunction/'+this.DeparmentID, {headers})
                     .subscribe((res: any) => {
                         resolve(res);
                     }, (err) => {
                         reject(err);
                     });
             });
         },
     }),
  };
//notifiers
    this.Entity = this.riskregister.value.Entity_Master_id;
    this.Unit =this.riskregister.value.Unit_location_Master_id;
    this.Deparment = e.value;
   //alert(event.value)
           this.http.get(URL + '/RiskDefaultNotifiers/GetRiskDefaultNotifiers', {headers})
              .subscribe((res:any) => {
            const emaildata=res.filter((item:any)=>{return item.Entity==this.riskregister.value.Entity_Master_id && item.Unit==this.riskregister.value.Unit_location_Master_id
            && item.riskregister==e.value})
            this.notifieremails.slice(0,this.notifieremails.length);
    console.log('notifiers',this.notifieremails)
    emaildata.forEach((element:any) => {
      element.emailid.forEach((item:any)=>{
        if(!this.notifieremails.includes(item)){
          this.notifieremails.push(item)
         
        }
       
      });
      element.additional_emailid_notifiers.forEach((item:any)=>{
        if(!this.notifieremails.includes(item)){
          this.notifieremails.push(item)
       }
    });
      this.Review.controls["Def_Notifiers"].setValue(this.notifieremails);
      this.Review.controls["Def_Notifiers"].disable();
      this.Review.controls["Def_Notifiers2"].setValue(this.notifieremails);
      this.Review.controls["Def_Notifiers2"].disable();
      this.Review.controls["Def_Notifiers3"].setValue(this.notifieremails);
      this.Review.controls["Def_Notifiers3"].disable();
      this.Review.controls["Def_Notifiers4"].setValue(this.notifieremails);
      this.Review.controls["Def_Notifiers4"].disable();
    });
 });

}
getProcessL1(e: any) {
  console.log("selected businessprocessID : ", e.value);
 this.businessprocessID = e.value;
 this.SelectedBusinessprocess = null;
   //alert(this.DeparmentID)
   this.BusinessProcessL1DB = {
     paginate: true,
     store: new CustomStore({
         key: 'businessProcessL1ID',
         loadMode: 'raw',
         load: () => {
             return new Promise((resolve, reject) => {
                            this.http.get(URL + '/BusinessProcess/GetBusinessProcess/'+this.businessprocessID, {headers})
                     .subscribe((res: any) => {
                      this.Definition.controls['SubProcess'].setValue(res[0].subProcessObjestive)

                         resolve(res);
                     }, (err) => {
                         reject(err);
                     });
             });
         },
     }),
  };
}
getProcessL2(e: any) {
  console.log("selected businessProcessL1ID : ", e.value);
 this.businessProcessL1ID = e.value;
 this.SelectedBusinessL1 = null;
 this.BusinessProcessL2DB = {
     paginate: true,
     store: new CustomStore({
         key: 'businessProcessL2ID',
         loadMode: 'raw',
         load: () => {
             return new Promise((resolve, reject) => {
                            this.http.get(URL + '/BusinessProcessL1/GetBusinessProcessL1/'+this.businessProcessL1ID, {headers})
                     .subscribe((res: any) => {
                      
                         resolve(res);
                     
                     }, (err) => {
                         reject(err);
                     });
             });
         },
     }),
  };
}
getProcessL3(e: any) {
  console.log("selected businessProcessL2ID : ", e.value);
 this.businessProcessL2ID = e.value;
 this.SelectedBusinessL2 = null;
 this.BusinessProcessL3DB = {
     paginate: true,
     store: new CustomStore({
         key: 'businessProcessL3ID',
         loadMode: 'raw',
         load: () => {
             return new Promise((resolve, reject) => {
                            this.http.get(URL + '/BusinessProcessL2/GetBusinessProcessL2/'+this.businessProcessL2ID, {headers})
                     .subscribe((res: any) => {
                         resolve(res);
                     }, (err) => {
                         reject(err);
                     });
             });
         },
     }),
  };
}
SelectFrequencyPeriod(event: any){
  console.log('Selected:', event.value);
  if (event.value==='Days' || event.value==='Week' || event.value==='Month' || event.value==='Year') {
    this.TextBox1=true;
  }
  else {
    this.TextBox1=false;
      }

}
Reminders(event:any){
  console.log('Checkbox for Asha:', event.target.checked);
  this.EnterReminderspanelVisible = event.target.checked;
}
  onEscaltion(event:any){
    console.log('Checkbox for Asha:', event.target.checked);
    this.EnterDayspanelVisible = event.target.checked;
    this.onEscaltionValidatorsa();
  
  }
  onNotifiers(event:any){
    if(this.EnterDayspanelVisible){
      this.EnterDayspanelVisible=true;
      console.log('Checkbox for Asha:', event.target.checked);
      this.NotifierspanelVisible = event.target.checked;
      this.onNotifiersValidations();
    }
    else{
      this.NotifierspanelVisible=false;
      this.EnterDayspanelVisible=false;
      alert("Select frist Escalation");
      event.target.checked=false;
    
    }
  }
  onAdditional(event:any){
      if(this.EnterDayspanelVisible){
       this.EnterDayspanelVisible=true;
      console.log('Checkbox for Asha:', event.target.checked);
      this.AdditionalpanelVisible = event.target.checked;
      this.onAdditionalValidations();
    }
    else{
      this.AdditionalpanelVisible=false;
      this.EnterDayspanelVisible=false;
      alert("Select Frist and Second Escalation");
      event.target.checked=false;
  }
 }
 onGridBoxSelectionChanged(e: any) {
 
  if (e.selectedRowsData && e.selectedRowsData.length > 0) {
      const userNames = e.selectedRowsData.map((user: any) => user.firstname);
    this.docApprover = userNames.join(', ');
   localStorage.setItem('docApprover',  this.docApprover);
      console.log("Selected Doc Approvers:",  this.docApprover);
    console.log("onGridBoxSelectionChanged",JSON.stringify(localStorage.getItem('docApprover')))
  } else {
       localStorage.removeItem('docApprover');
    this.docApprover = null;
  }
}
 onAdditionalValidations(){
  if (this.AdditionalpanelVisible) {
    (this.Review.get('dropdown3') as FormControl).setValidators([Validators.required]);
    (this.Review.get('entervalue3') as FormControl).setValidators([Validators.required]);

  } else {
   (this.Review.get('dropdown3') as FormControl).clearValidators();
    (this.Review.get('entervalue3') as FormControl).clearValidators();
  }
   (this.Review.get('dropdown3') as FormControl).updateValueAndValidity();
  (this.Review.get('entervalue3') as FormControl).updateValueAndValidity();
}

  onNotifiersValidations(){
    if (this.NotifierspanelVisible) {
      (this.Review.get('dropdown2') as FormControl).setValidators([Validators.required]);
      (this.Review.get('entervalue2') as FormControl).setValidators([Validators.required]);

    } else {
     (this.Review.get('dropdown2') as FormControl).clearValidators();
      (this.Review.get('entervalue2') as FormControl).clearValidators();
    }
     (this.Review.get('dropdown2') as FormControl).updateValueAndValidity();
    (this.Review.get('entervalue2') as FormControl).updateValueAndValidity();
  }
  onEscaltionValidatorsa(){
    if (this.EnterDayspanelVisible) {
      (this.Review.get('dropdown') as FormControl).setValidators([Validators.required]);
      (this.Review.get('entervalue') as FormControl).setValidators([Validators.required]);

    } else {
     (this.Review.get('dropdown') as FormControl).clearValidators();
      (this.Review.get('entervalue') as FormControl).clearValidators();
    }
     (this.Review.get('dropdown') as FormControl).updateValueAndValidity();
    (this.Review.get('dropdown') as FormControl).updateValueAndValidity();
  }
  togglePanelVisibility() {
    this.isPanelVisible = !this.isPanelVisible;
    //this.FinalPanelVisible = true;
    this.EnterDayspanelVisible = !this.EnterDayspanelVisible;
  }
  
 
  stepper1(){

  }
  stepper4(){}

  stepper5(){
    
  }

  onCustomItemCreating(e: any) {
    const newValue = e.text;
    if (this.validateEmailFormat(newValue)) {
      e.customItem = newValue;
    } else {
      e.customItem = null;
      e.cancel = true;
    }
  }
  validateEmailFormat(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  onCustomItemCreating1(e:any) {
    const newValue1:any = e.text;
    if (this.validateEmailFormat(newValue1)) {
    
      e.customItem = {usR_ID:newValue1,firstname:newValue1,emailid:newValue1};
    } else {
      alert("Enter Valid Email ID")
  
      e.customItem = null;
      e.cancel = true;
     
  }
  }
  onReferenceTypeChange(defaultValue:string,j:number): void {
    const selectedValue = defaultValue;
    //alert(selectedValue)
    const referenceType = this.actForm.get('referenceType').value;
    const additionalReferences = this.actForm.get('additionalReferences') as FormArray;
    additionalReferences.clear();
    if (additionalReferences.length < 4) {
      if (selectedValue === 'weblink') {
        additionalReferences.push(this.createReferenceControl('weblink'));
      
      } else if (selectedValue === 'file') {
        additionalReferences.push(this.createReferenceControl('file'));
      }
      else if (selectedValue === 'Text') {
        additionalReferences.push(this.createReferenceControl('Text'));
      }
    } else {
     // alert('Maximum limit reached for additional references');
    }
  }
  onReferenceTypeChange2(defaultValue:string,j:number): void {
    const selectedValue = defaultValue;
    
    const referenceType = this.actForm.get('referenceType2').value;
    const additionalReferences = this.actForm.get('additionalReferences') as FormArray;
    additionalReferences.clear();
    if (additionalReferences.length < 4) {
      if (selectedValue === 'file') {
        additionalReferences.push(this.createReferenceControl('file'));
      }
      
    } else {
     // alert('Maximum limit reached for additional references');
    }
  }
  createReferenceControl(type: string): FormGroup {
    if (type === 'weblink') {
        return this.fb.group({
            type: [type],
            value: ['']
        });
    } else if (type === 'file') {
        return this.fb.group({
            type: [type],
            value: [''], 
            fileValue: [''] 
        });
    }

   
    return this.fb.group({
        type: [''],
        value: ['']
    });
}
onMainFileSelected(event: any,referenceIndex: number) {
  const file: File = event.target.files[0]; 
  if (file) {
    if (file.size > this.maxSize * 1024 * 1024) {
    //  this.mainErrorMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
      return;
    }
   
    this.fileAttach.push(file);
    const referenceFormGroup = this.references.controls[referenceIndex] as FormGroup;
    referenceFormGroup.get('file_attachment')?.setValue(file.name);
    console.log('Form Value:', referenceFormGroup.value);
   
  }
}
onMainFileSelected2(event: any,referenceIndex: number) {
  const file: File = event.target.files[0]; 
  if (file) {
    if (file.size > this.maxSize * 1024 * 1024) {
    //  this.mainErrorMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
      return;
    }
    this.fileAttach2.push(file);
    const referenceFormGroup = this.references2.controls[referenceIndex] as FormGroup;
    referenceFormGroup.get('file_attachment2')?.setValue(file.name);
    console.log('Form Value:', referenceFormGroup.value);
   
  }
}
get references2():FormArray{
  return this.Statement.get('references2') as FormArray;
}
get references():FormArray{
  return this.Definition.get('references') as FormArray;
}
removeReferenceField2(index:number){
  this.references2.removeAt(index);
}
removeReferenceField(index:number){
  this.references.removeAt(index);
}
addReferenceField(): void {
  if(this.references.length<5){
   const referenceGroup = this.fb.group({
     referenceType: [''],
     referencetypeValue: [''],
     referencetypeValue1: [''],
     file_attachment: ['']
   });
   this.references.push(referenceGroup);

 }
   else{
     alert("Only 5 Add References need to be Add")
   }
  }
  addReferenceField2(): void {
        if(this.references2.length<5){
     const referenceGroup2 = this.fb.group({
      referenceType2: [''],
      file_attachment2: ['']
     });
     this.references2.push(referenceGroup2);
  
   }  
     else{
       alert("Only 5 Add References need to be Add")
     }
    }
 /// payload
createPayload(): any {
  //alert(JSON.stringify(this.createPayload))
//alert(this.Review.get('review_start_Date'))
let startDate: string | null = null;
const reviewStartDateControl = this.Review.get('review_start_Date');
if (reviewStartDateControl) {
    console.log("review_start_Date value:", reviewStartDateControl.value); // Log the value
    if (reviewStartDateControl.value) {
        const parsedDate = new Date(reviewStartDateControl.value);
        if (!isNaN(parsedDate.getTime())) { // Validate if the parsedDate is a valid date
            startDate = parsedDate.toISOString().slice(0, 19).replace('T', ' ');
            console.log("Parsed startDate:", startDate);
        } else {
            console.log('Invalid date format');
        }
    } 
} else {
    console.log('review_start_Date control not found');
}

let EffectiveDate: string | null = null;
const EffectiveDateControl = this.Statement.get('Eff_Date');
if (EffectiveDateControl) {
    console.log("Eff_Date value:", EffectiveDateControl.value); // Log the value
    if (EffectiveDateControl.value) {
        const parsedDate = new Date(EffectiveDateControl.value);
        if (!isNaN(parsedDate.getTime())) { // Validate if the parsedDate is a valid date
          EffectiveDate = parsedDate.toISOString().slice(0, 19).replace('T', ' ');
            console.log("Parsed startDate:", EffectiveDate);
        } else {
            console.log('Invalid date format');
        }
    } 
} else {
    console.log('Effective Date control not found');
}
const UpdateKeywords = this.Statement.get('Keywords').value;

if (Array.isArray(UpdateKeywords) && UpdateKeywords.length > 0) {
  this.Keywords_tags = UpdateKeywords.join(', ');
  // Additional code inside the condition if needed
} else {
  // Handle the case where no value is selected (null or empty array)
  console.log('No key values');
}
// const DocumentApproverformate = this.Statement.get('Doc_Approver').value;

// if (Array.isArray(DocumentApproverformate) && DocumentApproverformate.length > 0) {
//   this.Approver = DocumentApproverformate.join(', ');
//  } else {
//    console.log('No key values');
// }

//=====



let RiskStatementID1:any;
let RiskDefSelection:any;
//alert(parseInt(this.RiskStatementID))
if (this.RiskStatementID && !isNaN(parseInt(this.RiskStatementID))) {
  RiskStatementID1 = parseInt(this.RiskStatementID, 10); // Parse as base 10
  RiskDefSelection ='select'
} else if (this.tableRiskStatementID && !isNaN(parseInt(this.tableRiskStatementID))) {
  RiskStatementID1 = parseInt(this.tableRiskStatementID, 10); // Parse as base 10
  RiskDefSelection='Text'
} else {
  RiskStatementID1 = null; // Handle case where both are invalid
}

  this.payload = {

     //alert(this.riskregister.get('Entity').value!=null?parseInt(this.riskregister.get('Entity').value):0)
   //const Risk_AddRegisterModel={
    // Entity_Master_id :this.riskregister.get('Entity').value!=null?parseInt(this.riskregister.get('Entity').value):0,
    Entity_Master_id: parseInt(this.riskregister.get('Entity')?.value) || 0,
    Unit_location_Master_id: parseInt(this.riskregister.get('Unit')?.value) || 0,
    department_Master_id: parseInt(this.riskregister.get('Deparment')?.value) || 0,
    riskBusinessfunctionid: parseInt(this.riskregister.get('Business')?.value) || 0,
    businessprocessID: parseInt(this.riskregister.get('BusinessProcess')?.value) || 0,
    BusinessProcessL1ID: parseInt(this.Definition.get('BusinessL1')?.value) || 0,
    BusinessProcessL2ID: parseInt(this.Definition.get('BusinessL2')?.value) || 0,
    BusinessProcessL3ID: parseInt(this.Definition.get('BusinessL3')?.value) || 0,
    BusinessSubProcessObjective: this.Definition.get('SubProcess').value,
    NameofRiskDocumentRegister: this.riskregister.get('RiskRegis').value,
    ObjectiveofRiskDocument: this.riskregister.get('ObjectiveRisk').value,
     RiskRootCause: this.Attributes.get('RootCause').value,
     risk_Admin_typeOfRisk_id: parseInt(this.Attributes.get('Typerisk')?.value) || 0,
     risk_admin_classification_id: parseInt(this.Attributes.get('RiskClassification')?.value) || 0,
     risk_admin_risk_categorization_id: parseInt(this.Attributes.get('Catergrisation')?.value) || 0,
     risk_admin_causeList_id: parseInt(this.Attributes.get('Causelist')?.value) || 0,
     AMLComplianceRisk: this.Attributes.get('AMLCompliance').value,
    ModelRisk: this.Attributes.get('ModelRisk').value,
    ConductRisk: this.Attributes.get('ConductRisk').value,
    ITCyberSecurity: this.Attributes.get('ITandCyber').value,
    ThirdPartyOutsourcing: this.Attributes.get('ThirdParty').value,
    FraudRisk: this.Attributes.get('Fraud').value,
    LegalRisk: this.Attributes.get('Legal').value,
    OperationalRisk: this.Attributes.get('Operational').value,
    ReputationalRisk: this.Attributes.get('Reputational').value,
    FinancialRiskReporting: this.Attributes.get('FinancialReporting').value,
    RiskCostImpact: this.Attributes.get('FinancialCostImpact').value,
    risk_admin_riskImpactRating_id: parseInt(this.Attributes.get('Impact')?.value) || 0,
    risk_admin_likeoccfact_id: parseInt(this.Attributes.get('Likelihood')?.value) || 0,
    InherentRiskRating: parseInt(this.Attributes.get('InherentRiskRating')?.value) || 0,
    activityvalue: parseInt(this.activityids) || 0,
    RiskPriority: parseInt(this.Attributes.get('Priority')?.value) || 0,
    Slidervalue: parseInt(this.Attributes.get('SliderValue')?.value) || 0,
    RiskIntensity: parseInt(this.Attributes.get('Intensity')?.value) || 0,
    risk_admin_LETC_L1_id: parseInt(this.Consequences.get('CategoryL1')?.value) || 0,
    CategoryL1Description: this.Consequences.get('CategoryL1Descrpt').value,
    risk_admin_letc_l2_id: parseInt(this.Consequences.get('CategoryL2')?.value) || 0,
    CategoryL2Description: this.Consequences.get('CategoryL2Descrpt').value,
    risk_admin_LETC_l3_id: parseInt(this.Consequences.get('CategoryL3')?.value) || 0,
    CategoryL3Description: this.Consequences.get('CategoryL3Descrpt').value,  
    risk_admin_potenBussImpactid: parseInt(this.Consequences.get('BusinessImpact')?.value) || 0,
    PotentialImpactDescription: this.Consequences.get('BusinessImpactDescript').value, 
    SuggestivePriventive: this.Consequences.get('Priventive').value,
    RepeatReviewFrequency: this.Review.get('Frequency').value, 
    EnterValueforrepeat: parseInt(this.Review.get('entervalueDays')?.value) || 0,
    Selectfrequencyperiod: this.Review.get('Period').value, 
    StartDateNextReview: startDate,
    InherentRatingColor: this.circleBoxColor,
    RiskPirorityColor:this.BoxColor,
    RiskIntensityColor:this.sliderBoxColor,
    RiskOwnership: this.Ownership.get('OwnershipControl').value || 0,
    ProcessOwner: this.Ownership.get('BusinessProcessOwner').value || 0,
    BusinessProcessHead: this.Ownership.get('BusinessProcessFunctionHead').value || 0,
  
    ReviewfrequencyCheck: this.Ownership.get('ReviewfrequencyCheck').value || 0,
       activityid:this.Attributes.get('RiskActivityFrequency').value|| 0,

  // Final Page Document
       NameOfRisRegister: this.Statement.get('NameRegisterrisk').value,
       NoOfRiskStatements: parseInt(this.Statement.get('NoOfStatements')?.value) || 0,
       docTypeID: parseInt(this.Statement.get('DocTypeID')?.value) || 0,
       doc_CategoryID: parseInt(this.Statement.get('Doc_CategoryID')?.value) || 0,
       doc_SubCategoryID: parseInt(this.Statement.get('Doc_SubCategoryID')?.value) || 0,
       DocumentEffectiveDate: EffectiveDate,
       DocumentConfidentiality: this.Statement.get('Doc_Confidentiality').value,
       OtpMethod: this.Statement.get('OtpMethod').value,
       natureOf_Doc_id: parseInt(this.Statement.get('NatureOf_Doc_id')?.value) || 0,
       InternalReferenceNo: parseInt(this.Statement.get('Doc_internal_num')?.value) || 0,
       PhysicalVaultLocation: this.Statement.get('Docphysical').value,
       BusinessFunctionHead: this.Statement.get('Functionalhead').value || 0,
       risk_admin_RiskAppetiteId: parseInt(this.Statement.get('Appetite')?.value) || 0,
       AppetiteStatement: this.Statement.get('appestatement').value,
       PublishingRemarks: this.Statement.get('documentpub').value,
       Keywords: this.Keywords_tags,
       RiskStatementID:RiskStatementID1,
       Finish:this.finishriskregistery,
       RiskDefinition:RiskDefSelection,
      // DocumentApprover:this.docApprover
  //}
     };
 // return this.payload;
}
Finish(){
  
  this.finishriskregistery=1;
//alert( this.finishriskregistery)
this.insert();


}

insert(){
  let invalidFields = this.invalidFields();
  this.forminvalidfields=[];
   invalidFields = invalidFields.filter((item: string) => item.trim() !== "");
  this.forminvalidfields = invalidFields;
  if (this.forminvalidfields.length > 0) {
    this.erroMessage = `Please provide valid information for the following fields: ${this.forminvalidfields.join(', ')}`;
    this.dialog.open(DaidailogeComponent, {
      width: '900px',
      data: { message: this.erroMessage }
    });
    this.riskregister.setErrors({ invalidFields: true });
    this.Definition.setErrors({ invalidFields: true });
    this.Attributes.setErrors({ invalidFields: true });
    this.Consequences.setErrors({ invalidFields: true });
    this.Ownership.setErrors({ invalidFields: true });
    return;  
  }
  else {  
 
//   console.log(JSON.stringify(this.payload))
//   const formData1: FormData = new FormData();
//    //alert(JSON.stringify(FormData))
//   formData1.append('jsonPayload', JSON.stringify(this.payload));

//   if (this.fileAttach2 && this.fileAttach2.length > 0) {
//     this.fileAttach2.forEach((file, index) => {
//         formData1.append(`fileAttach2[${index}]`, file);
//     });
//   }

// (formData1 as any).forEach((value: any, key: any) => {
//     console.log(`${key}:`, value);

// });

if (this.Definition.valid) {

  const userId = this.userdata.profile.userid;
  const formData: FormData = new FormData();
  // const riskRegisterMasterID:any = localStorage.getItem('RiskRegisterMasterID');
  // alert(localStorage.getItem('RiskRegisterMasterID'))
  formData.append('RiskStatement', this.Definition.value.RiskStatement);
  formData.append('RiskDescription', this.Definition.value.RiskDiscrip);
  formData.append('userid',userId);
//   formData.append('RiskRegisterMasterID',riskRegisterMasterID);
// alert(riskRegisterMasterID)
if (this.fileAttach.length > 0) {
this.fileAttach.forEach((file, index) => {
  formData.append(`fileAttach[${index}]`, file);
});
}
  const weblinkValues: string[] = [];
  const referencesArray = this.Definition.get('references')?.value || [];
  for (let i = 0; i < referencesArray.length; i++) {
    const referenceType = referencesArray[i].referenceType;
    if (referenceType === 'weblink') {
      const weblinkValue = referencesArray[i].referencetypeValue;
      if (weblinkValue) {
        weblinkValues.push(weblinkValue);
      }
    }
  }

  if (weblinkValues.length > 0) {
    formData.append('weblink', weblinkValues.join(';'));
  }

  const TextFieldValues: string[] = [];
  for (let i = 0; i < referencesArray.length; i++) {
    const referenceTypetext = referencesArray[i].referenceType;
    if (referenceTypetext === 'Text') {
      const FieldValue = referencesArray[i].referenceText;
      if (FieldValue) {
        TextFieldValues.push(FieldValue);
      }
    }
  }

  if (TextFieldValues.length > 0) {
    formData.append('Text', TextFieldValues.join(';'));
  }

this.http.post(URL + '/RiskStatement/InsertRiskStatement', formData, { headers })
          .subscribe((response1: any) => {
            console.log(JSON.stringify(response1))
            this.tableRiskStatementID=String(response1.riskStatementID);
            this.FolderName=String(response1.statementfileID);
      
            this.createPayload();
            const formData1 = new FormData();

            formData1.append('jsonPayload', JSON.stringify(this.payload));
         

            if (this.fileAttach2 && this.fileAttach2.length > 0) {
              this.fileAttach2.forEach((file, index) => {
                  formData1.append(`fileAttach2[${index}]`, file);
              });
            }
            // Debug FormData
            console.log('FormData before AddRiskRegisterDoc:');
            // (formData1 as any).forEach((value: any, key: any) => {
            //     console.log(`${key}: ${value}`);
            // });
            formData1.forEach((value, key) => {
              console.log(key, value);
          });
          //  formData1.append('RiskStatementID', String(response1.riskStatementID));
          //(JSON.stringify(formData1))
          console.log(JSON.stringify(formData1))
    this.http.post(URL + '/RiskRegisterDoc/AddRiskRegisterDoc',formData1)
    .subscribe((response: any) => {
      console.log('Risk Statement created Successfully', response);
      this.countriskstatments=response.riskStatmentscount
        let pistdatalist:any[]=[];
      if(this.EnterReminderspanelVisible){
        let EnterReminders={
          'RisknotificationsetupID' :0,
          'EscalationStatus' :this.EnterReminderspanelVisible ? 4 :0, 
          'EnterDays': parseInt(this.Review.value.entervalue4),
          'DefaultNotifiers' :this.notifieremails?.join(','),
          'AdditionalNotifiers' :(this.Review.value.Add_Notifiers4!='')?this.Review.value.Add_Notifiers4?.join(','):'',
          'EnterComb' :this.Review.value.dropdown4,
          "USR_ID":this.sessionData.profile.userid,
          "review_start_Date":this.Review.value.review_start_Date,
         "RiskRegisterMasterID":response.riskRegisterMasterID,
        }
        console.log('Postdata:', EnterReminders);
       pistdatalist.push(EnterReminders);
      }
      if(this.EnterDayspanelVisible){
        let postdata={
          'RisknotificationsetupID' :0,
          'EscalationStatus' :this.EnterDayspanelVisible ? 1 :0,
          'EnterDays': parseInt(this.Review.value.entervalue),
          'DefaultNotifiers' :this.notifieremails?.join(','),
          'AdditionalNotifiers' :(this.Review.value.Add_Notifiers!='')?this.Review.value.Add_Notifiers?.join(','):'',
          'EnterComb' :this.Review.value.dropdown,
          "USR_ID":this.sessionData.profile.userid,
          "review_start_Date":this.Review.value.review_start_Date,
         "RiskRegisterMasterID":response.riskRegisterMasterID,
        }
        console.log('Postdata:', postdata);
       pistdatalist.push(postdata);
      }
      if(this.NotifierspanelVisible){
        let postdata2={
          'NotificationSetUpID' :0,
         'EscalationStatus' :this.NotifierspanelVisible? 2 :0,
        'EnterDays': parseInt(this.Review.value.entervalue2),
        'DefaultNotifiers' :this.notifieremails?.join(','),
          'AdditionalNotifiers' :(this.Review.value.Add_Notifiers2!="")?this.Review.value.Add_Notifiers2?.join(','):'',
          'EnterComb' :this.Review.value.dropdown2,
          "USR_ID":this.sessionData.profile.userid,
          "review_start_Date":this.Review.value.review_start_Date,
         "RiskRegisterMasterID":response.riskRegisterMasterID,

        }
      pistdatalist.push(postdata2);
      }
      if(this.AdditionalpanelVisible){
        let postdata3={
          'NotificationSetUpID' :0,
          'EscalationStatus' :this.AdditionalpanelVisible ? 3 :0,
          'EnterDays': parseInt(this.Review.value.entervalue3),
          'DefaultNotifiers' :this.notifieremails?.join(','),
          'AdditionalNotifiers' :(this.Review.value.Add_Notifiers3!='')?this.Review.value.Add_Notifiers3?.join(','):'',
          'EnterComb' :this.Review.value.dropdown3,
          "USR_ID":this.sessionData.profile.userid,
          "review_start_Date":this.Review.value.review_start_Date,
         "RiskRegisterMasterID":response.riskRegisterMasterID,
         
        }
      pistdatalist.push(postdata3);
     
      }
 
      // alert(JSON.stringify(pistdatalist))
      this.http.post(URL+'/RiskNotification/AddRiskNotificationDetails',pistdatalist,{headers})
      .subscribe((res:any)=>{

      });
   
      //this.http.post(URL + '/RiskNotification/AddRiskNotificationDetails',pistdatalist, { headers })
     
     
      if(this.isStatementStepper == false){
        if(this.AddMoreVisible==1){

      this.Definition.reset();
      this.Attributes.reset();
      this.Consequences.reset();
      this.Ownership.reset();
      this.references.clear();
      this.stepper.previous(); 
      this.stepper.previous(); 
      this.stepper.previous(); 
      this.stepper.previous(); 
      this.AddMoreVisible=0;
      this.circleBoxColor='';
      this.BoxColor='';
      this.sliderBoxColor='';
           
      //this.Definition.get('StatementID')?.setValue('');
      this.Review.get('Frequency')?.setValue('');
      this.Review.get('entervalueDays')?.setValue('');
      this.Review.get('Period')?.setValue('');
      this.Review.get('review_start_Date')?.setValue('');

      this.Review.get('dropdown4')?.setValue('');
      this.Review.get('entervalue4')?.setValue('');
      this.Review.get('Add_Notifiers4')?.setValue('');
      this.Review.get('dropdown')?.setValue('');
      this.Review.get('entervalue')?.setValue('');
      this.Review.get('Add_Notifiers')?.setValue('');
      this.Review.get('dropdown2')?.setValue('');
      this.Review.get('entervalue2')?.setValue('');
      this.Review.get('Add_Notifiers2')?.setValue('');
      this.Review.get('dropdown3')?.setValue('');
      this.Review.get('entervalue3')?.setValue('');
      this.Review.get('Add_Notifiers3')?.setValue('');
      this.erroMessage = "Risk Statement created Successfully";
     
      const dialogRef = this.dialog.open(RiskDailogeboxComponent, {
        data : {
          message: this.erroMessage,
          success: true,
          id: {'RiskStatementID': response1.riskStatementID ,
              'RiskLibrarySeq': response1.statementfileID , }
      },
      });
    }
    else{
      this.riskpkid = parseInt(response);
      console.log('Risk Document Successfully Saved!!', response);
      this.riskMessage = "Risk Document Successfully Saved!!";
     // alert(this.isStatementStepper)
    
     
     console.log(JSON.stringify(response.riskStatmentscount))
      const dialogRef = this.dialog.open(RiskDailogeboxComponent, {
         width: '400px',
            data : {
              message: this.riskMessage,
              success: true,
              id: {'RiskDocumentID': response.uniqueDocumentID ,
                   }
          },
          
            disableClose: true
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   window.location.reload();
      //   this.resetDefaults();
      // });
    }
     }
      
       },
   
    (error: any) => {
       window.alert('Error Saving Data');
    });
   }, (error: HttpErrorResponse) => {
      console.error('Error status code:', error.status);
      console.error('Error details:', error.error);
    });
    
 }
}
} 
resetDefaults(): void {
  this.FinancialValue = 'No';
  this.Reporting = 'No';
}
  Submit() : void {
     const message2 = 'Do you want to ADD MORE Risk Statements?';
    const dialogRef = this.dialog.open(RiskRegisterDailogeComponent, {
      width: '550px',
      data: { message: message2 },
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
     
      if (result === true) {
       this.isStatementStepper=true;
       alert('this.register=true');
        //this.addriskregister();
        this.Statement.setErrors({ invalidFields: true });
      
      } else if (result === false) {
       
     
        this.isStatementStepper=false;
        this.AddStepper(this.stepper);
     
  //alert("stmtscount"+this.countriskstatments)
        this.addmorerisks();
        this.AddMoreVisible=1;
        this.Statement.setErrors({ invalidFields: false });
      } 
      else if(result===undefined){
       
        this.register=false;
      }
      else {
   
        console.log('Dialog was closed without any action.');
      }
    });
  }
  addmorerisks(){
    this.finishriskregistery=0;
  // this.Finish();
  this.insert();
  
  }
//   addriskregister(){
//     // let invalidFields = this.invalidFields();
//     // this.forminvalidfields=[];
//     //  invalidFields = invalidFields.filter((item: string) => item.trim() !== "");
//     // this.forminvalidfields = invalidFields;
//     // if (this.forminvalidfields.length > 0) {
//     //   this.erroMessage = `Please provide valid information for the following fields: ${this.forminvalidfields.join(', ')}`;
//     //   alert(this.erroMessage); 
//     //   return;  
//     // }
//     // else {   
//     const payload = this.createPayload();
//     console.log(JSON.stringify(payload));
//     const formData: FormData = new FormData();
//    //alert(JSON.stringify(FormData))
//   formData.append('jsonPayload', JSON.stringify(this.payload));

//     this.http.post(URL + '/RiskRegisterDoc/AddRiskRegisterDoc',formData)
//     .subscribe((response: any) => {
      
//       if (this.Definition.valid) {
//         const userId = this.userdata.profile.userid;
//         const formData: FormData = new FormData();
//         //alert(JSON.stringify(this.Definition.value))
//         formData.append('RiskStatement', this.Definition.value.RiskStatement);
//     formData.append('riskdescription', this.Definition.value.riskdescription);
//     formData.append('userid',userId);
//      if (this.fileAttach.length > 0) {
//       this.fileAttach.forEach((file, index) => {
//         formData.append(`fileAttach[${index}]`, file);
//       });
//     }
//                const weblinkValues: string[] = [];
//         const referencesArray = this.Definition.get('references')?.value || [];
//         for (let i = 0; i < referencesArray.length; i++) {
//           const referenceType = referencesArray[i].referenceType;
//           if (referenceType === 'weblink') {
//             const weblinkValue = referencesArray[i].referencetypeValue;
//             if (weblinkValue) {
//               weblinkValues.push(weblinkValue);
//             }
//           }
//         }
      
//         if (weblinkValues.length > 0) {
//           formData.append('weblink', weblinkValues.join(';'));
//         }
      
//         const TextFieldValues: string[] = [];
//         for (let i = 0; i < referencesArray.length; i++) {
//           const referenceTypetext = referencesArray[i].referenceType;
//           if (referenceTypetext === 'Text') {
//             const FieldValue = referencesArray[i].referenceText;
//             if (FieldValue) {
//               TextFieldValues.push(FieldValue);
//             }
//           }
//         }
      
//         if (TextFieldValues.length > 0) {
//           formData.append('Text', TextFieldValues.join(';'));
//         }
      
//         this.http.post(URL + '/RiskStatement/InsertRiskStatement', formData, { headers })
//           .subscribe((response1: any) => {
//             this.erroMessage = "Risk Statement created Successfully";
//             const dialogRef = this.dialog.open(DaidailogeComponent, {
//               width: '400px',
//               data: { message: this.erroMessage }
//             });
           
//           }, (error: HttpErrorResponse) => {
//             console.error('Error status code:', error.status);
//             console.error('Error details:', error.error);
//           });
//       }
//       let pistdatalist:any[]=[];
//       if(this.EnterReminderspanelVisible){
//         let EnterReminders={
//           'RisknotificationsetupID' :0,
//           'EscalationStatus' :this.EnterReminderspanelVisible ? 4 :0,
//           'EnterDays': parseInt(this.Review.value.entervalue4),
//           'DefaultNotifiers' :this.notifieremails?.join(','),
//           'AdditionalNotifiers' :(this.Review.value.Add_Notifiers4!='')?this.Review.value.Add_Notifiers4?.join(','):'',
//           'EnterComb' :this.Review.value.dropdown4,
//           "USR_ID":this.sessionData.profile.userid,
//          //"review_start_Date":this.Review.value.startDateNextReview,
//          "RiskRegisterMasterID":response.riskRegisterMasterID,
//         }
//         console.log('Postdata:', EnterReminders);
//        pistdatalist.push(EnterReminders);
//       }
//       if(this.EnterDayspanelVisible){
//         let postdata={
//           'RisknotificationsetupID' :0,
//           'EscalationStatus' :this.EnterDayspanelVisible ? 1 :0,
//           'EnterDays': parseInt(this.Review.value.entervalue),
//           'DefaultNotifiers' :this.notifieremails?.join(','),
//           'AdditionalNotifiers' :(this.Review.value.Add_Notifiers!='')?this.Review.value.Add_Notifiers?.join(','):'',
//           'EnterComb' :this.Review.value.dropdown,
//           "USR_ID":this.sessionData.profile.userid,
//          // "review_start_Date":this.Review.value.startDateNextReview,
//          "RiskRegisterMasterID":response.riskRegisterMasterID,
//         }
//         console.log('Postdata:', postdata);
//        pistdatalist.push(postdata);
//       }
//       if(this.NotifierspanelVisible){
//         let postdata2={
//           'NotificationSetUpID' :0,
//          'EscalationStatus' :this.NotifierspanelVisible? 2 :0,
//         'EnterDays': parseInt(this.Review.value.entervalue2),
//         'DefaultNotifiers' :this.notifieremails?.join(','),
//           'AdditionalNotifiers' :(this.Review.value.Add_Notifiers2!="")?this.Review.value.Add_Notifiers2?.join(','):'',
//           'EnterComb' :this.Review.value.dropdown2,
//           "USR_ID":this.sessionData.profile.userid,
//          // "review_start_Date":this.Review.value.startDateNextReview,
//          "RiskRegisterMasterID":response.riskRegisterMasterID,

//         }
//       pistdatalist.push(postdata2);
//       }
//       if(this.AdditionalpanelVisible){
//         let postdata3={
//           'NotificationSetUpID' :0,
//           'EscalationStatus' :this.AdditionalpanelVisible ? 3 :0,
//           'EnterDays': parseInt(this.Review.value.entervalue3),
//           'DefaultNotifiers' :this.notifieremails?.join(','),
//           'AdditionalNotifiers' :(this.Review.value.Add_Notifiers3!='')?this.Review.value.Add_Notifiers3?.join(','):'',
//           'EnterComb' :this.Review.value.dropdown3,
//           "USR_ID":this.sessionData.profile.userid,
//          //"review_start_Date":this.Review.value.startDateNextReview,
//          "RiskRegisterMasterID":response.riskRegisterMasterID,
         
//         }
//       pistdatalist.push(postdata3);
//       }
//        //alert(JSON.stringify(pistdatalist))
//       this.http.post(URL + '/RiskNotification/AddRiskNotificationDetails',pistdatalist, { headers })
//       .subscribe(
//         (response: any) => {
//           if (response !== "Error: TypeName with the same name already exists.") {
//             console.log('Data Saved Successfully:', response);
//             window.alert('Data Saved Successfully');
//           //  this.reloadComponent();
//           } else {
//             window.alert(response);  // Display the response directly
//           }
//         },
//         (error: any) => {
//           console.error('Error saving data:', error);
//           if (error.error && typeof error.error === 'string') {
//             window.alert(error.error);  // Show the error message returned by the server
//           } else {
//             window.alert('Error Saving Data. Please check the console for details.');
//           }
//         }
//       );
  
//     }  );
//  // }
 
//    }
  showFinalSubmitMessage(message: string , riskRegisterMasterID : string) {
    const dialogRef = this.dialog.open(RiskDailogeboxComponent, {
      width: '400px',
      data: { message: message, success: true , id: "Risk RegisterMaster ID :"+ riskRegisterMasterID},
      disableClose: true // Prevents closing the dialog by clicking outside of it
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  showErrorMessage(message: string) {
    const dialogRef = this.dialog.open(DaidailogeComponent, {
      width: '400px',
      data: { message: message, success: false },
      disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  invalidFields() {
    let invalidFields: string[] = [];
  
    Object.keys(this.riskregister.controls)
      .filter(key => this.riskregister.get(key).invalid)
      .forEach(key => {
        switch(key) {
          case 'Entity': invalidFields.push('Entity'); break;
          case 'Unit': invalidFields.push('Unit Location'); break;
          case 'Deparment': invalidFields.push('Department Name'); break;
          case 'Business': invalidFields.push('Business Process'); break;
          case 'BusinessProcess': invalidFields.push('Business Process'); break;
        
          case 'RiskRegis': invalidFields.push('Name of Risk Document/Register'); break;
          default: invalidFields.push(key); break;
        }
      });
      Object.keys(this.Definition.controls)
      .filter(key => this.Definition.get(key).invalid)
      .forEach(key => {
        switch(key) {
          case 'BusinessL1': invalidFields.push('Business Sub-Process(L1)'); break;
          case 'BusinessL2': invalidFields.push('Business Sub-Process(L2)'); break;
          case 'BusinessL3': invalidFields.push('Business Sub-Process(L3)'); break;
          case 'RiskStatement': invalidFields.push('Risk Statement'); break;
          case 'RiskDiscrip': invalidFields.push('Risk Discription'); break;
          default: invalidFields.push(key); break;
        }
      });
      Object.keys(this.Attributes.controls)
      .filter(key => this.Attributes.get(key).invalid)
      .forEach(key => {
        switch(key) {
          case 'RootCause': invalidFields.push('Risk Root Cause'); break;
          case 'Typerisk': invalidFields.push('Type of Risk'); break;
          case 'RiskClassification': invalidFields.push('Risk Of Classification'); break;
          case 'Catergrisation': invalidFields.push('Risk Catergrisation'); break;
          case 'Causelist': invalidFields.push('Risk Cause List'); break;
          case 'AMLCompliance': invalidFields.push('AML/Compliance Risk'); break;
          case 'ModelRisk': invalidFields.push('Model Risk'); break;
          case 'ConductRisk': invalidFields.push('Conduct Risk'); break;
          case 'ITandCyber': invalidFields.push('IT and Cyber Security Risk'); break;
          case 'ThirdParty': invalidFields.push('Third Party/ Outsourcing Risk'); break;
          case 'Fraud': invalidFields.push('Fraud Risk'); break;
          case 'Legal': invalidFields.push('Legal Risk'); break;
          case 'Operational': invalidFields.push('Operational Risk'); break;
          case 'Reputational': invalidFields.push('Reputational Risk'); break;
          case 'FinancialReporting': invalidFields.push('Financial Risk-Reporting'); break;
          case 'FinancialCostImpact': invalidFields.push('Financial Risk Cost Impact'); break;
          case 'Impact': invalidFields.push('Risk Impact Rating'); break;
          case 'Likelihood': invalidFields.push('Risk Likelihood Occurrence'); break;
          default: invalidFields.push(key); break;
        }
      });
      Object.keys(this.Consequences.controls)
      .filter(key => this.Consequences.get(key).invalid)
      .forEach(key => {
        switch(key) {
          case 'CategoryL1': invalidFields.push('Loss Event Threat Category(L1)'); break;
          case 'CategoryL2': invalidFields.push('Loss Event Threat Category(L2)'); break;
          case 'CategoryL3': invalidFields.push('Loss Event Threat Category(L2)'); break;
          case 'BusinessImpact': invalidFields.push('Potential Business Impact'); break;
          default: invalidFields.push(key); break;
        }
      });
      Object.keys(this.Ownership.controls)
      .filter(key => this.Ownership.get(key).invalid)
      .forEach(key => {
        switch(key) {
          case 'OwnershipControl': invalidFields.push('Risk Owner'); break;
          case 'BusinessProcessOwner': invalidFields.push('Business Process Owner'); break;
          case 'BusinessProcessFunctionHead': invalidFields.push('Business Process Function Head'); break;
          default: invalidFields.push(key); break;
        }
      });

      if(this.isStatementStepper===true){
      Object.keys(this.Statement.controls)
      .filter(key => this.Statement.get(key).invalid)
      .forEach(key => {
        switch(key) {
          case 'DocTypeID': invalidFields.push('Risk Document Type'); break;
          case 'Doc_CategoryID': invalidFields.push('Risk Document Category'); break;
          case 'Doc_SubCategoryID': invalidFields.push('Document Sub Category'); break;
          case 'Doc_Confidentiality': invalidFields.push('Document Confidentiality'); break;
          case 'NatureOf_Doc_id': invalidFields.push('Document Classification'); break;
          case 'Appetite': invalidFields.push('Risk Appetite'); break;
          case 'appestatement': invalidFields.push('Risk Appetite Statement'); break;
          default: invalidFields.push(key); break;
        }
      });
    }
    console.log("Invalid Fields: ", invalidFields);
    return invalidFields;
  }
  InherentRiskRating(event:any) {

     const impactValue = this.Attributes.get('Impact').value; 
    const likelihoodValue = this.Attributes.get('Likelihood').value;
    if (impactValue && likelihoodValue) {
      const inherentRiskRating = impactValue * likelihoodValue;
      this.Attributes.get('InherentRiskRating').setValue(inherentRiskRating);
      let color;
      this.http.get(URL + '/RiskInhervRange/GetRiskInhervRangelev?range='+inherentRiskRating, {headers})
      .subscribe(
        res => {
          let resdata: any[] = res as any;
          console.log(JSON.stringify(resdata));
         // alert(resdata[0].colour_reference)
          this.circleBoxColor = resdata[0].colour_reference;
          
          this.Attributes.get('InherColor').setValue(this.circleBoxColor);
        },
        error => {
          // Handle error here and show an alert
          console.error('Error:', error); // Log the error for debugging
          alert('No acceptable values found for the specified range.');
        }
      );
    }
   
  }
  RiskPriority(event:any){
    

    //  this.inherRiskRatingID = event.value;
    //  alert( this.inherRiskRatingID)
    //   this.http.get(URL + '/risk_admininherriskratinglevl/Getrisk_admininherriskratinglevl?inherRiskRatingID='+event.value, { headers })
    //   .subscribe(
    //     (res: any) => {
    //       console.log('API Response:', res);
    //     },
    //     (err) => {
    //       console.error('Error fetching rules:', err);
    //     }
    //   );
    
    
    const selectedActivityId = event.value;
   //alert(selectedActivityId)
   this.activityids = null;
   const filterParams = ['activityid', '=', selectedActivityId];
   console.log("Filter Parameters:", filterParams);
 
   if (event.value && this.RiskFrequencyDB) {
        this.RiskFrequencyDB.load({ filter: ['activityid', '=', event.value] }).then((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
       console.log(JSON.stringify(firstItem));
      this.activityids=firstItem.activityvalue;
         } });
     
    }
   
    const InherentValue = this.Attributes.get('InherentRiskRating').value; 
    const FrequencyValue = parseInt(this.activityids);
    if (InherentValue && FrequencyValue) {
      const RiskPriority = InherentValue * FrequencyValue;
      this.Attributes.get('Priority').setValue(RiskPriority);
      let color;
      this.http.get(URL + '/RiskPriority/GetRiskPriorityRange?rangevalue='+ RiskPriority, {headers})
      .subscribe(
        res => {
          let resdata: any[] = res as any;
          console.log(JSON.stringify(resdata));
         // alert(resdata[0].color_code)
          this.BoxColor = resdata[0].color_code;
        
          //=================
          const selectedValue = event.value;

          // Find the corresponding item in the data source
        //   const selectedItem = this.RiskFrequencyDB.store.data().find((item: { activityid: any; }) => item.activityid === selectedValue);
      
        //   alert(selectedItem)
        //   if (selectedItem) {
        //     this.activityids = selectedItem.activityid; // Extract the activityid
        //     console.log('Selected Activity ID:', this.activityids);
        // } else {
        //     this.activityids = null; // Handle case when no item is selected
        // }
        
        },
        error => {
          // Handle error here and show an alert
          console.error('Error:', error); // Log the error for debugging
          alert('No acceptable values found for the specified range.');
        }
      );
   
    }
 
  }
  SliderValue(event:any){
    const PriorityValue = this.Attributes.get('Priority').value; 
    const sliderValue = this.Attributes.get('SliderValue').value/100;

let riskintensiy=Math.round(PriorityValue*sliderValue)
this.Attributes.get('Intensity').setValue(riskintensiy);

    if (PriorityValue && sliderValue) {
     // alert(riskintensiy)
      let color;
      this.http.get(URL + '/RiskIntensity/GetRiskIntensityRange?rangevalue='+ riskintensiy, {headers})
      .subscribe(
        res => {
          let resdata: any[] = res as any;
          console.log(JSON.stringify(resdata));
          this.sliderBoxColor = resdata[0].colour_reference;
        },
        error => {
          // Handle error here and show an alert
          console.error('Error:', error); // Log the error for debugging
          alert('No acceptable values found for the specified range.');
        }
      );
    
    }
  }
  // checkNameExists(name: string){
  //   // const apiUrl = `${URL}/Risk_AddRegisterController/checkregistername`;
  //   // return this.http.get<boolean>(apiUrl, { params: { nameofRiskDocumentRegister: name } });
  //     this.http.get(URL + '/Risk_AddRegisterController/checkregistername?nameofriskreg='+ name, {headers})
  // .subscribe(
  //   res => {
  //       if(res==0)
  //     return false;
  //   else
  //   return true;
  //   },
  //   error => {
  //     // Handle error here and show an alert
  //     console.error('Error:', error); // Log the error for debugging
  //     alert('No acceptable values found for the specified range.');
  //   }
  // );
  // }

  AddStepper(stepper: MatStepper) {
    if (this.riskregister.valid) {
      this.Riskstepper = true;
      this.visible_Risk = false;
      this.visiblestepper = true;
      stepper.next(); 
    } else {
       const invalidFields = [];
      const controls = this.riskregister.controls;
  
      for (const field in controls) {
        if (controls[field].invalid) {
          invalidFields.push(field);
        }
      }
  
      
      if (invalidFields.length > 0) {
        this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
        this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: { message: this.erroMessage }
        });
      }
  
      // Prevent stepper navigation if the form is invalid
      this.Riskstepper = false; // Ensure this flag is set to false
    }
   
   
    // if (this.riskregister.valid) {
    //   // Call the checkNameExists function and handle the response
    //   this.http.get(URL + '/Risk_AddRegisterController/checkregistername?nameofriskreg='+ this.riskregister.get('RiskRegis').value, {headers})
    //   .subscribe(
    //     res => {
    //       if(res==0){
    //     // If the name doesn't exist, proceed to the next step
    //     this.Riskstepper = true;
    //     this.visible_Risk = false;
    //     this.visiblestepper = true;
    //     stepper.next(); 
    //      }
    //     else{
    //      // If the name exists, show an error dialog
    //      this.erroMessage = 'The name already exists. Please choose another.';
    //      this.dialog.open(DaidailogeComponent, {
    //        width: '400px',
    //        data: { message: this.erroMessage }
    //      });
    //     }
       
        
    //     },
    //     error => {
    //       // Handle error here and show an alert
    //       console.error('Error:', error); // Log the error for debugging
    //       alert('No acceptable values found for the specified range.');
    //     }
    //   );
    
    // }
    //  else {
    //   const invalidFields = [];
    //   const controls = this.riskregister.controls;
  
    //   for (const field in controls) {
    //     if (controls[field].invalid) {
    //       invalidFields.push(field);
    //     }
    //   }
  
    //   if (invalidFields.length > 0) {
    //     this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '400px',
    //       data: { message: this.erroMessage }
    //     });
    //   }
    //     this.Riskstepper = false;
    // }
  
    }
    

  
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({name: value});
      this.Statement.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
   }

   if (event.chipInput) {
    event.chipInput.clear();
  }
  }
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
       this.tags.splice(index, 1);
      this.Statement.controls['Keywords'].setValue(this.tags.map(tag => tag.name));

    }
       this.chipListInput.nativeElement.value = '';
  }
  
  getReferences(): FormArray {
    return this.Definition.get('references') as FormArray;
  }
onDropdownValueChanged(event: any): void {
   this.RiskStatementID = event.value;
  this.selectedOption = this.RiskStatementID;
  this.SearchLibraryPanelVisible=true;
  this.LibraryPanelVisible=false;

  if (this.RiskStatementID) {
    this.SearchLibraryPanelVisible = true; // Show the first panel
    this.http.get(URL + '/SearchDocuments/GetSearchDocuments?RiskStatementID='+ this.RiskStatementID, {headers})
      .subscribe(
        (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            const pubList = data[0];
            this.Definition.controls['RiskStatement'].setValue(pubList.riskStatementName || '');
            this.Definition.controls['RiskDiscrip'].setValue(pubList.riskDescription || '');
            this.populateReferences(pubList.attachments);
            this.disablereferenceType = true;

          } else {
            console.log('No matching data found.');
            this.Definition.reset();
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.Definition.reset();
          this.disablereferenceType = false;
        }
      );
  } else {
    // If no value selected, reset form and show fallback panel
    
    this.LibraryPanelVisible = true;
    this.SearchLibraryPanelVisible = false;
    this.resetAllFields();
    this.Definition.reset();
        
  }
}

resetAllFields(): void {
  // Reset form fields and form arrays
  this.Definition.reset({
    RiskStatement: '',
    RiskDiscrip: '',
    references: []  // Reset references array to empty
  });
  this.references.clear();
  this.SearchLibraryPanelVisible = false;
    this.LibraryPanelVisible = true;  // Make sure to clear the references form array
}

populateReferences(attachments: any[]): void {
  const referencesArray = this.Definition.get('references') as FormArray;
  referencesArray.clear(); // Clear previous references

  attachments.forEach(attachment => {
    let referenceType = '';

    switch (attachment.fileCategory) {
      case 'FileAttach':
        referenceType = 'file';
        break;
      case 'Weblink':
        referenceType = 'weblink';
        break;
      default:
        referenceType = 'Text';
    }

    referencesArray.push(this.fb.group({
      referenceType: [{ value: referenceType, disabled: true }], // Set as readonly

      referencetypeValue: [attachment.filePath || ''],
      file_attachment: [attachment.fileName || ''],
      referencetypeValue1: [attachment.filePath || '']
    }));
  });
}
docApprover_displayExpr(usR_ID:any) {
      return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
  }
  OnDocApproverChange(event: any) {
   this.docApprover = event.target.value;
   localStorage.setItem('docApprover', this.docApprover);
   console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
  }
  DefintionDiscard(){
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '400px',
       data: { message:"Are you sure, you want to Cancel the Publish Document" }
    });
    dialogRef.afterClosed().subscribe((result) => {
        console.log(result, 'The dialog was closed');
          if (result == true) {
            window.location.reload();
          }});
  }
  AttributesDiscard(){
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '400px',
       data: { message:"Are you sure, you want to Cancel the Publish Document" }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result, 'The dialog was closed');
          if (result == true) {
            window.location.reload();
          }});
  }
  ConsequencesDiscard(){
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '400px',
       data: { message:"Are you sure, you want to Cancel the Publish Document" }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result, 'The dialog was closed');
          if (result == true) {
            window.location.reload();
          }});
  }
  OwnerShipDiscard(){
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '400px',
       data: { message:"Are you sure, you want to Cancel the Publish Document" }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result, 'The dialog was closed');
          if (result == true) {
            window.location.reload();
          }});
  }
  ReviewDiscard(){
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '400px',
       data: { message:"Are you sure, you want to Cancel the Publish Document" }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result, 'The dialog was closed');
          if (result == true) {
            window.location.reload();
          }});
  }
  FinalDiscard(){
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '400px',
       data: { message:"Are you sure, you want to Cancel the Publish Document" }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result, 'The dialog was closed');
          if (result == true) {
            window.location.reload();
          }});
  }

  clearSearchLibraryFields(): void {
    // Add logic to clear specific fields in the SearchLibraryPanel
    // For example:
    // this.searchField1 = '';
    // this.searchField2 = '';
  }
}
