import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { Component, OnInit } from '@angular/core';
import { UpdateAddDocument,RepositoryFiles,InspectionservicesService,Document} from 'src/app/inspectionservices.service';
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
import { AddDocument, PublishedDocument} from 'src/app/inspectionservices.service';


import { DocCategory} from 'src/app/inspectionservices.service';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { NgZone } from '@angular/core';
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




const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-disable-pub-doc',
  templateUrl: './disable-pub-doc.component.html',
  styleUrls: ['./disable-pub-doc.component.scss']
})
export class DisablePubDocComponent {
  gridColumns:any;
  files: Document[] = [];
  isUserBoxOpened:any ;
  [x: string]: any;
  ButtonsVisible:boolean=false;
  publishedFiles: Document[] = [];
  supportedFiles: Document[] = [];
 selecteddoc!:Document;
  selectedFileUrl: string = '';
  selectedValue:any;
  doc_id:any;
  version_no:any;
  userdata: any = [];
  gridDataSource: any;
  DocTypeArray :any[]=[];
docTypeID:any;
DocCategory:any[]=[];
isPanelExpanded = false;
isCursorOverPanel = false;

  fileselection:boolean=false;
  AddDocumentinfo:UpdateAddDocument=new UpdateAddDocument();
  visibleStepper:any;
  selectedDocTypeID: any; // Change the type to match your data type
  selectedDocCategoryID: any; // Change the type to match your data type
  selectedDocSubCategoryID: any; // Change the type to match your data type
  title: string = ''; // Example for a string property
  subTitle: string = ''; // Example for a string property
  objective: string = ''; // Example for a string property
  Reason:any;
  inputValue: string | undefined;
  dataSource:any;
  selectedOption:any;
  gridData:any;
 
  formdata!: DxFormModule;
  DocumentTypeData:any;
  DocumentCategoryData:any;
  DocumentSubCategoryData:any;
  AuthorityTypeData:any;
  AuthorityNameData:any;
  NatureOfDocument:any;
  AddDocId:any;
  userid:any;
  selectedFile: File | null = null;
  Main : Document[] = [];
  CoverPage: Document[] = [];

  isPanelVisible: boolean = false;
  isdoclinkpanelVisible:boolean=false;
  isChecked: boolean = false;
  isChecked2:boolean=false;
 // checkboxForm: FormGroup;
  reportForm!: FormGroup;
  //UpdateForm :FormGroup;
  panelOpenState: boolean = false;
  sessionData: any;
  erroMessage: any;
  pdfSrc: string = '';
  tooltipText: string | undefined;
  selectedFileName: string | null = null;


 
  UpdateForm :FormGroup=new FormGroup({
    documenttype:new FormControl(''),
    docCategory:new FormControl(''),
    docsubCat:new FormControl(''),
    doctitle:new FormControl(''),
    subtitle:new FormControl(''),
    objective: new FormControl(''),
    documentID: new FormControl('')
  });
  
  UpdateForm1 :FormGroup=new FormGroup({
    docConfidentiality:new FormControl(''),
    effDate:new FormControl(''),
    initialCreationDate:new FormControl(''),
    docIntNum:new FormControl(''),
    docIntVerNum:new FormControl(''),
    docPhyValLoc: new FormControl(''),
    docProcOwner:new FormControl(''),
    docApprover:new FormControl(''),
    dateOfDocApprovel:new FormControl(''),
    docLastRevDate:new FormControl(''),
    pubAutType:new FormControl(''),
    NameOfAuth: new FormControl(''),
    NatureOfDoc:new FormControl(''),
    Keywords: new FormControl('')
  });
  
  UpdateForm2 :FormGroup=new FormGroup({
    freqperiodtype:new FormControl(''),
    pubdoc:new FormControl(''),
    publishercomments:new FormControl(''),
    indicativereadingtime:new FormControl(''),
    timeperiod:new FormControl(''),
    freq_period:new FormControl(''),
    review_start_Date:new FormControl(''),
    firstname:new FormControl(''),
    document_name:new FormControl(''),
    CREATED_DATE:new FormControl(''),
    
  });
  versions: VersionDetail[] = [];
  UpdateForm9: FormGroup[] = [];
  PermissionForm: FormGroup;
  permissionsArray: string[] = [];
  // UpdateForm9 :FormGroup=new FormGroup({
  //   VersionChange:new FormControl(''),
  // })
  PublishedDocumentinfo:PublishedDocument=new PublishedDocument();
  selectedproject = new FormControl('');
  selectedTimePeriod= new FormControl('');
  showUnitRates: boolean = false;
  showUpload = false;
  selectedDate: Date | undefined;
  createDoc=false;
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
  public project3: any[] = [
    { id: 1, name: 'List Selection' },
    { id: 2, name: 'Text Field' }
  ];
  
