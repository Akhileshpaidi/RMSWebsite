import { Component } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { filter, lastValueFrom } from 'rxjs';
import { StepperService } from 'src/app/Common/daidailoge/stepper.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  
} from '@angular/forms';
import { SessionService } from 'src/app/core/Session/session.service';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { RiskRegisterDailogeComponent } from 'src/app/Common/daidailoge/risk-register-dailoge/risk-register-dailoge.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { UpdateRiskRegister, Updatestatements } from 'src/app/inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  export interface Tag  {
    name: string;
  }
@Component({
  selector: 'app-edit-risk-register',
  templateUrl: './edit-risk-register.component.html',
  styleUrls: ['./edit-risk-register.component.scss']
})

export class EditRiskRegisterComponent {
 
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
   RiskDefSelection:any;
  //  FinancialValue='No';
  //  Reporting ='No';
  //  defaultThirdValue ='No';
  //  defaultCyberValue ='No';
  //  defaultConductValue ='No';
  //  defaultModelValue ='No';
  //  defaultAMLValue ='No';
  //  defaultFraudValue = 'No';
  //  defaultLegalValue ='No';
  //  defaultOperationalValue='No';
  //  ReputationalValue='No';
   ImpactDB:any;
   fileAttach: File[]  = [];
   fileAttach2: File[]  = [];
   weblink:string[] =[];
   maxFiles: number = 1; // default value
  files: File[] = []; 
  replacedFiles:any=[];

 maxSize: number = 5 ; // default 5MB in bytes
   actForm: any;
   TextBox1=true;
   visiblestepper:boolean = false;
   visible_Risk:boolean=true;
   hideStep1 = false;  
   DocumentTypeData:any;
   disablereferenceType: boolean = false; 
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
   RiskMasterID:any;
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
   riskMasterID:any;
   riskRegisterMasterID:any;
   Keywords:any;
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
   
