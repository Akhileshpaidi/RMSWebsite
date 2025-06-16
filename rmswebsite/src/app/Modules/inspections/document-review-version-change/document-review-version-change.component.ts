
import { ChangeDetectorRef} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { InspectionservicesService,Document} from 'src/app/inspectionservices.service';

import { ChangeDetectionStrategy, NgZone } from '@angular/core';

import { FormBuilder, FormGroup,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { ImportRemedyComponent } from '../../report/import-remedy/import-remedy.component';
import { ReportService } from 'src/app/core/services/report/report.service';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ProvideAccess, RepositoryFiles} from 'src/app/inspectionservices.service';
import { Validators } from '@angular/forms';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxFormModule } from 'devextreme-angular';

import { Component,OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent,
} from 'devextreme-angular';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { DatePipe, Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
export interface Tag  {
  name: string;
}
@Component({
  selector: 'app-document-review-version-change',
  templateUrl: './document-review-version-change.component.html',
  styleUrls: ['./document-review-version-change.component.scss']
})
export class DocumentReviewVersionChangeComponent {
  @ViewChild('Obj_Doc') textarea!: ElementRef; 
  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
  @ViewChild('mainFileInput') mainFileInput!: ElementRef;
  @ViewChild('supportFilesInput') supportFilesInput!: ElementRef;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  tags: Tag[] = [];


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.form.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
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
      this.form.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
    }
    // Clear the input field explicitly
    this.chipListInput.nativeElement.value = '';
  }


  loadingConfig: boolean = true;
  userdata: any = [];
 OptionB=false;
 OptionA=true;
 optionCount: number = 1;// default value
 optionsArray: number[] = Array(this.optionCount).fill(0);
 optionsArray1: number[] = Array(this.optionCount).fill(0);
 Check_Doc_Rev_Freq:any;
 Check_Doc_Link:any;
 selectedFiles: File[] = [];
 mainFile: File | null = null;
 isMainFileUploaded = false;
 errorMessages: string[] = [];
 allowedFileTypes: string = '';
 FileTypes: string = '';
 mainErrorMessage: string = '';
 // Component class properties
 maxFiles: number = 1; // default value
 maxSize: number = 5 ; // default 5MB in bytes
 //selectedFiles: any[] = []; // This will hold your file info
 maxDocuments: number = 1;  // Default value
   maxSizeInMB: number = 5;   // Default value
   DocfileInfo:RepositoryFiles=new RepositoryFiles();
   files: Document[] = [];
   DocumentfilesData:any;
   questionbankoptions : any;
   Useridvalue:any;

 Userinfo:any;
 public selectedprocessownerType: number | undefined;
 public selecteddocapproverType: number | undefined;
 doc_CategoryID:string='';
 selectedValue:any;
 DocSubCat:any[]=[];
 DocCategory:any[]=[];
 AuthorityTypeArray:any[]=[];
 public processowner: any[] = [
   { id: 1, name: 'Select from User List' },
   { id: 2, name: 'Enter Name as Text' }
 ];

 public docapprover: any[] = [
   { id: 1, name: 'Select from User List' },
   { id: 2, name: 'Enter Name as Text' }
 ];
 usergridColumns: any = [  {
   dataField: 'firstname',
   caption: 'Name'
       },'department_Master_name'];
 DocumentTypeData:any;
 selectedDate: Date | undefined;
 AuthorityTypeData:any;
 isUserBoxOpened:boolean;
 isUserBoxOpened1:boolean;
 DocTypeArray :any[]=[];
 SelectedOption:any;
 DropdownBox=true;
 gridData:any;
 AuthorityNameData:any;
 doc_SubCategoryID:any;
 NatureOfDocument:any;
 reportForm!: FormGroup;
 DocumentsubcategoryData:any;
 createDoc=true;
 showUpload = true;
 DocumentcategoryData:any;
 Documentsubcategory:any;
 Doc_CategoryID:any;
 docTypeID:any;
 
 Selectedtopic:any;
 selectedOption:any[] = [];

 //phoneno=false;
 TextBox:any;
 Documentcategory:any;
 isPanelVisible: boolean = false;
 sessionData:any;
 form: FormGroup;
 gridDataSource:any;
 selectedFile: File | null = null;
 isdoclinkpanelVisible:boolean=false;
 publDoc:any;
 visibleStepper:any;
 formData = new FormData();


 // form :FormGroup=new FormGroup({
 //   // AddDocId:new FormControl(''),
 //   title_Doc:new FormControl(''),
 //   sub_title_doc:new FormControl(''),
 //   obj_Doc:new FormControl(''),
 //   doc_referenceNo:new FormControl(''),
 //   revision_summary:new FormControl(''),
 //  // VersionControlNo: new FormControl(''),
   
 // });


 TextBox1=true;
 checkboxForm: FormGroup;
 gridBoxValue1: any |undefined;
 publiDocColumns: any = ['document_Id', 'title_Doc','versionControlNo'];
 gridColumns:any=[ 'title_Doc',
'docTypeName','doc_CategoryName','doc_SubCategoryName', {
 dataField: 'versionControlNo',
 caption: 'Version No.'
     },{
       dataField: 'publisher_name',
       caption: 'Name of Publisher'
           },
           {
             dataField: 'document_Id',
             caption: 'ID'
                 },
           {
             dataField: 'sub_title_doc',
             caption: 'Sub Title'
                 },
                 {
                   dataField: 'publisher_name',
                   caption: 'Name of Publisher'
                       },
           {
             dataField: 'Doc_Confidentiality',
             caption: 'Nature of Confidentiality'
                 },
 'eff_Date','keywords_tags','authorityTypeName','authorityName','natureOf_Doc_Name',
 'addDoc_createdDate']
 Documentoptions: any;
 //options: any;
 erroMessage: any;

 gridBox_displayExpr(addDoc_id: any) {
   // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
   return addDoc_id && `${addDoc_id.title_Doc} , ${addDoc_id.publisher_name} , ${addDoc_id.docTypeName} , 
   ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} , ${addDoc_id.publisher_Date_Range} , 
   ${addDoc_id.Eff_Date} , ${addDoc_id.keywords_tags} , ${addDoc_id.authorityTypeName} ,
    ${addDoc_id.authorityName} ,  ${addDoc_id.natureOf_Doc_Name} , ${addDoc_id.Doc_Confidentiality}`;
  }

  

 gridBoxValue: number[] = [3];
