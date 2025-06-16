import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef,ElementRef,Renderer2,ViewChild} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';


import { Component, OnInit,AfterViewInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';


import { DocCategory} from 'src/app/inspectionservices.service';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ProvideAccess} from 'src/app/inspectionservices.service';
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
import { MatRadioChange } from '@angular/material/radio';
import themes from 'devextreme/ui/themes';
import { NgxDocViewerComponent } from 'ngx-doc-viewer';
import { OtpDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { routes } from '../../dashboard/dashboard-routing.module';

//import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';



const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-view-pub-doc',
  templateUrl: './view-pub-doc.component.html',
  styleUrls: ['./view-pub-doc.component.scss']
})
export class ViewPubDocComponent implements OnInit, AfterViewInit {
  
  files: Document[] = [];
  //DocfileInfo:RepositoryFiles= new RepositoryFiles();
  //DocumentfilesData:any;
  [x: string]: any;
  panelOpenState = true;
   publishedFiles: Document[] = [];
    supportedFiles: Document[] = [];
   selecteddoc!:Document;
    selectedFileUrl: string = '';
  //tooltipText: any | undefined;
  tooltipText: string | undefined;
  @ViewChild(NgxDocViewerComponent, { static: true }) docViewer: any;
  gridDataSource:any;
  publDoc:any;
  selectedValue:any;
  visibleStepper:any;
  AddDocId:any;
  Userinfo:any;
  doc_id:any;
  Main : Document[] = [];
  CoverPage: Document[] = [];
  version_no:any;
  gridBoxValue1: number[] = [3];
  gridBoxValue: number[] = [3];
  isUserBoxOpened:boolean;
  isUserBoxOpened1:boolean;
  isGridBoxOpened : boolean;
  isPanelVisible: boolean = false;
  isdoclinkpanelVisible:boolean=false;
  TextBox1=true;
  selectedOption:any[] = [];
  SelectedOption:any;
  pdfSrc: string = '';
  selectedFileName: string | null = null;
  fileselection:boolean=false;
  //UpdateForm :FormGroup;
DocTypeArray :any[]=[];
docTypeID:any;
DocCategory:any[]=[];

userdata: any = [];
doc_CategoryID:string='';
DocSubCat:any[]=[];
doc_SubCategoryID:any;
roleid: any;

 
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
// UpdateForm9 :FormGroup=new FormGroup({
//   VersionChange:new FormControl(''),
// })
versions: VersionDetail[] = [];
UpdateForm9: FormGroup[] = [];
PermissionForm: FormGroup;
permissionsArray: string[] = [];
//UpdateForm1Group
NatureOfDocument:any[]=[];
AuthorityTypeArray:any[]=[];
AuthorityName:any[]=[];
authorityTypeID:any;
gridColumns:any;
usergridColumns: any = [  {
  dataField: 'firstname',
  caption: 'Name'
      },'department_Master_name'];

public project: any[] = [
  { id: 1, name: 'Direct Upload' },
  { id: 2, name: 'Create Document' }
];

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
    { id: 1, name: 'List Selection' },
    { id: 2, name: 'Text Field' }
  ];
 
  public docapprover: any[] = [
    { id: 1, name: 'List Selection' },
    { id: 2, name: 'Text Field' }
  ];
  
  public project4: any[] = [
    { id: 1, name: 'Days' },
    
    { id: 2, name: 'Week' },
    { id: 3, name: 'Month' },
    { id: 4, name: 'Year' }
   
    
  ];

  public tmperiod:any[]=[
    {id:1,name:'mins'},
    {id:2,name:'hrs'},
    {id:3,name:'days'}
  ];
 
  
  TextBox2=false;
  DropdownBox2=true;
 

 

           gridBox_displayExpr(addDoc_id:any) {
            return addDoc_id && `${addDoc_id.title_Doc} , ${addDoc_id.publisher_name} , ${addDoc_id.docTypeName} , ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} , ${addDoc_id.publisher_Date_Range} , ${addDoc_id.eff_Date} , ${addDoc_id.keywords_tags} , ${addDoc_id.authorityTypeName} , ${addDoc_id.authorityName} , ${addDoc_id.natureOf_Doc_Name}`;
          }

          publiDocColumns: any = ['document_Id', 'title_Doc','publisher_Date_Range'];
          
          gridBox_displayExpr1(ID:any) {
            return ID && `${ID.document_Id} <${ID.document_Name}>
            <${ID.publisher_Date_Range}> 
            `;
          }
  ngOnInit(): void {

    let user: any = this.session.getUser();
    // console.log(user)
    this.userdata = JSON.parse(user);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    const userId = this.userdata.profile.userid;

   this.getDocCategorybyId;

   
  }
  

  dropDownOptions: any;

  constructor(private InspectionservicesService: InspectionservicesService,private http: HttpClient, private ref: ChangeDetectorRef,private renderer: Renderer2,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private FormBuilder :FormBuilder,
    private report: ReportService,
    private formBuilder: FormBuilder,private el: ElementRef)
     {

      this.isUserBoxOpened1=false;
      this.isGridBoxOpened = false;
      this.isUserBoxOpened=false;

      this.PermissionForm = this.fb.group({
        DateStart: [''],
        DateEnd: [''],
        Permissiontype: ['']
      });
     
      this.getDocType();
  //   this.getNatureOfDocument();
  //  this.getAuthorityType();
   

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
      dataField: 'document_Id',
      caption: 'Document ID'
          },  {
    dataField: 'title_Doc',
    caption: 'Title'
        },   {
          dataField: 'sub_title_doc',
          caption: 'Sub Title',
         
    allowHiding: false
              },  {
                      dataField: 'versionControlNo',
                      caption: 'Version No.'
                          },{
                            dataField: 'publisher_name',
                            caption: 'Name of Publisher'
                                },
          'docTypeName','doc_CategoryName','doc_SubCategoryName',{
            dataField: 'addDoc_createdDate',
            caption: 'Publishing Date',
            calculateCellValue: this.getFormattedEffectiveDate
                },{
                  dataField: 'eff_Date',
                  caption: 'Effective Date',
                  calculateCellValue: this.getFormattedEffectiveDate
                      },{
                        dataField: 'keywords_tags',
                        caption: 'Keywords',
                       
                        allowHiding: false
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
      caption: ' Document ID'
          },{
    dataField: 'title_Doc',
    caption: 'Title'
        },   {
          dataField: 'sub_title_doc',
          caption: 'Sub Title',
          visible: false,
          
              },   {
                      dataField: 'versionControlNo',
                      caption: 'Version No.'
                          },
          'docTypeName','doc_CategoryName','doc_SubCategoryName',{
            dataField: 'addDoc_createdDate',
            caption: 'Publishing Date',
            calculateCellValue: this.getFormattedEffectiveDate
                },{
                  dataField: 'eff_Date',
                  caption: 'Effective Date',
                  calculateCellValue: this.getFormattedEffectiveDate
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
  this.dropDownOptions = {
    width: 1400, // Default width
    showTitle: true, // Optional, makes the drop-down show a title when open
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
  }
  
  // retrieveFiles(event:any): void {
   
  //   this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/'+ this.selectedValue)
  //     .subscribe(
  //       (data: Document[]) => {
  //         this.files = data;
  //         console.log(this.files)
  //       },
  //       (error: any) => {
  //         console.error('There was an error!', error);
  //       }
  //     );
  // }

  retrieveFiles(event:any): void {
     
    this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/'+ this.selectedValue)
      .subscribe(
        (data: Document[]) => {
          this.files = data;
          this.publishedFiles = this.files.filter(file => file.fileCategory === 'Published');
          this.supportedFiles = this.files.filter(file => file.fileCategory === 'Support'); 
          this.Main = this.files.filter(file => file.fileCategory === 'Main');
          this.CoverPage = this.files.filter(file => file.fileCategory === 'Cover Page'); // Adjust the category name as needed
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
    ngAfterViewInit(): void {
    //  this.disableRightClick();
    }
    disableRightClick() {
      const viewerElement = this.el.nativeElement.querySelector('ngx-doc-viewer');
      
      // Disable right-click menu
      if (viewerElement) {
        viewerElement.addEventListener('contextmenu', (event: MouseEvent) => {
          event.preventDefault();  // Prevent right-click
        });
      }
    }

    
  getDocType(){
    this.http.get(URL+'/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data:any)=>{
      this.DocTypeArray=data;
      
    })

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
  getDocSubCategorybyId(id:any){
   
     console.log('Selected docTypeID:', id.value);
  
     this.doc_CategoryID=id;
     if (this.doc_CategoryID) { 
      
       this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId?Doc_CategoryID=' + this.doc_CategoryID).subscribe((data: any) => {
         this.DocSubCat = data;
       });
     } else {
       alert('docCat is null or undefined'); // Add some error handling
     }
   }



   getUpdateFormData(event:any){
    this.isGridBoxOpened = false;
    this.visibleStepper=true;
    debugger;
    console.log("selected Type id: ", event.value);
    this.AddDocId = event.value;
      this.selectedValue=this.AddDocId ; 
      
      this.retrieveFiles( this.selectedValue);
     //alert("api")
    this.http.get(URL+'/SavedDraftDocument/GetPublishedDatabyid/'+this.AddDocId).subscribe((data:any)=>{

 
      if (Array.isArray(data) && data.length > 0) {
        // Data is an array and has at least one element
        // console.log(JSON.stringify(data))
        // alert(JSON.stringify(data))
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
        
        this.getDocVersions();
        this.getPermissionRights();

        
        //this.UpdateForm9.controls['VersionChange'].setValue(PubList.versionControlNo);
      }
      
      else {
        // Data is either not an array or it's empty
        // Handle this case as needed
      }
      
      //this.tooltipText = this.UpdateForm1.controls['pubAutType'];



      // console.log(JSON.stringify(data))
      // this.UpdateForm.patchValue({
      //   documenttype: data.docTypeName,
      //   docCategory: data.doc_CategoryName,
      //   docsubCat: data.doc_SubCategoryName,
      //   doctitle: data.title_Doc,
      //   subtitle: data.sub_title_doc,
      //   objective: data.obj_Doc
      // });
    })
   }
   Back(){
    this.visibleStepper=false;
    this.selectedValue =null;
    //this.router.navigate(['dashboard', 'inspection']);
    //this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    // const currentUrl = this.router.url;
    // this.router.navigate([currentUrl]);
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

getFormattedDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'None';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'None';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'None';
  }

  const dateParts = dateString.split(' ')[0].split('/');
  if (dateParts.length !== 3) {
    return 'None'; // Return 'None' if the format is not as expected
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

// generateTooltipText(){
//   this.tooltipText = this.UpdateForm2.controls['pubAutType'];
// }


// selectDoc(event: any){

//   console.log('Selected:', event.value);

//   if (event.value === 1) {

//     // this.General = true;

//     // this.confidential=false;

//     this.phoneno=false;

//   }

//   else {

//     this.phoneno=true;

//     // this.General = false;

//     // this.confidential=true;

//   }

// }


// selectProcessOwner(event: any){

//   console.log('Selected process owner:', event.value);

//   if (event.value === 2) {
//      //console.log("if 2");
//     // this.General = true;

//     // this.confidential=false;

//     this.TextBox=true;
//     this.DropdownBox=false;

//   }

//   else  {
//   //console.log("else 1");
//     this.TextBox=false;
//     this.DropdownBox=true;

//     // this.General = false;

//     // this.confidential=true;

//   }

// }

// selectdocApprover(event: any){

//   console.log('Selected:', event.value);

//   if (event.value === 1) {

//     // this.General = true;

//     // this.confidential=false;

//     this.TextBox2=false;
//     this.DropdownBox2=true;
//    this.gridBoxValue1=[];

//   }

//   else {

//     this.TextBox2=true;
//     this.DropdownBox2=false;

//     // this.General = false;

//     // this.confidential=true;

//   }

// }


// onGridBoxOptionChanged(e: { name: string; }) {

//   if (e.name === 'value') {
//     this.isUserBoxOpened = false;
//     this.ref.detectChanges();
//     //this.username=
//   }
// }

// onGridBoxOptionChanged1(e: { name: string; }) {
//   if (e.name === 'value') {
//     this.isUserBoxOpened1 = false;
//     this.ref.detectChanges();
//   }
// }

// onCheckboxChange(event: any) {

//   console.log('Checkbox for Document review frequency changed:', event.target.checked);
//   this.isPanelVisible = event.target.checked;
 
// }
// ondoclinkChange(event:any) {
//  console.log('Checkbox for Document Linking changed:', event.target.checked);
//   this.isdoclinkpanelVisible = event.target.checked;
// }
  




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

getFormattedEffectiveDate = (rowData: any): string => {
  const value = rowData.eff_Date || rowData.addDoc_createdDate;
  if (!value) return 'N/A';
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'N/A';

  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
changeTimePeriod(event:any)  {

  console.log('Selected Time period',event.value);

 }
}
interface VersionDetail {
  versionControlNo: string;
  docRevMapCreatedDate: string; // Ensure this is a string
}