   Approver:any;
   inherColorValue:any;
   isButtonVisible: boolean = false;
   isStatementStepper:boolean=false;
   tableRiskStatementID:any;
   riskpkid:number=0;
   FolderName:any;
   activityids:any;
   inherRiskRatingID: number | undefined;
   view_risk_register:any;
   ReviewfrequencyCheck:any;
   OverdueReminders:any;
   register:boolean = true;
finishriskregistery:any;
statement:any;
RiskRegisterinfo: UpdateRiskRegister = new UpdateRiskRegister();
RiskStatementsinfo: Updatestatements = new Updatestatements();
constructor(private http: HttpClient, private fb: FormBuilder, private session: SessionService,private stepperService: StepperService,
  private route: ActivatedRoute,
  public dialog: MatDialog,public location:Location
 ){

  this.http.get(URL + '/tblUsers/GettblUsersDetails', {headers})
        .subscribe(res => {
          this.userdatalist=res as any;
          this.simpleProducts.splice(0,this.simpleProducts.length)
          this.userdatalist.forEach((element:any) => {
            this.simpleProducts.push(element.firstname)
          });
       
    
      });
 this.riskregister = this.fb.group({
      Entity:[''],
      Unit:[''],
      Deparment:[''],
      Business:[''],
      BusinessProcess:[''],
       RiskRegis:[''],
      ObjectiveRisk:[''],
     });
   
    this.Definition = this.fb.group({
      BusinessL1:[''],
      BusinessL2:[''],
      BusinessL3:[''],
      SubProcess:[''],
      references: this.fb.array([]),
      referencestext: this.fb.array([]),
      RiskStatement1:['',Validators.required],
      RiskDiscrip1:['',Validators.required],
      referenceType:['',],
      referencetypeValue:['',],
      referencetypeValue1:['',],
      file_attachment:['',],
      StatementID:['',],
      RiskStatement:['',],
      RiskDiscrip:['',],
      referenceType2:['',],
      referencetypeValue2:['',],
      file_attachment2:['',],
      referencetypeValueText2:['',],
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
      InherentRating: [{ value: null, disabled: true }],
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
   // ReviewfrequencyCheck: [0], 
    ischecked:[false],
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
  review_start_Date:[''],
  Overduecheck:[false],
  Escalationcheck:[false],
  Notifierscheck:[false],
  Additionalcheck:[false],
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
            this.Periodicityds=[
              { id:'BDD(ex)',text:'BDD(ex) – excluding due date' },
              { id:'BDD(in)',text:'BDD(in) – including due date'  },
                 
         ];
      //    this.UnitLocationMaster = {
      //     paginate: true,
      //     store: new CustomStore({
      //         key: 'unit_location_Master_id',
      //         loadMode: 'raw',
      //         load: () => {
      //             return new Promise((resolve, reject) => {
      //                this.http.get(URL + `/getAdddocument/getunitlocation`, { headers })
      //                   .subscribe((res: any) => {
      //                         resolve(res);
      //                     }, (err) => {
      //                         reject(err);
      //                     });
      //             });
      //         },
      //     }),
      // };
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
  
  retrieveFiles(riskMasterID: any): void {
   
    this.http.get(`${BASE_URL}/EditRiskRegister/GetEditRiskRegisterDetailsByID/${riskMasterID}`)
      .subscribe((data: any) => {
               if (Array.isArray(data) && data.length > 0) {
           //alert(JSON.stringify(data))
           console.log(data)
          const pubList = data[0];
          this.ReviewfrequencyCheck=pubList.reviewfrequencyCheck;
          this.OverdueReminders=pubList.escalationStatus;

          
          this.riskregister.controls['Entity'].setValue(pubList.entity_Master_id);
          this.riskregister.controls['Unit'].setValue(pubList.unit_location_Master_id);
          this.riskregister.controls['Deparment'].setValue(pubList.department_Master_id);
          this.riskregister.controls['Business'].setValue(pubList.riskBusinessfunctionid);
          this.riskregister.controls['BusinessProcess'].setValue(pubList.businessprocessID);
         this.riskregister.controls['RiskRegis'].setValue(pubList.nameofRiskDocumentRegister);
          this.riskregister.controls['ObjectiveRisk'].setValue(pubList.objectiveofRiskDocument);
          //Definition
          this.Definition.controls['BusinessL1'].setValue(pubList.businessProcessL1ID);
          this.Definition.controls['BusinessL2'].setValue(pubList.businessProcessL2ID);
          this.Definition.controls['BusinessL3'].setValue(pubList.businessProcessL3ID);
          this.Definition.controls['SubProcess'].setValue(pubList.businessSubProcessObjective);

       
          this.http.get(`${BASE_URL}/GetDocumentsLists/GetDocumentsListsdetails/${riskMasterID}`)
          .subscribe((data: any) => {
           console.log(JSON.stringify(data))
           if (data) {
             const pubList2 = data[0];
             localStorage.setItem('riskStatementID',  pubList2.riskStatementID);
              this.RiskDefSelection=pubList2.riskDefinition;
              if (this.RiskDefSelection === "select") {
               
                this.SearchLibraryPanelVisible = true;
                  this.Definition.controls['StatementID'].setValue(pubList2.riskStatementID);
                this.Definition.controls['RiskStatement1'].setValue(pubList2.riskStatementName);
                this.Definition.controls['RiskDiscrip1'].setValue(pubList2.riskDescription);
                this.populateReferences(pubList2.attachments);
              

                this.LibraryPanelVisible = false;

              } 
              else if (this.RiskDefSelection === "Text") {
                 
                this.LibraryPanelVisible = true;
                  this.Definition.controls['RiskStatement'].setValue(pubList2.riskStatementName);
                this.Definition.controls['RiskDiscrip'].setValue(pubList2.riskDescription);
                this.populateReferences2(pubList2.attachments);
               
                this.SearchLibraryPanelVisible = false;
              }
           
       
            }
          }, error => {
            console.error('Error occurred in second API call:', error);
          });
          // if(this.SearchLibraryPanelVisible=true){
          //   this.LibraryPanelVisible= false
          //   this.Definition.controls['RiskStatement'].setValue(pubList.riskStatementName || '');
          //   this.Definition.controls['RiskDiscrip'].setValue(pubList.riskDescription || '');
          //   this.populateReferences(pubList.attachments);
          //   this.disablereferenceType = true;
          //     }
          // else(this.LibraryPanelVisible= true)
          //  {
          //   this.SearchLibraryPanelVisible=false
          //   this.Definition.controls['RiskStatement'].setValue(pubList.riskStatementName || '');
          //   this.Definition.controls['RiskDiscrip'].setValue(pubList.riskDescription || '');
          //   this.populateReferences(pubList.attachments);
         
          // }

          //Attributes
         this.Attributes.controls['RootCause'].setValue(pubList.riskRootCause);
         this.Attributes.controls['Typerisk'].setValue(pubList.risk_Admin_typeOfRisk_id);
         this.Attributes.controls['RiskClassification'].setValue(pubList.risk_admin_classification_id);
         this.Attributes.controls['Catergrisation'].setValue(pubList.risk_admin_risk_categorization_id);
         this.Attributes.controls['Causelist'].setValue(pubList.risk_admin_causeList_id);
         this.Attributes.controls['AMLCompliance'].setValue(pubList.amlComplianceRisk);

         this.Attributes.controls['ModelRisk'].setValue(pubList.modelRisk);
         this.Attributes.controls['ConductRisk'].setValue(pubList.conductRisk);
         this.Attributes.controls['ITandCyber'].setValue(pubList.itCyberSecurity);
         this.Attributes.controls['ThirdParty'].setValue(pubList.thirdPartyOutsourcing);
         this.Attributes.controls['Fraud'].setValue(pubList.fraudRisk);
         this.Attributes.controls['Legal'].setValue(pubList.legalRisk);
         this.Attributes.controls['Operational'].setValue(pubList.operationalRisk);
         this.Attributes.controls['Reputational'].setValue(pubList.reputationalRisk);
         this.Attributes.controls['FinancialReporting'].setValue(pubList.financialRiskReporting);
         this.Attributes.controls['FinancialCostImpact'].setValue(pubList.riskCostImpact);
         this.Attributes.controls['Impact'].setValue(pubList.risk_admin_riskImpactRating_id);
         this.Attributes.controls['Likelihood'].setValue(pubList.risk_admin_likeoccfact_id);
         this.Attributes.controls['InherentRating'].setValue(pubList.inherentRiskRating);
         this.circleBoxColor=(pubList.inherentRatingColor);
         this.Attributes.controls['RiskActivityFrequency'].setValue(pubList.activityid);
        this.Attributes.controls['Priority'].setValue(pubList.riskPriority);
        this.BoxColor=(pubList.riskPirorityColor);
       //this.Attributes.controls['PriorityColor'].setValue(pubList.riskPirorityColor);
        this.Attributes.controls['SliderValue'].setValue(pubList.slidervalue);
        this.Attributes.controls['Intensity'].setValue(pubList.riskIntensity);
        //this.Attributes.controls['IntensityColor'].setValue(pubList.riskIntensityColor);
        this.sliderBoxColor=(pubList.riskIntensityColor);
    
       //Consequences
       this.Consequences.controls['CategoryL1'].setValue(pubList.risk_admin_LETC_L1_id);
       this.Consequences.controls['CategoryL1Descrpt'].setValue(pubList.categoryL1Description);
       this.Consequences.controls['CategoryL2'].setValue(pubList.risk_admin_letc_l2_id);
       this.Consequences.controls['CategoryL2Descrpt'].setValue(pubList.categoryL2Description);
       this.Consequences.controls['CategoryL3'].setValue(pubList.risk_admin_LETC_l3_id);
       this.Consequences.controls['CategoryL3Descrpt'].setValue(pubList.categoryL3Description);
       this.Consequences.controls['BusinessImpact'].setValue(pubList.risk_admin_potenBussImpactid);
       this.Consequences.controls['BusinessImpactDescript'].setValue(pubList.potentialImpactDescription);
       this.Consequences.controls['Priventive'].setValue(pubList.suggestivePriventive);
      //Ownership  
      this.Ownership.controls['OwnershipControl'].setValue(pubList.riskOwnership);
      this.Ownership.controls['BusinessProcessOwner'].setValue(pubList.processOwner);
      this.Ownership.controls['BusinessProcessFunctionHead'].setValue(pubList.businessFunctionHead);
      
     if(this.ReviewfrequencyCheck==1){
   
       this.isPanelVisible=true;
       this.Review.controls['Frequency'].setValue(pubList.repeatReviewFrequency);
        this.Review.controls['review_start_Date'].setValue(pubList.startDateNextReview);
   
       if (pubList.repeatReviewFrequency === "Yes") {
        this.FrequencyVisible = true; 
        this.Review.controls['entervalueDays'].setValue(pubList.enterValueforrepeat);
        this.Review.controls['Period'].setValue(pubList.selectfrequencyperiod);
      } else {
        this.FrequencyVisible = false; 
      }
         }
        else{
       this.isPanelVisible=false;
       this.Review.controls['Frequency'].setValue(pubList.repeatReviewFrequency);
    
     }
     this.http.get(`${BASE_URL}/ViewNotification/ViewNotificationDetail/${riskMasterID}`)
     .subscribe((data: any) => {
      console.log(JSON.stringify(data))
      if (data) {
        const pubList1 = data; 
          if(pubList1.escalationStatus4==4){
      
          this.EnterReminderspanelVisible=true;
          this.Review.controls['dropdown4'].setValue(pubList1.enterComb4);
          this.Review.controls['entervalue4'].setValue(pubList1.enterDays4);
          this.Review.controls['Def_Notifiers4'].setValue(pubList1.defaultNotifiers4);
          this.Review.controls['Add_Notifiers4'].setValue(pubList1.additionalNotifiers4);
       }
       if(pubList1.escalationStatus1==1){
   
        this.EnterDayspanelVisible=true;
        this.Review.controls['dropdown'].setValue(pubList1.enterComb1);
        this.Review.controls['entervalue'].setValue(pubList1.enterDays1);
        this.Review.controls['Def_Notifiers'].setValue(pubList1.defaultNotifiers1);
        this.Review.controls['Add_Notifiers'].setValue(pubList1.additionalNotifiers1);
     }
     if(pubList1.escalationStatus2==2){
   
      this.NotifierspanelVisible=true;
      this.Review.controls['dropdown2'].setValue(pubList1.enterComb2);
      this.Review.controls['entervalue2'].setValue(pubList1.enterDays2);
      this.Review.controls['Def_Notifiers2'].setValue(pubList1.defaultNotifiers2);
      this.Review.controls['Add_Notifiers2'].setValue(pubList1.additionalNotifiers2);
   }
   if(pubList1.escalationStatus3==3){
   
    this.AdditionalpanelVisible=true;
    this.Review.controls['dropdown3'].setValue(pubList1.enterComb3);
    this.Review.controls['entervalue3'].setValue(pubList1.enterDays3);
    this.Review.controls['Def_Notifiers3'].setValue(pubList1.defaultNotifiers3);
    this.Review.controls['Add_Notifiers3'].setValue(pubList1.additionalNotifiers3);
 }
       }
     }, error => {
       console.error('Error occurred in second API call:', error);
     });
 
//Statement
  this.Statement.controls['NameRegisterrisk'].setValue(pubList.nameofRiskDocumentRegister);
 
   this.Statement.controls['NoOfStatements'].setValue(pubList.noOfRiskStatements);
   this.Statement.controls['DocTypeID'].setValue(pubList.docTypeID);
 
   this.docTypeID = pubList.docTypeID;
   this.SelectedDocType=null;  
  this.DocumentCategoryData={
    paginate: true,
    store: new CustomStore({
        key: 'doc_CategoryID',
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
   this.Statement.controls['Doc_CategoryID'].setValue(pubList.doc_CategoryID);
  
  this.doc_CategoryID = pubList.doc_CategoryID;
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
   this.Statement.controls['Doc_SubCategoryID'].setValue(pubList.doc_SubCategoryID);
   

   this.Statement.controls['Doc_Confidentiality'].setValue(pubList.documentConfidentiality);
   if (pubList.documentConfidentiality=='Confidential') {
    this.phoneno=true;
 
   } else {
     this.phoneno=false;
   }
   this.Statement.controls['OtpMethod'].setValue(pubList.otpMethod);
   this.Statement.controls['Eff_Date'].setValue(pubList.documentEffectiveDate);
   this.Statement.controls['Functionalhead'].setValue(pubList.businessProcessHead);
   
   //this.Statement.controls['Keywords'].setValue(pubList.keywords);
   if (pubList.keywords) {
    const keywordsArray = pubList.keywords.split(',');
    this.tags = keywordsArray.map((keyword: string) => ({ name: keyword.trim() }));
  this.Statement.controls['Keywords'].setValue(this.tags.map(tag => tag.name)); 
  } else {
    this.Statement.controls['Keywords'].setValue(['']); 
  }
   this.Statement.controls['documentpub'].setValue(pubList.publishingRemarks);
   this.Statement.controls['appestatement'].setValue(pubList.appetiteStatement);
   this.Statement.controls['appestatement'].setValue(pubList.appetiteStatement);
   this.Statement.controls['Appetite'].setValue(pubList.risk_admin_RiskAppetiteId);
   this.Statement.controls['Docphysical'].setValue(pubList.physicalVaultLocation);
   this.Statement.controls['Doc_internal_num'].setValue(pubList.internalReferenceNo);
   this.Statement.controls['NatureOf_Doc_id'].setValue(pubList.natureOf_Doc_id);
   this.Statement.controls['Doc_Approver'].setValue(pubList.natureOf_Doc_id);

 
 } 
    }, error => {
      console.error('Error occurred while retrieving data:', error);
    });
  }
ngOnInit(): void {

  this.route.queryParams.subscribe(queryParams => {
    this.riskMasterID = queryParams['riskMasterID']; // Make sure this key matches the one in editAct
    console.log(queryParams['riskMasterID']);
    //alert(queryParams['actregulatoryid']);
    this.retrieveFiles(this.riskMasterID);
    // this.statement = {
    //   riskStatementID: 'RiskStatementID',  // Example value, replace with actual data
    // };
  });
  // console.log('Stored Data:', localStorage.getItem('riskRegisterMasterID')); 
  //      alert(localStorage.getItem('riskRegisterMasterID'))
  //     this.http.get(URL + '/viewRiskRegister/GetviewRiskRegisterDetailsByID?riskRegisterMasterID=' +localStorage.getItem('riskRegisterMasterID'), { headers })
  //     .subscribe(
  //       (data: any) => {
  //         if (Array.isArray(data) && data.length > 0) {
  //           const PubList = data[0];
          
  //           console.log(JSON.stringify(PubList))
  //           alert(JSON.stringify(PubList))
  //           //riskregister
  //         this.riskregister.controls['Entity'].setValue(PubList.entity_Master_id);
  //         //this.SelectedEntity = PubList.entity_Master_id;
  //        // this.getUnitLocation1(this.riskregister.get('Entity')?.value)
  //         this.riskregister.controls['Unit'].setValue(PubList.unit_location_Master_id);
  //         this.Selectedunit = PubList.unit_location_Master_id;
  //         this.riskregister.controls['Deparment'].setValue(PubList.department_Master_id);
  //         this.getBusinessFunction({ value: PubList.department_Master_id });
  //         this.riskregister.controls['Business'].setValue(PubList.riskbusinessname);
  //         this.riskregister.controls['BusinessProcess'].setValue(PubList.businessProcessName);
  //         this.riskregister.controls['BusinessL1'].setValue(PubList.businessSubProcessL1Name);
  //         this.riskregister.controls['BusinessL2'].setValue(PubList.businessSubProcessL2Name);
  //         this.riskregister.controls['BusinessL3'].setValue(PubList.businessSubProcessL3Name);
  //         this.riskregister.controls['SubProcess'].setValue(PubList.businessSubProcessObjective);
  //         this.riskregister.controls['RiskRegis'].setValue(PubList.nameofRiskDocumentRegister);
  //         this.riskregister.controls['ObjectiveRisk'].setValue(PubList.objectiveofRiskDocument);
  //        //Attributes
  //        this.Attributes.controls['RootCause'].setValue(PubList.riskRootCause);
  //        this.Attributes.controls['Typerisk'].setValue(PubList.risk_Admin_typeOfRisk_id);
  //        this.Attributes.controls['RiskClassification'].setValue(PubList.risk_admin_classification_id);
  //        this.Attributes.controls['Catergrisation'].setValue(PubList.risk_admin_risk_categorization_id);
  //        this.Attributes.controls['Causelist'].setValue(PubList.risk_admin_causeList_id);
  //        alert(PubList.amlComplianceRisk)
  //        this.Attributes.controls['AMLCompliance'].setValue(PubList.amlComplianceRisk);
  //        this.Attributes.controls['ModelRisk'].setValue(PubList.modelRisk);
  //        this.Attributes.controls['ConductRisk'].setValue(PubList.conductRisk);
  //        this.Attributes.controls['ITandCyber'].setValue(PubList.itCyberSecurity);
  //        this.Attributes.controls['ThirdParty'].setValue(PubList.thirdPartyOutsourcing);
  //        this.Attributes.controls['Fraud'].setValue(PubList.fraudRisk);
  //        this.Attributes.controls['Legal'].setValue(PubList.legalRisk);
  //        this.Attributes.controls['operationalRisk'].setValue(PubList.Operational);
  //        this.Attributes.controls['Reputational'].setValue(PubList.reputationalRisk);
  //        this.Attributes.controls['FinancialReporting'].setValue(PubList.financialRiskReporting);
  //        this.Attributes.controls['FinancialCostImpact'].setValue(PubList.riskCostImpact);
  //        this.Attributes.controls['Impact'].setValue(PubList.risk_admin_riskImpactRating_id);
  //        this.Attributes.controls['Likelihood'].setValue(PubList.risk_admin_likeoccfact_id);
  //     //Risk Consequences
  //     this.Consequences.controls['CategoryL1'].setValue(PubList.risk_admin_LETC_L1_id);
  //     //this.Consequences.controls['CategoryL1Descrpt'].setValue(PubList.risk_admin_LETC_L1_id);

          
  //         } else{

  //         }
         
  //       },
  //       (err) => {
  //         console.error('Error fetching risk register details:', err);  
  //       }
  //     );
  // console.log('RiskCreateriskDocumentComponent initialized');
  //   this.stepperService.stepperVisible$.subscribe((isVisible) => {
  //    this.stepperVisible = isVisible;
     
  //   });
   
    let user: any = this.session.getUser();
 
    this.userdata = JSON.parse(user);
 
    console.log("userid", this.userdata.profile.userid);
   this.view_risk_register={
        paginate: true, 
        store: new CustomStore({
          key: 'riskRegisterMasterID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
             
              this.http.get(URL + '/AddRiskRegister/GetAddRiskRegisterDetails', {headers})
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
        window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    });
  }
  extractFilenameFromUrl(url: string): string {
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
        // onCheckboxChange(event: any) {
  
        //   console.log('Checkbox for Document review frequency changed:', event.target.checked);
        //   this.isPanelVisible = event.target.checked;
        //   const reviewFrequencycheck = event.target.checked ? 1 : 0;
        //   this.Ownership.get('ReviewfrequencyCheck').setValue(reviewFrequencycheck);
        
         
        // }  
        onCheckboxChange(event: any) {

          this.isPanelVisible = event.target.checked;
          console.log('Checkbox for Document review frequency changed:', event.target.checked);
        }
      resetSearch(): void { 
        this.searchText = '';
      }
      selectDocConfidentiality(event: any){

        console.log('Selected:', event.value);
    
        if (event.value === 'General') {
              this.phoneno=false;
          this.Statement.get('OtpMethod').setValue("N/A");
        }
            else {
              this.phoneno=true;
          this.Statement.get('OtpMethod').setValue("email");
          
        }
    
      } 
 getDocCategory(event: any) {
              console.log("selected Type id: ", event.value);
              this.docTypeID = event.value;
               this.SelectedDocType=null;  
              this.DocumentCategoryData={
                paginate: true,
                store: new CustomStore({
                    key: 'doc_CategoryID',
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
//   getUnitLocation(e: any) {
  
//     let user: any = this.session.getUser();
//     this.sessionData = JSON.parse(user);
//     console.log("selected Entity_Master_id : ", e.value);
//     this.EntityID = e.value;
//     this.Selectedunit = null;
//      const entityParams = this.EntityID.map((id: number) => `entityids=${id}`).join('&');

//      this.UnitLocationMaster = {
//         paginate: true,
//         store: new CustomStore({
//             key: 'unit_location_Master_id',
//             loadMode: 'raw',
//             load: () => {
//                 return new Promise((resolve, reject) => {
//                    this.http.get(URL + `/Adddocument/getunitlocation?userid=${this.sessionData.profile.userid}&${entityParams}`, { headers })
//                       .subscribe((res: any) => {
//                             resolve(res);
//                             alert(JSON.stringify(res))
//                          //   this.riskregister.controls['Unit'].setValue(null);
//                         }, (err) => {
//                             reject(err);
                            
//                         });
//                 });
//             },
//         }),
//     };
// }


getUnitLocation(e: any) {
  
  let user: any = this.session.getUser();
  this.sessionData = JSON.parse(user);
  console.log("selected Entity_Master_id : ", e.value);
  this.EntityID = e.value;
  this.Selectedunit = null;
     this.UnitLocationMaster = {
      paginate: true, 
      store: new CustomStore({
          key: 'unit_location_Master_id',
          loadMode: 'raw',
          load: () => {
              return new Promise((resolve, reject) => {
                this.http.get(
             `${URL}/getregisterunitlocation/getregisterunitlocationdetails?EntityID=${this.EntityID}&userid=${this.sessionData.profile.userid}`, { headers })
              //this.http.get(URL + `/getregisterunitlocation/getregisterunitlocationdetails/` +this.EntityID, { headers })
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
       
     };
     this.RiskOwnerDB={
       paginate: true, 
       store: new CustomStore({
         key: 'user_location_mapping_id',
           loadMode: 'raw',
           load:()=>{return new Promise((resolve, reject) => {
             const Entity_Master_id= parseInt(this.riskregister.get('Entity')?.value) || 0;
             const Unit_location_Master_id= parseInt(this.riskregister.get('Unit')?.value) || 0;
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
  
       this.Entity = this.riskregister.value.Entity_Master_id;
       this.Unit =this.riskregister.value.Unit_location_Master_id;
       this.Deparment = e.value;
     
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
 
FinalDiscard(){

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
   
  }
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
    return;
    }
    this.fileAttach2.push(file);
    const referenceFormGroup = this.references2.controls[referenceIndex] as FormGroup;
    referenceFormGroup.get('file_attachment2')?.setValue(file.name);
    console.log('Form Value:', referenceFormGroup.value);
   
  }
}
removeReferenceField2(index:number){
  this.references2.removeAt(index);
}
get references():FormArray{
  return this.Definition.get('references') as FormArray;
}
removeReferenceField(index:number){
  this.references.removeAt(index);
}
get references2():FormArray{
  return this.Statement.get('references2') as FormArray;
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
  docApprover_displayExpr(usR_ID:any) {
    return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
}
OnDocApproverChange(event: any) {
  this.docApprover = event.target.value;
  localStorage.setItem('docApprover', this.docApprover);
  console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
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
OwnerSipDiscard(){}
stepper4(){}
stepper1(){}
consequencesDiscard(){}
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
 RiskPriority(event:any){
    
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
   
    const InherentValue = this.Attributes.get('InherentRating').value; 
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
  
        },
        error => {
          // Handle error here and show an alert
          console.error('Error:', error); // Log the error for debugging
          alert('No acceptable values found for the specified range.');
        }
      );
   
    }
 
  }
  InherentRiskRatingg(event:any) {

    const impactValue = this.Attributes.get('Impact').value; 
   const likelihoodValue = this.Attributes.get('Likelihood').value;
   if (impactValue && likelihoodValue) {
     const inherentRiskRating = impactValue * likelihoodValue;
     this.Attributes.get('InherentRating').setValue(inherentRiskRating);
   
     let color;
     this.http.get(URL + '/RiskInhervRange/GetRiskInhervRangelev?range='+inherentRiskRating, {headers})
     .subscribe(
       res => {
         let resdata: any[] = res as any;
         console.log(JSON.stringify(resdata));
         //alert(resdata[0].colour_reference)
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
   this.Definition.reset();
 }
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
populateReferences2(attachments: any[]): void {
  const referencesArray = this.Definition.get('references') as FormArray;
  referencesArray.clear(); // Clear previous references

  attachments.forEach(attachment => {
    let referenceType2 = '';

    switch (attachment.fileCategory) {
      case 'FileAttach':
        referenceType2 = 'file';
        break;
      case 'Weblink':
        referenceType2 = 'weblink';
        break;
        default:
          referenceType2 = 'Text';
        // default:
        //   console.warn('Unknown fileCategory:', attachment.fileCategory);
        //   return;
    }

    const formGroup = this.fb.group({
      referenceType2: [referenceType2],

      referencetypeValue2: [referenceType2 == 'weblink' ? attachment.filePath : ''],
      file_attachment2: [referenceType2 == 'file' ? attachment.fileName : ''],
      referencetypeValueText2: [referenceType2 == 'Text' ? attachment.filePath : '']
    });

    console.log('FormGroup created:', formGroup.value);
    referencesArray.push(formGroup);
   
  });
  console.log('FormArray:', referencesArray.value);
}
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
  
      this.Riskstepper = false; // Ensure this flag is set to false
    }
  }
  Update(){
   
    this.stepperVisible=true;
    this.register=false;
 
   
  }
  Finish(){

    
//if (this.Definition.valid) {
 
  const userId = this.userdata.profile.userid;
  const riskRegisterMasterID:any = localStorage.getItem('RiskRegisterMasterID');
  const storedStatementID:any = localStorage.getItem('riskStatementID');
 // alert(localStorage.getItem('riskStatementID'))
  
  const formData: FormData = new FormData();

  formData.append('RiskStatement', this.Definition.value.RiskStatement);
  formData.append('RiskDescription', this.Definition.value.RiskDiscrip);
  formData.append('userid',userId);

  formData.append('RiskRegisterMasterID',riskRegisterMasterID);
  formData.append('RiskStatementID', storedStatementID);

// if (this.fileAttach.length > 0) {
// this.fileAttach.forEach((file, index) => {
//   formData.append(`fileAttach[${index}]`, file);
// });
// }
//   const weblinkValues: string[] = [];
//   const referencesArray = this.Definition.get('references')?.value || [];
//   for (let i = 0; i < referencesArray.length; i++) {
//     const referenceType = referencesArray[i].referenceType;
//     if (referenceType === 'weblink') {
//       const weblinkValue = referencesArray[i].referencetypeValue;
//       if (weblinkValue) {
//         weblinkValues.push(weblinkValue);
//       }
//     }
//   }

//   if (weblinkValues.length > 0) {
//     formData.append('weblink', weblinkValues.join(';'));
//   }

//   const TextFieldValues: string[] = [];
//   for (let i = 0; i < referencesArray.length; i++) {
//     const referenceTypetext = referencesArray[i].referenceType;
//     if (referenceTypetext === 'Text') {
//       const FieldValue = referencesArray[i].referenceText;
//       if (FieldValue) {
//         TextFieldValues.push(FieldValue);
//       }
//     }
//   }

//   if (TextFieldValues.length > 0) {
//     formData.append('Text', TextFieldValues.join(';'));
//   }

// this.http.post(URL + '/EditRiskStatement/UpdateRiskStatement', formData, { headers })
const weblinkValues: string[] = [];
    const TextFieldValues: string[] = [];
    const referencesArray = this.references as FormArray;
    console.log(referencesArray);

    referencesArray.controls.forEach((control, index) => {
      const referenceType = control.get('referenceType')?.value;
      const referencetypeValue = control.get('referencetypeValue')?.value;
      const referenceText = control.get('referenceText')?.value;

      if (referenceType === 'Weblink' && referencetypeValue) {
        weblinkValues.push(referencetypeValue);
      } 
      else if (referenceType === 'Text' && referenceText) {
        TextFieldValues.push(referenceText);
      }
      else if (referenceType === 'FileAttach') {
        const file = this.files[index];
        if (file) {
                formData.append(`fileAttach[${index}]`, file);
          console.log(`Appended file at index ${index}:`, file);

        }
      }
    });
    if (weblinkValues.length > 0) {
      formData.append('weblink', weblinkValues.join(';'));
    }
    if (TextFieldValues.length > 0) {
      formData.append('Text', TextFieldValues.join(';'));
    }
    console.log(JSON.stringify(formData))
    this.http.post(`${BASE_URL}/EditRiskStatement/UpdateRiskStatement`, formData, {
      params: new HttpParams().set('riskStatementID', storedStatementID)
    })
    
.subscribe((data: any) => {


    //this.erroMessage ="Risk statement Updated Successfully";
     
 
});
    
 //}
    // this.Updatestatements(this.RiskStatementID)
    // console.log(JSON.stringify(this.RiskStatementsinfo))
    // this.http.post(URL + '/EditRiskStatement/UpdateRiskStatement',this.RiskStatementsinfo, { headers })
    // .subscribe((data: any) => {
      
    // });
    
    this.updateregisterdetails(this.riskMasterID);
    //alert(JSON.stringify(this.RiskRegisterinfo));
    console.log(JSON.stringify(this.RiskRegisterinfo))
   this.http.post(URL + '/RiskRegister/UpdateRiskRegisterDetails',this.RiskRegisterinfo, { headers })
   .subscribe((data: any) => {

    
     alert("Updated Data Successfully")

    
      window.location.reload();
      
  
     //this.router.navigate(['dashboard/inspection/doc-rev-period-status'])

   });
  }
  // Updatestatements(RiskStatementID:any){
  //   let statementID: number = parseInt(RiskStatementID);
  //  this.RiskStatementsinfo.RiskStatementID = statementID;
  //   this.RiskStatementsinfo.RiskStatementName = this.Definition.value.RiskStatement;
  //   alert(this.Definition.value.RiskStatement)
  //   this.RiskStatementsinfo.RiskDescription = this.Definition.value.RiskDiscrip;
  // }
  
  updateregisterdetails(RiskMasterID: any){
    let docid: number = parseInt(RiskMasterID);
   this.RiskRegisterinfo.RiskRegisterMasterID = docid;
//riskregister
   this.RiskRegisterinfo.Entity_Master_id = this.riskregister.value.Entity;
    this.RiskRegisterinfo.Unit_location_Master_id = this.riskregister.value.Unit;
    this.RiskRegisterinfo.department_Master_id = this.riskregister.value.Deparment;
    this.RiskRegisterinfo.riskBusinessfunctionid = this.riskregister.value.Business;
    this.RiskRegisterinfo.businessprocessID = this.riskregister.value.BusinessProcess;
    this.RiskRegisterinfo.NameofRiskDocumentRegister = this.riskregister.value.RiskRegis;
    this.RiskRegisterinfo.ObjectiveofRiskDocument = this.riskregister.value.ObjectiveRisk;
//Definition
    this.RiskRegisterinfo.BusinessProcessL1ID = this.Definition.value.BusinessL1;
    this.RiskRegisterinfo.BusinessProcessL2ID = this.Definition.value.BusinessL2;
    this.RiskRegisterinfo.BusinessProcessL3ID = this.Definition.value.BusinessL3;
    this.RiskRegisterinfo.BusinessSubProcessObjective = this.Definition.value.SubProcess;
    //this.RiskRegisterinfo.RiskDefinition = this.Definition.value.StatementID;
  //Attributes
  this.RiskRegisterinfo.RiskRootCause = this.Attributes.value.RootCause;
  this.RiskRegisterinfo.risk_Admin_typeOfRisk_id = this.Attributes.value.Typerisk;
  this.RiskRegisterinfo.risk_admin_classification_id = this.Attributes.value.RiskClassification;
  this.RiskRegisterinfo.risk_admin_risk_categorization_id = this.Attributes.value.Catergrisation;
  this.RiskRegisterinfo.risk_admin_causeList_id = this.Attributes.value.Causelist;
  this.RiskRegisterinfo.AMLComplianceRisk = this.Attributes.value.AMLCompliance;
  this.RiskRegisterinfo.ModelRisk = this.Attributes.value.ModelRisk;
  this.RiskRegisterinfo.ConductRisk = this.Attributes.value.ConductRisk;
  this.RiskRegisterinfo.ITCyberSecurity = this.Attributes.value.ITandCyber;
  this.RiskRegisterinfo.ThirdPartyOutsourcing = this.Attributes.value.ThirdParty;
  this.RiskRegisterinfo.FraudRisk = this.Attributes.value.Fraud;
  this.RiskRegisterinfo.LegalRisk = this.Attributes.value.Legal;
  this.RiskRegisterinfo.OperationalRisk = this.Attributes.value.Operational;
  this.RiskRegisterinfo.ReputationalRisk = this.Attributes.value.Reputational;
  this.RiskRegisterinfo.FinancialRiskReporting = this.Attributes.value.FinancialReporting;
   this.RiskRegisterinfo.risk_admin_riskImpactRating_id = this.Attributes.value.Impact;
   this.RiskRegisterinfo.risk_admin_likeoccfact_id = this.Attributes.value.Likelihood;
   this.RiskRegisterinfo.InherentRiskRating = parseInt(this.Attributes.get('InherentRating')?.value) || 0;
   //alert("Inherent Risk Rating: " + parseInt(this.Attributes.get('InherentRating')?.value) || 0);
   this.RiskRegisterinfo.activityid = this.Attributes.value.RiskActivityFrequency;
   this.RiskRegisterinfo.RiskPriority = parseInt(this.Attributes.get('Priority')?.value) || 0;
   this.RiskRegisterinfo.Slidervalue = parseInt(this.Attributes.get('SliderValue')?.value) || 0;
   this.RiskRegisterinfo.RiskIntensity = parseInt(this.Attributes.get('Intensity')?.value) || 0;

  //Consequences
 this.RiskRegisterinfo.risk_admin_LETC_L1_id = this.Consequences.value.CategoryL1;
 this.RiskRegisterinfo.CategoryL1Description = this.Consequences.value.CategoryL1Descrpt;
 this.RiskRegisterinfo.risk_admin_letc_l2_id = this.Consequences.value.CategoryL2;
 this.RiskRegisterinfo.CategoryL2Description = this.Consequences.value.CategoryL2Descrpt;
 this.RiskRegisterinfo.risk_admin_LETC_l3_id = this.Consequences.value.CategoryL3;
 this.RiskRegisterinfo.CategoryL3Description = this.Consequences.value.CategoryL3Descrpt;
 this.RiskRegisterinfo.risk_admin_potenBussImpactid = this.Consequences.value.BusinessImpact;
 this.RiskRegisterinfo.PotentialImpactDescription = this.Consequences.value.BusinessImpactDescript;
 this.RiskRegisterinfo.SuggestivePriventive = this.Consequences.value.Priventive;
 //Ownership
 this.RiskRegisterinfo.RiskOwnership = this.Ownership.value.OwnershipControl;
 this.RiskRegisterinfo.ProcessOwner = this.Ownership.value.BusinessProcessOwner;
 this.RiskRegisterinfo.BusinessFunctionHead = this.Ownership.value.BusinessProcessFunctionHead;
//  this.RiskRegisterinfo.ReviewfrequencyCheck = parseInt(this.Ownership.get('ischecked').value )|| 0;
//    alert("Check" + parseInt(this.Ownership.get('ischecked').value ) || 0)
if(this.isPanelVisible==true){
 
  this.RiskRegisterinfo.ReviewfrequencyCheck=1;
  this.RiskRegisterinfo.RepeatReviewFrequency = this.Review.value.Frequency;
  if (this.Review.value.Frequency == "Yes") {
    this.FrequencyVisible = true;
    this.RiskRegisterinfo.EnterValueforrepeat = this.Review.value.entervalueDays;
    this.RiskRegisterinfo.Selectfrequencyperiod = this.Review.value.Period;
  } else {
    this.FrequencyVisible = false;
   
  }
  this.RiskRegisterinfo.StartDateNextReview = this.Review.value.review_start_Date;
}
else{
  this.RiskRegisterinfo.ReviewfrequencyCheck=0;
 }

// if (this.ReviewfrequencyCheck == 1) {
//   this.isPanelVisible = true;
//   this.RiskRegisterinfo.RepeatReviewFrequency = this.Review.value.Frequency;

//   if (this.Review.value.Frequency == "Yes") {
//     this.FrequencyVisible = true;
//     this.RiskRegisterinfo.EnterValueforrepeat = this.Review.value.entervalueDays;
//     this.RiskRegisterinfo.Selectfrequencyperiod = this.Review.value.Period;
//   } else {
//     this.FrequencyVisible = false;
   
//   }
//   this.RiskRegisterinfo.StartDateNextReview = this.Review.value.review_start_Date;

// } else {
//   this.isPanelVisible = false;
//   this.RiskRegisterinfo.RepeatReviewFrequency = this.Review.value.Frequency;
//   this.FrequencyVisible = false;
//   }


  
// // if(this.ReviewfrequencyCheck==1){
// //   this.isPanelVisible=true;
// //   this.RiskRegisterinfo.RepeatReviewFrequency=this.Review.value.Frequency;
// //   this.RiskRegisterinfo.StartDateNextReview=this.Review.value.review_start_Date;
 
// //   if (pubList.RepeatReviewFrequency === "Yes") {
// //    this.FrequencyVisible = true; 
// //    this.RiskRegisterinfo.EnterValueforrepeat=this.Review.value.entervalueDays;
// //    this.RiskRegisterinfo.Selectfrequencyperiod=this.Review.value.Period;
  
// //  } else {
// //    this.FrequencyVisible = false; 
// //  }
// //     }
// //    else{
// //   this.isPanelVisible=false;
// //   this.RiskRegisterinfo.RepeatReviewFrequency=this.Review.value.Frequency;


// // }
 //Statement
  this.RiskRegisterinfo.docTypeID=this.Statement.value.DocTypeID;
  this.RiskRegisterinfo.doc_CategoryID=this.Statement.value.Doc_CategoryID;
  this.RiskRegisterinfo.doc_SubCategoryID=this.Statement.value.Doc_SubCategoryID;
  this.RiskRegisterinfo.DocumentEffectiveDate=this.Statement.value.Eff_Date;
   this.RiskRegisterinfo.DocumentConfidentiality=this.Statement.value.Doc_Confidentiality;
  this.RiskRegisterinfo.OtpMethod=this.Statement.value.OtpMethod;
  this.RiskRegisterinfo.natureOf_Doc_id=this.Statement.value.NatureOf_Doc_id;
  this.RiskRegisterinfo.InternalReferenceNo=this.Statement.value.Doc_internal_num;
  this.RiskRegisterinfo.PhysicalVaultLocation=this.Statement.value.Docphysical;
  this.RiskRegisterinfo.BusinessProcessHead=this.Statement.value.Functionalhead;
  this.RiskRegisterinfo.risk_admin_RiskAppetiteId=this.Statement.value.Appetite;
  this.RiskRegisterinfo.AppetiteStatement=this.Statement.value.appestatement;
  this.RiskRegisterinfo.PublishingRemarks=this.Statement.value.documentpub;
  //this.RiskRegisterinfo.Keywords=this.Statement.value.Keywords;

  const UpdateKeywords = this.Statement.value.Keywords;
  //alert(this.Statement.value.Keywords)
    
    if (Array.isArray(UpdateKeywords) && UpdateKeywords.length > 0) {
      this.RiskRegisterinfo.Keywords = UpdateKeywords.join(', ');
      
    } else {
      // Handle the case where no value is selected (null or empty array)
      console.log('No key values');
    }



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
}
