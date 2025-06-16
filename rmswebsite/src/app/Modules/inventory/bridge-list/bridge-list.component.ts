import { Component, OnInit, ViewChild,AfterViewInit,ElementRef   } from '@angular/core';
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
import{DxDataGridComponent, DxDropDownBoxModule}from 'devextreme-angular';
import { ChangeDetectorRef,  NgModule } from '@angular/core';

import { Location } from '@angular/common';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { DirectUpload, DocCategory, SaveDocumentDetails} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { AddDocument} from 'src/app/inspectionservices.service';
import { Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, E, ENTER} from '@angular/cdk/keycodes';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';

import { DxDataGridModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import { DxTagBoxComponent } from 'devextreme-angular';
import { AddDocDailogeComponent } from 'src/app/Common/daidailoge/add-doc-dailoge/add-doc-dailoge.component';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
export interface Tag  {
  name: string;
}

@Component({
  selector: 'app-bridge-list',
  templateUrl: './bridge-list.component.html',
  styleUrls: ['./bridge-list.component.scss'],
})

export class BridgeListComponent  implements OnInit, AfterViewInit {
  userdatalist:any;
   simpleProducts:string[] = [
    
  ];
 // @ViewChild('tagBox')tagBox!: DxTagBoxComponent;
  @ViewChild('Obj_Doc') textarea!: ElementRef;

  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chipListInput1') chipListInput1!: ElementRef<HTMLInputElement>;

  @ViewChild('buttontoclick') buttontoclick!: ElementRef;

Notifier!:FormGroup;
  forminvalidfields:string[]=[];
 
  addOnBlur = true;
isDisabled=true;

    readonly separatorKeysCodes = [ENTER, COMMA] as const;
   // simpleProducts:string[] = [];
 
  tags: Tag[] = [];
  
  notifieremails:string[]=[];
  userdata1:any;
  dataGrid: any;
  tagboxvalue:any;
 
  
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.form2.controls['Keywords_tags'].setValue(this.tags.map(tag => tag.name));
   }

    // Clear the input value
   // event.chipInput!.clear();
   if (event.chipInput) {
    event.chipInput.clear();
  }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
       this.tags.splice(index, 1);
      this.form2.controls['Keywords_tags'].setValue(this.tags.map(tag => tag.name));

    }
    // Clear the input field explicitly
    this.chipListInput.nativeElement.value = '';
  }
 

  loadingConfig: boolean = true;
 
  // checkoutForm = this.formBuilder.group({
  //   Doc_process_Owner: ['', Validators.required],
  //   Doc_Approver: ['', [Validators.required]]
  // });
  @ViewChild('mainFileInput') mainFileInput!: ElementRef;
  @ViewChild('supportFilesInput') supportFilesInput!: ElementRef;
 docApprover :any;
 processOwner:any;
 Confidentiality:any;
 
  fileUpload:any;
 
  uploader:any;
  fileName = '';
  value: any[] = [];

  onFileUploaded(e: any, rowIndex: number) {
    const uploadedFiles = e.request.response; // Handle the uploaded files as needed
    console.log(`Uploaded files in row ${rowIndex}:`, uploadedFiles);
  }

  saveDocinfo :SaveDocumentDetails = new SaveDocumentDetails();
  gridDataSource:any;
 directuploadInfo: DirectUpload = new DirectUpload()
  selectedFiles: File[] = [];
 //myForm: FormGroup;
  
  // Component class properties
