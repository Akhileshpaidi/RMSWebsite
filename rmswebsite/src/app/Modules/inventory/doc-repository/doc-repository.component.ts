import { ChangeDetectorRef,ViewChild} from '@angular/core';
import { UpdateAddDocument,RepositoryFiles,InspectionservicesService} from 'src/app/inspectionservices.service';
import { FormBuilder, FormControl, FormGroup,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatRadioChange } from '@angular/material/radio';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { ImportRemedyComponent } from '../../report/import-remedy/import-remedy.component';
import { ReportService } from 'src/app/core/services/report/report.service';


import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';


import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


import { Component, OnInit } from '@angular/core';
import themes from 'devextreme/ui/themes';

import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { YourDataService } from '../ack-request/ack-request.service';
import { NgxDocViewerComponent } from 'ngx-doc-viewer';
import { OtpDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';

import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-doc-repository',
  templateUrl: './doc-repository.component.html',
  styleUrls: ['./doc-repository.component.scss']
})
export class DocRepositoryComponent {
  [x: string]: any;
  panelOpenState = true;
   files: Document[] = []; // Use the interface here
   publishedFiles: Document[] = [];
    supportedFiles: Document[] = [];
    LinkedFiles: LinkedDocument[] = [];
   selecteddoc!:Document;
   isLoading : boolean= false;
    selectedFileUrl: string = '';
   // pdfSrc: string = 'http://www.pdf995.com/samples/pdf.pdf';
   pdfSrc: string = '';
   selectedFileName: string | null = null;
    gridDataSource:any;
    application: any;
    user_id:any;
    firstName: string = '';
    departmentName: string = '';
    classification: any;
    checkBoxesMode: string;
    sessionData: any;
    allMode: string;
    fileselection:boolean=false;
     data:any;
     doc_id:any;
     safePdfUrl: SafeResourceUrl | undefined;
     version_no:any;
     isFavorite: boolean = false;
     enteredOtp: string = '';
     countdown: number = 60; // Time limit in seconds
     correctOtp: string = ''; // Initialize correctOtp here
    isReadingCompleted = false;// Use 'any' if that's the intended type
  @ViewChild(NgxDocViewerComponent, { static: true }) docViewer: any;
  canDownloadSupportDoc: boolean = false;
  canDownloadMainDoc: boolean = false;
  canViewDocument = false;
  permissionsArrayIds: string[] = [];

     readLaterFiles: any[] = [];
     readCompletedFiles: any[] = [];
     PermissionsRights: any[] = [];
     //DocfileInfo:RepositoryFiles= new RepositoryFiles();
     gridDataSourcePublished:any;
     publDoc:any;
     selectedValue:any;
     visibleStepper:any;
     AddDocId:any;
     Userinfo:any;
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
     userdata: any = [];
     usermail : any = [];
     //UpdateForm :FormGroup;
   DocTypeArray :any[]=[];
   docTypeID:any;
   DocCategory:any[]=[];
   doc_CategoryID:string='';
   DocSubCat:any[]=[];
   doc_SubCategoryID:any;
   emailForm :FormGroup=new FormGroup({
    email:new FormControl(''),
   });
   otpForm: FormGroup =new FormGroup({});
    
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
  // PermissionForm :FormGroup=new FormGroup({
  //   Permissiontype:new FormControl(''),
  //   DateEnd:new FormControl(''),
  //   DateStart:new FormControl('')
  // });
  
   
   //UpdateForm1Group
   NatureOfDocument:any[]=[];
   AuthorityTypeArray:any[]=[];
   AuthorityName:any[]=[];
   authorityTypeID:any;
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
     gridColumns: any = ['title_Doc',{
      dataField:'natureOf_Doc_Name',
      caption:'Document Classification'
     },'docTypeName','authorityTypeName','doc_CategoryName','doc_SubCategoryName','keywords_tags','authorityName'];
  
    
   