isGridBoxOpened: boolean=false;
public project4: any[] = [
 { id: 1, name: 'Days' },
 
 { id: 2, name: 'Week' },
 { id: 3, name: 'Month' },
 { id: 4, name: 'Year' }

 
];


phoneno=false;
// public project1: any[] = [ 
//   { id: 1, name: 'General' },
//   { id: 2, name: 'Confidential' }
// ];


public tmperiod:any[]=[
 {id:1,name:'mins'},
 {id:2,name:'hrs'},
 {id:3,name:'days'}
]
public project3: any[] = [
 { id: 1, name: 'Select from User List' },
 { id: 2, name: 'Text Field' }
];
public project1: any[] = [
 { id: 1, name: 'General' },
 { id: 2, name: 'Confidential' }
];

 processOwner: any;
 docApprover: any;

 
 TextBox2=false;
 DropdownBox2=true;
 AuthorityTypeID: any;
 AuthorityName: any;
 AddDocId: any;
 versionChangeinfo: ProvideAccess = new ProvideAccess();
 addDoc_id: any;
 SelectedCategory: any;
 
 
 onCheckboxChange(event: any) {

  this.isPanelVisible = event.target.checked;
  console.log('Checkbox for Document review frequency changed:', event.target.checked);
  // const reviewFrequencyStatus = event.target.checked ? 1 : 0;
  // this.form.get('Review_Frequency_Status')?.setValue(reviewFrequencyStatus);

}