maxFiles: number = 1; // default value
maxSize: number = 5 ; // default 5MB in bytes
//selectedFiles: any[] = []; // This will hold your file info
maxDocuments: number = 1;  // Default value
  maxSizeInMB: number = 5;   // Default value

  errorMessages: string[] = [];
  allowedFileTypes: string = '';
  FileTypes: string = '';
  mainFile: File | null = null; // This will store your main file
  mainErrorMessage: string = ''; // This will store any error message related to the main file
  isMainFileUploaded = false;
  user:any;
  SelectedOption:any[] = [];
  selectedDocTypeID: any; // Change the type to match your data type
  selectedDocCategoryID: any; // Change the type to match your data type
  selectedDocSubCategoryID: any; // Change the type to match your data type
  title: string = ''; // Example for a string property
  subTitle: string = ''; // Example for a string property
  objective: string = ''; // Example for a string property

  isStep1Completed:boolean=false;
  isStep2Completed:boolean=false;
  isStep3Completed:boolean=false;
  isStep4Completed:boolean=false;
  BackButton:boolean=false;
  NextButton:boolean=true;
  defaultTime = 'mins'; 
  defaultindicative: number = 0;
  dataSource:any;
  isGridBoxOpened : boolean;
  gridBoxValue: number[] = [];
  gridBoxValue1: number[] = [];
  usergridColumns: any = [  {
    dataField: 'firstname',
    caption: 'Name'
        },'department_Master_name'];
  publiDocColumns: any = ['document_Id', 'title_Doc','versionControlNo' ];
  Userinfo:any;
  publDoc:any;
  Doc_SubCategoryID:any;
  DefaultNotifiersID:any;
  isUserBoxOpened:boolean= false;
  isUserBoxOpened1:boolean= false;
  docTypeID:any;
  DocumentTypeData:any;
  DocumentCategoryData:any;
  DocumentSubCategoryData:any;
  AuthorityTypeData:any;
  AuthorityData: any;
  AuthorityNameData:any;
  NatureOfDocument:any;
  SelectedDocType:any;
  SelectedDocCategory: any;
  authoritynameID:any;
  SelectedAuthType:any;
  authorityTypeID: any;
  selectedFile: File | null = null;
  form:any;
  isPanelVisible: boolean = false;
  isdoclinkpanelVisible:boolean=false;
  EnterDayspanelVisible:boolean=false;
  NotifierspanelVisible:boolean=false;
  AdditionalpanelVisible:boolean=false;
  userid:any;
  isChecked: boolean = false;
  isChecked2:boolean=false;
  //checkboxForm: FormGroup;
  reportForm!: FormGroup;
  sessionData: any;
  doc_CategoryID : any;
  erroMessage: any;
  FormGroup:any;

  

  selectedproject = new FormControl('');
  selectedTimePeriod= new FormControl('');
 //Keywords_tags = new FormControl([]);
  showUnitRates: boolean = false;
  showUpload = false;
  selectedDate: Date | undefined;
  createDoc=false;
  adddocidpkid:number=0;
  public project: any[] = [
    { id: 1, name: 'Direct Upload' },
    { id: 2, name: 'Create Document' }
  ];


    public tmperiod:any[]=[
      {id:1,name:'mins'},
      {id:2,name:'hrs'},
      {id:3,name:'days'}
    ];

  // General = false;
  // confidential=false;
  phoneno=false;
  public project1: any[] = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Confidential' }
  ];
  TextBox=false;
  DropdownBox=true;
  public selectedprocessownerType: number | undefined;
  public selecteddocapproverType: number | undefined;
  public processowner: any[] = [
    { id: 1, name: 'Select from User List' },
    { id: 2, name: 'Enter Name as Text' }
  ];
  // public project5: any[] = [
  //   { id: '1', name: 'List Selection' },
  //   { id: '2', name: 'Text Field' }
  // ];
  public docapprover: any[] = [
    { id: 1, name: 'Select from User List' },
    { id: 2, name: 'Enter Name as Text' }
  ];
  
  
  TextBox1=true;
  
  TextBox2=false;
  DropdownBox2=true;
  public project4: any[] = [
    { id: 1, name: 'Days' },
    
    { id: 2, name: 'Week' },
    { id: 3, name: 'Month' },
    { id: 4, name: 'Year' }
   
    
  ];

  //formSubmitted: boolean = false;

  OptionSelectedActivateFields = false;
  OptionNotSelected=false;
  public project2: any[] = [
    { id: 1, name: 'OptionSelectedActivateFields' },
    { id: 2, name: 'OptionNotSelected' }
  ];
 
  //form: any;
  form1: any;
  form2: any;
  form3: any;
  form4: any;
  formupdate:any;
  userdata: any = [];
  
  minDate = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
  date: Date = new Date(2024, 0, 25, 15, 8, 12);

  Periodicityds:Array<{id:string,text:string}>=[];
  EntityNameDB:any;
  UnitLocationMaster:any;
  Selectedunit:any;
  DocTypeID:any;
  Doc_CategoryID:any;
  SelectedEntity:any;
  EntityID:any;
  UnitLocationID:any;
  EntityColumns: any =[
    { dataField: 'entity_Master_id', caption: 'EntityID',visible: true ,width: '100px'},
    { dataField: 'entity_Master_Name', caption: 'Entity Name' },
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
  
  ngOnInit(): void {
    let user1: any = this.session.getUser();
    
    this.userdata = JSON.parse(user1);
    console.log("userid", this.userdata.profile.userid);
    //alert(this.userdata.profile.userid)

  //   this.form3=this.fb.group({
  //     NotificationSetUpID :'',
  //     //EscalationStatus :'',
  //     entervalue :'',
  //     Def_Notifiers:'',
  //     Add_Notifiers :'',
  //     dropdown:'',
  //     entervalue2:'',
  //     Def_Notifiers2:'',
  //     Add_Notifiers2 :'',
  //     dropdown2:'',
  //     entervalue3:'',
  //     Def_Notifiers3:'',
  //     Add_Notifiers3 :'',
  //     dropdown3:'',

  // })
    if (this.supportFilesInput) {
      // Attach the change event listener
      this.supportFilesInput.nativeElement.addEventListener('change', this.onFileSelected.bind(this));
    }

  //  this.stepperNav1();
  //  this.stepperNav4();
  //  this.stepperNav2();
  //  this.stepperNav3();

    let user: any = this.session.getUser();
    
   this.userdata = JSON.parse(user);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
  this.userid = this.userdata.profile.userid


//   let user1: any = this.session.getUser();
                
//   this.userdata1 = JSON.parse(user1);//userdata.profile.userid
//   console.log("userid",this.userdata1.profile.userid)
//   localStorage.setItem('USERID',this.userdata1.profile.userid);
//  localStorage.getItem('USERID');
//   this.userid=this.userdata.profile.userid;
    const user23:number= this.userid

    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.reportForm = this.fb.group({
      reportName: '',
      selectedProject: '',
      selectedBridge: '',
      selectedInspection: '',
      startingpoint: '',
      endingpoint: '',
      clientName: '',
      reportedBy: '',
      Introduction: '',
      Observation: '',
      Methodology: '',
    });
  
    this.selectedprocessownerType=1;
    this.selecteddocapproverType=1;
    localStorage.removeItem('processOwner');
    this.processOwner = null;

    localStorage.removeItem('docApprover');
    this.docApprover = null;
    this.form2.get('Eff_Date').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('Eff_Date', value);
    });
   
    this.form2.get('Initial_creation_doc_date').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('Initial_creation_doc_date', value);
    });
    this.form2.get('Date_Doc_Approver').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('Date_Doc_Approver', value);
    });
    this.form2.get('Date_Doc_Revision').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('Date_Doc_Revision', value);
    });
    this.form3.get('review_start_Date').valueChanges.subscribe((value:any) => {
      this.FormattedDate2('review_start_Date', value);
    });
    this.form1.valueChanges.subscribe((val: any) => console.log("Form1 values:", val));
    this.form2.valueChanges.subscribe((val: any) => console.log("Form2 values:", val));
    this.form3.valueChanges.subscribe((val: any) => console.log("Form3 values:", val));
   // this.checkboxForm.valueChanges.subscribe((val: any) => console.log("Form3 checkboxForm values:", val));

  }
  constructor(private http: HttpClient,
    private ref: ChangeDetectorRef,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
    private report: ReportService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    
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
      this.form= new FormGroup({
        enter: new FormControl(''),
        dropdown: new FormControl('bdd-ex')  // Set default value here
      });
      
      // this.checkboxForm = this.formBuilder.group({
      //   isChecked: false,
      //   isChecked2:false
      // });
      
      this.isUserBoxOpened1=false;
      this.isGridBoxOpened = false;
      this.isUserBoxOpened=false;
      let user: any = this.session.getUser();
      this.sessionData = JSON.parse(user);
      this.EntityNameDB={
        paginate: true,
      store: new CustomStore({
            key: 'entity_Master_id',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
             // alert(`User ID is: ${this.userid}`);
              this.http.get(URL + '/Adddocument/getentity/' + this.sessionData.profile.userid ,{headers})
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
        // { id:'ODD',text:'ODD – On Due Date (t)'  },
        // { id:'ADD(ex)',text:'ADD(ex) – After Due Date (t+) excluding due date'  },
        // { id:'ADD(in)',text:'ADD(in) – After Due Date (t+) including due date'  }
      
   ];
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



  
  // this.DocumentCategoryData={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetails', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };
  

  
  
  // this.DocumentSubCategoryData={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetails', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };
  
  
  // this.AuthorityNameData={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/AuthorityName/GetAuthorityNameDetails', {headers})
  //           .subscribe(res => {
  //            (resolve(res));
  
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };


  
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

  this.AuthorityTypeData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/AuthorityTypeMaster/GetAuthorityTypeMasterDetails', {headers})
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
 
  this.publDoc={
    paginate: true,
    
    store: new CustomStore({
        key: 'addDoc_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/PublishedDocDocument/GetPublishedDocDetails/', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

  // this.gridDataSource = new CustomStore({
  //   key: 'admin_config_id',
  //   load: () => this.sendRequest(URL + '/DiectUploadsizemaster/getDiectUploadsizemasterDetails'),
  // });



  // this.dataSource = new CustomStore({
  //   key: 'documentRepID',
  //   load: () => this.sendRequest(URL + '/SaveDocument/GetSaveDocumentDetails'),
    
  //   insert: (values) => this.sendRequest(URL + '/SaveDocument/InsertSaveDocumentDetails', 'POST', {
  //       // values: JSON.stringify(values)
  //       values
  //   }),
  // });

  // this.myForm = this.formBuilder.group({
  //   Title_Doc: ['', Validators.required],
    
  // });

  


  // this.form = this.fb.group({
     //formArray: this.fb.array([
      this.form1 =  this.formBuilder.group ({

        Entity_Master_id:['',Validators.required],
        Unit_location_Master_id:['',Validators.required],
      DocTypeID: ['', Validators.required],
      Doc_CategoryID: ['', Validators.required],
      Doc_SubCategoryID: ['', Validators.required],
      Title_Doc: ['', Validators.required],
      Sub_title_doc: [''],
      Obj_Doc: ['', Validators.required],
    //  Select_Opt: ['', Validators.required],
     })
  
     this.form2 =  this.formBuilder.group ({
        Doc_Confidentiality: ['', Validators.required],
        OtpMethod: [''],
        Eff_Date: [null, Validators.required],
        Initial_creation_doc_date: [null],
        Doc_internal_num: [''],
        Doc_Inter_ver_num: [''],
        Doc_Phy_Valut_Loc: [''],

      //  Doc_process_Owner: [''],
      //  Doc_Approver: [''],
        Date_Doc_Approver: [null],
        Date_Doc_Revision: [null],
        AuthorityTypeID: ['', Validators.required],
        AuthoritynameID: ['', Validators.required],
      
        NatureOf_Doc_id: ['', Validators.required],
        Keywords_tags: [''],

     })
    
     this.form3 =  this.formBuilder.group ({
    freq_period: ['', this.isPanelVisible ? Validators.required : []],
    freq_period_type: ['', this.isPanelVisible ? Validators.required : []],
    review_start_Date: ['', this.isPanelVisible ? Validators.required : []],
        //pub_doc: ['', Validators.required],
        publisher_comments: [''],
        indicative_reading_time: ['', Validators.required],
        Time_period: ['', Validators.required],

        Review_Frequency_Status: [0], 
       Doc_Linking_Status: [0], 
       pub_doc:[''],
       //email: ['', [Validators.required, Validators.email]],
       NotificationSetUpID :'',
      //EscalationStatus :'',
      entervalue :['', this.EnterDayspanelVisible ? Validators.required : []],
      Def_Notifiers:'',
      Add_Notifiers :'',
      dropdown:['', this.EnterDayspanelVisible ? Validators.required : []],
      entervalue2:['', this.NotifierspanelVisible ? Validators.required : []],
      Def_Notifiers2:'',
      Add_Notifiers2 :'',
      dropdown2:['', this.NotifierspanelVisible ? Validators.required : []],
      entervalue3:['', this.AdditionalpanelVisible ? Validators.required : []],
      Def_Notifiers3:'',
      Add_Notifiers3 :'',
      dropdown3:['', this.AdditionalpanelVisible ? Validators.required : []],
      })

  this.onChanges();
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
onChanges(): void {

  this.form2.get('Eff_Date').valueChanges.subscribe((val: string | number | Date) => {
    const initialDateControl = this.form2.get('Initial_creation_doc_date');
    if (initialDateControl.value && new Date(initialDateControl.value) > new Date(val)) {
           initialDateControl.setValue('');
    }
    // Update Document Approval Date if it's later than the new Effective Date
    const approvalDateControl = this.form2.get('Date_Doc_Approver');
    if (approvalDateControl && approvalDateControl.value && new Date(approvalDateControl.value) > new Date(val)) {
      approvalDateControl.setValue('');
    }

    // Update Document Last Revision Date if it's later than the new Effective Date
    const revisionDateControl = this.form2.get('Date_Doc_Revision');
    if (revisionDateControl && revisionDateControl.value && new Date(revisionDateControl.value) > new Date(val)) {
      revisionDateControl.setValue('');
    }

  });
}
ngAfterViewInit() {
  this.fetchUploadConfig();
  this.MainFileUploadConfig();
  //this.toggleTagBox(false);
  // Code here will run after the view and child views are initialized
}
ngOnInit1(): void {
  // Set the default value after the form is created
  this.form.get('dropdown').setValue('bdd-ex');
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
// get formArray(): FormArray {
//   return this.form.get('formArray') as FormArray;
// }
fetchUploadConfig() {
  this.http.get<any[]>(URL + '/DiectUploadsizemaster/GetSupportDocuments').subscribe(configs => {
    if (configs.length > 0) {
      const config = configs[0]; // Access the first element of the array
      this.maxDocuments = config.noOfDocuploaded;
      this.maxSizeInMB = parseInt(config.sizelimit, 10);
      this.allowedFileTypes = config.allowedFileTypes;
      console.log('Max Documents:', this.maxDocuments); // Now this should log the correct value
      this.loadingConfig = false; // Update the flag
      this.ref.detectChanges(); // Trigger change detection
    } else {
      console.error('Configuration array is empty.');
      this.errorMessages.push('No upload configuration found.');
    }
   
  }, error => {
    console.error('Error fetching upload configuration:', error);
    this.errorMessages.push('Error fetching upload configuration.');
    this.loadingConfig = false; // Update the flag even if there is an error
    this.ref.detectChanges(); // Trigger change detection
  });
}

MainFileUploadConfig() {
  this.http.get<any[]>(URL + '/DiectUploadsizemaster/GetMainDocuments').subscribe(configs => {
    if (configs.length > 0) {
      const config = configs[0]; // Access the first element of the array
     // this.maxDocuments = config.noOfDocuploaded;
      this.maxSize = parseInt(config.sizelimit, 10);
      this.FileTypes = config.allowedFileTypes;
      console.log('Main file maxSize:', this.maxSize); 
      console.log('Main FileTypes:', this.FileTypes); // Now this should log the correct value
      this.loadingConfig = false; // Update the flag
      this.ref.detectChanges(); // Trigger change detection
    } else {
      console.error('Configuration array is empty.');
      this.errorMessages.push('No Main file upload configuration found.');
    }
   
  }, error => {
    console.error('Error fetching Main file upload configuration:', error);
    this.errorMessages.push('Error fetching Main fileupload configuration.');
    this.loadingConfig = false; // Update the flag even if there is an error
    this.ref.detectChanges(); // Trigger change detection
  });
}

// onFileSelected(event: any) {
//   const file:File = event.target.files[0];
  
//    this.selectedFiles = event.target.files;
//   const input = event.target as HTMLInputElement;

//   if (input.files && input.files.length) {
//       this.selectedFile = input.files[0];
//       this.fileName = file.name;
//   }
// }
onFileSelected(event: any) {
  //this.selectedFiles = [];
    const newFiles: FileList = event.target.files;
  this.errorMessages = []; // Reset error messages

  // Calculate how many new files can be added based on the current length of selectedFiles
  const allowedNewFiles = this.maxDocuments - this.selectedFiles.length;

  // If the user selects more new files than the allowed amount, show an error
  if (newFiles.length > allowedNewFiles) {
    this.errorMessages.push(`You can only upload ${this.maxDocuments}  files.`);
    return;
  }

  // Check each new file before adding it to the array
  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];

    // Check the file size against the limit
    if (file.size > this.maxSizeInMB * 1024 * 1024) {
      this.errorMessages.push(`The file ${file.name} exceeds the size limit of ${this.maxSizeInMB}MB.`);
      // Optionally, you can stop the loop here if you don't want to add any files upon a single failure
      // return;
    } else {
      // Only add the file if there's room for more files
      if (this.selectedFiles.length < this.maxDocuments) {
        this.selectedFiles.push(file);
      } else {
        this.errorMessages.push(`You cannot upload more than ${this.maxDocuments} files.`);
        break; // Stop checking more files as we've reached the limit
      }
    }
  }
  const files: FileList | null = event.target?.files;

  // Add only new files to selectedFiles
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && !this.isFileAlreadySelected(file.name)) {
        this.selectedFiles.push(file);
      }
    }
  }
}

// Check if a file with the same name is already selected
isFileAlreadySelected(fileName: string): boolean {
  return this.selectedFiles.some(selectedFile => selectedFile.name === fileName);
}


// Method to remove a file from the selected list
removeFile(index: number) {
  if (index >= 0 && index < this.selectedFiles.length) {
    this.selectedFiles.splice(index, 1);
} 

}

onMainFileSelected(event: any) {
  const file: File = event.target.files[0]; // Assuming you only want one file for the mainFile
  if (file) {
        if (file.size > this.maxSize * 1024 * 1024) {
      this.mainErrorMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
      return;
    }
    // Check for allowed file types here if necessary
    this.mainFile = file; // Set the main file
    this.mainErrorMessage = ''; 
    this.isMainFileUploaded = true; // Reset any previous errors
  }
}

removeMainFile() {
  this.mainFileInput.nativeElement.value = '';
  this.mainFile = null; // Reset the main file to null when removing
  this.isMainFileUploaded = false;
}


// removeFile(index: number) {
//   this.selectedFiles.splice(index, 1);
// }


 
selectedItem = '';
isDropDownBoxOpened = false;
changeDropDownBoxValue (args: { addedItems: string[]; }) {
  this.selectedItem = args.addedItems[0];
  this.isDropDownBoxOpened = false;
}
 
  selectOption(event: any) {
 // handle the selection change here
    console.log('Selected:', event.value);
    if (event.value === 'Direct Upload') { // Assuming 'Direct Upload' has an id of 1
      this.showUpload = true;
      this.createDoc=false;
    //  this.fetchUploadConfig();
    } else {
      this.showUpload = false;
      this.createDoc=true;
    }
  }

  

  // sendRequest(url: string, method: string = 'GET', data: any = {}): any {

  //   let result;
  
  //   switch(method) {
  //       case 'GET':
  //           return new Promise((resolve, reject) => {
  //             this.http.get(url, {headers})
  //               .subscribe(res => {
  //                (resolve(res));
  //               }, (err) => {
  //                 reject(err);
  //               });
  //         });
  //           break;
        
  //   }
  
  // }


   
  // this.http.get(URL + '/UnitLocationMaster/GetMultipleUnitLocations/'+this.EntityID, {headers})
  // getUnitLocation(e: any) {
  //   let user: any = this.session.getUser();
  //     this.sessionData = JSON.parse(user);
  //   console.log("selected Entity_Master_id : ", e.value);

  //   this.EntityID = e.value.join(',');
  //    this.Selectedunit=null;  
    
  //   this.UnitLocationMaster={
  //     paginate: true,
  //     store: new CustomStore({
  //       key: 'unit_location_Master_id',
  //       loadMode: 'raw',
  //       load:()=>{
  //         return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/Adddocument/getunitlocation?userid='+this.sessionData.profile.userid+"&&entityid="+this.EntityID , {headers})
  //         .subscribe((res: any) => {
  //             (resolve(res));
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
      
  //   };

  //  }
    getUnitLocation(e: any) {
        let user: any = this.session.getUser();
        this.sessionData = JSON.parse(user);
        console.log("selected Entity_Master_id : ", e.value);
        this.EntityID = e.value; // e.value is already an array
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
   getNotifiersDetails(event: any) {
    //alert(JSON.stringify(this.form1.value))
    console.log("selected Type id: ", event.value);
    this.DocTypeID = this.form1.value.DocTypeID;
    this.Doc_CategoryID =this.form1.value.Doc_CategoryID;
    this.Doc_SubCategoryID = event.value;
   // alert(event.value)

            this.http.get(URL + '/DefaultNotifiers/GetDefaultNotifiersDetails', {headers})
              .subscribe((res:any) => {
               
              const emaildata=res.filter((item:any)=>{return item.docTypeID==this.form1.value.DocTypeID && item.doc_CategoryID==this.form1.value.Doc_CategoryID
            && item.doc_SubCategoryID==event.value})
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
      this.form3.controls["Def_Notifiers"].setValue(this.notifieremails);
      this.form3.controls["Def_Notifiers"].disable();
      
      this.form3.controls["Def_Notifiers2"].setValue(this.notifieremails);
      this.form3.controls["Def_Notifiers2"].disable();
      this.form3.controls["Def_Notifiers3"].setValue(this.notifieremails);
      this.form3.controls["Def_Notifiers3"].disable();

    });
 });

      
   
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
   getauthorityname(event: any) {
    console.log("selected Authority Name id: ", event.value);
    this.authorityTypeID = event.value;
     this.SelectedAuthType=null;  
    this.AuthorityNameData={  
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/'+this.authorityTypeID, {headers})
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

 

  SelectFrequencyPeriod(event: any){

    console.log('Selected:', event.value);

    

    if (event.value==='Days' || event.value==='Week' || event.value==='Month' || event.value==='Year') {

      // this.General = true;

      // this.confidential=false;

      this.TextBox1=true;

    }

    else {

      this.TextBox1=false;

      // this.General = false;

      // this.confidential=true;

    }

  }
  getemailids(data: any) {
    if (data && data.value) {
      return data.value.toString().split(',');
    }
    return [];
  }
  onValueChanged(evt: any, data: any): void {  
 
    data.setValue(evt.value);  
    
    this.ref.detectChanges();
  }
  selectDocConfidentiality(event: any){

    console.log('Selected:', event.value);

    if (event.value === 'General') {

      // this.General = true;

      // this.confidential=false;

      this.phoneno=false;
      this.form2.get('OtpMethod').setValue("N/A");
    }

    else {

      this.phoneno=true;
      this.form2.get('OtpMethod').setValue("email");
      // this.General = false;

      // this.confidential=true;

    }

  }

  
  selectProcessOwner(event: any){

    console.log('Selected process owner:', event.value);
        // Clear localStorage and component state when switching modes
        localStorage.removeItem('processOwner');
        this.processOwner = null;
    if (event.value === 2) {
       //console.log("if 2");
      // this.General = true;

      // this.confidential=false;
 
      this.TextBox=true;
      this.DropdownBox=false;
     
      this.gridBoxValue=[];
      //this.form.get('Doc_process_Owner_Text').setValue(''); // Clear textbox value
      //localStorage.removeItem('processOwner'); // Clear localStorage
      console.log("textviewchange",JSON.stringify(localStorage.getItem('processOwner')))
    }

    else  {
    //console.log("else 1");
      this.TextBox=false;
      this.DropdownBox=true;

      // this.General = false;

      // this.confidential=true;s
     
      //this.processOwner = null; // Clear dropdown selection
      //localStorage.removeItem('processOwner'); // Clear localStorage
      console.log("listviewchange",JSON.stringify(localStorage.getItem('processOwner')))
    }

  }

  selectdocApprover(event: any){

    console.log('Selected:', event.value);
    console.log('Selected document Approver:', event.value);
        // Clear localStorage and component state when switching modes
        localStorage.removeItem('docApprover');
        this.docApprover = null;
        this.gridBoxValue1=[];
    if (event.value === 1) {

      // this.General = true;

      // this.confidential=false;

      this.TextBox2=false;
      this.DropdownBox2=true;
     
     console.log("listviewchange",JSON.stringify(localStorage.getItem('docApprover')))
    }

    else {

      this.TextBox2=true;
      this.DropdownBox2=false;

      // this.General = false;

      // this.confidential=true;
      console.log("textviewchange",JSON.stringify(localStorage.getItem('docApprover')))
    }

  }


  changeTimePeriod(event:any)  {

   console.log('Selected Time period',event.value);

   

  }

 

  selectDocReview(event: any){

    console.log('Selected:', event.value);

    if (event.value === 1) {

      this.OptionSelectedActivateFields = true;

      this.OptionNotSelected=false;

    } else {

      this.OptionSelectedActivateFields = false;

      this.OptionNotSelected=true;

    }

  }

 

  selectDocuType(event: any) {

    // handle the selection change here

    console.log('Selected:', event.value);

  }

  config: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

 

 

  selectInspection(element: any) {

    let id = element.value;

 

    // getting AuthId

    let user: any = this.session.getUser();

    this.sessionData = JSON.parse(user);

  }






  // saveDataWithName(event: any) {
  //   console.log("selected  document user name: ", event.value);
  //   this.UnitLocationID = event.value;
    
  //   if (this.gridBoxValue) {

  //     this.Userinfo={
  //       paginate: true,
  //       store: new CustomStore({
  //           key: 'usR_ID',
  //           loadMode: 'raw',
  //           load:()=>{return new Promise((resolve, reject) => {
  //             this.http.get(URL + '/DepartmentName/GetDepartmentNameDetails/'+this.UnitLocationID, {headers})
  //               .subscribe(res => {
  //                (resolve(res));
      
  //               }, (err) => {
  //                 reject(err);
  //               });
  //         });
  //         },
  //       }),
  //     };
  //     // Send an HTTP request to save data to your server
  //     // This depends on your server-side technology and API endpoints.
  //     // You would typically use a service to make the HTTP request.
  //   }
  // }
 

 

onCheckboxChange(event: any) {

  console.log('Checkbox for Document review frequency changed:', event.target.checked);
  this.isPanelVisible = event.target.checked;
  this.updateValidators();

  const reviewFrequencyStatus = event.target.checked ? 1 : 0;
  this.form3.get('Review_Frequency_Status').setValue(reviewFrequencyStatus);

 
}
ondoclinkChange(event:any){

 console.log('Checkbox for Document Linking changed:', event.target.checked);
  this.isdoclinkpanelVisible = event.target.checked;
  const docLinkingStatus = event.target.checked ? 1 : 0;
  this.form3.get('Doc_Linking_Status').setValue(docLinkingStatus);
}
onEscaltion(event:any){
  console.log('Checkbox for Asha:', event.target.checked);
  this.EnterDayspanelVisible = event.target.checked;
  this.onEscaltionValidatorsa();
  //  const EscalationStatus = event.target.checked ? 1 : 0;
  //  this.Notifier.get('EscalationStatus')?.setValue(EscalationStatus);
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

// getUserData(event: any) {
//   console.log("selected Type id: ", event.value);
//   this.UnitLocationID = event.value;
 


onGridBoxOptionChanged(e: { name: string; }) {

  if (e.name === 'value') {
    this.isUserBoxOpened = true;
    this.ref.detectChanges();
    //this.username=
  }
}

onGridBoxOptionChanged1(e: { name: string; }) {
  if (e.name === 'value') {
    this.isUserBoxOpened1 = true;
    this.ref.detectChanges();
  }
}

onSelectionProcessOwnerChanged(e: any) {
  // Assuming e.selectedRowsData contains the array of selected user objects
  if (e.selectedRowsData && e.selectedRowsData.length > 0) {
    // Map through each user and get the firstname
    const processOwnerNames = e.selectedRowsData.map((user: any) => user.firstname);

    // Join the names with a comma
    this.processOwner = processOwnerNames.join(', ');

    // Update your component-level variable if you have one
   // this.docApprover = userNamesString;
     // Store in local storage
   localStorage.setItem('processOwner',  this.processOwner);
    // For debugging
    console.log("Selected Process Owners:",  this.processOwner);
    console.log("onSelectionProcessOwnerChanged",JSON.stringify(localStorage.getItem('processOwner')))

  } else {
    // Handle the case where no users are selected
    localStorage.removeItem('processOwner');
    this.processOwner = null;
  }
}

onGridBoxSelectionChanged(e: any) {
  // Assuming e.selectedRowsData contains the array of selected user objects
  if (e.selectedRowsData && e.selectedRowsData.length > 0) {
    // Map through each user and get the firstname
    const userNames = e.selectedRowsData.map((user: any) => user.firstname);

    // Join the names with a comma
    this.docApprover = userNames.join(', ');

    // Update your component-level variable if you have one
   // this.docApprover = userNamesString;
     // Store in local storage
   localStorage.setItem('docApprover',  this.docApprover);
    // For debugging
    console.log("Selected Doc Approvers:",  this.docApprover);
    console.log("onGridBoxSelectionChanged",JSON.stringify(localStorage.getItem('docApprover')))

  } else {
    // Handle the case where no users are selected
    localStorage.removeItem('docApprover');
    this.docApprover = null;
  }
}



 gridBox_displayExpr(usR_ID:any) {
  if (usR_ID) {
    // this.processOwner = usR_ID.firstname;
    
    // localStorage.setItem('processOwner', this.processOwner);
    // console.log("PROCESSOWNERGRIDBOX",JSON.stringify(localStorage.getItem('processOwner')))
    return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>`;
  }
  
}
docApprover_displayExpr(usR_ID:any) {
//console.log(usR_ID.firstname)
  // this.docApprover=usR_ID.firstname;
  // const userId = usR_ID.id;
 // alert (this.docApprover)
  //localStorage.setItem('docApprover', this.docApprover);
   // console.log("docApprover_displayExpr",JSON.stringify(localStorage.getItem('docApprover')))
  //localStorage.setItem('username_${userId}',this.username)
  return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
}
gridBox_displayExpr1(ID:any) {
  // return ID && `${ID.document_Id} <${ID.document_Name}>
  // <${ID.publisher_Date_Range}> 
  // `;
  return ID.document_Id;
}
onButtonClick(rowData: any): void {
  console.log("Button clicked for row:", rowData);
  // Handle the button click here. For instance, you can navigate, open a modal, etc.
}

OnTextboxChange(event: any) {
  // Your logic here
  // For example, updating the processOwner variable
  this.processOwner = event.target.value;
  //console.log(this.processOwner)
  localStorage.setItem('processOwner', this.processOwner);
 console.log("ONTEXTBOXCHANGE",JSON.stringify(localStorage.getItem('processOwner')))
}
OnDocApproverChange(event: any) {
  // Your logic here
  // For example, updating the processOwner variable
  this.docApprover = event.target.value;
  //console.log(this.processOwner)
  localStorage.setItem('docApprover', this.docApprover);
 console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
}
onSubmit() {

  const processOwner = localStorage.getItem('processOwner');
  const docApprover = localStorage.getItem('docApprover');
 // alert(processOwner)
  
  this.forminvalidfields=[];
  if(this.form1.invalid || this.form2.invalid || this.form3.invalid || (!processOwner) || processOwner.trim() == '') {
    
    let invalidFields = Object.keys(this.form1.controls)
   .filter(key => this.form1.get(key).invalid)
      .map(key => {
        switch(key) {
          case 'Entity_Master_id': return 'Entity ';
          case 'Unit_location_Master_id': return 'Unit Location';
          case 'DocTypeID': return 'Document Type';
          case 'Doc_CategoryID': return 'Document Category';
          case 'Doc_SubCategoryID': return 'Document Sub Category';
          case 'Title_Doc': return 'Title of Document';
          case 'Obj_Doc': return 'Objective of Document';
          default: return key; 

        }
      });
      invalidFields = invalidFields.concat(
        Object.keys(this.form2.controls)
        .filter(key => this.form2.get(key).invalid)
        .map(key => {
          switch(key) {
            case 'Doc_Confidentiality': return 'Document Confidentiality';
            case 'Eff_Date': return 'Effective Date';
            //case 'Doc_Approver': return 'Document Approver'
            case 'AuthorityTypeID': return 'Authority Type';
            case 'AuthoritynameID': return 'Name of Authority';
            case 'NatureOf_Doc_id': return 'Nature of Document';
            // ... other cases for other field names
            default: return key; // Return the key itself if no user-friendly name is needed
        }
        })
    );
    
      invalidFields = invalidFields.concat(
        Object.keys(this.form3.controls)
        .filter(key => this.form3.get(key).invalid)
        .map(key => {
          switch(key) {
            case 'indicative_reading_time': return 'Indicative Reading Time';
            case 'Time_period': return 'Time Period';
           case 'freq_period_type': return 'Frequency period';
            case 'freq_period': return 'Enter Value';
            case 'review_start_Date': return 'Review Start date';

            case 'dropdown': return 'Frist Escalation Select Option';
            case 'entervalue': return 'Frist Escalation Enter Days';
             case 'dropdown2': return 'Second Escalation Select Option';
            case 'entervalue2': return 'Second Escalation Enter Days';
            case 'dropdown3': return 'Third Escalation Select Option';
            case 'entervalue3': return 'Third Escalation Enter Days';
            default: return key; // Return the key itself if no user-friendly name is needed
           
        }
        })
    );
    // If 'Doc_process_Owner' is invalid, add it to the list of invalid fields
    if (!processOwner || processOwner.trim() === '') {
      invalidFields.push('Document Process Owner');
    }
invalidFields=invalidFields.filter((item:string)=>item.trim()!="");
this.forminvalidfields=invalidFields;
    // Set the error message
    
  }
 
  if(this.forminvalidfields.length>0){
    this.erroMessage = `Please provide valid information for the following fields: ${this.forminvalidfields.join(', ')}`;
    
    // Open the DaidailogeComponent with the error message
    this.dialog.open(DaidailogeComponent, {
      width: '900px',
      data: { message: this.erroMessage }
    });
      // Optionally set form errors if needed
      this.form1.setErrors({ invalidFields: true });
      this.form2.setErrors({ invalidFields: true });
      this.form3.setErrors({ invalidFields: true });
 
    return; 
  }
  else  {
  
    const effDate = this.form2.get('Eff_Date').value || new Date().toISOString().split('T')[0]; // Use current date if Eff_Date is not set, though it's required.
    const defaultDatesFields = ['Initial_creation_doc_date', 'Date_Doc_Approver', 'Date_Doc_Revision'];

    defaultDatesFields.forEach(field => {
      const dateControl = this.form2.get(field);
      if (!dateControl.value) {
        dateControl.setValue(effDate);
      }
    });


    const formData: FormData = new FormData();
     const datavalues=this.form3.value;

    if (this.mainFile instanceof File) { // Check if `this.mainFile` is a File object
      formData.append('mainFile', this.mainFile, this.mainFile.name);
    } else {
      // Handle the error scenario
      this.erroMessage ="Please Upload  Main Document file before submitting.";
      console.error('No main file selected');
      //invalidFields.push('Document Process Owner');
      this.dialog.open(DaidailogeComponent, {
        width: '400px',
        data: { message: this.erroMessage }
      });
      return; // Exit the function if no main file was selected
    }
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        formData.append('supportFiles', file, file.name);
      }
    }
  
    Object.keys(this.form1.controls).forEach(key => {
      formData.append(key, this.form1.get(key).value);
    });
    
    Object.keys(this.form2.controls).forEach(key => {
      formData.append(key, this.form2.get(key).value);
    });
    Object.keys(this.form3.controls).forEach(key => {
      formData.append(key, this.form3.get(key).value);
    });
  
    if(processOwner){
  formData.append('Doc_process_Owner', processOwner);
      }
      //formData.append('Doc_process_Owner', processOwner);
      if (docApprover) {
      formData.append('Doc_Approver', docApprover);
    }
    else if(!docApprover || docApprover.trim() === '')
    {
      formData.append('Doc_Approver', 'N/A');
    }
    let user: any = this.session.getUser();
      this.userdata = JSON.parse(user);
      const userId = this.userdata.profile.userid;
    formData.append('USR_ID', userId);
    //alert(this.userdata.profile.userid)
  
console.log(JSON.stringify(effDate))
 //alert(JSON.stringify(formData))
    this.http.post(URL + '/AddDocument/InsertAddDocumentDetails', formData,{headers})
      .subscribe(
        (response: any) => {
          let pistdatalist:any[]=[];
          if(this.EnterDayspanelVisible){
            let postdata={
               'NotificationSetUpID' :0,
              'EscalationStatus' :this.EnterDayspanelVisible ? 1 :0,
              'EnterDays': parseInt(this.form3.value.entervalue),
              'DefaultNotifiers' :this.notifieremails?.join(','),
              'AdditionalNotifiers' :(this.form3.value.Add_Notifiers!='')?this.form3.value.Add_Notifiers?.join(','):'',
              'EnterComb' :this.form3.value.dropdown,
              "Document_Id":response.document_Id,
              "USR_ID":this.sessionData.profile.userid,
             "review_start_Date":this.form3.value.review_start_Date,
             "AddDoc_id":response.addDoc_id,
            }
            console.log('Postdata:', postdata);
           pistdatalist.push(postdata);
          }
          if(this.NotifierspanelVisible){
            let postdata2={
              'NotificationSetUpID' :0,
             'EscalationStatus' :this.NotifierspanelVisible? 2 :0,
            'EnterDays': parseInt(this.form3.value.entervalue2),
            'DefaultNotifiers' :this.notifieremails?.join(','),
              'AdditionalNotifiers' :(this.form3.value.Add_Notifiers2!="")?this.form3.value.Add_Notifiers2?.join(','):'',
              'EnterComb' :this.form3.value.dropdown2,
              "Document_Id":response.document_Id,
              "USR_ID":this.sessionData.profile.userid,
             "review_start_Date":this.form3.value.review_start_Date,
             "AddDoc_id":response.addDoc_id,

            }
          pistdatalist.push(postdata2);
          }
          if(this.AdditionalpanelVisible){
            let postdata3={
              'NotificationSetUpID' :0,
              'EscalationStatus' :this.AdditionalpanelVisible ? 3 :0,
              'EnterDays': parseInt(this.form3.value.entervalue3),
              'DefaultNotifiers' :this.notifieremails?.join(','),
              'AdditionalNotifiers' :(this.form3.value.Add_Notifiers3!='')?this.form3.value.Add_Notifiers3?.join(','):'',
              'EnterComb' :this.form3.value.dropdown3,
              "Document_Id":response.document_Id,
              "USR_ID":this.sessionData.profile.userid,
             "review_start_Date":this.form3.value.review_start_Date,
             "AddDoc_id":response.addDoc_id,
             
            }
          pistdatalist.push(postdata3);
          }
           //alert(JSON.stringify(pistdatalist))
    this.http.post(URL+'/Notification/SaveNotificationDetails',pistdatalist,{headers}).subscribe((res:any)=>{

    });

          this.adddocidpkid = parseInt(response);
          this.erroMessage =`Document Published Successfully`;
          const dialogRef = this.dialog.open(AddDocDailogeComponent, {
            width: '400px',
            data : {
              message: this.erroMessage,
              success: true,
              id: {'DocumentName': response.title_Doc ,
                   'DocumentID': response.document_Id,
                   'VersionControlNo': response.versionControlNo,
                   'addDoc_createdDate':response.addDoc_createdDate,
                  'Effectivedate': response.eff_Date}
          },
          
            //data: { message: this.erroMessage, success: true , id: "Document Name:"+ response.title_Doc +  " \r\n Document ID:"+ response.document_Id + " \r\n VersionControlNo:" + response.versionControlNo +":"+ response.addDoc_createdDate + " \r\n Effective date:"+ response.eff_Date},
            disableClose: true // Prevents closing the dialog by clicking outside of it
          });
         
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          });
      
        },
        // (error: HttpErrorResponse) => {
        //   console.error('Error status code:', error.status);
        //   console.error('Error details:', error.error);
        // }
      );
 
  } 
  
}
SaveDraft()
{ 
  if(this.form1.invalid){
    let invalidFields: any[] = [];
    //form1
    invalidFields = invalidFields.concat(
        Object.keys(this.form1.controls)
        .filter(key => this.form1.get(key).invalid)
        .map(key => {
            switch(key) {
                case 'Entity_Master_id': return 'Entity ';
                case 'Unit_location_Master_id': return 'Unit Location';
                case 'DocTypeID': return 'Document Type';
                case 'Doc_CategoryID': return 'Document Category';
                case 'Doc_SubCategoryID': return 'Document Sub Category';
                case 'Title_Doc': return 'Title of Document';
                case 'Obj_Doc': return 'Objective of Document';
               default: return key; 
            }
        })
    );
    this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
     this.dialog.open(DaidailogeComponent, {
       width: '900px',
       data: { message: this.erroMessage }
     });
     this.form1.setErrors({ invalidFields: true });
      return;
  }
  else{
    const formData: FormData = new FormData();
    let  EntityMasterID: number= parseInt(this.form1.value.Entity_Master_id);
    if (this.mainFile instanceof File) { // Check if `this.mainFile` is a File object
    formData.append('mainFile', this.mainFile, this.mainFile.name);
  } else {
    this.erroMessage ="Please Upload  Main Document file before submitting.";
    console.error('No main file selected');
    this.dialog.open(DaidailogeComponent, {
      width: '400px',
      data: { message: this.erroMessage }
    });
    return; 
  }
  if (this.selectedFiles) {
    for (let file of this.selectedFiles) {
      formData.append('supportFiles', file, file.name);
    }
  }
  let user: any = this.session.getUser();
  this.userdata = JSON.parse(user);
  const userId = this.userdata.profile.userid;
formData.append('USR_ID', userId);

  Object.keys(this.form1.controls).forEach(key => {
    formData.append(key, this.form1.get(key).value);
  });
   //alert(formData)
   this.http.post(URL + '/SecondStepper/SecondStepperSaveDraftDetails', formData)
   .subscribe(
     (response: any) => {
      this.adddocidpkid=parseInt(response);
     // alert("Save Successfully");
          this.erroMessage ="SaveDraft Successfully";

       const dialogRef = this.dialog.open(DaidailogeComponent, {
         width: '400px',
         data: { message: this.erroMessage }
       });
       dialogRef.afterClosed().subscribe(result => {
         window.location.reload();
       });
     }
   )
  }
  
}

SecondStepperDiscard(){


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
formatDate1(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
ThirdStepperDiscard(){

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
AttributesSaveDraft(){

const effDateControl = this.form2.get('Eff_Date') as FormControl;
  const effDateValue = new Date(effDateControl.value);
  const formattedDate = this.formatDate1(effDateValue);
 //const processOwner1 = localStorage.getItem('processOwner');
  this.forminvalidfields=[];
 if (this.form1.invalid || this.form2.invalid  ) {

  
  let invalidFields: any[] = [];

  // Process form1
  invalidFields = invalidFields.concat(
      Object.keys(this.form1.controls)
      .filter(key => this.form1.get(key).invalid)
      .map(key => {
          switch(key) {
            case 'Entity_Master_id': return 'Entity ';
              case 'Unit_location_Master_id': return 'Unit Location';
              case 'DocTypeID': return 'Document Type';
              case 'Doc_CategoryID': return 'Document Category';
              case 'Doc_SubCategoryID': return 'Document Sub Category';
              case 'Title_Doc': return 'Title of Document';
  
              case 'Obj_Doc': return 'Objective of Document';
                            // ... other cases for other field names
              default: return key; // Return the key itself if no user-friendly name is needed
          }
      })
    );
  invalidFields = invalidFields.concat(
    Object.keys(this.form2.controls)
    .filter(key => this.form2.get(key).invalid)
    .map(key => {
      switch(key) {
        case 'Doc_Confidentiality': return 'Document Confidentiality';
        case 'Eff_Date': return 'Effective Date';
      // case 'Doc_process_Owner': return 'Document Process Owner'
        case 'AuthorityTypeID': return 'Authority Type';
        case 'AuthoritynameID': return 'Name of Authority';
        case 'NatureOf_Doc_id': return 'Nature of Document';
       

        // ... other cases for other field names
        default: return key; // Return the key itself if no user-friendly name is needed
    }
    })
);
// if (!processOwner1 || processOwner1.trim() === '') {
//   invalidFields.push('Document Process Owner');
// }
invalidFields=invalidFields.filter((item:string)=>item.trim()!="");
//alert(JSON.stringify(invalidFields))
this.forminvalidfields=invalidFields;
 
 }
 if(this.forminvalidfields.length>0){

  this.erroMessage=`Please provide valid information for the following fields: ${this.forminvalidfields.join(', ')}`;
  //console.error('No main file selected');

  if(this.erroMessage!=""){
    this.dialog.open(DaidailogeComponent, {
      width: '400px',
      data: { message: this.erroMessage }
    });
    this.form1.setErrors({ invalidFields: true });
       this.form2.setErrors({ invalidFields: true });
    return;
  }
    
   
  //}
}
else{
 
  const processOwner = localStorage.getItem('processOwner');
  const docApprover = localStorage.getItem('docApprover');
  if (this.form2.valid && processOwner && processOwner.trim() !== '' ) {
    
     const effDate = (this.form2.get('Eff_Date') as FormControl).value;
     // || new Date().toISOString().split('T')[0]; // Use current date if Eff_Date is not set, though it's required.
     const defaultDatesFields = ['Initial_creation_doc_date', 'Date_Doc_Approver', 'Date_Doc_Revision'];

    defaultDatesFields.forEach(field => {
      const dateControl = this.form2.get(field) as FormControl;
      if (!dateControl.value) {
        dateControl.setValue(effDate);
      }
    });



    const formData: FormData = new FormData();
    const datavalues=this.form2.value;
   if (this.mainFile instanceof File) { // Check if `this.mainFile` is a File object
      formData.append('mainFile', this.mainFile, this.mainFile.name);
    } else {
      // Handle the error scenario
      this.erroMessage ="Please Upload  Main Document file before submitting.";
      console.error('No main file selected');
      //invalidFields.push('Document Process Owner');
      this.dialog.open(DaidailogeComponent, {
        width: '400px',
        data: { message: this.erroMessage }
      });
      return; // Exit the function if no main file was selected
    }
   
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        formData.append('supportFiles', file, file.name);
      }
    }

    Object.keys(this.form1.controls).forEach(key => {
      formData.append(key, this.form1.get(key).value);
    });

    Object.keys(this.form2.controls).forEach(key => {
      formData.append(key, this.form2.get(key).value);
    });
    const effDateControl = this.form2.get('Eff_Date') as FormControl;
    const effDateValue = new Date(effDateControl.value);
    const formattedDate = this.formatDate1(effDateValue);
   // const dateObject = new Date(formattedDate.replace(' ', 'T'));
    formData.append('Eff_Date', formattedDate);

    formData.append('Doc_process_Owner', processOwner);
  
    if (docApprover) {
      formData.append('Doc_Approver', docApprover);
    }
    else if(!docApprover || docApprover.trim() === '')
    {
      formData.append('Doc_Approver', 'N/A');
    }
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    const userId = this.userdata.profile.userid;
  formData.append('USR_ID', userId);
  

 console.log(JSON.stringify(formData))
//alert(JSON.stringify(formData))

 console.log(JSON.stringify(datavalues))
 this.http.post(URL + '/ThirdStepper/ThirdStepperSaveDraftDetails', formData)
      .subscribe(
        (response: any) => {
         this.erroMessage ="SaveDraft Successfully";
          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          });
     
        },
        (error: HttpErrorResponse) => {
          console.error('Error status code:', error.status);
          console.error('Error details:', error.error);
        }
      );
  } 
}

    
    
  }

 