              gridBox_displayExpr(addDoc_id:any) {
               return addDoc_id && `${addDoc_id.title_Doc} ,  ${addDoc_id.docTypeName} , ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} ,  ${addDoc_id.keywords_tags} , ${addDoc_id.authorityTypeName} , ${addDoc_id.authorityName} , ${addDoc_id.natureOf_Doc_Name}`;
             }
   
             publiDocColumns: any = ['document_Id', 'title_Doc','publisher_Date_Range'];
             
             gridBox_displayExpr1(ID:any) {
              
               return ID && `${ID.document_Id} <${ID.document_Name}>
               <${ID.publisher_Date_Range}> 
               `;
             }
             dropDownOptions: any;
    constructor(public dialog: MatDialog,private InspectionservicesService: InspectionservicesService, private fb: FormBuilder, private ref: ChangeDetectorRef,private yourDataService: YourDataService,private http: HttpClient, private sanitizer: DomSanitizer, private router: Router, private session: SessionService){
      this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
      this.allMode = 'allPages';
  
      this.isUserBoxOpened1=false;
      this.isGridBoxOpened = false;
      this.isUserBoxOpened=false;
      
      this.PermissionForm = this.fb.group({
        DateStart: [''],
        DateEnd: [''],
        Permissiontype: ['']
      });
      this.getDocType();
    this.getNatureOfDocument();
   this.getAuthorityType();
   
  this.gridDataSourcePublished={
  paginate: true,
  store: new CustomStore({
      key: 'addDoc_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SavedDraftDocument/GetPublishedData', {headers})
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
  this.dropDownOptions = {
    width: 1400, // Default width
    showTitle: true, // Optional, makes the drop-down show a title when open
  };
  this.adjustDropDownWidth();
    }
    ngAfterViewInit() {
      // Access the NgxDocViewerComponent after it's initialized
      if (this.docViewer) {
        // Subscribe to the page changes to check if the user is at the last page
        this.docViewer.pageChange.subscribe((page: number) => {
          //console.log(`Current page: ${page}`);
          const totalPages = this.docViewer.pagesCount;
          if (page === totalPages) {
            this.isReadingCompleted = true;
          } else {
            this.isReadingCompleted = false;
          }
        });
      }
    }
    adjustDropDownWidth() {
      const screenWidth = window.innerWidth;
  
      // Example: Adjust width based on screen size
      if (screenWidth > 1200) {
        this.dropDownOptions.width = 1400;
      } else if (screenWidth > 800) {
        this.dropDownOptions.width = 1000;
      } else {
        this.dropDownOptions.width = 700;
      }
    }
    // Method to handle the "Read Complete" button click event
    onReadComplete() {
      // Your logic for handling the "Read Complete" action
      // ...
    }
  
  private loadGridData(userId: string): void {
    //console.log('User ID:', userId); 
    this.gridDataSource = {
      paginate: true,
      store: new CustomStore({
        key: 'addDoc_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            const params = new HttpParams().set('USR_ID', userId);
           //console.log('USR_ID',userId)
             this.http.get(URL + '/Acknowledgement/GetAckReadCompletedUserAccessability?USR_ID='+userId, {
             // this.http.get(URL + '/Acknowlwdgedata/GetReadCompletedUserAccessability?USR_ID='+userId, {
              headers,
              params: params
            }).subscribe(
              res => {
                resolve(res);
              },
              err => {
                reject(err);
              }
            );
          });
        },
      }),
    };
    }
  
   ngOnInit(): void {
     // this.retrieveFiles();
     let user: any = this.session.getUser();
      // //console.log(user)
      this.userdata = JSON.parse(user);//userdata.profile.userid
      //console.log("userid",this.userdata.profile.userid)
      if (!this.session.isLoggedIn()) {
        this.router.navigate(['login']);
      }
      const userId = this.userdata.profile.userid;
      this.user_id = userId;
      this.firstName = this.userdata.profile.firstname;
      this.departmentName = this.userdata.profile.departmentName;
  
      // Load grid data based on the user ID
      this.loadGridData(userId);
      this.getDocCategorybyId;
      
      
      this.setSafeUrl();
   }
    
   setSafeUrl() {
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/gview?embedded=true&url=' + this.pdfSrc
    );
  }
    generateOtp(): void {
      const generatedOtp = this.yourDataService.generateOtp();
      let storeddata: any = this.session.getUser();
      // //console.log(storeddata);
      this.usermail = JSON.parse(storeddata);
      //console.log("useremail",this.usermail.profile.useremailid)
      const emailToAddress = this.usermail.profile.useremailid;
      const subject = 'Please Use FOllowing OTP(One Time Password)to View Document Marked as Confidential.';
      const body = `<h3> OTP FOR View Document : </h3><h1>${generatedOtp}</h1>`;
      this.InspectionservicesService.sendEmail(emailToAddress, subject, body).subscribe(
        response => {
          //console.log('Email sent successfully:', response);
          this.openOtpDialog(generatedOtp);
        },
        error => {
          console.error('Error sending email:', error);
        }
      );
    }
    
    Update() {
  
      let payload = {
      USR_ID:this.userdata.profile.userid.toString(),
      Document_Id: this.doc_id.toString(),
      AddDoc_id: this.selecteddoc.addDoc_id.toString(),
      DocumentRepId: this.selecteddoc.documentRepID.toString(),
      VersionControlNo: this.version_no.toString(),
      File_Category: this.selecteddoc.fileCategory,
      Favorite: this.isFavorite,
      };
      //console.log('payload',payload)
      this.http.post(URL+ '/Acknowledgement/UpdateAcknowledgeDetails', payload)
      .subscribe(
        (response: any)=>{
             if(response === 'not exist'){
          //alert(response)
          this.dialog.open(DaidailogeComponent,{
            width:'550px',
            data:{message:"Document not Exist"},
            
          })

        }
          else {
           //alert('else')
           // Show dialogue box for successful password update
           this.dialog.open(DaidailogeComponent, {
             width: '550px',
             data: { message: "Document successfully Updated" },
           });
           this.visibleStepper = false;
           this.selectedValue = null;
         }

            //alert('Data saved successfully ');
            ////console.log('Data saved successfully:', response);
        },
        // {
        //   alert("Data Saved Sucessfully");
        //   //console.log("Data Saved Sucessfully", response);
        // },
        (error:any)=>{
          console.error('Error saving data:', error);}
        )
  
      // Assuming 'fileselection' is the selected file
      if (this.fileselection) {
        // Add the selected file to the readLaterFiles array  
        this.readLaterFiles.push(this.fileselection);
        // You can perform additional logic if needed
        //console.log('File selected to Update:', this.fileselection);
      } else {
        // Handle the case when no file is selected
        console.warn('No file selected to Update.');
      }
    }
  
  
  
    getDocType(){
      this.http.get(URL+'/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data:any)=>{
        this.DocTypeArray=data;
        
      })
  
    }
    
   
    
    getDocCategorybyId(id:any){
    
      //console.log('Selected docTypeID:', id.value);
   
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
     
       //console.log('Selected docTypeID:', id.value);
    
       this.doc_CategoryID=id;
       if (this.doc_CategoryID) { 
        
         this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId?Doc_CategoryID=' + this.doc_CategoryID).subscribe((data: any) => {
           this.DocSubCat = data;
         });
       } else {
         alert('docCat is null or undefined'); // Add some error handling
       }
     }

    openOtpDialog(correctOtp: string) {
      this.correctOtp = correctOtp;
    const MatDialogRef = this.dialog.open(OtpDialogComponent, {
      width: '300px',
      data: { correctOtp: correctOtp }
      //disableClose: true
    });
    MatDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // OTP validation success
        this.visibleStepper = true;
      } else if (result === false) {
        // OTP validation failed (timeout)
        // Handle accordingly
      } else if (result === "close") {
        MatDialogRef.close();
        this.selectedValue = null;
        // Dialog closed without validation or cancellation
        // Handle accordingly
      } else {
        // Handle other cases if needed
        this.openOtpDialog(correctOtp);
      }
    });
  }
  
     getUpdateFormData(event:any){
      this.isGridBoxOpened = false;
      this.visibleStepper = false;
      //console.log("selected Type id: ", event.value);
      this.AddDocId = event.value;
        this.selectedValue=this.AddDocId ; 
        this.retrieveFiles( this.selectedValue);
  
        this.user_id=this.userdata.profile.userid.toString();
        let docid = this.AddDocId[0];

        let payload1 = {
          USR_ID: this.userdata.profile.userid,
          AddDoc_id: docid,
        };
     
      this.http.post(URL+'/Acknowlwdgedata/GetAcknowlwdgedataDatabyid', payload1,{headers})
      .subscribe((data:any)=>{
  
        if (Array.isArray(data) && data.length > 0) {
          // Data is an array and has at least one element
          const PubList = data[0]; // Access the first element of the array
          //console.log(JSON.stringify(data))
          // Now, you can access properties of the firstItem object
          if(PubList.doc_Confidentiality == "Confidential" )
          {
            this.generateOtp();
  
          }

          else{
            
            this.visibleStepper = true;
          }
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
          this.classification = PubList.natureOf_Doc_Name || "None";
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
          this.isFavorite = (PubList.favorite);
          this.getDocVersions();
          this.getPermissionRights(() => {
          this.retrieveFiles(this.selectedValue);
          this.getLinkedDocuments();
          });
          
          
          //this.isFavorite = (PubList.Favorite);
         // alert("Favorite: " + this.isFavorite);
        }
         else {
          // Data is either not an array or it's empty
          // Handle this case as needed
        }
        
      })
     }
  
    SubmitUpdateForm()
    {
      
     // alert("how are you");
  const obj=this.UpdateForm.value;
  this.http.post(URL+'/AddDocument/UpdatePublishedDocData',obj).subscribe((data:any)=>{
    alert ("Updated Data Successfully")
  })
  
    }
    // this.getVersions(addDocId, documentId).subscribe(data => {
    //   this.versions = data;
    //   this.updateForms = this.versions.map(version => this.createForm(version));
    // });
    getDocVersions(): void {
      this.isLoading = true;
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
          },
          complete: () => {
            this.isLoading = false; // Stop loading spinner
          }
        });
    }
    createForm(version: VersionDetail): FormGroup {
      return this.fb.group({
        VersionChange: [{ value: version.versionControlNo, disabled: true }],
        Version_DATE: [{ value: this.getFormattedDate(version.docRevMapCreatedDate), disabled: true }]
      });
    }
    getPermissionRights(callback: () => void): void {
      this.isLoading = true;
      let params = new HttpParams()
        .set('AddDocId', this.selectedValue)
        .set('document_Id', this.UpdateForm.get("documentID")?.value)
        .set('userID', this.userdata.profile.userid);
    
      this.http.get<any>(URL + '/Acknowlwdgedata/GetPermissionRights/', { headers, params })
        .subscribe({
          next: (res) => {
            if (res && res.permissionRightsIds && res.permissionNames) {
              // Extract IDs and Names
              const permissionsIds = res.permissionRightsIds;  // Assuming this is an array of IDs
              const permissionsNames = res.permissionNames;    // Assuming this is an array of names
    
              // Convert arrays to comma-separated strings
              const permissionsStringIds = permissionsIds.join(',');
              const permissionsStringNames = permissionsNames.join(',');
              this.permissionsArrayIds = permissionsStringIds.split(',');
              this.permissionsArray = permissionsStringNames.split(',');
              // Set the form control value
              this.PermissionForm.controls['Permissiontype'].setValue(permissionsStringNames);
    
              // Optionally, handle IDs as needed
              // this.handlePermissionIds(permissionsIds); // Add your custom logic here
    
              // Call the callback function to continue
              if (callback) {
                callback();
              }
            } else {
              console.error('Unexpected API response structure:', res);
            }
          },
          error: (err) => {
            console.error('Error fetching Permission Rights:', err);
          },
          complete: () => {
            this.isLoading = false; // Stop loading spinner
          }
        });
    }
  
  getAuthorityType(){
    this.http.get(URL+'/AuthorityTypeMaster/GetAuthorityTypeMasterDetails').subscribe((data:any)=>{
      this.AuthorityTypeArray=data;
      
    })
  
  }
  getAuthorityNamebyId(id:any){
    
    //console.log('Selected authorityTypeID:', id.value);
  
    this.authorityTypeID=id;
   
    if (this.authorityTypeID) { 
      this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.authorityTypeID).subscribe((data: any) => {
        this.AuthorityName = data;
      });
    } else {
      //alert('docTypeID is null or undefined'); // Add some error handling
    }
  }
  
  getNatureOfDocument(){
    this.http.get(URL+'/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data:any)=>{
      this.NatureOfDocument=data;
      
    })
  
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
  
    // Split the date and time
    const dateParts = dateString.split(' ')[0].split('/');
    if (dateParts.length !== 3) {
      return 'None'; // Return 'None' if the format is not as expected
    }
  
    const day = dateParts[1].padStart(2, '0'); // Corrected to get the correct day
    const monthIndex = parseInt(dateParts[0], 10) - 1; // Months are zero-based in JavaScript Date
    const year = dateParts[2];
  
    // Month names array
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = months[monthIndex];
  
    return `${day}/${month}/${year}`; // Return in "YYYY/Mon/DD" format
  }
  
  
  updateStatus(data:any) {
  
   ////console.log("testupdtae",this.selectedValue)
     this.http.put(URL+ '/Acknowledgedata/UpdateDocStatus/'+this.selectedValue,{headers})
    .subscribe(
      response => {
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  
  
  selectDoc(event: any){
  
    ////console.log('Selected:', event.value);
  
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
  
  
  selectProcessOwner(event: any){
  
    //console.log('Selected process owner:', event.value);
  
    if (event.value === 2) {
       ////console.log("if 2");
      // this.General = true;
  
      // this.confidential=false;
  
      this.TextBox=true;
      this.DropdownBox=false;
  
    }
  
    else  {
    ////console.log("else 1");
      this.TextBox=false;
      this.DropdownBox=true;
  
      // this.General = false;
  
      // this.confidential=true;
  
    }
  
  }
  
  selectdocApprover(event: any){
  
    //console.log('Selected:', event.value);
  
    if (event.value === 1) {
  
      // this.General = true;
  
      // this.confidential=false;
  
      this.TextBox2=false;
      this.DropdownBox2=true;
     this.gridBoxValue1=[];
  
    }
  
    else {
  
      this.TextBox2=true;
      this.DropdownBox2=false;
  
      // this.General = false;
  
      // this.confidential=true;
  
    }
  
  }
  
  
  onGridBoxOptionChanged(e: { name: string; }) {
  
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
  
  
  onCheckboxChange() {
    //console.log('Checkbox checked status:', this.isFavorite);
  }
  
  ondoclinkChange(event:any) {
   //console.log('Checkbox for Document Linking changed:', event.target.checked);
    this.isdoclinkpanelVisible = event.target.checked;
  }
    
  
  
  
  
  SelectFrequencyPeriod(event: any){
  
    //console.log('Selected:', event.value);
  
    
  
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
  
  changeTimePeriod(event:any)  {
  
    //console.log('Selected Time period',event.value);
  
   }
  
   retrieveFiles(event: any): void {
    this.isLoading = true; // Start loading spinner
  this.application = "GRMA"
    const params = new HttpParams()
      .set('AddDoc_id', this.selectedValue)
      .set('user_id', this.user_id)
      .set('application', this.application)
      .set('name', this.firstName)
      .set('department', this.departmentName)
      .set('doc_classification', this.classification);
  
    this.InspectionservicesService.getFile(
      `${URL}/DocRepository/GetDocRepositoryDetails`, 
      { headers, params }
    ).subscribe({
      next: (data: Document[]) => {
        this.files = data;
        this.publishedFiles = this.files
          .filter(file => file.fileCategory === 'Published')
          .flatMap(file => [
            {
              ...file,
              filePath: file.watermarkedFilePath,
              document_Name: file.document_Name + ' Document with Watermark',
              isWatermarked: true,
              canDownload: this.permissionsArrayIds.includes('8'),
              canView: this.permissionsArrayIds.includes('9'),
            },
            {
              ...file,
              filePath: file.filePath,
              document_Name: file.document_Name + ' Document without Watermark',
              isWatermarked: false,
              canDownload: this.permissionsArrayIds.includes('1'),
              //canView: this.permissionsArrayIds.includes('0'),
            }
          ]);
        this.supportedFiles = this.files.filter(file => file.fileCategory === 'Support');
        
        if (this.publishedFiles.length > 0) {
          //console.log("published files",JSON.stringify(this.publishedFiles))
          this.onFileSelected(this.publishedFiles[0]);
        }
  
        // Check permissions for each file
        this.files.forEach(file => {
          if (file.fileCategory === 'Support') {
            this.canDownloadSupportDoc = this.permissionsArrayIds.includes('2');
          }
        });
      },
      error: (error) => {
        console.error('Error retrieving files:', error);
      },
      complete: () => {
        this.isLoading = false; // Stop loading spinner
      }
    });
  }
  
  
  
  
  
  
  retrieveFiles1(event:any): void {
      this.application = "GRMA";
      const params = new HttpParams()
      .set('AddDoc_id', this.selectedValue)
      .set('user_id', this.user_id)
      .set('application', this.application)
      .set('name', this.firstName)
      .set('department', this.departmentName)
      .set('doc_classification', this.classification);
      this.InspectionservicesService.getFile(`${URL}/DocRepository/GetDocRepositoryDetails`, {headers, params })
      .subscribe(
          (data: Document[]) => {
            this.files = data;
            this.publishedFiles = this.files.filter(file => file.fileCategory === 'Published') 
             .flatMap(file => [
              {
                ...file, 
                filePath: file.filePath, 
                document_Name: file.document_Name + ' Document with out Watermark', 
                isWatermarked: false,
                canDownload: this.permissionsArrayIds.includes('1'), 
                //canView: this.permissionsArrayIds.includes('0') 
           
              },
              {
                ...file, 
                filePath: file.watermarkedFilePath, 
                document_Name: file.document_Name + ' Document with Watermark', 
                isWatermarked: true,
                canDownload: this.permissionsArrayIds.includes('8'), 
                canView: this.permissionsArrayIds.includes('9')
              }
            ]);
            this.supportedFiles = this.files.filter(file => file.fileCategory === 'Support'); 
           // //console.log(JSON.stringify(this.publishedFiles));
            if (this.publishedFiles.length > 0  ) {
              //console.log("etrive files" ,  JSON.stringify(this.publishedFiles))
              this.onFileSelected(this.publishedFiles[0]);
            }
          // Check permissions for each file and set the flags   
          this.files.forEach(file => {
            if (file.fileCategory === 'Published') {
             //this.mainDocUrl = file.filePath;
              // this.canDownloadMainDoc = this.permissionsArrayIds.includes('1');
              // this.canViewDocument   = this.permissionsArrayIds.includes('3');
              // this.canDownloadWaterDoc = this.permissionsArrayIds.includes('8');
              // this.canViewWaterDoc   = this.permissionsArrayIds.includes('9');
            } 
             if (file.fileCategory === 'Support') {
              //this.supportDocUrl = file.filePath;
              this.canDownloadSupportDoc   = this.permissionsArrayIds.includes('2');
            }
          });
          },
          (error: any) => {
            console.error('There was an error!', error);
          }
        );
    }
  
  getLinkedDocuments() {
    this.isLoading = true;
    let params = new HttpParams()
      .set('AddDocId', this.selectedValue) // Set AddDocId parameter
      .set('document_Id', this.UpdateForm.get("documentID")?.value); // Set document_Id parameter
    
    // Make the HTTP GET request to the API
    this.http.get<any>(`${URL}/DocRepository/GetLinkedDocuments/`, { headers, params })
      .subscribe({
        next: (response) => {
          // Handle the successful response from the API
          if (response && response.length > 0) {
            ////console.log('Linked Documents:', response);
            
            // Iterate over the linked documents and file paths
            response.forEach((doc: any) => {
              ////console.log(`Document Name: ${doc.documentName}, File Path: ${doc.filePath}`);
              //alert(JSON.stringify(response))
              this.LinkedFiles = response;
            });
            
            // Process the response as needed for the application (e.g., update UI)
          } else {
            //console.log('No linked documents found');
          }
        },
        error: (err) => {
          // Handle the error case when the API call fails
          console.error('Error fetching linked documents:', err);
        },
        complete: () => {
          this.isLoading = false; // Stop loading spinner
        }
      });
  }
  e(event: any) {
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
  
    handleError() {
      this.canViewDocument = false; // This will show the no-access message
      this.isLoading = false; // Hide the loading panel in case of an error
      console.error('Error loading document.');
    }

    contentLoaded() {
      this.isLoading = false; 
    }
  
    
    onLinkedFileSelected(file: LinkedDocument): void {
      //console.log("File selected: ", file);
      this.fileselection=true;
    const filePath = file.filePath.replace(/\\/g, '/'); 
    this.pdfSrc = `${filePath}`;
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/gview?embedded=true&url=' + this.pdfSrc
    );
   // //console.log(`File selected: ${this.pdfSrc}`);
    //this.selecteddoc=file;
    this.selectedFileName = file.documentName;
    this.canViewDocument = this.permissionsArrayIds.includes('7');
    //  if(file.fileCategory == "Support"){
    //   this.canViewDocument = this.permissionsArrayIds.includes('4');
    // }
    }

    onFileSelected(file: Document): void {
      ////console.log("File selected: ", file);
      this.isLoading = true; 
      setTimeout(() => {
      this.fileselection=true;
  var filePath: any;
  this.selecteddoc=file;
  this.selectedFileName = file.document_Name;

  if(file.fileCategory == "Published" && file.isWatermarked == true){
    filePath = file.watermarkedFilePath.replace(/\\/g, '/'); 
    this.canViewDocument = file.canView;
    this.isLoading = false;
  }
  if(file.fileCategory == "Published" && file.isWatermarked == false){
     filePath = file.filePath.replace(/\\/g, '/'); 
    this.canViewDocument = file.canView;
    this.isLoading = false;
  }
   if(file.fileCategory == "Support"){
    this.canViewDocument = this.permissionsArrayIds.includes('0');
    this.isLoading = false;
  }
  this.pdfSrc = `${filePath}`;
  //this.isLoading = false;
  //alert(JSON.stringify(this.pdfSrc))
    }, 1500);
  }

    download(file: any, event: Event): void {
      const apiUrl = `${URL}/actdownload/actDownLoadFiles?filePath=${file.filePath}`;
    
      this.http.get(apiUrl, { responseType: 'blob' }).pipe(
        catchError((error: any) => {
          console.error('Error occurred while downloading file:', error);
          return throwError('Something went wrong in file download. Please try again later.');
        })
      ).subscribe((res: Blob) => {
    //console.log(res)
        
       const filenameFromUrl = this.extractFilenameFromUrl(file.filePath);
    
        // Create a blob URL to trigger the download
        const blob = new Blob([res], { type: file.document_Name });
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
    extractFilenameFromUrl(url: string): string {
      // Extract the filename part from the URL
      const parts = url.split('/');
      return parts[parts.length - 1];
    }

  }

  interface Document {
    documentRepID: number;
    addDoc_id: number;
    fileCategory: string;
    document_Name: string;
    filePath: string;
    watermarkedFilePath: string;
    status: string;
    isWatermarked:boolean;
    canDownload: boolean;
    canView:boolean;
    documentrepository_createdDate: string;
  }
interface LinkedDocument {
  documentName: string;
  filePath: string;
}
interface VersionDetail {
  versionControlNo: string;
  docRevMapCreatedDate: string; // Ensure this is a string
}

// Add any additional logic you need when the selection changes