  TextBox1=true;
  
  public project4: any[] = [
    { id: 1, name: 'Days' },
    
    { id: 2, name: 'Week' },
    { id: 3, name: 'Month' },
    { id: 4, name: 'Year' }
   
    
  ];



  OptionSelectedActivateFields = false;
  OptionNotSelected=false;
  public project2: any[] = [
    { id: 1, name: 'OptionSelectedActivateFields' },
    { id: 2, name: 'OptionNotSelected' }
  ];
  
  form :FormGroup;
  gridData1: any ;

  ngOnInit(): void {
    
    //this.isUserBoxOpened=false;
   //this.visibleStepper=false;
   let user: any = this.session.getUser();
   // console.log(user)
   this.userdata = JSON.parse(user);//userdata.profile.userid
   console.log("userid",this.userdata.profile.userid)
   if (!this.session.isLoggedIn()) {
     this.router.navigate(['login']);
   }

   this.getDocCategorybyId;
  // this.setTooltipText()
  }
  // setTooltipText() {
  //   // Replace this with your logic to generate the tooltip text
  //   this.tooltipText = 'Dynamic tooltip text based on data';
  // }
   updateTooltip1() {
    // Generate the tooltip text based on the form group values
    this.tooltipText = this.generateTooltipText(this.UpdateForm.value);
  }   updateTooltip2() {
    // Generate the tooltip text based on the form group values
    this.tooltipText = this.generateTooltipText(this.UpdateForm1.value);
  }   updateTooltip3() {
    // Generate the tooltip text based on the form group values
    this.tooltipText = this.generateTooltipText(this.UpdateForm1.value);
  }   updateTooltip4() {
    // Generate the tooltip text based on the form group values
    this.tooltipText = this.generateTooltipText(this.UpdateForm2.value);
  }   
isGridBoxOpened: boolean;
gridBoxValue: number[] = [2];


 
PublishedDocinfo:PublishedDocument=new PublishedDocument();