ondoclinkChange(event:any) {
 console.log('Checkbox for Document Linking changed:', event.target.checked);
  this.isdoclinkpanelVisible = event.target.checked;
 //  const docLinkingStatus = event.target.checked ? 1 : 0;
 //  this.form.get('Doc_Linking_Status')?.setValue(docLinkingStatus);

}
 
 changeTimePeriod(event:any)  {

   console.log('Selected Time period',event.value);
  
   
  
  }
 // ondoclinkChange(event:any) {
 // const isChecked2 = this.checkboxForm.get('isChecked2')!.value;
 // console.log('Checkbox doclink:', isChecked2);
 // }
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

 // onFileSelected(event: Event) {
 //   const input = event.target as HTMLInputElement;
 
 //   if (input.files && input.files.length) {
 //       this.selectedFile = input.files[0];
 //   }
 // }


 onFileSelected(event: any) {
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
}
 
 selectOption1(event: any) {
   // handle the selection change here
   console.log( event.value);
   
 }


 ngOnInit1(): void {

   this.selectedprocessownerType=2;
   this.selecteddocapproverType=2;
   localStorage.removeItem('processOwner');
   this.processOwner = null;

   localStorage.removeItem('docApprover');
   this.docApprover = null;

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

   console.log('test')
   //   this.gridDataSource = this.makeAsyncDataSource(this.http);
   //  // console.log('Griddatasource '+this.gridDataSource)
   //   this.gridDataSource.load().then((data:any)=>{
   //     this.zone.run(()=>{
   //     this.ref.detectChanges();
 
 
   //     });
 
   //     });
 
   this.form.get('Eff_Date')?.valueChanges.subscribe((value:any) => {
     this.updateFormattedDate('Eff_Date', value);
   });
   this.form.get('review_start_Date')?.valueChanges.subscribe((value:any) => {
    this.updateFormattedDate('review_start_Date', value);
  });
   this.form.get('Initial_creation_doc_date')?.valueChanges.subscribe((value:any) => {
     this.updateFormattedDate('Initial_creation_doc_date', value);
   });
   this.form.get('Date_Doc_Approver')?.valueChanges.subscribe((value:any) => {
     this.updateFormattedDate('Date_Doc_Approver', value);
   });
   this.form.get('Date_Doc_Revision')?.valueChanges.subscribe((value:any) => {
     this.updateFormattedDate('Date_Doc_Revision', value);
   });
  
       this.form.valueChanges.subscribe((val: any) => console.log("Form values:", val));
 }


 selectDoc(event: any){

   console.log('Selected:', event.value);

   if (event.value === 1) {

     // this.General = true;

     // this.confidential=false;

     this.phoneno=false;

   }

   else {

     this.phoneno=true;

     // this.General = false;

     // this.confidential=true;

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
 updateFormattedDate(controlName: string, value: Date) {
 // alert(1)
  if (value) {
    const formattedDate = this.formatDate(value);
    this.form.get(controlName)?.setValue(formattedDate, { emitEvent: false });
    alert(this.form.get(controlName)?.value)
  }
}
 selectInspection(element: any) {

   let id = element.value;
 
   // getting AuthId
 
   let user: any = this.session.getUser();
 
   this.sessionData = JSON.parse(user);
 
 }
SelectFrequencyPeriod(event: any){
 
 console.log('Selected:', event.value);

 

 if (event.value===1) {

   // this.General = true;

   // this.confidential=false;

   this.TextBox1=true;

 }
 else if (event.value===2) {

   // this.General = true;

   // this.confidential=false;

   this.TextBox1=true;

 }
 else if (event.value===3) {

   // this.General = true;

   // this.confidential=false;

   this.TextBox1=true;

 }
 else if (event.value===4) {

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

constructor(private route: ActivatedRoute,private router: Router,private InspectionservicesService: InspectionservicesService,
 private inventory: InventoryService,
 private session: SessionService,
 private encrypt: EncryptionService,
 private fb: FormBuilder,
 public location:Location,
 private http: HttpClient,private ref: ChangeDetectorRef,private formBuilder: FormBuilder, private zone : NgZone
 , public dialog: MatDialog
 )
 {

   

   this.form = this.formBuilder.group({
     numberInput: ['', Validators.required],
     dynamicInputs: this.formBuilder.array([]),
   });


   this.selecteddocapproverType=1;
   localStorage.removeItem('docApprover');
   this.docApprover = null;
   //this.gridBoxValue=[];
   this.isUserBoxOpened=false;
   this.isUserBoxOpened1=false;
   this.selectedprocessownerType=1;
   localStorage.removeItem('processOwner');
   this.processOwner = null;
// this.getDocType();
// this.getAuthorityType();
// this.getNatureOfDocument();

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




 this.checkboxForm = this.formBuilder.group({
   isChecked: false,
   isChecked2:false
 });
 let formControls;
 let formControls1;
 if (this.isPanelVisible=true) {
   //alert("vishnu");
   formControls = {
     freq_period_type: ['', Validators.required],
     freq_period: ['', Validators.required],
     review_start_Date: ['', Validators.required],
   };
 } else {
   formControls = {
     freq_period_type: [''],
     freq_period: [''],
     review_start_Date: [''],
   };
 }
 if (this.isdoclinkpanelVisible=true) {
   formControls1 = {
     publisher_comments: [''],
     indicative_reading_time: ['', Validators.required],
     Time_period: ['', Validators.required],
     pub_doc:[''],
   };
 } else {
   formControls1 = {
     publisher_comments: [''],
     indicative_reading_time: [''],
     Time_period: [''],
     pub_doc:[''],
   };
 }


 this.gridDataSource = this.makeAsyncDataSource(this.http);
//alert('Griddatasource ' +JSON.stringify(this.gridDataSource.toJSON()))
this.gridDataSource.load().then((data: any) => {
//debugger;
 console.log('Griddatasource:', this.gridDataSource);
 this.zone.run(() => {
   this.ref.detectChanges();
 });
});

 this.form =  this.formBuilder.group ({
   DocTypeID: ['', Validators.required],
   Doc_CategoryID: ['', Validators.required],
   Doc_SubCategoryID: ['', Validators.required],
   Title_Doc: ['', Validators.required],
   Sub_title_doc: ['', Validators.required],
   Obj_Doc: ['', Validators.required],
  // Select_Opt: ['', Validators.required],


 
  Doc_Confidentiality: ['', Validators.required],
   Eff_Date: ['', Validators.required],
   Initial_creation_doc_date: [''],
   Doc_internal_num: [''],
   Doc_Inter_ver_num: [''],
     Doc_Phy_Valut_Loc: [''],

     Doc_process_Owner: ['', Validators.required],
     Doc_Approver: [''],
     Date_Doc_Approver: [''],
     Date_Doc_Revision: [''],
     AuthorityTypeID: ['', Validators.required],
     AuthoritynameID: ['', Validators.required],
   
     natureOf_Doc_id: ['', Validators.required],
     KeyWords: ['', Validators.required],

     freq_period_type: [''],
     freq_period: [''],
     review_start_Date: [''],
     USR_ID: [''],
   
     publisher_comments: [''],
     indicative_reading_time: ['', Validators.required],
     Time_period: ['', Validators.required],
     Review_Frequency_Status: [0], // Default value as 0 (unchecked)
     Doc_Linking_Status: [0], // Default value as 0 (unchecked)
     pub_doc:[''],
     OtpMethod:[''],
     Doc_referenceNo:[''],
      Revision_summary:[''],
     ischecked:[false],
     ischecked2:[false],
     Unit_location_Master_id:[''],
     Entity_Master_id:[''],
 Enter_No_Of_Rows: ['',Validators.required],
 options: this.formBuilder.array([]),
 options1: this.formBuilder.array([]),
 
   });

      // Add FormGroups to the 'options' FormArray
const optionFormGroup = this.formBuilder.group({
 id: 0,   // Initial value for 'id'
 value: '' // Initial value for 'value'
});
const optionFormGroup1 = this.formBuilder.group({
 id: 0,   // Initial value for 'id'
 value: '' // Initial value for 'value'
});
(this.form.get('options') as FormArray).push(optionFormGroup);
(this.form.get('options1') as FormArray).push(optionFormGroup1);
this.onChanges(); 




   }

  
  
   
 



   selectDocConfidentiality(event: any){

    console.log('Selected:', event.value);

    if (event.value === 'General') {

    
      this.phoneno=false;
      this.form.get('OtpMethod')?.setValue("N/A");
    }

    else {

      this.phoneno=true;
      this.form.get('OtpMethod')?.setValue("email");
      // this.General = false;

      // this.confidential=true;

    }

  }

  

  
   OnTextboxChange(event: any) {
     // Your logic here
     // For example, updating the processOwner variable
     this.processOwner = event.target.value;
     //console.log(this.processOwner)
     localStorage.setItem('processOwner', this.processOwner);
    console.log("ONTEXTBOXCHANGE",JSON.stringify(localStorage.getItem('processOwner')))
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
     
      this.gridBoxValue1=[];
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
        this.gridBoxValue=[];
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

   OnDocApproverChange(event: any) {
     // Your logic here
     // For example, updating the processOwner variable
     this.docApprover = event.target.value;
     //console.log(this.processOwner)
     localStorage.setItem('docApprover', this.docApprover);
    console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
   }

   docApprover_displayExpr(usR_ID:any) {

     this.docApprover=usR_ID.firstname;
     const userId = usR_ID.id;
     localStorage.setItem('docApprover', this.docApprover);
       console.log("docApprover_displayExpr",JSON.stringify(localStorage.getItem('docApprover')))
     //localStorage.setItem('username_${userId}',this.username)
     return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
   }



   selectdocprocess(event: any){

     console.log('Selected:', event.value);
     console.log('Selected document Approver:', event.value);
         // Clear localStorage and component state when switching modes
         localStorage.removeItem('docApprover');
         this.docApprover = null;
         this.gridBoxValue=[];
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

   OnDocprocessChange(event: any) {
     // Your logic here
     // For example, updating the processOwner variable
     this.processOwner = event.target.value;
     //console.log(this.processOwner)
     localStorage.setItem('processOwner', this.processOwner);
    console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('processOwner')))
   }

   docprocess_displayExpr(usR_ID:any) {
     if (usR_ID) {
     this.processOwner=usR_ID.firstname;
     //const userId = usR_ID.id;
     localStorage.setItem('processOwner', this.processOwner);
       console.log("docApprover_displayExpr",JSON.stringify(localStorage.getItem('processOwner')))
     //localStorage.setItem('username_${userId}',this.username)
     return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>  `;
   }
 }
   

   gridBox_displayExpr2(usR_ID:any) {
     if (usR_ID) {
       this.processOwner = usR_ID.firstname;
       
       localStorage.setItem('processOwner', this.processOwner);
       console.log("PROCESSOWNERGRIDBOX",JSON.stringify(localStorage.getItem('processOwner')))
       return usR_ID.firstname && `${usR_ID.firstname} > <${usR_ID.department_Master_name}>`;
     }
     
   }

   onGridBoxOptionChanged2(e: { name: string; }) {

     if (e.name === 'value') {
       this.isUserBoxOpened = false;
       this.ref.detectChanges();
       //this.username=
     }
   }
   
   onGridBoxOptionChanged1(e: { name: string; }) {
     if (e.name === 'value') {
       this.isUserBoxOpened1 = false;
       this.ref.detectChanges();
     }
   }



makeAsyncDataSource(http:HttpClient) {
 return new CustomStore({
   loadMode: 'raw',
   key: 'addDoc_id',
   load() {
     return lastValueFrom(http.get(`${URL}/SavedDraftDocument/GetPublishedData`, { headers }));
   },
 });
}

ngOnInit(event: any): void {
  this.route.queryParams.subscribe(params => {
    this.addDoc_id = params['adddocId'];
  });
 this.visibleStepper=true;

//  if (e.name === 'value') {

//    this.isGridBoxOpened = false;
//    this.isPanelVisible=false;
//    this.isdoclinkpanelVisible=false;
   //this.addDoc_id=e.value;
  
   this.selectedValue=this.addDoc_id; 
   this.retrieveFiles(this.selectedValue);
 this.http.get(URL + '/SavedDraftDocument/GetPublishedDatabyid/'+this.addDoc_id, {headers})
   .subscribe((response: any) => {
  //alert(JSON.stringify(response))
   
  if (Array.isArray(response) && response.length > 0) {
    // Data is an array and has at least one element
  
    const versionChange = response[0]; // Access the first element of the array
    // Now, you can access properties of the firstItem object
   // alert(JSON.stringify(versionChange));
    this.Check_Doc_Link=versionChange.doc_Linking_Status;
    this.Check_Doc_Rev_Freq=versionChange.review_Frequency_Status;
    //alert(this.Check_Doc_Rev_Freq)
this.form.controls['Enter_No_Of_Rows'].setValue(versionChange.no_of_selectionchoices);
const optionCount = versionChange.no_of_selectionchoices;
if (versionChange.options && Array.isArray(versionChange.options)) {
// Clear existing options
while (this.options.length !== 0) {
this.options.removeAt(0);
}
this.questionbankoptions=versionChange.options;
const options = versionChange.options;

options.forEach((option: any) => {
const optionFormGroup = this.formBuilder.group({
id: option.index,       // Use 'id' as a FormControl
value: option.value, // Use 'value' as a FormControl
});
console.log('option id '+option.index)
console.log('option id '+option.value)
// Add the option FormGroup to the 'options' FormArray
this.options.push(optionFormGroup);
});
}
//First Form
    this.form.controls['Title_Doc'].setValue(versionChange.title_Doc);
    this.form.controls['DocTypeID'].setValue(versionChange.docTypeID);
    this.form.controls['Doc_CategoryID'].setValue(versionChange.doc_CategoryID);
    this.form.controls['Doc_SubCategoryID'].setValue(versionChange.doc_SubCategoryID);
    this.form.controls['Sub_title_doc'].setValue(versionChange.sub_title_doc);
    this.form.controls['Obj_Doc'].setValue(versionChange.obj_Doc);
   // this.form.controls['eff_Date'].setValue(versionChange.eff_Date);
   this.form.controls['Doc_Confidentiality'].setValue(versionChange.doc_Confidentiality);

   
   if (versionChange.doc_Confidentiality=='Confidential') {
   // alert(versionChange.doc_Confidentiality)
    this.phoneno=true;
  //  this.form.get('OtpMethod')?.setValue("N/A");

  // Setting the form control
  } else {
    this.phoneno=false;
  }
  this.form.controls['OtpMethod'].setValue(versionChange.otpMethod);
    let effdate=versionChange.eff_Date;
    //let formattedeffDate= this.getFormattedDate(effdate);
    this.form.controls['Eff_Date'].setValue(effdate);

   // this.form.controls['initial_creation_doc_date'].setValue(versionChange.initial_creation_doc_date);
   let initialcreation=versionChange.initial_creation_doc_date;
 //  let formattedinitialcreationDate= this.getFormattedDate(initialcreation);
   this.form.controls['Initial_creation_doc_date'].setValue(initialcreation);
  
  
    this.form.controls['Doc_Inter_ver_num'].setValue(versionChange.doc_Inter_ver_num);
    this.form.controls['Doc_internal_num'].setValue(versionChange.doc_internal_num);
    this.form.controls['Doc_Phy_Valut_Loc'].setValue(versionChange.doc_Phy_Valut_Loc);
      this.TextBox=true;
      this.TextBox2=true;
     this.DropdownBox=false;
    this.DropdownBox2=false;
   // this.form.controls['Date_Doc_Approver'].setValue(versionChange.date_Doc_Approver);
   this.form.controls['Doc_process_Owner'].setValue(versionChange.doc_process_Owner);
   localStorage.setItem('processOwner', versionChange.doc_process_Owner);
   this.form.controls['Doc_Approver'].setValue(versionChange.doc_Approver);
   localStorage.setItem('docApprover', versionChange.doc_Approver);
   let datedocapprover=versionChange.date_Doc_Approver;
 //  let formatteddocapprover= this.getFormattedDate(docapprover);
   this.form.controls['Date_Doc_Approver'].setValue(datedocapprover);
   
  //  let reviewdate=versionChange.review_start_Date;
  //  let reviewstartDate= this.getFormattedDate(reviewdate);
  //  this.form.controls['review_start_Date'].setValue(reviewstartDate);

//this.form.controls['review_start_Date'].setValue(versionChange.review_start_Date);
    //this.form.controls['Date_Doc_Revision'].setValue(versionChange.date_Doc_Revision);

    let LastRevdate=versionChange.date_Doc_Revision;
   // let DatedocRevision= this.getFormattedDate(docdate);
    this.form.controls['Date_Doc_Revision'].setValue(LastRevdate);
    this.form.controls['Doc_internal_num'].setValue(versionChange.doc_internal_num);
    this.form.controls['AuthorityTypeID'].setValue(versionChange.authorityTypeID);
    this.form.controls['AuthoritynameID'].setValue(versionChange.authoritynameID);
    this.form.controls['natureOf_Doc_id'].setValue(versionChange.natureOf_Doc_id);
    // this.form.controls['KeyWords'].setValue(versionChange.keywords_tags);


    if (versionChange.keywords_tags) {
      const keywordsArray = versionChange.keywords_tags.split(',');
      this.tags = keywordsArray.map((keyword: string) => ({ name: keyword.trim() }));
    this.form.controls['KeyWords'].setValue(this.tags.map(tag => tag.name)); // Setting the form control
    } else {
      this.form.controls['KeyWords'].setValue(['']); // Set to an empty array if no keywords
    }
    //this.form.controls['keywords_tags'].setValue(versionChange.keywords_tags);
    this.form.controls['publisher_comments'].setValue(versionChange.publisher_comments);
    this.form.controls['indicative_reading_time'].setValue(versionChange.indicative_reading_time);
    this.form.controls['Time_period'].setValue(versionChange.time_period);

    this.form.controls['Unit_location_Master_id'].setValue(versionChange.unit_location_Master_id);
    this.form.controls['Entity_Master_id'].setValue(versionChange.entity_Master_id);
   
  
    
   
    if(this.Check_Doc_Rev_Freq == 1){
     //alert(this.Check_Doc_Rev_Freq)
      // this.onCheckboxChange(this.Check_Doc_Rev_Freq);
      this.isPanelVisible=true;
      this.form.controls['freq_period_type'].setValue(versionChange.freq_period_type);
       this.form.controls['freq_period'].setValue(versionChange.freq_period);
       let reviewdate=versionChange.review_start_Date;
      // let reviewstartDate= this.getFormattedDate(reviewdate);
       this.form.controls['review_start_Date'].setValue(reviewdate);
     }
     else{
      //alert(this.Check_Doc_Rev_Freq)
       this.isPanelVisible=false;
     
     }


if(this.Check_Doc_Link == 1){

//alert(this.Check_Doc_Link)
//  this.ondoclinkChange(this.Check_Doc_Link);
this.isdoclinkpanelVisible=true;
// const pubDocArray = versionChange.pub_doc.split(',');
// const formattedPubDoc = pubDocArray.join(',');

// this.form.controls['pub_doc'].setValue(formattedPubDoc);
const pubDocString = versionChange.pub_doc;
if (pubDocString) {
const pubDocArray = pubDocString.split(','); // Split string into array
const pubDocNumberArray = pubDocArray.map((id:any) => Number(id));
this.ref.detectChanges();
this.SelectedOption = pubDocNumberArray;

} else {
// Set SelectedOption to an empty array if pubDocString is null or empty
this.SelectedOption = [];
}

}
else{
//alert(this.Check_Doc_Link)
this.isdoclinkpanelVisible=false;
}


this.form.controls['Doc_referenceNo'].setValue(versionChange.doc_referenceNo);
this.form.controls['Revision_summary'].setValue(versionChange.revision_summary);
//this.onChanges();
    this.ref.detectChanges();

  
  
  } else {
   
  }
     
   },
   (error: any) => {
    
    // window.alert('Error Saving Data');
   });
 
  // alert(e.value)


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


this.AuthorityNameData={
 paginate: true,
 store: new CustomStore({
     key: 'Value',
     loadMode: 'raw',
     load:()=>{return new Promise((resolve, reject) => {
       this.http.get(URL + '/AuthorityName/GetAuthorityNameDetails', {headers})
         .subscribe(res => {
          (resolve(res));

         }, (err) => {
           reject(err);
         });
   });
   },
 }),
};

this.DocumentcategoryData={
 paginate: true,
 store: new CustomStore({
     key: 'Value',
     loadMode: 'raw',
     load:()=>{return new Promise((resolve, reject) => {
       this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetails', {headers})
         .subscribe(res => {
          (resolve(res));

         }, (err) => {
           reject(err);
         });
   });
   },
 }),
};
this.DocumentsubcategoryData={
 paginate: true,
 store: new CustomStore({
     key: 'Value',
     loadMode: 'raw',
     load:()=>{return new Promise((resolve, reject) => {
       this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetails', {headers})
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

getNatureOfDocument(){
 this.http.get(URL+'/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data:any)=>{
   this.NatureOfDocument=data;
   
 })

}

getDocTypes(event: any) {
 console.log("selected Type id: ", event.value);
 this.docTypeID = event.value;
  this.Selectedtopic=null;  
 this.Documentcategory={
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


getsubDocTypes(event: any) {
 console.log("selected Type id: ", event.value);
 this.Doc_CategoryID = event.value;
  this.Selectedtopic=null;  
 this.Documentsubcategory={
   paginate: true,
   store: new CustomStore({
       key: 'Value',
       loadMode: 'raw',
       load:()=>{return new Promise((resolve, reject) => {
         this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.Doc_CategoryID, {headers})
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


// gridBox_displayExpr(addDoc_id: any) {
//   // return item && `${item.question} <${item.subject_Name} <${item.topic_Name} >`;
//   return addDoc_id.document_Id;
//  }



gridBox_displayExpr1(ID:any) {
 return ID && `${ID.document_Id} ${ID.document_Name}
 ${ID.publisher_Date_Range}
 `;
}

getDocType(){
 this.http.get(URL+'/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data:any)=>{
   this.DocTypeArray=data;
   
 })

}
getAuthorityType(){
 this.http.get(URL+'/AuthorityTypeMaster/GetAuthorityTypeMasterDetails').subscribe((data:any)=>{
   this.AuthorityTypeArray=data;
   
 })

}

getDocCategorybyId(id:any){
 this.SelectedCategory=null;
 console.log('Selected docTypeID:', id.value);

 this.docTypeID=id;
 if (this.docTypeID) { 
   this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID?DocTypeID=' + this.docTypeID).subscribe((data: any) => {
     this.DocCategory = data;
   });
 } else {
   //alert('docTypeID is null or undefined'); // Add some error handling
 }
}



getDocSubCategorybyId(id:any){
  
 console.log('Selected docTypeID:', id.value);

 this.doc_CategoryID=id;
 if (this.doc_CategoryID) { 
  
   this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId?Doc_CategoryID=' + this.doc_CategoryID).subscribe((data: any) => {
     this.DocSubCat = data;
   });
 } else {
  // alert('docCat is null or undefined'); // Add some error handling
 }
}

getAuthorityNamebyId(id:any){
 
 console.log('Selected AuthorityTypeID:', id.value);

 this.AuthorityTypeID=id;

 if (this.AuthorityTypeID) { 
   this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.AuthorityTypeID).subscribe((data: any) => {
     this.AuthorityName = data;
   });
 } else {
   //alert('docTypeID is null or undefined'); // Add some error handling
 }
}






SubmitUpdateForm()
{

 const processOwner = localStorage.getItem('processOwner');
 const docApprover = localStorage.getItem('docApprover');
 
 if (this.form.valid && processOwner && processOwner.trim() !== '' ) {

   const effDate = this.form.get('Eff_Date')?.value || new Date().toISOString().split('T')[0]; // Use current date if Eff_Date is not set, though it's required.
   const defaultDatesFields = ['Initial_creation_doc_date', 'Date_Doc_Approver', 'Date_Doc_Revision'];

   defaultDatesFields.forEach(field => {
     const dateControl = this.form.get(field);
   if (dateControl) {
     const initialValue = dateControl.value;
       
     if (!dateControl.value) {
       dateControl.setValue(effDate);
     }
 }
});


   const formData: FormData = new FormData();
    const datavalues=this.form.value;
//alert(this.mainFile)
   if (this.mainFile instanceof File) { 
     this.formData.append('mainFile', this.mainFile, this.mainFile.name);
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
       this.formData.append('supportFiles', file, file.name);
     }
   }

   Object.keys(this.form.controls).forEach(key => {
     formData.append(key, this.form.get(key)?.value);
   });

   //formData.append('Doc_process_Owner', processOwner);
   // const approverValue = docApprover && docApprover.trim() !== '' ? docApprover : 'N/A';
   // formData.append('Doc_Approver', approverValue);
   
   if (docApprover) {
     formData.append('Doc_Approver', docApprover);
   }
   else if(!docApprover || docApprover.trim() === '')
   {
     formData.append('Doc_Approver', 'N/A');
   }
     //const userId = this.userdata.profile.userid;
  // formData.append('USR_ID', userId);
   
//console.log(JSON.stringify(formData))
console.log(JSON.stringify(datavalues))


 } else {
   
   let invalidFields = Object.keys(this.form.controls)
     .filter(key => this.form.get(key)?.invalid)
     .map(key => {
       switch(key) {
         case 'DocTypeID': return 'Document Type';
         case 'Doc_CategoryID': return 'Document Category';
         case 'Doc_SubCategoryID': return 'Document Sub Category';
         case 'Title_Doc': return 'Title of Document';
         case 'Sub_title_doc': return 'Sub Title of Document';
         case 'Obj_Doc': return 'Objective of Document';
         case 'Doc_Confidentiality': return 'Document Confidentiality';
         case 'Eff_Date': return 'Effective Date';
         case 'AuthorityTypeID': return 'Authority Type';
         case 'AuthoritynameID': return 'Name of Authority';
         case 'NatureOf_Doc_id': return 'Nature of Document';
         case 'indicative_reading_time': return 'Indicative Reading Time';
         case 'Time_period': return 'Time Period';
        case 'options': return null;
        case 'options1': return null;
      
         default: return key; // Return the key itself if no user-friendly name is needed
       }
     });
     const optionarray:FormArray=this.form.get('options') as FormArray;
     for(let i:number=0;i<optionarray.value.length;i++){
        if(optionarray.value[i].value==""){
          invalidFields.push('Revision Summary '+(i+1))
        }
     }
     const optionarray1:FormArray=this.form.get('options1') as FormArray;
     for(let i:number=0;i<optionarray1.value.length;i++){
        if(optionarray1.value[i].value==""){
          invalidFields.push('Document Reference Number '+(i+1))
        }
     }
   // If 'Doc_process_Owner' is invalid, add it to the list of invalid fields
   if (!processOwner || processOwner.trim() === '') {
     invalidFields.push('Document Process Owner');
   }

   invalidFields=invalidFields.filter((item:any)=>{return item!=null})
   this.erroMessage = `Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
   
 
   this.dialog.open(DaidailogeComponent, {
     width: '900px',
     data: { message: this.erroMessage }
   });
    
     this.form.setErrors({ invalidFields: true });
  // alert(`Please provide valid information for the following fields: ${invalidFields.join(', ')}`);
   return; 
 }



this.updateFormParameters(this.selectedValue);
const formData: FormData = new FormData();
//alert(JSON.stringify(formData))
this.http.post(URL+'/DocVerAddDocument/UpdateversionchangeDoc/',this.formData,{headers})
.subscribe((data:any)=>{    
alert ("Updated Data Successfully")
this.visibleStepper=false;
this.router.navigate(['dashboard/inspection/doc-rev-period-status'])
this.gridDataSource = this.makeAsyncDataSource(this.http);
this.gridDataSource.load().then((data:any)=>{
  this.zone.run(()=>{
  this.ref.detectChanges();


  });
 });
});


}


updateFormParameters(AddDocId: any) {

  let docid: number = parseInt(this.addDoc_id);
 // this.versionChangeinfo.addDoc_id = docid;

 //alert(this.formData)
//  const storedData:any = localStorage.getItem('user');
// const parsedData = JSON.parse(storedData);
//  const Userid = parsedData ? parsedData.profile.userid : null;
//  console.log('User id:', Userid);
//  this.Useridvalue=Userid;
//  console.log('Parsed value:', parsedData);

  this.formData.append('AddDoc_id', docid.toString());
  //this.formData.append('USR_ID', this.Useridvalue.toString());
 let user:any=this.session.getUser();
       user=JSON.parse(user as any)
       const userid:number=user.profile.userid;
       const ChangedBy: string = user.profile.userid;

 this.formData.append('USR_ID', userid.toString());
 this.formData.append('ChangedBy', ChangedBy);
 alert(ChangedBy)
  this.formData.append('Title_Doc', this.form.value.Title_Doc);
  this.formData.append('Sub_title_doc', this.form.value.Sub_title_doc);
  this.formData.append('DocTypeID', this.form.value.DocTypeID.toString());
  this.formData.append('Doc_CategoryID', this.form.value.Doc_CategoryID.toString());
  this.formData.append('Doc_SubCategoryID', this.form.value.Doc_SubCategoryID.toString());
  this.formData.append('Obj_Doc', this.form.value.Obj_Doc);
  
  this.formData.append('AuthoritynameID', this.form.value.AuthoritynameID.toString());
  this.formData.append('AuthorityTypeID', this.form.value.AuthorityTypeID.toString());
  //this.formData.append('Doc_Approver', this.form.value.Doc_Approver);
  this.formData.append('Date_Doc_Approver', this.form.value.Date_Doc_Approver);
  
  alert( this.form.value.Date_Doc_Revision)
  this. formData.append('Date_Doc_Revision', this.form.value.Date_Doc_Revision);
  this.formData.append('Doc_Inter_ver_num', this.form.value.Doc_Inter_ver_num);
  //this.formData.append('Doc_process_Owner', this.form.value.Doc_process_Owner);

  if (this.selectedprocessownerType === 1) {
  
    let approver: string | null = localStorage.getItem('processOwner');
    this.formData.append('Doc_process_Owner', approver !== null ? approver : '');
} else {
    this.formData.append('Doc_process_Owner', this.form.value.Doc_process_Owner || '');
}

if(this.selecteddocapproverType==1)
  {
    //alert(this.form.value.Doc_Approver)
    let approver: string | null = localStorage.getItem('docApprover');

    this.formData.append('Doc_Approver', approver !== null ? approver : '');
    
  }
  else{
    this.formData.append('Doc_Approver', this.form.value.Doc_Approver);

  }

 
  this.formData.append('Time_period', this.form.value.Time_period);
  this.formData.append('Doc_Confidentiality', this.form.value.Doc_Confidentiality);

  if(this.isPanelVisible==true){

    this.formData.append('Review_Frequency_Status','1');
     this.formData.append('freq_period', this.form.value.freq_period);
    // alert( this.form.value.review_start_Date)

    this.formData.append('review_start_Date',this.form.value.review_start_Date);
    this.formData.append('freq_period_type',this.form.value.freq_period_type);
  
   } 
   else{   
     this.formData.append('Review_Frequency_Status','0');

   }

  this.formData.append('Initial_creation_doc_date', this.form.value.Initial_creation_doc_date);
  this. formData.append('publisher_comments', this.form.value.publisher_comments);
  this.formData.append('Eff_Date', this.form.value.Eff_Date);
  this.formData.append('Keywords_tags', this.form.value.KeyWords);
  this.formData.append('Doc_internal_num', this.form.value.Doc_internal_num);
  this.formData.append('Doc_Phy_Valut_Loc', this.form.value.Doc_Phy_Valut_Loc);
  this.formData.append('natureOf_Doc_id', this.form.value.natureOf_Doc_id);
//this.formData.append('addDoc_createdDate',this.form.value.addDoc_createdDate);
this.formData.append('indicative_reading_time',this.form.value.indicative_reading_time);
this.formData.append('OtpMethod',this.form.value.OtpMethod);

this.formData.append('Unit_location_Master_id',this.form.value.Unit_location_Master_id);
this.formData.append('Entity_Master_id',this.form.value.Entity_Master_id);




if(this.isdoclinkpanelVisible==true){

  this.formData.append('Doc_Linking_Status','1');

  if(this.form.value.pub_doc!=""){
  
    this.formData.append('pub_doc',this.form.value.pub_doc.join(', '));
  }
 
 }else{
  this.formData.append('Doc_Linking_Status','0');

 }




  const optionsArray = this.form.get('options') as FormArray;
  const optionsArray1 = this.form.get('options1') as FormArray;

  for (let i = 0; i < optionsArray.length; i++) {
    const optionValue = optionsArray.at(i).value;
    const optionValue1 = optionsArray1.at(i).value;
    this.formData.append(`Revision_summary[${i}].id`,optionValue.id.toString());
    this.formData.append(`Revision_summary[${i}].value`,(optionValue && optionValue.value != '')? optionValue.value:'N/A');

    this. formData.append(`Doc_referenceNo[${i}].id`, optionValue1.id.toString());
    this.formData.append(`Doc_referenceNo[${i}].value`, (optionValue1 && optionValue1.value != '')? optionValue1.value:'N/A');

  }
  // const userId = this.userdata.profile.userid;
  // this.formData.append('USR_ID', userId);

  //alert(this.formData);

  // Now you can use formData in your HTTP request
  // For example:
  // this.http.post('your/api/endpoint', formData).subscribe(...);
}



getFormattedDate(dateString: string): string {
 // Parse the date string into a JavaScript Date object
 const date = new Date(dateString);

 // Format the date to 'yyyy-MM-dd'
 const year = date.getFullYear();
 const month = (date.getMonth() + 1).toString().padStart(2, '0');
 const day = date.getDate().toString().padStart(2, '0');

 return `${year}-${month}-${day}`;
}


// Method to remove a file from the selected list
removeFile(index: number) {
 if (index >= 0 && index < this.selectedFiles.length) {
   this.selectedFiles.splice(index, 1);
} 

}

removeMainFile() {
  this.mainFileInput.nativeElement.value = '';
 this.mainFile = null; // Reset the main file to null when removing
 this.isMainFileUploaded = false;
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


retrieveFiles(event:any): void {
 //alert(JSON.stringify(this.selectedValue))
 this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/'+ this.selectedValue)
   .subscribe(
     (data: Document[]) => {
       this.files = data;
       console.log(this.files)
     
     },
     (error: any) => {
       console.error('There was an error!', error);
     }
   );
}


updateOptionsArray(event: any) {
  
 let count=0;
 this.optionCount = event.value;
 this.options.clear();
this.options1.clear();

 for (let i = count;  i < this.optionCount; i++) {
   const optionFormGroup = this.formBuilder.group({
     id: 0,       // Use 'id' as a FormControl
     value: ['',Validators.required], // Use 'value' as a FormControl
   });
   const optionFormGroup1 = this.formBuilder.group({
     id: 0,       // Use 'id' as a FormControl
     value: ['',Validators.required], // Use 'value' as a FormControl
   });
  
   
 this.options1.push(optionFormGroup1);
 this.ref.detectChanges();
   this.options.push(optionFormGroup);
   this.ref.detectChanges();
  
 }
}

get options(): FormArray {
 return this.form.get('options') as FormArray;
}

get options1(): FormArray {
 return this.form.get('options1') as FormArray;
 }
 

 ngAfterViewInit() {
   this.fetchUploadConfig();
   this.MainFileUploadConfig();
   // Code here will run after the view and child views are initialized
 }
 onInput() {
  this.resize();
 }
  resize() {
   const textareaElement = this.textarea.nativeElement;
   //textareaElement.style.overflow = 'hidden';
   textareaElement.style.height = 'auto';
   textareaElement.style.height = textareaElement.scrollHeight + 'px';
 }

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


 onChanges(): void {
 
   this.form.get('Eff_Date')?.valueChanges.subscribe((val: string | number | Date) => {
     const initialDateControl = this.form.get('Initial_creation_doc_date');
      
     if (initialDateControl) {
       const initialValue = initialDateControl.value;
       if (initialValue && new Date(initialValue) > new Date(val)) {
           // If Initial creation date is after the new ED, clear it or set it to ED.
           // Uncomment the desired behavior:

           // Clear the initial creation date
           initialDateControl.setValue('');

           // Or set the initial creation date to the new ED
           // initialDateControl.setValue(val);
       }
     
     }
   
 
     // Update Document Approval Date if it's later than the new Effective Date
     const approvalDateControl = this.form.get('Date_Doc_Approver');
     if (approvalDateControl && approvalDateControl.value && new Date(approvalDateControl.value) > new Date(val)) {
       approvalDateControl.setValue('');
     }
 
     // Update Document Last Revision Date if it's later than the new Effective Date
     const revisionDateControl = this.form.get('Date_Doc_Revision');
     if (revisionDateControl && revisionDateControl.value && new Date(revisionDateControl.value) > new Date(val)) {
       revisionDateControl.setValue('');
     }
 
   });
 }



}
