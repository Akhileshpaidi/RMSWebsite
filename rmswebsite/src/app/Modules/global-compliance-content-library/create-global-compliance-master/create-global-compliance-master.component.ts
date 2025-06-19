import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import ArrayStore from 'devextreme/data/array_store';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material/stepper';
import { MoreRelatedInfoDialogboxComponent } from './more-related-info-dialogbox/more-related-info-dialogbox.component';
import { Subscription, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMoreorSubmitComplianceComponent } from 'src/app/Common/toaster/add-moreor-submit-compliance/add-moreor-submit-compliance.component';
import { GlobalComplianceDailogeboxComponent } from 'src/app/Common/daidailoge/global-compliance-dailogebox/global-compliance-dailogebox.component';

//import { ExitNav } from 'src/app/assessment-service.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  export interface Tag  {
    name: string;
  }
@Component({
  selector: 'app-create-global-compliance-master',
  templateUrl: './create-global-compliance-master.component.html',
  styleUrls: ['./create-global-compliance-master.component.scss']
})

export class CreateGlobalComplianceMasterComponent implements OnInit  {
  
  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatStepper) stepper!: MatStepper;
  //publDoc:any;
  tooltipText: string = ''; // Tooltip text
  tooltipTarget: any; // Element for tooltip targeting
  isTooltipVisible: boolean = false; // Tooltip visibility control
  selectedForms: any[] = [];
  selectedPenalties: any[] = [];
  OptionSelect:any[] = [];
  Options:any[]=[];
  selectedActName: string = '';
  subscription: Subscription | undefined;
  previousCompliances: any[] = [];
 //compliancePeriods: FormArray;
  userdata: any = [];
  showStatutoryFormTable: boolean = false;
  showcompliancepenaltyTable:boolean = false;
  isFormGridBoxOpened: boolean;
  visiblestepper:boolean = false;
  visible_compliancepreface:boolean=true;
  view_add_compliance:boolean=false;
  //isLinkCopied: boolean = false;
  linkCopiedStates: { [key: string]: boolean } = {};
  isPenaltyGridBoxOpened: boolean;
  createcompliance:any;
  rowDataArray: any[] = [];
  actname: any;
  rulename: any;
  nameofact:any;
  industryname: any;
  act_rule: any[] = [];
  actid: any;
  act_name:any;
  rule_act:any;
  nomenclatureData: any = {}; 
  chronologySetupData:any = {};
  complianceaddons:any ={};
  frequencyperiod:any;
  selected_frequency_id:any;
  barerulereference:any;
  isWeblinkVisible: boolean = false;
  isFileVisible: boolean = false;
  SelectedAct:any;
  complianceAct_rule_id: any = {}; 
  SelectedBussiness:any;
  recordname:any;
  compliancerecord:any;
  typecompliancename:any;
  data: any;
  riskcriteriaList:any;
  suggestedriskList:any;
  selectedpenaltyvisible= false;
  formGroup!: FormGroup;
  selectedFormsvisible=false;
  formList: any[] = []; 
  complianceGroup: any; 
  complianceNotifiedStatus: any; 
  ChooseOptions:Array<{id:number,text:string}>=[];
  schedulerForm!: FormGroup;
  applyExtendedDueDate: boolean[] = [];
  extendedDueDateRequired: boolean = false;
  extendedDueDateApplied: boolean = false;
  formrecordref: any;
  compliancepenalty: any;
  formsdetails:any[] = [];
  penaltydetails:any[] = [];
  webLinks: BareActReference[];
  files: BareActReference[];
  selectedpenaltyIsD:any[] = [];
  selectedFormIsD:any[] = [];
  selectedbusinessIDs: number[] = [];
  selectedindustryIDs: number[] = [];
  bussinessID: number[] = [];
  bussinessColumns: any = ['businesssectorname'];
  //industryColumns: any = ['industrytypename'];
  RecordFormNames: any = ['statutoryName','applicable_section'];
  PenaltyNames: any = ['compliancepenaltyName','applicable_section'];
  //selectedOption:any;
  industryData: any[] = [];
  flattenedIndustryData: any[] = [];
  industryColumns: any[] = [
    {
      dataField: 'BusinessName',
      caption: 'Business Name',
    },
    {
      dataField: 'IndustryName',
      caption: 'Industry Name',
    }
  ];

  formrequired:string ="No";
  penaltyrequired:string ="No";
  days: any[] = ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11', '12', '13', '14', '15','16', '17', '18', '19', '20','21', '22', '23', '24', '25','26', '27', '28', '29', '30','31'];
  months: any;
  originalDueDateOptions = ['Statutory', 'Industry Practice', 'Management Decision'];
  recurrenceOptions = ['Once', 'Every'];
  frequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  //periodicityFactorOptions = ['Same Month', 'Following Month', 'Same Month of Quarter Ending', 'Following Month of Quarter Ending', 'Following Month of Year Ending'];
  complianceYearFactorOptions = ['Financial Year', 'Calendar Year'];
  instances: number[] = []; // Number of instances, adjust as needed
  nooffrequency: any; 
  compliancePeriodOptions:any; // Populate with your options
  periodicityFactorOptions:any;
  industrytype: any[] =[];
  businesssector: any[] = [];
  dueDateStatusOptions: any[] = []; // Populate with Original/Extended options
  tags: { name: string }[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  act_rule_regulatory_id: any;
  errorMessage: any;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    // Update form control value
    this.createcompliance.get('tagList').setValue(this.tags);
  }
  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    // Update form control value
    this.createcompliance.get('tagList').setValue(this.tags);
  }

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient, public dialog: MatDialog,
    private session: SessionService,)
   {
      this.isFormGridBoxOpened = false;
       this.isPenaltyGridBoxOpened = false;
       this.webLinks = [];
       this.files = [];
      }
      