  constructor(private zone: NgZone,public dialog: MatDialog,private InspectionservicesService: InspectionservicesService,private http: HttpClient, private ref: ChangeDetectorRef,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
    private router: Router,
    private FormBuilder :FormBuilder,
    private report: ReportService,
    private formBuilder: FormBuilder,)
     {
     this.isGridBoxOpened = false;
    this.isUserBoxOpened=false;

    this.PermissionForm = this.fb.group({
      DateStart: [''],
      DateEnd: [''],
      Permissiontype: ['']
    });
    
      this.form =  this.formBuilder.group ({
       
        DisableReason: ['', Validators.required],
     
     })
  
  
     const storedData:any = localStorage.getItem('user');
     const parsedData = JSON.parse(storedData);
     //Role id
     const rolesArray = parsedData && parsedData.role.roles;
     const firstRole = rolesArray && rolesArray.length > 0 ? rolesArray[0] : null;
     
     // Extract roleid from the first role, or set to null if no roles
     const RoleId = firstRole ? firstRole.roleid : null;
     console.log('RoleId:', RoleId);
     
     
     
     if(RoleId==2){
       this.gridColumns=[ 
         {
         dataField: 'title_Doc',
         caption: 'Title'
             },   {
               dataField: 'sub_title_doc',
               caption: 'Sub Title',
               visible: false,
        
                   },  {
                     dataField: 'document_Id',
                     caption: 'ID'
                         }, {
                           dataField: 'versionControlNo',
                           caption: 'Version No.'
                               },{
                                 dataField: 'publisher_name',
                                 caption: 'Name of Publisher'
                                     },
               'docTypeName','doc_CategoryName','doc_SubCategoryName',{
                 dataField: 'addDoc_createdDate',
                 caption: 'Publishing Date',
                 dataType:'date',
                    format:'dd-MMM-yyyy'

                     },{
                       dataField: 'eff_Date',
                       caption: 'Effective Date',
                       dataType:'date',
                    format:'dd-MMM-yyyy'

                           },{
                             dataField: 'keywords_tags',
                             caption: 'Keywords',
                             visible: false,
         
                                 },
              'authorityTypeName','authorityName','natureOf_Doc_Name',{
               dataField: 'doc_Confidentiality',
               caption: 'Nature of Confidentiality'
                   },{
                     dataField: 'freq_period',
                     caption: 'Review Frequency'
                         },]
      
      }
      else{
       this.gridColumns=[ 
        {
          dataField: 'document_Id',
          caption: 'Document ID'
              },{
          
         dataField: 'title_Doc',
         caption: 'Title'
             },   {
               dataField: 'sub_title_doc',
               caption: 'Sub Title',
               visible: false,
               
                   }, {
                           dataField: 'versionControlNo',
                           caption: 'Version No.'
                               },
               'docTypeName','doc_CategoryName','doc_SubCategoryName',{
                 dataField: 'addDoc_createdDate',
                 caption: 'Publishing Date',
                 dataType:'date',
                    format:'dd-MMM-yyyy'
                     },{
                       dataField: 'eff_Date',
                       caption: 'Effective Date',
                       dataType:'date',
                    format:'dd-MMM-yyyy'
                           },{
                             dataField: 'keywords_tags',
                             caption: 'Keywords',
                             visible: false,
                             
                                 },
              'authorityTypeName','authorityName',{
               dataField: 'doc_Confidentiality',
               caption: 'Document Confidentiality'
                   },{
                     dataField: 'freq_period',
                     caption: 'Review Frequency'
                         }, 
                         {
                          dataField: 'natureOf_Doc_Name',
                          caption: 'Document Classification'
                              },
                        ]
      
      }
     
     
     //EntityMasterId
     const EntityMasterid = parsedData ? parsedData.profile.Entity_Master_id : null;
     console.log('Entity Master id:', EntityMasterid);
     //UnitLocationId
     const UnitlocationMasterid = parsedData ? parsedData.profile.Unit_location_Master_id : null;
     console.log('Unit location Master_id:', UnitlocationMasterid);
     //UserId
     const Userid = parsedData ? parsedData.profile.userid : null;
     console.log('User id:', Userid);
    // alert(Userid)
     
     console.log('Parsed value:', parsedData);
     this.gridDataSource={
       paginate: true,
       store: new CustomStore({
           key: 'addDoc_id',
           loadMode: 'raw',
           load:()=>{return new Promise((resolve, reject) => {
             this.http.get(URL + '/SavedDraftDocument/GetPublishedData/'+RoleId+ '/' +Userid, {headers})
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
  onMouseEnter() {
    this.isCursorOverPanel = true;
  }

  onMouseLeave() {
    this.isCursorOverPanel = false;
  }
  displayData() {
    // Handle data display logic, if needed
  }

  clearData() {
    // Handle clearing of data, if needed
  }
  generateTooltipText(formData: any): string {
    let tooltipText = '';

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        tooltipText += `${key}: ${formData[key]}\n`;
      }
    }

    return tooltipText.trim();
  }
  onButtonClick(data: any = {}) {
    if (this.form.invalid) {
      const message = "Please Enter Reason.";
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: message },
      });
     
    } 
    else {
      const dialogRefConfirmation = this.dialog.open(ToasterComponent, {
        width: '550px',
        data: {
          title: 'Disable Document?',
          message: 'Are you sure you want to Disable document?',
        },
      });

      dialogRefConfirmation.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.updateFormdata(this.selectedOption);
          let docid: number = parseInt(this.AddDocId);
          let user:any=this.session.getUser();
          user=JSON.parse(user as any)
          const userid:number=user.profile.userid;
          
          let payload = {
            AddDoc_id: docid,
            ChangedBy:userid,
            DisableReason : this.form.value.DisableReason,
          };
          //console.log( payload);
          //alert(JSON.stringify(payload))
         // this.http.post(URL + '/AddDocument/DisablePublishedDoc', this.AddDocumentinfo, { headers })
          this.http.post(URL + '/AddDocument/DisablePublishedDoc', payload, { headers })
          .subscribe(
            (response: any) => {
              if(response =="Updated Successfully"){
                //alert('Document Disabled successfully');
                const message1 = "Disabled Document Successfully";
                const dialogRef = this.dialog.open(DaidailogeComponent, {
                  width: '550px',
                  data: { message: message1 },
                });
                   //alert(message1)
                 
                //  this.visibleStepper=false;
                //  this.ButtonsVisible=false;
                // this.selectedValue=null;
                 //this.router.navigate(['inspection/disable-pub-doc']);
               
              }
              else {
                alert('Document Not Disabled');
              }
              window.location.reload();
            },
            (error: any) => {
              alert('error in saving');
                console.error('Error saving data:', error);
            }
        );
          const disableReasonControl = this.form.get('DisableReason');
          if (disableReasonControl) {
            disableReasonControl.setValue('');
          }
          
        }
       
      });
   
    }
    
  }
  onbackClick() {

   this.visibleStepper=false;
   this.ButtonsVisible=false;
  this.selectedValue=null;
  }
  onFileSelected(file: Document): void {
    console.log("File selected: ", file);
    this.fileselection=true;
  //  var Doc_url="http://localhost:18593/"
    // this.pdfSrc = file.filePath; // Assuming this is the correct path for the ngx-doc-viewer
    // console.log(JSON.stringify(this.pdfSrc))
     // Assuming 'BASE_URL' is something like 'http://api.mydomain.com/'
  // and 'file.filePath' is something like 'Resources\Dataset2.xlsx'
  // which needs to be converted to 'http://api.mydomain.com/Resources/Dataset2.xlsx'
 // const basePath = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  //const basePath='C:/Vishnu/Risk/rmscoreapi/ITRTelemetry/';
  const filePath = file.filePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes for URL
  // this.pdfSrc = `${Doc_url}${filePath}`;
  this.pdfSrc = `${filePath}`;
  console.log(`File selected: ${this.pdfSrc}`);
  this.selecteddoc=file;
  this.selectedFileName = file.document_Name;
  }
  