updateFormattedDate(controlName: string, value: Date) {
  if (value) {
    const formattedDate = this.formatDate(value);
    //alert(formattedDate)
    this.form2.get(controlName)?.setValue(formattedDate, { emitEvent: false });
  }
}
FormattedDate2(controlName: string, value: Date) {
  if (value) {
    const formattedDate = this.formatDate(value);
    this.form3.get(controlName).setValue(formattedDate, { emitEvent: false });
  }
}

formatDate(date: Date): string {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


stepperNav1() {
  
// if (this.form1.valid) {
//   this.isStep1Completed=true;
//   this.isStep2Completed=false;
//   this.isStep3Completed=false;
//   this.isStep4Completed=false;
 
// }else{

//   if(this.form1.invalid){
//     let invalidFields: any[] = [];
//     //form1
//     invalidFields = invalidFields.concat(
//         Object.keys(this.form1.controls)
//         .filter(key => this.form1.get(key).invalid)
//         .map(key => {
//             switch(key) {
//                 case 'Entity_Master_id': return 'Entity ';
//                 case 'Unit_location_Master_id': return 'Unit Location';
//                 case 'DocTypeID': return 'Document Type';
//                 case 'Doc_CategoryID': return 'Document Category';
//                 case 'Doc_SubCategoryID': return 'Document Sub Category';
//                 case 'Title_Doc': return 'Title of Document';
//                 case 'Obj_Doc': return 'Objective of Document';
//                default: return key; 
//             }
//         })
//     );
//     this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
//      this.dialog.open(DaidailogeComponent, {
//        width: '900px',
//        data: { message: this.erroMessage }
//      });
//      this.form1.setErrors({ invalidFields: true });
//       return;
//   }
// }
  
          
     }
    
//  NotificationSave(){

//     let postdata={
//       'NotificationSetUpID' :0,
//       'EscalationStatus' :this.EnterDayspanelVisible ? 1 :0,
//        'EnterDays': parseInt(this.Notifier.value.entervalue),
//       'DefaultNotifiers' :this.Notifier.value.Def_Notifiers,
//       'AdditionalNotifiers' :this.Notifier.value.Add_Notifiers,
//       'EnterComb' :this.Notifier.value.dropdown,
//     }
//     let postdata2={
//       'NotificationSetUpID' :0,
//      'EscalationStatus' :this.NotifierspanelVisible? 2 :0,
//     'EnterDays': parseInt(this.Notifier.value.entervalue2),
//       'DefaultNotifiers' :this.Notifier.value.Def_Notifiers2,
//       'AdditionalNotifiers' :this.Notifier.value.Add_Notifiers2,
//       'EnterComb' :this.Notifier.value.dropdown2,
//     }
//     let postdata3={
//       'NotificationSetUpID' :0,
//       'EscalationStatus' :this.AdditionalpanelVisible ? 3 :0,
//       'EnterDays': parseInt(this.Notifier.value.entervalue3),
//       'DefaultNotifiers' :this.Notifier.value.Def_Notifiers3,
//       'AdditionalNotifiers' :this.Notifier.value.Add_Notifiers3,
//       'EnterComb' :this.Notifier.value.dropdown3,
//     }
//     let pistdatalist:any[]=[];
// if(this.EnterDayspanelVisible){
//   pistdatalist.push(postdata);
// }
// if(this.NotifierspanelVisible){
//   pistdatalist.push(postdata2);
// }
// if(this.AdditionalpanelVisible){
//   pistdatalist.push(postdata3);
// }
//    alert(JSON.stringify(pistdatalist))
   
//        this.http.post(`${BASE_URL}/Notification/SaveNotificationDetails`,pistdatalist,{headers}).subscribe((response:any)=>{

//       this.dialog.open(DaidailogeComponent,{
//           width:'250px',data:{message:response}
//       })  ;
     
//      window.location.reload();
      

//     }
//   )}
stepperNav5(){
  
}
stepperNav4(){
//alert(this.isMainFileUploaded)
  // if (this.isMainFileUploaded == true){
  //   this.isStep1Completed=true;
  //   this.isStep2Completed=true;
  //   this.isStep3Completed=false;
  //   this.isStep4Completed=false;  
  //   this.buttontoclick.nativeElement.click();

  // }
  // else{
    
  //     // Handle the error scenario
  //     this.erroMessage ="Please Upload  Main Document file before submitting.";
  //     console.error('No main file selected');
  //     //invalidFields.push('Document Process Owner');
  //     this.dialog.open(DaidailogeComponent, {
  //       width: '400px',
  //       data: { message: this.erroMessage }
  //     });
  //     return; // Exit the function if no main file was selected
    
   
  // }
//   const formData: FormData = new FormData();
//   let  EntityMasterID: number= parseInt(this.form1.value.Entity_Master_id);

// if (this.mainFile instanceof File) { // Check if `this.mainFile` is a File object
//   formData.append('mainFile', this.mainFile, this.mainFile.name);
// } else {
//   // Handle the error scenario
//   this.erroMessage ="Please Upload  Main Document file before submitting.";
//   console.error('No main file selected');
//   //invalidFields.push('Document Process Owner');
//   this.dialog.open(DaidailogeComponent, {
//     width: '400px',
//     data: { message: this.erroMessage }
//   });
//   return; // Exit the function if no main file was selected
// }
// if (this.selectedFiles) {
//   for (let file of this.selectedFiles) {
//     formData.append('supportFiles', file, file.name);
//   }
// }

// Object.keys(this.form1.controls).forEach(key => {
//   formData.append(key, this.form1.get(key).value);
// });
//  //alert(formData)
//  this.http.post(URL + '/Document/SaveDraftDetails', formData)
//  .subscribe(
//    (response: any) => {
//     // this.formSubmitted = true;
//     this.adddocidpkid=parseInt(response);
//      this.erroMessage ="Save Successfully";
//      const dialogRef = this.dialog.open(DaidailogeComponent, {
//        width: '400px',
//        data: { message: this.erroMessage }
//      });
//     //  dialogRef.afterClosed().subscribe(result => {
//     //    window.location.reload();
//     //  });
//    }
//  )
  }
  stepperNav2(){
    // if (this.form2.valid){
    //   this.isStep1Completed=true;
    //   this.isStep2Completed=true;
    //   this.isStep3Completed=true;
    //   this.isStep4Completed=false;
    // }
    // else{

    //   const invalidFields = [];
    //   const controls = this.form2.controls;
    
    //   for (const field in controls) {
    //     if (controls[field].invalid) {
    //       invalidFields.push(field);
    //     }
    //   }
    
    //   if (invalidFields.length > 0) {
    //     this.erroMessage=`Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
    //     this.dialog.open(DaidailogeComponent, {
    //       width: '400px',
    //       data: { message: this.erroMessage }
    //     });
    //   }
    // }
       
  
}

    
    
    stepperNav3(){
      if (this.form3.valid){
        this.isStep1Completed=true;
        this.isStep2Completed=true;
        this.isStep3Completed=true;
        this.isStep4Completed=true;
      }
      else{

        const invalidFields = [];
        const controls = this.form3.controls;
      
        for (const field in controls) {
          if (controls[field].invalid) {
            invalidFields.push(field);
          }
        }
      
        if (invalidFields.length > 0) {
          this.erroMessage=`Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
          this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
        }
      }
      }
      goBack(): void {
        this.location.back();
      }
    
      goForward(): void {
        this.location.forward();
      }
      togglePanelVisibility() {
        this.isPanelVisible = !this.isPanelVisible;
        this.EnterDayspanelVisible = !this.EnterDayspanelVisible;
      }
      updateValidators() {
   
        if (this.isPanelVisible) {
          (this.form3.get('freq_period') as FormControl).setValidators([Validators.required]);
          (this.form3.get('freq_period_type') as FormControl).setValidators([Validators.required]);
          (this.form3.get('review_start_Date') as FormControl).setValidators([Validators.required]);
          // (this.form3.get('dropdown') as FormControl).setValidators([Validators.required]);
          // (this.form3.get('entervalue') as FormControl).setValidators([Validators.required]);

        } else {
          (this.form3.get('freq_period') as FormControl).clearValidators();
          (this.form3.get('freq_period_type') as FormControl).clearValidators();
          (this.form3.get('review_start_Date') as FormControl).clearValidators();
          // (this.form3.get('dropdown') as FormControl).clearValidators();
          // (this.form3.get('entervalue') as FormControl).clearValidators();
        }
    
        (this.form3.get('freq_period') as FormControl).updateValueAndValidity();
        (this.form3.get('freq_period_type') as FormControl).updateValueAndValidity();
        (this.form3.get('review_start_Date') as FormControl).updateValueAndValidity();
        // (this.form3.get('dropdown') as FormControl).updateValueAndValidity();
        // (this.form3.get('dropdown') as FormControl).updateValueAndValidity();
      }
      onEscaltionValidatorsa(){
        if (this.EnterDayspanelVisible) {
          (this.form3.get('dropdown') as FormControl).setValidators([Validators.required]);
          (this.form3.get('entervalue') as FormControl).setValidators([Validators.required]);

        } else {
         (this.form3.get('dropdown') as FormControl).clearValidators();
          (this.form3.get('entervalue') as FormControl).clearValidators();
        }
         (this.form3.get('dropdown') as FormControl).updateValueAndValidity();
        (this.form3.get('dropdown') as FormControl).updateValueAndValidity();
      }
      onNotifiersValidations(){
        if (this.NotifierspanelVisible) {
          (this.form3.get('dropdown2') as FormControl).setValidators([Validators.required]);
          (this.form3.get('entervalue2') as FormControl).setValidators([Validators.required]);

        } else {
         (this.form3.get('dropdown2') as FormControl).clearValidators();
          (this.form3.get('entervalue2') as FormControl).clearValidators();
        }
         (this.form3.get('dropdown2') as FormControl).updateValueAndValidity();
        (this.form3.get('entervalue2') as FormControl).updateValueAndValidity();
      }
      onAdditionalValidations(){
        if (this.AdditionalpanelVisible) {
          (this.form3.get('dropdown3') as FormControl).setValidators([Validators.required]);
          (this.form3.get('entervalue3') as FormControl).setValidators([Validators.required]);

        } else {
         (this.form3.get('dropdown3') as FormControl).clearValidators();
          (this.form3.get('entervalue3') as FormControl).clearValidators();
        }
         (this.form3.get('dropdown3') as FormControl).updateValueAndValidity();
        (this.form3.get('entervalue3') as FormControl).updateValueAndValidity();
      }
    
}