countArray(length: number): any[] {
  return Array.from({ length });
}

  checkSelectedForms(event: any) {
    this.selectedForms = [];
    console.log('Event:', event);
    console.log('Form Record Reference:', this.formrecordref);
    for (const formId of event.value || []) {
      console.log('Processing form ID:', formId);
      this.showStatutoryFormTable = true
      const formSelected = this.formsdetails.find((form: Form) => form.statutoryid === formId);
      if (formSelected) {
        console.log('Found selected form:', formSelected);   
        //alert(JSON.stringify(formSelected))
        this.selectedForms.push(formSelected);
      }
    }
  }
  Selectedcompliancepenalty(event: any) {
    this.selectedPenalties = [];
    console.log('Event:', event);
    console.log('Penalty Reference:', this.compliancepenalty);
    for (const compliancepenaltyid of event.value || []) {
      console.log('Processing penalty ID:', compliancepenaltyid);
      this.showcompliancepenaltyTable = true
      const penaltySelected = this.penaltydetails.find((penalty: Penalty) => penalty.compliancepenaltyid === compliancepenaltyid);
      if (penaltySelected) {
        console.log('Found selected Penalty:', penaltySelected);
        this.selectedPenalties.push(penaltySelected);
      }
    }
  }

  backto_compliancepreface(){
    this.visible_compliancepreface = true;
    this.visiblestepper = false;

  }
  getFileNameFromPath(filePath: string): string {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }
  
    ngOnInit(): void {

      let user: any = this.session.getUser();
      // console.log(user)
      this.userdata = JSON.parse(user);//userdata.profile.userid
      console.log("userid",this.userdata.profile.userid)
      this.initializeForm();
      this.initForm();
      this.intializePenalty();
      this.createcompliance.controls['selectedForms'].clearValidators();
      this.createcompliance.controls['selectedForms'].updateValueAndValidity();
      this.createcompliance.get('effectiveFromDate').disable();
      this.createcompliance.get('effectiveToDate').disable();
  // Unsubscribe from any subscriptions to avoid memory leaks
      if (this.subscription) {
        this.subscription.unsubscribe();
        }
      //this.frequency();
      this.schedulerForm = this.formBuilder.group({
        schedulerRows: this.formBuilder.array([]),
        extended_due_date_required: [false] 
      });
  
      // Add initial row
      //this.addSchedulerRow();

      this.actname={
        paginate: true,
        store: new CustomStore({
            key: 'actregulatoryid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdmin_ActRegulatory/GetActregulatory', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       
       this.suggestedriskList={
        paginate: true,
        store: new CustomStore({
            key: 'compliance_risk_classification_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdmin_Complianceriskclassification/GetCompliancerisk', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       this.riskcriteriaList={
        paginate: true,
        store: new CustomStore({
            key: 'compliance_risk_criteria_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdmin_riskcriteria/GetComplianceriskcriteriaDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };


       this.frequencyperiod = {
        paginate: true,
        store: new CustomStore({
          key: 'frequencyid',
          loadMode: 'raw',
          load: () => {
            return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdminFrequencyMaster/GetFrequencyMasterDetails', { headers })
                .subscribe(
                  (res: any) => {
                    resolve(res);
                    //this.applyExtendedDueDate = Array(res.length).fill(false);
                  },
                  (err) => {
                    reject(err);
                  }
                );
            });
          },
        }),
      };


      // this.compliancePeriodOptions = {
      //   paginate: true,
      //   store: new CustomStore({
      //     key: 'compliance_period_id',
      //     loadMode: 'raw',
      //     load: () => {
      //       return new Promise((resolve, reject) => {
      //         this.http.get<CompliancePeriod[]>(URL + '/SupAdmin_complianceperiod/GetcomplianceperiodDetails', { headers })
      //           .subscribe((res) => {
      //             const data = res.map(item => {
      //               const mergedColumns = `${item.compliance_period_start}-${item.start_compliance_year_format}--${item.compliance_period_end}-${item.end_compliance_year_format}`;
                    
      //               return { ...item, mergedColumns }; 
      //               // Add mergedColumns to each item
      //             });
      //             resolve(data);
      //           }, (err) => {
      //             reject(err); // Reject the promise in case of error
      //           });
      //       });
      //     },
      //   }),
      // };
      this.compliancePeriodOptions = {
        paginate: true,
        store: new CustomStore({
            key: 'compliance_period_id',
            loadMode: 'raw',
            load: () => {
                return new Promise((resolve, reject) => {
                    this.http.get<CompliancePeriod[]>(URL + '/SupAdmin_complianceperiod/GetcomplianceperiodDetails', { headers })
                        .subscribe((res) => {
                            const data = res.map(item => {
                                let mergedColumns: string;
                                if (item.compliance_period_end === null && item.end_compliance_year_format === null) {
                                    mergedColumns = `${item.compliance_period_start}-${item.start_compliance_year_format}`;
                                } else {
                                    mergedColumns = `${item.compliance_period_start}-${item.start_compliance_year_format}--${item.compliance_period_end}-${item.end_compliance_year_format}`;
                                }
                                return { ...item, mergedColumns }; // Add mergedColumns to each item
                            });
                            resolve(data);
                        }, (err) => {
                            reject(err); // Reject the promise in case of error
                        });
                });
            },
        }),
    };
    

       this.typecompliancename={
        paginate: true,
        store: new CustomStore({
            key: 'compliance_type_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdminComplianceType/GetComplianceTypeDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       this.periodicityFactorOptions={
        paginate: true,
        store: new CustomStore({
            key: 'periodicity_FactorID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/PeriodicityFactor/GetPeriodicityFactorDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       this.months={
        paginate: true,
        store: new CustomStore({
            key: 'monthID',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/PeriodicityFactor/GetMonthDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };

       this.compliancerecord={
        paginate: true,
        store: new CustomStore({
            key: 'compliance_record_type_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdmin_ComplianceRecordType/GetComplianceRecordDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       this.complianceGroup={
        paginate: true,
        store: new CustomStore({
            key: 'compliance_notified_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdmin_compliancegroup/GetcompliancegroupDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       this.complianceNotifiedStatus={
        paginate: true,
        store: new CustomStore({
            key: 'compliance_period_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/SupAdmin_compliancenotifiedstatus/Getcompliance', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       
  this.SelectedBussiness={
    paginate: true,
    store: new CustomStore({
        key: 'businesssectorid',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/SuperAdminBusinessSectorList/GetBusinessSectorListDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

      this.ChooseOptions=[
        { id:1,text:'Yes' },
        { id:2,text:'No'  }
      ];
      this.data = new ArrayStore({
        data: this.ChooseOptions,
        key: "ID"
      });

      //this.http.get{URL + '/'}

//this.createcompliance.valueChanges.subscribe((val: any) => console.log("createcompliance values:", val));

    }
    // frequency1(selectedfrequency: any) {
    //   this.selected_frequency_id = selectedfrequency.value;
    //   this.instances=[];
    //   this.http.get(URL + '/SupAdminfrequencymaster/GetnofrequencyIntervals/' + this.selected_frequency_id, { headers })
    //     .subscribe(
    //       (res: any) => {
    //         this.nooffrequency = res;
    //         this.instances = Array.from({length: this.nooffrequency}, (_, i) => i + 1);
    //         const instancesArray: FormArray = this.createcompliance.get('instances') as FormArray;
    //         instancesArray.clear();
    //         this.instances.forEach((element: any) => {
    //           instancesArray.push(this.formBuilder.group({
    //             currentcompliancePeriod: ['', Validators.required],
    //             nextCompliancePeriod: ['', Validators.required],
    //             dueDateDay: ['', Validators.required],
    //             dueDateMonth: ['', Validators.required],
    //             extendedDueDateDay: [''],
    //             extendedDueDateMonth: [''],
    //             extendstatus: false
    //           }));
    //         });
    //         this.applyExtendedDueDate = Array(res.length).fill(false);
    
    //         // Trigger validation of the instances FormArray
    //         instancesArray.updateValueAndValidity(); // Manually trigger validation
    //       },
    //       (err) => {
    //         console.error(err);
    //       }
    //     );
    // }
    
    frequency(selectedfrequency: any) {
      this.selected_frequency_id = selectedfrequency.value;
      this.instances = [];
      this.http.get(URL + '/SupAdminfrequencymaster/GetnofrequencyIntervals/' + this.selected_frequency_id, { headers })
        .subscribe(
          (res: any) => {
            this.nooffrequency = res;
            this.instances = Array.from({ length: this.nooffrequency }, (_, i) => i + 1);
            const instancesArray: FormArray = this.createcompliance.get('instances') as FormArray;
            instancesArray.clear();
            this.instances.forEach((element: any) => {
              instancesArray.push(this.createInstanceFormGroup());
            });
            this.applyExtendedDueDate = Array(res.length).fill(false);
            instancesArray.updateValueAndValidity();
          },
          (err) => {
            console.error(err);
          }
        );
    }

    
  createInstanceFormGroup(): FormGroup {
    const group = this.formBuilder.group({
      currentcompliancePeriod: ['', Validators.required],
      currentperiodicityFactor: ['', Validators.required],
      nextCompliancePeriod: ['', Validators.required],
      nextperiodicityFactor: ['', Validators.required],
      dueDateDay: ['', Validators.required],
      dueDateMonth: ['', Validators.required],
      extendedDueDateDay: [{ value: '', disabled: true }],
      extendedDueDateMonth: [{ value: '', disabled: true }],
      extendstatus: false
    }, { validator: this.extendedDueDateValidator });

    // Subscribe to changes in the extendstatus checkbox
    group.get('extendstatus')?.valueChanges.subscribe(checked => {
      if (checked) {
        group.get('extendedDueDateDay')?.enable();
        group.get('extendedDueDateMonth')?.enable();
      } else {
        group.get('extendedDueDateDay')?.disable();
        group.get('extendedDueDateMonth')?.disable();
      }
    });

    return group;
  }

  // createInstanceFormGroup1(): FormGroup {
  //   return this.formBuilder.group({
  //     currentcompliancePeriod: ['', Validators.required],
  //     nextCompliancePeriod: ['', Validators.required],
  //     dueDateDay: ['', Validators.required],
  //     dueDateMonth: ['', Validators.required],
  //     extendedDueDateDay: [''],
  //     extendedDueDateMonth: [''],
  //     extendstatus: false
  //   }, { validator: this.extendedDueDateValidator });
  // }

  extendedDueDateValidator(group: FormGroup): { [key: string]: any } | null {
    const extendstatus = group.get('extendstatus')?.value;
    const extendedDueDateDay = group.get('extendedDueDateDay');
    const extendedDueDateMonth = group.get('extendedDueDateMonth');

    if (extendstatus) {
      if (!extendedDueDateDay?.value) {
        extendedDueDateDay?.setErrors({ required: true });
      }
      if (!extendedDueDateMonth?.value) {
        extendedDueDateMonth?.setErrors({ required: true });
      }
      if (!extendedDueDateDay?.value || !extendedDueDateMonth?.value) {
        return { extendedDueDateRequired: true };
      }
    } else {
      extendedDueDateDay?.setErrors(null);
      extendedDueDateMonth?.setErrors(null);
    }
    return null;
  }

      getRules(event: any) {
        const selectedActName = event.text; // Access the display expression directly
        //alert(event.text)
        this.selectedActName = selectedActName;
        const selectedActId = event.value;
        this.actid = selectedActId;
        this.rule_act = null;
        if (selectedActId) {
          this.subscription = this.http.get(URL + '/SupAdmin_ActRegulatory/superGetrulesandregulatoryByID/' + selectedActId, { headers })
            .subscribe(res => {
              this.rulename = res;
            }, error => {
              console.error('Error fetching rules:', error);
            });
        }
      }
      
      // copyLink(link: string) {
      //   navigator.clipboard.writeText(link).then(() => {
      //     this.isLinkCopied = true;
      //     setTimeout(() => {
      //       this.isLinkCopied = false;
      //     }, 3000); // Reset the copied message after 3 seconds
      //   }).catch(error => {
      //     console.error('Unable to copy link: ', error);
      //   });
      // }
      copyLink(link: string) {
        navigator.clipboard.writeText(link).then(() => {
            this.linkCopiedStates[link] = true;
            setTimeout(() => {
                this.linkCopiedStates[link] = false;
            }, 3000); // Reset the copied message after 3 seconds
        }).catch(error => {
            console.error('Unable to copy link: ', error);
        });
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
      //alert (JSON.stringify(res))
          // Extract filename from the URL
          const filenameFromUrl = this.getFileNameFromPath(filePath);
      
          // Create a blob URL to trigger the download
          const blob = new Blob([res], { type: fileType });
          const url = window.URL.createObjectURL(blob);
          
          // Create a link element and click on it to trigger the download
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
      
 
     getindustrytype(event: any) {
    
      //console.log("Selected business:", event.value);
      this.bussinessID = event.value;
     // alert(this.bussinessID);
      this.industryname = {
        paginate: true,
        store: new CustomStore({
          key: 'industrytypeid',
          loadMode: 'raw',
          load: () => {
           
            return new Promise((resolve, reject) => {
             
              this.http.get(URL + '/SuperAdminIndustryTypeList/GetindustryByBusinessID/' + this.bussinessID.join(','), { headers })
                .subscribe(
                  (res: any) => {
                    //alert(JSON.stringify(res))
                    this.flattenedIndustryData = this.flattenData(res);
                    resolve(this.flattenedIndustryData);
                  },
                  (err: any) => {
                    reject(err);
                  }
                );
            });
          }
        })
      };
      console.log(JSON.stringify(this.industryname))
    }

    flattenData(data: any[]): any[] {
      const flattened: any[] = [];
      //alert(JSON.stringify(data))
      data.forEach(business => {
        business.industrytypename.forEach((industryName: string, index: number) => {
          flattened.push({
            BusinessName: business.BusinessName,
            IndustryName: industryName,
            industrytypeid: business.industrytypeid[index]
          });
        });
      });
      return flattened;
    }

    isWebLink(reference: BareActReference): boolean {
      return reference.filecategory === 'Weblink';
  }
  
  processReferences(references: BareActReference[]): BareActReference[] {
    const links = references.filter(reference => this.isWebLink(reference));
    const files = references.filter(reference => !this.isWebLink(reference));
    return [...links, ...files];
}
resetForm(): void {
  this.view_add_compliance = false;
  this.rule_act = [];
  this.rule_act = null;
  //this.SelectedAct=null;
  this.selectedbusinessIDs = [];
  this.selectedindustryIDs = [];
  this.rulename = null;
  // const isformsrequired = this.createcompliance.get('formNameRequired').value;
  // const ispenaltyrequired = this.createcompliance.get('penaltyprovisionrequired').value;
  this.createcompliance.reset({
    
    formNameRequired:"No",
    penaltyprovisionrequired:"No",
    subscriptionType: 'free'
  });
}
    
    resetStepper() {
      this.stepper.selectedIndex = 0; // Reset to the first step
    }
    showPopup(rule: any) {
      const dialogRef = this.dialog.open(MoreRelatedInfoDialogboxComponent, {
        width: '600px',
        data: rule[0],
        disableClose: true // Prevents closing the dialog by clicking outside of it
      });
    }
  

      getactruledata(selectedactrule: any) {
        this.view_add_compliance=true;
        this.act_rule_regulatory_id = selectedactrule.value;
        this.http.get(URL + '/createglobalcompliance/GetactandruleDetails/' + this.act_rule_regulatory_id, { headers })
          .subscribe(
            (res: any) => {
              this.act_rule = res;
              this.rule_act= res;
            },
            (err) => {
              console.error(err);
            }
          );
      
          this.formrecordref = {
            paginate: true,
            store: new CustomStore({
              key: 'statutoryid',
              loadMode: 'raw',
              load: () => {
                return new Promise((resolve, reject) => {
                  this.http.get(URL + '/SupAdmin_statutoryfrom/GetformsuprecordByID/' + this.act_rule_regulatory_id, { headers })
                    .subscribe(
                      (res: any) => {
                        this.formsdetails = res;
                        console.log(JSON.stringify(this.formsdetails))
                        //alert(JSON.stringify(this.formsdetails))
                        if (Array.isArray(res)) {
                          resolve(res); // Resolve with the fetched data
                        } else {
                          reject("Invalid data format"); // Reject if data format is incorrect
                        }
                      },
                      (err) => {
                        console.error(err);
                        reject(err); // Reject with the error
                      }
                    );
                });
              },
            }),
          };
          

          this.compliancepenalty={
            paginate: true,
            store: new CustomStore({
                key: 'compliancepenaltyid',
                loadMode: 'raw',
                load:()=>{return new Promise((resolve, reject) => {
                  this.http.get(URL + '/SupAdmin_penaltycategory/GetpenaltycomplianceByID/'+ this.act_rule_regulatory_id, {headers})
                  .subscribe(
                    (res: any) => {
                      this.penaltydetails = res;
                     // alert(JSON.stringify(this.penaltydetails))
                      console.log(JSON.stringify(this.penaltydetails))
                      if (Array.isArray(res)) {
                        resolve(res); 
                      } else {
                        reject("Invalid data format");
                      }
                    },
                    (err) => {
                      console.error(err);
                      reject(err); 
                    }
                  );
              });
              },
            }),
           };
      }

      toggleDescription() {
        alert("clicked")
        console.log("Clicked!");
        this.rule_act[0].description.showDescription = !this.rule_act[0].description.showDescription;
      }

      selectOption(event: any) {
        // handle the selection change here
        this.formrequired = event.value;
        if (this.formrequired =="Yes") { // Assuming 'Yes' has an id of 1
          this.createcompliance.controls['selectedForms'].setValidators([Validators.required]);
          this.createcompliance.controls['selectedForms'].updateValueAndValidity();
          this.selectedFormsvisible=true;
        } else {
          this.createcompliance.controls['selectedForms'].clearValidators();
          this.createcompliance.controls['selectedForms'].updateValueAndValidity();
          this.selectedFormsvisible=false;
          this.showStatutoryFormTable=false;
        }
      }
      
      
      OptionSelected(event: any) {

       this.penaltyrequired = event.value;
        if (this.penaltyrequired =="Yes") {
         this.selectedpenaltyvisible=true;
         this.createcompliance.controls['selectedPenalties'].setValidators([Validators.required]);
         this.createcompliance.controls['selectedPenalties'].updateValueAndValidity();
  
          } else {
            this.selectedpenaltyvisible=false;
            this.showcompliancepenaltyTable=false;
            this.createcompliance.controls['selectedPenalties'].clearValidators();
            this.createcompliance.controls['selectedPenalties'].updateValueAndValidity();
  
          }
        }

      saveAndGoToNextStep(): void {
        //this.saveChronologySetupData();
    
        // Navigate to the next step
        this.stepper.next();
      }
      saveAndGoTocompliancepreface(): void {
        // Navigate to the next step
        this.stepper.next();
      }

  // Method to save only Act and Rule data
      addcompliance(){
        this.visible_compliancepreface = false;
        this.visiblestepper = true;
        this.complianceAct_rule_id ={
         actid: this.createcompliance.get('Actid')?.value,
         ruleid: this.createcompliance.get('ruleid')?.value
      }
        }


// toggleCheckboxes(): void {
//   this.Checkboxes = !this.Checkboxes;
  
//   alert(this.Checkboxes);

//   if (!this.Checkboxes) {
//     this.applyExtendedDueDate = [];
//   }
// }
toggleCheckboxes(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const isChecked = inputElement.checked;

  this.extendedDueDateRequired = isChecked;
  this.createcompliance.get('extended_due_date_required').setValue(isChecked);

  if (isChecked) {
    this.createcompliance.get('effectiveFromDate').enable();
    this.createcompliance.get('effectiveToDate').enable();
    this.createcompliance.get('effectiveFromDate').setValidators([Validators.required]);
    this.createcompliance.get('effectiveToDate').setValidators([Validators.required]);
  } else {
    this.createcompliance.get('effectiveFromDate').disable();
    this.createcompliance.get('effectiveToDate').disable();
    this.createcompliance.get('effectiveFromDate').clearValidators();
    this.createcompliance.get('effectiveToDate').clearValidators();
    this.createcompliance.get('effectiveFromDate').setValue(null);  // Clear the value
    this.createcompliance.get('effectiveToDate').setValue(null);    // Clear the value
    this.createcompliance.get('extended_due_date_required').setValue(false);
  }

  this.createcompliance.get('effectiveFromDate').updateValueAndValidity();
  this.createcompliance.get('effectiveToDate').updateValueAndValidity();
}
  toggleChecked1(index: number): void {
    this.applyExtendedDueDate[index] = !this.applyExtendedDueDate[index];
  }
  toggleChecked(index: number) {
    const instancesArray = this.createcompliance.get('instances') as FormArray;
    const group = instancesArray.at(index) as FormGroup;
    const extendstatus = group.get('extendstatus')?.value;

    if (extendstatus) {
      group.get('extendedDueDateDay')?.enable();
      group.get('extendedDueDateMonth')?.enable();
    } else {
      group.get('extendedDueDateDay')?.disable();
      group.get('extendedDueDateMonth')?.disable();
      group.get('extendedDueDateDay')?.setValue(null);  // Clear the value
      group.get('extendedDueDateMonth')?.setValue(null);    // Clear the value
    }
  }

initForm(): void {
  this.createcompliance = this.formBuilder.group({
    Actid: ['', Validators.required], 
    ruleid: ['', Validators.required],
    //
    Compliance_Name: ['', Validators.required],
    compliancedescription: ['', Validators.required],
    section_rule: ['', Validators.required],
    typecompliance: ['', Validators.required],
    typecompliancerecord: ['', Validators.required], 
    // formNameRequired: [this.formrequired, Validators.required],
    // selectedForms: [[], this.formrequired =="Yes" ? Validators.required : null], 
    
    formNameRequired: [this.formrequired, Validators.required],
    selectedForms: [[], this.formrequired =="Yes"  ? Validators.required : null], 
    special_instructions: [null],
    groupcompliance: [null],
    complianceNotified: ['', Validators.required],
      //
    frequency_period: ['', Validators.required],
    originalDueDateDefinedBy: ['', Validators.required],
    recurrenceOption: ['', Validators.required],
    frequency_options: ['', Validators.required],
    dueDate: ['', Validators.required],
    periodicityFactor: ['', Validators.required],
    complianceYearFactor: ['', Validators.required],
    startMonthForComplianceYear: ['', Validators.required],
    // effectiveFromDate: [''],
    // effectiveToDate: [''],
    // extended_due_date_required:[''],
    extended_due_date_required: [false],
    effectiveFromDate: [{ value: null, disabled: true }, Validators.required],
    effectiveToDate: [{ value: null, disabled: true }, Validators.required],
    //
    businesssector: [null],
    industrytype: [null],
    referenceadditional: [null],
    penaltyprovisionrequired: [this.penaltyrequired, Validators.required],
    selectedPenalties: [[], this.penaltyrequired =="Yes"  ? Validators.required : null], 
    suggestedrisk: [null],
    riskcriteria: ['', Validators.required],
    tagList: [[]],
    //instances: this.formBuilder.array([]),
    instances: this.formBuilder.array([], this.instancesValidator()),
    subscriptionType: ['free', Validators.required]
  });
}
instancesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const instancesArray = control as FormArray;

    const invalidInstanceIndex = instancesArray.controls.findIndex(instanceControl => instanceControl.invalid);

    return invalidInstanceIndex !== -1 ? { 'instancesInvalid': true } : null;
  };
}
isInvalid(controlName: string) {
  const control = this.createcompliance.get(controlName);
  return control.invalid && (control.dirty || control.touched); // Check if control has been touched
}
    get schedulerRows() {
      return this.schedulerForm.get('schedulerRows') as FormArray;
    }
  
    // addSchedulerRow() {
    //   const row = this.formBuilder.group({
    //     currentCompliancePeriod: ['', Validators.required],
    //     day: ['', Validators.required],
    //     month: ['', Validators.required],
    //     nextCompliancePeriod: ['', Validators.required]
    //   });
    //   this.schedulerRows.push(row);
    // }
  
    // removeSchedulerRow(index: number) {
    //   this.schedulerRows.removeAt(index);
    // }
    
    initializeForm(): void {
      this.formGroup = this.formBuilder.group({
        formNameRequired: ['No'], // Default value is 'No'
        selectedForms: [[]] // Initialize selectedForms as an empty array
      });

    }
    intializePenalty(): void{
      this.formGroup = this.formBuilder.group({
        penaltyprovisionrequired: ['No'], // Default value is 'No'
        selectedPenalties: [[]] // Initialize selectedPenalties as an empty array
      });
    }

    showInvalidFieldsAlert() {

      let invalidFields = '';


      if (this.createcompliance.controls['Actid'].invalid) {
        invalidFields += '- Select Act Name  \n';
      }
      if (this.createcompliance.controls['ruleid'].invalid) {
        invalidFields += '- Select Rule Name  \n';
      }
      if (this.createcompliance.controls['Compliance_Name'].invalid) {
        invalidFields += '- Enter Compliance Name \n';
      }
      if (this.createcompliance.controls['compliancedescription'].invalid) {
        invalidFields += '- Enter Compliance Description  \n';
      }
      if (this.createcompliance.controls['section_rule'].invalid) {
        invalidFields += '- Add Section/ Rule/ Clause/ Regulation Reference  \n';
      }
      if (this.createcompliance.controls['typecompliance'].invalid) {
        invalidFields += '- Select Compliance Type  \n';
      }
      if (this.createcompliance.controls['typecompliancerecord'].invalid) {
        invalidFields += '- Select Compliance Record Type  \n';
      }
      const isFormNameRequired = this.createcompliance.controls['formNameRequired'].value === 'Yes';
      if (isFormNameRequired && !this.createcompliance.controls['selectedForms'].value.length) 
        {
        invalidFields += '- Select Form Number/ Record Name/ Reference \n';
      }
      if (this.createcompliance.controls['complianceNotified'].invalid) {
        invalidFields += '- Select Compliance Notified Status  \n';
      }
      if (this.createcompliance.controls['frequency_period'].invalid) {
        invalidFields += '- Select Frequency Period  \n';
      }
      if (this.createcompliance.controls['originalDueDateDefinedBy'].invalid) {
        invalidFields += '- Select Original Due Date Defined By  \n';
      }
      if (this.createcompliance.controls['recurrenceOption'].invalid) {
        invalidFields += '- Select Recurrence  \n';
      }
      if (this.createcompliance.controls['frequency_options'].invalid) {
        invalidFields += '- Select Frequency  \n';
      }
      if (this.createcompliance.controls['dueDate'].invalid) {
        invalidFields += '- Select Day  \n';
      } //
      if (this.createcompliance.controls['periodicityFactor'].invalid) {
        invalidFields += '- Select Periodicity Factor  \n';
      }
      if (this.createcompliance.controls['complianceYearFactor'].invalid) {
        invalidFields += '- Select Compliance Year Factor  \n';
      }
      if (this.createcompliance.controls['startMonthForComplianceYear'].invalid) {
        invalidFields += '- Select Start Month for Compliance Year  \n';
      }
    const ispenaltyprovisionrequired = this.createcompliance.controls['penaltyprovisionrequired'].value === 'Yes';
    if (ispenaltyprovisionrequired && !this.createcompliance.controls['selectedPenalties'].value.length) 
      {
      invalidFields += '- Select Compliance Penalty \n';
    }
      if (this.createcompliance.controls['riskcriteria'].invalid) {
        invalidFields += '- Select Risk Classification Criteria  \n';
      }
      if (this.createcompliance.controls['subscriptionType'].invalid) {
        invalidFields += '- Select Subscription Type  \n';
      }
      if (this.createcompliance.controls['instances'].invalid) {
        invalidFields += '- Select All Fields in Scheduler Master \n';
      }
      if (this.createcompliance.controls['effectiveFromDate'].invalid) {
        invalidFields += '- Select Effective From Date is required.  \n';
      }
      if (this.createcompliance.controls['effectiveToDate'].invalid) {
        invalidFields += '- Select Effective Till Date is required.  \n';
      }
  
    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields: \n${invalidFields}`,
        },
      });
    }
  }
  generateKeyWordsTags(tags: { name: string }[]): string {
    if (!tags || tags.length === 0) {
        return 'N/A'; // Return an empty string if there are no tags
    }
    // Extracting the name values and joining them into a comma-separated string
    const keyWordsTags = tags.map(tag => tag.name).join(',');
    return keyWordsTags;
  }

  getform_no_record_name_requiredIds(isrequired: string){
    if (isrequired === 'No') {
      return 'N/A';  
  } 
  else {
    const ids = this.createcompliance.get('selectedForms')?.value.toString();
    return ids;
  }
  }

getcompliancePenaltyIds(isrequired: string){
  if (isrequired === 'No') {
    return 'N/A';  
} 
else {
  const ids = this.createcompliance.get('selectedPenalties')?.value.toString();
    return ids;
}
}

createPayload(): any {
  let payload = {
    act_id: this.createcompliance.get('Actid')?.value,
    rule_id:  this.createcompliance.get('ruleid')?.value,
    category_of_law_id:this.rule_act[0].categoryID,
    law_type_id:this.rule_act[0].lawID,
    regulatory_authority_id:this.rule_act[0].regulatorID,
    jursdiction_category_id:this.rule_act[0].jurisdictionCategoryID,
    jursdiction_Location_id:this.rule_act[0].jurisdictionLocationID,
    country_id:this.rule_act[0].countryId,
    state_id:this.rule_act[0].stateId,
    district:this.rule_act[0].jurisdiction_district,
    compliance_name: this.createcompliance.get('Compliance_Name')?.value,
    compliance_description: this.createcompliance.get('compliancedescription')?.value,
    section_rule_regulation_ref: this.createcompliance.get('section_rule')?.value,
    compliance_type_id: parseInt(this.createcompliance.get('typecompliance')?.value),
    compliance_record_type_id: parseInt(this.createcompliance.get('typecompliancerecord')?.value),
    form_no_record_name_required: this.createcompliance.get('formNameRequired')?.value.toString() ?? 'N/A',
    //form_no_record_name_reference_ids: (this.createcompliance.get('selectedForms')?.value ?? 'N/A').join(','),
    form_no_record_name_reference_ids: this.getform_no_record_name_requiredIds(this.createcompliance.get('formNameRequired')?.value.toString()),
    special_instr_statutory_form_update: this.createcompliance.get('special_instructions')?.value !== null ? this.createcompliance.get('special_instructions')?.value.toString() : 'N/A',
    compliance_notified_status_id: parseInt(this.createcompliance.get('complianceNotified')?.value),
    compliance_group_id: parseInt(this.createcompliance.get('groupcompliance')?.value),
    frequency_period_id: parseInt(this.createcompliance.get('frequency_period')?.value),
    original_due_date_defined_by: this.createcompliance.get('originalDueDateDefinedBy')?.value ?? '',
    recurrence: this.createcompliance.get('recurrenceOption')?.value ?? '',           
    frequency: this.createcompliance.get('frequency_options')?.value ?? '',
    day: this.createcompliance.get('dueDate')?.value ?? '',
    extended_due_date_required: this.createcompliance.get('extended_due_date_required')?.value ?? '', 
    periodicity_factor: this.createcompliance.get('periodicityFactor')?.value ?? '',
    compliance_year_factor: this.createcompliance.get('complianceYearFactor')?.value ?? '',
    start_month_compliance_year: this.createcompliance.get('startMonthForComplianceYear')?.value ?? '',
    effective_from_date: this.createcompliance.get('effectiveFromDate')?.value !== null ? this.createcompliance.get('effectiveFromDate')?.value.toString() : null,
    effective_to_date: this.createcompliance.get('effectiveToDate')?.value !== null ? this.createcompliance.get('effectiveToDate')?.value.toString() : null,
    // bussiness_sector_ids: (this.createcompliance.get('businesssector')?.value ?? 'N/A').join(','),
    // industry_ids: (this.createcompliance.get('industrytype')?.value ?? 'N/A').join(','),
    bussiness_sector_ids: this.createcompliance.get('businesssector')?.value !== null ? this.createcompliance.get('businesssector')?.value.toString() : null,
    industry_ids: this.createcompliance.get('industrytype')?.value !== null ? this.createcompliance.get('industrytype')?.value.toString() : null,
    any_additional_references: this.createcompliance.get('referenceadditional')?.value!== null ? this.createcompliance.get('referenceadditional')?.value.toString() : 'N/A',
    penalty_provision_required: (this.createcompliance.get('penaltyprovisionrequired')?.value).toString() ?? 'N/A',
   // compliance_penalty_ids: (this.createcompliance.get('penaltyprovisionrequired')?.value ?? 'N/A').join(','),
    compliance_penalty_ids: this.getcompliancePenaltyIds(this.createcompliance.get('penaltyprovisionrequired')?.value.toString()),

    suggested_risk_id: parseInt(this.createcompliance.get('suggestedrisk')?.value),
    risk_classification_criteria_id: parseInt(this.createcompliance.get('riskcriteria')?.value),
    instancesData: this.createcompliance.get('instances')?.value,
    key_words_tags: this.generateKeyWordsTags(this.createcompliance.get('tagList')?.value),
    subscription_type: this.createcompliance.get('subscriptionType')?.value ?? 'N/A'.toString(),
    created_by: (this.userdata.profile.userid).toString()
  
  };
  return payload;
}

    addmorecompliance() {
  const payload = this.createPayload();
  console.log(JSON.stringify(payload));
  
  const controlsArray: AbstractControl[] = Object.values(this.createcompliance.controls);
  // Mark all form controls as touched
  controlsArray.forEach((control: AbstractControl) => {
    control.markAsTouched();
  });
  
  if (this.createcompliance.invalid) {
    const invalidControls: string[] = [];
    Object.keys(this.createcompliance.controls).forEach(controlName => {
      const control = this.createcompliance.get(controlName);
      if (control?.invalid) {
        invalidControls.push(controlName);
      }
    });
    if (invalidControls.length > 0) {
      this.showInvalidFieldsAlert();
    }
  }

  else {
     //alert("form Valid");
     const payload = this.createPayload();
     console.log(JSON.stringify(payload));
     //alert("create company compliance" + JSON.stringify(payload));
     
     this.http.post(URL + '/createglobalcompliance/InsertGlobalCompliance', payload, { observe: 'response' })
       .subscribe(
         (response: HttpResponse<any>) => {
           //alert(response.status);
           //alert(JSON.stringify(response.body));
           
           if (response.status === 200 && response.body && response.body.id) {
             this.showAddMoreMessage("Global Compliance Created Successfully.", response.body.id);
           } else {
             this.showErrorMessage('Unexpected response: ' + JSON.stringify(response.body));
             console.error('Unexpected response:', response);
           }
         },
       (error: HttpErrorResponse) => {
         if (error.status === 409) {
           this.showErrorMessage("Compliance name already exists");
         } else if (error.status === 500) {
           this.showErrorMessage("Fatal error encountered during creation of global compliance.");
         } else {
           this.showErrorMessage("Fatal error encountered during creation of global compliance.");
         }
       }
     );
   }
}

// FinalSubmit(){
// const message2 ='Would you like to submit this or add additional compliance information in accordance with the same Act and rule?';


openDialog(): void {
  const message2 = 'Would you like to submit this or add additional compliance information in accordance with the same Act and rule?';
  const dialogRef = this.dialog.open(AddMoreorSubmitComplianceComponent, {
    width: '550px',
    data: { message: message2 },
    disableClose:true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.createGlobalCompliance();
    } else if (result === false) {
      this.addmorecompliance();
    } else {
      console.log('Dialog was closed without any action.');
    }
  });
}

//     createGlobalCompliance() {
//       const payload = this.createPayload();
//        console.log(JSON.stringify(payload));
//     const controlsArray: AbstractControl[] = Object.values(this.createcompliance.controls);
//     // Mark all form controls as touched
//     controlsArray.forEach((control: AbstractControl) => {
//       control.markAsTouched();
//     });
//   if (this.createcompliance.invalid) {
//     const invalidControls: string[] = [];
//     Object.keys(this.createcompliance.controls).forEach(controlName => {
//       const control = this.createcompliance.get(controlName);
//       if (control?.invalid) {
//         invalidControls.push(controlName);
//       }
//     });
//     if (invalidControls.length > 0) {
//       //alert("Invalid fields: " + invalidControls.join(', '));
//       this.showInvalidFieldsAlert();
//     }
//     //this.showInvalidFieldsAlert();
//     //return;
//   }
  
//   else {
//    alert("form Valid")
//    const payload = this.createPayload();
//     console.log(JSON.stringify(payload));
//     alert("create company compliance" + JSON.stringify(payload));
//     this.http.post(URL + '/createglobalcompliance/InsertGlobalCompliance', payload)
//     // .subscribe(
//     //   (response: any) => {
//     //     if (response.status === 200) {
//     //       this.showFinalSubmitMessage("Compliance Created Successfully." , response.body.id);
//     //     } else {
//     //       this.showErrorMessage('Unexpected response: ' +  response.body.id);
//     //       console.error('Unexpected response:',  response.body.id);
//     //     }
//     //   },
//       .subscribe(
//         (response: any) => {
//           alert(response.status)
//           alert(response.body)
//           alert(response.body.id)
//           if (response.status === 200 && response.body && response.body.id) {
//             this.showFinalSubmitMessage("Compliance Created Successfully With trhe Global ID." ,response.body.id);
//           } else {
//             this.showErrorMessage('Unexpected response: ' + JSON.stringify(response.body));
//             console.error('Unexpected response:', response);
//           }
//         },
//       (error: HttpErrorResponse) => {
//         if (error.status === 409) {
//           this.showErrorMessage("Compliance name already exists.");
//         } else if (error.status === 500) {
//           this.showErrorMessage("Fatal error encountered during creation of company compliance.");
//         } else {
//           this.showErrorMessage("Fatal error encountered during creation of company compliance.");
//         }
//       }
//     );
//   }
// }
createGlobalCompliance() {
  const payload = this.createPayload();
  console.log(JSON.stringify(payload));
  
  const controlsArray: AbstractControl[] = Object.values(this.createcompliance.controls);
  // Mark all form controls as touched
  controlsArray.forEach((control: AbstractControl) => {
    control.markAsTouched();
  });
  
  if (this.createcompliance.invalid) {
    const invalidControls: string[] = [];
    Object.keys(this.createcompliance.controls).forEach(controlName => {
      const control = this.createcompliance.get(controlName);
      if (control?.invalid) {
        invalidControls.push(controlName);
      }
    });
    if (invalidControls.length > 0) {
      this.showInvalidFieldsAlert();
    }
  } else {
    //alert("form Valid");
    const payload = this.createPayload();
    console.log(JSON.stringify(payload));
    //alert("create company compliance" + JSON.stringify(payload));
    
    this.http.post(URL + '/createglobalcompliance/InsertGlobalCompliance', payload, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
         // alert(response.status);
         // alert(JSON.stringify(response.body));
          
          if (response.status === 200 && response.body && response.body.id) {
            this.showFinalSubmitMessage("Global Compliance Created Successfully.", response.body.id);
          } else {
            this.showErrorMessage('Unexpected response: ' + JSON.stringify(response.body));
            console.error('Unexpected response:', response);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.showErrorMessage("Compliance name already exists.");
          } else if (error.status === 500) {
            this.showErrorMessage("Fatal error encountered during creation of global compliance.");
          } else {
            this.showErrorMessage("Fatal error encountered during creation of global compliance.");
          }
        }
      );
  }
}

showTooltip(event: MouseEvent, item: any): void {
  this.tooltipText = item.periodicity_Factor_Name;
  this.tooltipTarget = event.target; // Target the hovered element
  this.isTooltipVisible = true;
}
hideTooltip(): void {
  this.isTooltipVisible = false;
}

showFinalSubmitMessage(message: string , global_id : string) {
  const dialogRef = this.dialog.open(GlobalComplianceDailogeboxComponent, {
    width: '400px',
    data: { message: message, success: true , id: "Global Compliance ID :"+ global_id},
    disableClose: true // Prevents closing the dialog by clicking outside of it
  });
  dialogRef.afterClosed().subscribe(result => {
    // Check if the dialog was closed (i.e., button clicked), then clear all fields
    if (result) {
      const isformsrequired = this.createcompliance.get('formNameRequired').value;
      const ispenaltyrequired = this.createcompliance.get('penaltyprovisionrequired').value;
      this.visible_compliancepreface = true;
      this.visiblestepper = false;
      this.view_add_compliance = false;
      this.rule_act = [];
      this.rule_act = null;
      this.selectedbusinessIDs = [];
      this.selectedindustryIDs = [];
      //this.SelectedAct=null;
      this.rulename = null;
      this.createcompliance.reset({
        formNameRequired:isformsrequired,
        penaltyprovisionrequired:ispenaltyrequired
      });
    }
    // Perform any additional actions after dialog closed
  });
}

showAddMoreMessage(message: string , global_id : string) {
  const dialogRef = this.dialog.open(GlobalComplianceDailogeboxComponent, {
    width: '400px',
    data: { message: message, success: true , id: "Global Compliance ID :"+" "+ global_id},
    disableClose: true // Prevents closing the dialog by clicking outside of it
  });
  dialogRef.afterClosed().subscribe(result => {
    // Perform any additional actions after dialog closed
    if (result) {
      const actId = this.createcompliance.get('Actid').value;
      const ruleId = this.createcompliance.get('ruleid').value;
      // const isformsrequired = this.createcompliance.get('formNameRequired').value;
      // const ispenaltyrequired = this.createcompliance.get('penaltyprovisionrequired').value;
      
      this.createcompliance.reset({
        Actid: actId,
        ruleid: ruleId,
        formNameRequired:"No",
        penaltyprovisionrequired:"No",
        extended_due_date_required: false, // Set to false
        subscriptionType: 'free' // Set to default value
      });
     this.stepper.selectedIndex = 0; // Reset to the first step
     this.visible_compliancepreface = false;
     this.visiblestepper = true;
     this.selectedbusinessIDs = [];
     this.selectedindustryIDs = [];
     this.complianceAct_rule_id ={
      actid: this.createcompliance.get('Actid')?.value,
      ruleid: this.createcompliance.get('ruleid')?.value,
    }
    }
  });
}
showErrorMessage(message: string) {
  const dialogRef = this.dialog.open(DaidailogeComponent, {
    width: '400px',
    data: { message: message, success: false },
    disableClose: true // Prevents closing the dialog by clicking outside of it
  });
  dialogRef.afterClosed().subscribe(result => {
    // Perform any additional actions after dialog closed
  });
}

getFormattedDate(dateString: string): string {
 
  const date = new Date(dateString);
 
 console.log(date)
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
 
 
  return `${day}-${month}-${year}`;
}
  }
interface CompliancePeriod {
  compliance_period_id: number;
  compliance_period_start: string;
  start_compliance_year_format: string;
  compliance_period_end: string;
  end_compliance_year_format: string;
  // Add other properties if needed
}
interface Form {
  statutoryid:number;
  statutoryName: string;
  applicable_section: string;
  description: string;
  additional_reference: string;
  // Add more properties if necessary
}
interface Penalty {
  compliancepenaltyid:number;
  compliancepenaltyName: string;
  applicable_section: string;
  description: string;
  minimum: string;
  maximum: string;
  additionalreference: string;
  // Add additionalreference properties if necessary
}
interface BareActReference {
  bare_act_id: number;
  filecategory: string;
  filename: string;
  filepath: string;
}