updateFormdata(AddDocId:any)
{
  let docid: number = parseInt(AddDocId);
  this.AddDocumentinfo.AddDoc_id=docid;
  this.AddDocumentinfo.DisableReason=this.form.value.DisableReason; 

}


  gridBox_displayExpr(addDoc_id:any) {
    return addDoc_id && `${addDoc_id.title_Doc} , ${addDoc_id.publisher_name} , ${addDoc_id.docTypeName} , ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} , ${addDoc_id.publisher_Date_Range} , ${addDoc_id.eff_Date} , ${addDoc_id.keywords_tags} , ${addDoc_id.authorityTypeName} , ${addDoc_id.authorityName} , ${addDoc_id.natureOf_Doc_Name}`;
  }

  onDropdownValueChanged(event:any) {
   
    console.log("selected Type id: ", event.value);
    this.selectedOption = event.value;
    this.isUserBoxOpened = false;
   

    this.isGridBoxOpened = false;
    this.visibleStepper=true;

    this.AddDocId = event.value;
      this.selectedOption=this.AddDocId ; 
      
      this.retrieveFiles( this.selectedOption);
  }
      getUpdateFormData(event:any){
        this.ButtonsVisible=true;
        this.isGridBoxOpened = false;
        this.visibleStepper=true;
        debugger;
        console.log("selected Type id: ", event.value);
        this.AddDocId = event.value;
          this.selectedValue=this.AddDocId ; 
          
          this.retrieveFiles( this.selectedValue);
    this.http.get(URL+'/SavedDraftDocument/GetPublishedDatabyid/'+this.AddDocId,)
    .subscribe((data:any)=>{

 
      if (Array.isArray(data) && data.length > 0) {
        const message2 = "Dear User, you have chosen to ‘Disable’ this document.  Kindly be aware that your action will affect the User accessibility, notification and alerts, and document linking to other published documents. Your action will also disable the document viewing of support documents attached (if any).  This action cannot be reversed, but however, you may ‘Re-activate’ this document later, but all your mapping action will be reset.";

        const dialogRef = this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: message2 },
          disableClose: true,
        });
        // Data is an array and has at least one element
        const PubList = data[0]; // Access the first element of the array
        // Now, you can access properties of the firstItem object
        this.doc_id = PubList.document_Id || "None";
        this.version_no = PubList.versionControlNo || "None";
        this.UpdateForm.controls['documentID'].setValue(this.doc_id);
        this.UpdateForm.controls['documenttype'].setValue(PubList.docTypeName || "None");
        this.UpdateForm.controls['docCategory'].setValue(PubList.doc_CategoryName || "None");
        this.UpdateForm.controls['docsubCat'].setValue(PubList.doc_SubCategoryName || "None");
        this.UpdateForm.controls['doctitle'].setValue(PubList.title_Doc || "None");
        this.UpdateForm.controls['subtitle'].setValue(PubList.sub_title_doc || "None");
        this.UpdateForm.controls['objective'].setValue(PubList.obj_Doc || "None");
        
        let a = this.UpdateForm.controls['objective'].value;
        let b = this.UpdateForm.value.objective;
        
        this.UpdateForm1.controls['docConfidentiality'].setValue(PubList.doc_Confidentiality || "None");
        
        let effdate = PubList.eff_Date || "None";
        let formattedeffDate = effdate ? this.getFormattedDate(effdate) : "None";
        this.UpdateForm1.controls['effDate'].setValue(formattedeffDate);
        
        let initial_creation_doc_date = PubList.initial_creation_doc_date || "None";
        let formattedDate = initial_creation_doc_date ? this.getFormattedDate(initial_creation_doc_date) : "None";
        this.UpdateForm1.controls['initialCreationDate'].setValue(formattedDate);
        
        this.UpdateForm1.controls['docIntNum'].setValue(PubList.doc_internal_num || "None");
        this.UpdateForm1.controls['docIntVerNum'].setValue(PubList.doc_Inter_ver_num || "None");
        this.UpdateForm1.controls['docPhyValLoc'].setValue(PubList.doc_Phy_Valut_Loc || "None");
        this.UpdateForm1.controls['docProcOwner'].setValue(PubList.doc_process_Owner || "None");
        this.UpdateForm1.controls['docApprover'].setValue(PubList.doc_Approver || "None");
        
        let Approvaldate = PubList.date_Doc_Approver || "None";
        let formattedApprovalDate = Approvaldate ? this.getFormattedDate(Approvaldate) : "None";
        this.UpdateForm1.controls['dateOfDocApprovel'].setValue(formattedApprovalDate);
        
        let LastRevdate = PubList.date_Doc_Revision || "None";
        let formattedLastRevDate = LastRevdate ? this.getFormattedDate(LastRevdate) : "None";
        this.UpdateForm1.controls['docLastRevDate'].setValue(formattedLastRevDate);
        
        this.UpdateForm1.controls['pubAutType'].setValue(PubList.authorityTypeName || "None");
        this.UpdateForm1.controls['NameOfAuth'].setValue(PubList.authorityName || "None");
        this.UpdateForm1.controls['NatureOfDoc'].setValue(PubList.natureOf_Doc_Name || "None");
        this.UpdateForm1.controls['Keywords'].setValue(PubList.keywords_tags || "None");
        
        this.UpdateForm2.controls['pubdoc'].setValue(PubList.pub_doc || "None");
        this.UpdateForm2.controls['publishercomments'].setValue(PubList.publisher_comments || "None");
        this.UpdateForm2.controls['firstname'].setValue(PubList.firstname || "None");
        
        let reviewStartdate = PubList.review_start_Date || "None";
        let formattedReviewDate = reviewStartdate ? this.getFormattedDate(reviewStartdate) : "None";
        this.UpdateForm2.controls['review_start_Date'].setValue(formattedReviewDate);
        
        this.UpdateForm2.controls['document_name'].setValue(PubList.linking_Doc_names || "None");
        
        const combined = `${PubList.freq_period || "None"} - ${PubList.freq_period_type || "None"}`;
        this.UpdateForm2.controls['freq_period'].setValue(combined);
        
        const combined1 = `${PubList.indicative_reading_time || "None"} - ${PubList.time_period || "None"}`;
        this.UpdateForm2.controls['indicativereadingtime'].setValue(combined1);
        
        let Createdate = PubList.createD_DATE || "None";
        let Createddate = Createdate ? this.getFormattedDate(Createdate) : "None";
        this.UpdateForm2.controls['CREATED_DATE'].setValue(Createddate);
        
        let startdate = PubList.startdate || "None";
        let StartDate = startdate ? this.formatDate(startdate) : "None";
        this.PermissionForm.controls['DateStart'].setValue(StartDate);
        
        let enddate = PubList.enddate || "None";
        let EndDate = enddate ? this.formatDate(enddate) : "None";
        this.PermissionForm.controls['DateEnd'].setValue(EndDate);
        //this.UpdateForm9.controls['VersionChange'].setValue(PubList.versionControlNo);
        this.getDocVersions();
        this.getPermissionRights();
        
        
        //this.UpdateForm9.controls['VersionChange'].setValue(PubList.versionControlNo);
      }
      
      else {
        // Data is either not an array or it's empty
        // Handle this case as needed
      }
      

    })
  } 


  getDocCategorybyId(id:any){
  
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
   
  getDocVersions(): void {
    let params = new HttpParams()
      .set('AddDocId', this.selectedValue)
      .set('document_Id', this.UpdateForm.get("documentID")?.value);

    this.http.get<VersionDetail[]>(URL + '/Acknowlwdgedata/GetDocVersions/', { headers, params })
      .subscribe({
        next: (res) => {
          this.versions = res;
          this.UpdateForm9 = this.versions.map(version => this.createForm(version));
        },
        error: (err) => {
          console.error('Error fetching Document Versions:', err);
        }
      });
  }
  createForm(version: VersionDetail): FormGroup {
    return this.fb.group({
      VersionChange: [{ value: version.versionControlNo, disabled: true }],
      Version_DATE: [{ value: this.getFormattedDate(version.docRevMapCreatedDate), disabled: true }]
    });
  }
  getPermissionRights(): void {
    let params = new HttpParams()
      .set('AddDocId', this.selectedValue)
      .set('document_Id', this.UpdateForm.get("documentID")?.value)
      .set('userID', this.userdata.profile.userid);
      this.http.get<any[]>(URL + '/Acknowlwdgedata/GetPermissionRights/', { headers, params })
      .subscribe({
        next: (res) => {
          const permissionsString = res.join(',');
          this.permissionsArray = permissionsString.split(',');
          this.PermissionForm.controls['Permissiontype'].setValue(permissionsString);
        },
        error: (err) => {
          console.error('Error fetching Permission Rights:', err);
        }
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
 
 
  return `${day}/${month}/${year}`;
}
formatDate(dateString: string): string {
  const dateParts = dateString.split(' ')[0].split('/');
  if (dateParts.length !== 3) {
    return dateString; // Return as is if format is not as expected
  }

  const day = dateParts[0].padStart(2, '0');
  const monthIndex = parseInt(dateParts[1], 10) - 1; // Months are zero based in JavaScript Date
  const year = dateParts[2];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = months[monthIndex];

  return `${day}/${month}/${year}`;
}
retrieveFiles(event:any): void {
     
  this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/'+ this.selectedValue)
    .subscribe(
      (data: Document[]) => {
        this.files = data;
        this.publishedFiles = this.files.filter(file => file.fileCategory === 'Published');
        this.supportedFiles = this.files.filter(file => file.fileCategory === 'Support'); // Adjust the category name as needed
        console.log(JSON.stringify(this.publishedFiles));
        if (this.publishedFiles.length > 0) {
          console.log(this.publishedFiles)
          // Automatically select the first published file
          this.onFileSelected(this.publishedFiles[0]);
        }
      },
      (error: any) => {
        console.error('There was an error!', error);
      }
    );
}e(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
  }

  name = 'Angular';
  viewer = 'google';
  //selectedType = 'docx'; //'docx';
  //pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
 // pdfSrc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';
  //pdfSrc = '/assets/SSaD.docx';

  contentLoaded() {
    console.log('File loaded');

  }

getDocType(){
  this.http.get(URL+'/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data:any)=>{
    this.DocTypeArray=data;
    
  })

}
}
interface VersionDetail {
  versionControlNo: string;
  docRevMapCreatedDate: string; // Ensure this is a string
}