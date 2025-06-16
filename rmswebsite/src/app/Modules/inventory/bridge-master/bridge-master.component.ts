import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';


import { UpdateAddDocument,RepositoryFiles} from 'src/app/inspectionservices.service';
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
import { InspectionservicesService,Document} from 'src/app/inspectionservices.service';


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
import { lastValueFrom } from 'rxjs';
import { Component,OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';


export interface Tag  {
  name: string;
}
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-bridge-master',
  templateUrl: './bridge-master.component.html',
  styleUrls: ['./bridge-master.component.scss'],
  // imports: [MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule],
})

export class                                                                                                                                                                                                                                                                                                                                          
BridgeMasterComponent  {
  @ViewChild('Obj_Doc') textarea!: ElementRef;
  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;
  @ViewChild('buttontoclick') buttontoclick!: ElementRef;

  forminvalidfields:string[]=[];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  tags: Tag[] = [];
  //dialog: any;
  erroMessage: any;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.form2.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
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
      this.form2.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
    }
    // Clear the input field explicitly
    this.chipListInput.nativeElement.value = '';
  }
  adddocidpkid:number=0;

  Check_Doc_Rev_Freq:any;
Check_Doc_Link:any;
  maxSize: number = 5 ;
  maxDocuments: number = 4;  // Default value
  maxSizeInMB: number = 5; 
  loadingConfig: boolean = true;
  isMainFileUploaded = false;
  //selectedFiles: File[] = [];
  selectedFiles: any[] = [];
  //mainFile: File | null = null;
  mainFile: any | null = null;
  errorMessages: any;
  allowedFileTypes: string = '';
  mainErrorMessage: string = '';
  FileTypes: string = '';
  processOwner:any;
  docApprover :any;
  DocumentID :any;
  data = [
    { id: 1 },
    { id: 2 },
    // Add more rows as needed
  ];
  minDate = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
  files: Document[] = [];
  DocumentSubCategoryData:any;
  DocumentCategoryData:any;
  DocumentfilesData:any;
  SelectedCategory:any;
  SelectedSubCategory:any;
  gridDataSource:any;
  publDoc:any;
  selectedValue:any;
  visibleStepper:any;
  AddDocId:any;
  Userinfo:any;
  gridBoxValue1: number[] = [];
  gridBoxValue: number[] = [];
  isUserBoxOpened:boolean;
  isUserBoxOpened1:boolean;
  isGridBoxOpened : boolean;
  isPanelVisible: boolean = false;
  isdoclinkpanelVisible:boolean=false;
  TextBox1=true;
  selectedOption:any[] = [];
  SelectedOption:any;
  SelectedAuthType:any;
  AuthorityNameData:any;
  AddDocumentinfo:UpdateAddDocument=new UpdateAddDocument();
  DocfileInfo:RepositoryFiles=new RepositoryFiles();
  //UpdateForm :FormGroup;
DocTypeArray :any[]=[];
docTypeID:any;
DocCategory:any;
authoritynameID:any;
doc_CategoryID:any;
DocSubCat:any[]=[];
doc_SubCategoryID:any;
isStep1Completed:boolean=false;
isStep2Completed:boolean=false;
isStep3Completed:boolean=false;
isStep4Completed:boolean=false;
BackButton:boolean=false;
NextButton:boolean=true;

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
  TextBox=true;
  DropdownBox=false;
  public selectedprocessownerType: number | undefined;
  public selecteddocapproverType: number | undefined;
  public processowner: any[] = [
    { id: 1, name: 'Select from User List' },
    { id: 2, name: 'Enter Name as Text' }
  ];
 
  public docapprover: any[] = [
    { id: 1, name: 'Select from User List' },
    { id: 2, name: 'Enter Name as Text' }
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
  form1: any;
  form2: any;
  form3: any;
  form4: any;
  formupdate:any;
  userdata: any = [];


  
  TextBox2=true;
  DropdownBox2=false;

  gridColumns:any=[ 
    {
    dataField: 'title_Doc',
    caption: 'Document Name'
        },
         'docTypeName','doc_CategoryName','doc_SubCategoryName',
           'eff_Date','keywords_tags','authorityTypeName','authorityName','Document_Classification']

 

           gridList(addDoc_id:any) {
            return addDoc_id && `${addDoc_id.title_Doc} , ${addDoc_id.docTypeName} , ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} ,  `;
          }

 
           gridBox_displayExpr(usR_ID:any) {
            if (usR_ID) {
              this.processOwner = usR_ID.firstname;
              
              localStorage.setItem('processOwner', this.processOwner);
              console.log("PROCESSOWNERGRIDBOX",JSON.stringify(localStorage.getItem('processOwner')))
              return usR_ID.firstname && `${usR_ID.firstname} , ${usR_ID.department_Master_name}`;
            }
            
          }
          publiDocColumns: any = ['document_Id', 'title_Doc','versionControlNo'];
          
          gridBox_displayExpr1(ID:any) {
            return ID && `${ID.document_Id} `;
          }
  ngOnInit(): void {
   
    this.selectedprocessownerType=2;
    this.selecteddocapproverType=2;
    localStorage.removeItem('processOwner');
    this.processOwner = null;

    localStorage.removeItem('docApprover');
    this.docApprover = null;
    this.onChanges();
   

    this.form2.get('effDate')?.valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('effDate', value);
    });
  
    this.form2.get('initialCreationDate')?.valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('initialCreationDate', value);
    });
    this.form2.get('dateOfDocApprovel')?.valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('dateOfDocApprovel', value);
    });
    this.form2.get('docLastRevDate')?.valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('docLastRevDate', value);
    });
    this.form3.get('review_start_Date')?.valueChanges.subscribe((value:any) => {
      this.updateFormattedDate1('review_start_Date', value);
    });
    this.form1.valueChanges.subscribe((val: any) => console.log("Form1 values:", val));
    this.form2.valueChanges.subscribe((val: any) => console.log("Form2 values:", val));
    this.form3.valueChanges.subscribe((val: any) => console.log("Form3 values:", val));
    //this.UpdateForm.valueChanges.subscribe((val: any) => console.log("DraftForm values:", val));
   
  }





  constructor(private InspectionservicesService: InspectionservicesService,private http: HttpClient, private ref: ChangeDetectorRef, private zone: NgZone,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
  
    private report: ReportService,
    private formBuilder: FormBuilder,
    private dialog:MatDialog)
     {
      let user:any=this.session.getUser();
      this.userdata=JSON.parse(user);
      this.isUserBoxOpened1=false;
      this.isGridBoxOpened = false;
      this.isUserBoxOpened=false;
      
      this.getDocType();
    this.getNatureOfDocument();
   this.getAuthorityType();
   


   this.form1 = this.formBuilder.group({
    documenttype: ['', Validators.required],
    docCategory: ['', Validators.required],
    docsubCat: ['', Validators.required],
    doctitle: ['' , Validators.required],
    subtitle: [''],
    objective:['', Validators.required],
    
   
  });
  this.form2 = this.formBuilder.group({
    docConfidentiality:['', Validators.required],
    effDate:['', Validators.required],
    OtpMethod: [''],
        
   initialCreationDate: [''],
    docIntNum: [''],
   docIntVerNum: ['' ],
   docPhyValLoc: [''],
   docProcOwner: [''],
     docApprover: [''],
     dateOfDocApprovel: [''],
    docLastRevDate: [''],
    pubAutType: ['', Validators.required],
    NameOfAuth: ['', Validators.required],
    NatureOfDoc: ['', Validators.required],
 
    Keywords: [''],
   
  });
  this.form3 = this.formBuilder.group({
   
    publishercomments: [''],
    indicativereadingtime: ['', Validators.required],
    timeperiod:  ['', Validators.required],
    freq_period_type:  [''],
    review_start_Date:  [''],
    freq_period:  [''],
    pubdoc: [''],
    Review_Frequency_Status: [0], 
    Doc_Linking_Status: [0], 
  });

this.gridDataSource={
  paginate: true,
  store: new CustomStore({
      key: 'addDoc_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SavedDraftDocument/GetDraftData', {headers})  
          .subscribe(res => {
           (resolve(res));
          // alert(JSON.stringify(res))
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
 

  
  }
 

  getDocType(){
    this.http.get(URL+'/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data:any)=>{
      this.DocTypeArray=data;
      
    })

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
  getDocTypes(event: any) {
    this.SelectedCategory=null; 
     
    console.log("selected Type id: ", event.value);
    this.docTypeID = event.value;
    this.SelectedSubCategory=null; 
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



   
  getDocFiles(event: any) {
    this.SelectedCategory=null; 
     
    console.log("selected Type id: ", event.value);
    this.selectedValue=event.value;
   
   
    this.DocumentfilesData={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + 'api/DocRepository/GetDocRepositoryDetails/'+this.docTypeID, {headers})
              .subscribe((data: any) => {
                      this.DocfileInfo = data;
                    
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
   }


  // getDocCategorybyId(id:any){
  // this.SelectedCategory=null;
  //   console.log('Selected docTypeID:', id.value);
 
  //   this.docTypeID=id;
   
  //   if (this.docTypeID) { 
  //     this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID?DocTypeID=' + this.docTypeID).subscribe((data: any) => {
  //       this.DocCategory = data;
  //     });
  //   } else {
  //     //alert('docTypeID is null or undefined'); // Add some error handling
  //   }
  // }
  getsubDocTypes(event: any) {
    this.SelectedSubCategory=null; 
    console.log("selected Type id: ", event.value);
    this.doc_CategoryID = event.value;
    
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

  // getDocSubCategorybyId(id:any){
  //  this.SelectedSubCategory=null;

  //    console.log('Selected docTypeID:', id.value);
  
  //    this.doc_CategoryID=id;
  //    if (this.doc_CategoryID) { 
      
      
  //      this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId?Doc_CategoryID=' + this.doc_CategoryID).subscribe((data: any) => {
  //        this.DocSubCat = data;
        
  //      });
  //    } else {
  //      alert('docCat is null or undefined'); // Add some error handling
  //    }
  //  }

  // retrieveFiles(event:any): void {
   
  //   this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/'+ this.selectedValue)
  //     .subscribe(
  //       (data: Document[]) => {
  //         this.files = data;
  //         alert(JSON.stringify(this.files))

  //         this.files.forEach((file:any)=>{
  //             if(file.fileCategory=="Main"){
                  
  //               const fetchUrl = file.filePath; // The URL to the main file
  //               alert(fetchUrl);
  //               this.mainFile = {'name':file.document_Name};
  //               this.isMainFileUploaded = true;
  //             }
  //             else{
  //               this.selectedFiles.push({'name':file.document_Name});
  //             }
  //         });
  //         console.log(this.files)
  //       },
  //       (error: any) => {
  //         console.error('There was an error!', error);
  //       }
  //     );
  // }

  retrieveFiles(event: any): void {
    this.mainFile = null;
    this.selectedFiles.splice(0,this.selectedFiles.length);
                  this.isMainFileUploaded = false;
    this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/' + this.selectedValue)
      .subscribe(
        (data: Document[]) => {
          this.files = data;
          //alert(JSON.stringify(this.files));
  
          this.files.forEach((file: any) => {
            if (file.fileCategory == "Main") {
              const fetchUrl = file.filePath; // The URL to the main file
             // alert(fetchUrl);
  
              // Fetch the file using fetch API
              fetch(fetchUrl)
                .then(response => response.blob())
                .then(blob => {
                  this.mainFile = new File([blob], file.document_Name);
                  this.isMainFileUploaded = true;
                })
                .catch(error => {
                  console.error('Error fetching the main file:', error);
                });
            } else {
              // Fetch and convert each selected file to a File object
              fetch(file.filePath)
                .then(response => response.blob())
                .then(blob => {
                  const selectedFile = new File([blob], file.document_Name);
                  this.selectedFiles.push(selectedFile);
                })
                .catch(error => {
                  console.error('Error fetching a selected file:', error);
                });
            }
          });
          console.log(this.files);
        },
        (error: any) => {
          console.error('There was an error!', error);
        }
      );
  }
  
  

   getUpdateFormData(event:any){
   //alert(0)
    this.visibleStepper=true;
    this.isGridBoxOpened = false;
    
    console.log("selected Type id: ", event.value);
   
      this.selectedValue=event.value; 
      this.retrieveFiles( this.selectedValue);
    this.http.get(URL+'/SavedDraftDocument/GetPublishedDatabyid/'+this.selectedValue).subscribe((data:any)=>{

 
      if (Array.isArray(data) && data.length > 0) {
        // Data is an array and has at least one element
        const PubList = data[0]; // Access the first element of the array
        //alert (JSON.stringify(PubList))
        this.Check_Doc_Rev_Freq=PubList.review_Frequency_Status;
        this.Check_Doc_Link=PubList.doc_Linking_Status;

        let typeid=PubList.docTypeID;
        let AuthNameid=PubList.authorityTypeID;
        let docCatId=PubList.doc_CategoryID;
        this.DocCategory = this.makeAsyncDataSource(this.http,typeid);
        this.DocumentID =PubList.document_Id;
         
      this.DocCategory.load().then((data: any) => {    
        this.zone.run(() => {
        this.form1.controls['docCategory'].setValue(PubList.doc_CategoryID);
        this.ref.detectChanges();
      });
     
     });
     //alert(PubList.doc_SubCategoryID)
     this.doc_SubCategoryID = this.makeAsyncDataSource1(this.http,docCatId);
     this.doc_SubCategoryID.load().then((data: any) => {
     this.zone.run(() => {
     this.form1.controls['docsubCat'].setValue(PubList.doc_SubCategoryID);
      this.ref.detectChanges();
    });
   
   });


        this.form1.controls['documenttype'].setValue(PubList.docTypeID);
        this.form1.controls['doctitle'].setValue(PubList.title_Doc);
        this.form1.controls['subtitle'].setValue(PubList.sub_title_doc);
        this.form1.controls['objective'].setValue(PubList.obj_Doc);    
        this.form2.controls['docConfidentiality'].setValue(PubList.doc_Confidentiality);
      
        if (PubList.doc_Confidentiality=='Confidential') {
          // alert(versionChange.doc_Confidentiality)
           this.phoneno=true;
         //  this.form.get('OtpMethod')?.setValue("N/A");
   
         // Setting the form control
         } else {
           this.phoneno=false;
         }
         
         this.form2.controls['OtpMethod'].setValue(PubList.otpMethod);
         let effdate=PubList.eff_Date;
         if(PubList.eff_Date ==""){
     //  alert("vishnu")
        this.form2.controls['effDate'].setValue(null);
         }
         else{
         
          //  let formattedeffDate= this.getFormattedDate(effdate);
            this.form2.controls['effDate'].setValue(effdate);
         }
         let initial_creation_doc_date=PubList.initial_creation_doc_date;
         if(PubList.initial_creation_doc_date==""){
      
          
           this.form2.controls['initialCreationDate'].setValue(null);
         }else
         {
        
       //  let formattedDate= this.getFormattedDate(initial_creation_doc_date);
        this.form2.controls['initialCreationDate'].setValue(initial_creation_doc_date);
         }
         
        this.form2.controls['docIntNum'].setValue(PubList.doc_internal_num);
        this.form2.controls['docIntVerNum'].setValue(PubList.doc_Inter_ver_num);
        this.form2.controls['docPhyValLoc'].setValue(PubList.doc_Phy_Valut_Loc);
        localStorage.setItem('processOwner',PubList.doc_process_Owner);
        this.form2.controls['docProcOwner'].setValue(PubList.doc_process_Owner);
        this.form2.controls['docApprover'].setValue(PubList.doc_Approver);
        
        let Approvaldate=PubList.date_Doc_Approver;
      //  let formattedApprovalDate= this.getFormattedDate(Approvaldate);
      if(PubList.date_Doc_Approver=="")
      {
        this.form2.controls['dateOfDocApprovel'].setValue(null);
      }
      else{
        this.form2.controls['dateOfDocApprovel'].setValue(Approvaldate);
      }
       
        let LastRevdate=PubList.date_Doc_Revision;

        if(PubList.date_Doc_Revision=="")
        {
          this.form2.controls['docLastRevDate'].setValue(null);
        }
        else{
            //   let formattedLastRevDate= this.getFormattedDate(LastRevdate);
          this.form2.controls['docLastRevDate'].setValue(LastRevdate);
        }
   
        

        this.form2.controls['pubAutType'].setValue((PubList.authorityTypeID!='0')?PubList.authorityTypeID:'');

       // this.form2.controls['pubAutType'].setValue(PubList.authorityTypeID);

        this.authoritynameID = this.makeAsyncDataSource1(this.http,AuthNameid);
        this.authoritynameID.load().then((data: any) => {
          
         this.zone.run(() => {
          this.form2.controls['NameOfAuth'].setValue((PubList.authoritynameID!='0')?PubList.authoritynameID:'');
          //this.form2.controls['NameOfAuth'].setValue(PubList.authoritynameID);      
         this.ref.detectChanges();
       });
      
      });
//alert(PubList.natureOf_Doc_id)
        this.form2.controls['NatureOfDoc'].setValue((PubList.natureOf_Doc_id!='0')?PubList.natureOf_Doc_id:'');
         
        //this.form2.controls['NatureOfDoc'].setValue(PubList.natureOf_Doc_id);
        //this.UpdateForm.controls['Keywords'].setValue(PubList.keywords_tags);
        if (PubList.keywords_tags) {
          const keywordsArray = PubList.keywords_tags.split(',');
          this.tags = keywordsArray.map((keyword: string) => ({ name: keyword.trim() }));
        this.form2.controls['Keywords'].setValue(this.tags.map(tag => tag.name)); // Setting the form control
        } else {
          this.form2.controls['Keywords'].setValue(['']); // Set to an empty array if no keywords
        }
       // this.UpdateForm.controls['freqperiodtype'].setValue(PubList.freq_period);
        // this.UpdateForm.controls['pubdoc'].setValue(PubList.pub_doc);
       
        // this.UpdateForm.controls['freq_period_type'].setValue(PubList.freq_period_type);
        // this.UpdateForm.controls['freq_period'].setValue(PubList.freq_period);
        // let reviewStartdate=PubList.review_start_Date;
        // let formattedReviewDate= this.getFormattedDate(reviewStartdate);
        // this.UpdateForm.controls['review_start_Date'].setValue(formattedReviewDate);

        if(this.Check_Doc_Rev_Freq==1){
           this.isPanelVisible=true;
           this.form3.controls['freq_period_type'].setValue(PubList.freq_period_type);
           this.form3.controls['freq_period'].setValue(PubList.freq_period);
           let reviewStartdate=PubList.review_start_Date;
          this.form3.controls['review_start_Date'].setValue(reviewStartdate);
         
         }
         else{
           this.isPanelVisible=false;
          // this.form3.controls['review_start_Date'].setValue(null);
             }
         if(this.Check_Doc_Link==1){
        ;
         this.isdoclinkpanelVisible=true;
         const pubDocString = PubList.pub_doc;
 if (pubDocString) {
   const pubDocArray = pubDocString.split(','); // Split string into array
   const pubDocNumberArray = pubDocArray.map((id:any) => Number(id));
   this.SelectedOption = pubDocNumberArray;
 } else {
  
   this.SelectedOption = [];
 }
 
         }
         else{
           this.isdoclinkpanelVisible=false;
         }


        this.form3.controls['publishercomments'].setValue(PubList.publisher_comments);
        this.form3.controls['indicativereadingtime'].setValue(PubList.indicative_reading_time);
        this.form3.controls['timeperiod'].setValue(PubList.time_period);

       
//alert(JSON.stringify(this.UpdateForm.value));
      } else {
       
      }
      

      setTimeout(() => this.resize(), 0);

    })
   }
  

  //   getFormattedDate(dateString: string): string {
  //   // Parse the date string into a JavaScript Date object
  //   const date = new Date(dateString);
  
  //   // Format the date to 'yyyy-MM-dd'
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  
  //   return `${year}-${month}-${day}`;
  // }
  
  
   makeAsyncDataSource(http:HttpClient,doctypeid:any) {
  
    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_CategoryID',
      load() {
        return lastValueFrom(http.get(URL+'/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID?DocTypeID=' +doctypeid, { headers }));
      },
    });
  }

  makeAsyncDataSource1(http:HttpClient,doc_CategoryID:any) {
  
    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_SubCategoryID',
      load() {
        return lastValueFrom(http.get(URL+'/DocSubCategory/GetDocSubCategoryModelDetailsbyId?Doc_CategoryID=' +doc_CategoryID, { headers }));
      },
    });
  }
  onChanges(): void {
  
    this.form2.get('effDate')?.valueChanges.subscribe((val: string | number | Date) => {
      const initialDateControl = this.form2.get('initialCreationDate');
       
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
      const approvalDateControl = this.form2.get('dateOfDocApprovel');
      if (approvalDateControl && approvalDateControl.value && new Date(approvalDateControl.value) > new Date(val)) {
        approvalDateControl.setValue('');
      }
  
      // Update Document Last Revision Date if it's later than the new Effective Date
      const revisionDateControl = this.form2.get('docLastRevDate');
      if (revisionDateControl && revisionDateControl.value && new Date(revisionDateControl.value) > new Date(val)) {
        revisionDateControl.setValue('');
      }
  
    });
  }
  SubmitUpdateForm(data:any={})
  {
    const processOwner = localStorage.getItem('processOwner');
    const docApprover = localStorage.getItem('docApprover');
     this.forminvalidfields=[]

     if(this.form1.invalid || this.form2.invalid ||this.form3.invalid){

      let invalidFields: any[] = [];

      // Process form1
      invalidFields = invalidFields.concat(
          Object.keys(this.form1.controls)
          .filter(key => this.form1.get(key).invalid)
          .map(key => {
                  switch(key) {
                  case 'documenttype': return 'Document Type';
                  case 'docCategory': return 'Document Category';
                  case 'docsubCat': return 'Document Sub Category';
                  case 'doctitle': return 'Title of Document';
                  case 'objective': return 'Objective of Document';
                  default: return key; 
              }
          })
      );
      
      // Process form2
     
      invalidFields = invalidFields.concat(
          Object.keys(this.form2.controls)
          .filter(key => this.form2.get(key).invalid)
          .map(key => {
         
            switch(key) {
              case 'docConfidentiality': return 'Document Confidentiality';
              case 'effDate': return 'Effective Date';
              case 'docProcOwner': return 'Document Process Owner';
              case 'pubAutType': return 'Authority Type';
              case 'NameOfAuth': return 'Name of Authority';
              case 'NatureOfDoc': return 'Nature of Document';
               default: return key; 
          }
          })
      );
      
      // Process form3
      invalidFields = invalidFields.concat(
          Object.keys(this.form3.controls)
          .filter(key => this.form3.get(key).invalid)
          .map(key => {
          

            switch(key) {
            
              case 'indicative_reading_time': return 'Indicative Reading Time';
              case 'timeperiod': return 'Time Period';
              default: return key; 
             
          }
          })
      );
       // If 'Doc_process_Owner' is invalid, add it to the list of invalid fields
    if (!processOwner || processOwner.trim() === '') {
      invalidFields.push('Document Process Owner');
    }
invalidFields=invalidFields.filter((item:string)=>item.trim()!='');
//alert(JSON.stringify(invalidFields))
this.forminvalidfields=invalidFields;
   
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

else
{
  

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
        if (file instanceof File) {
          formData.append('supportFiles', file, file.name);
        } else {
          console.error('Invalid file in selectedFiles:', file);
        }
      }
    }

   
 
  formData.append('AddDoc_id', this.selectedValue);
  //alert(this.selectedValue)
  formData.append('Document_Id', this.DocumentID);
  //alert(this.DocumentID)
  this.updateFormParameters(this.selectedValue);
  const userId = this.userdata.profile.userid;
  formData.append('USR_ID', userId);

  const userId2 = this.userdata.profile.userid;
  this.AddDocumentinfo.USR_ID= userId2;
  //alert(JSON.stringify(this.AddDocumentinfo))
  
  this.http.post(URL+'/SaveDraft/UpdateSaveDraftDetails',this.AddDocumentinfo,{headers}).subscribe((data:any)=>{  
    this.http.post(URL + '/AttributeSaveDraft/SaveDocument', formData)
    .subscribe(
      (response: any) => {
        this.adddocidpkid = parseInt(response);
        this.erroMessage ="Data SaveDraft Successfully"; 
           const dialogRef = this.dialog.open(DaidailogeComponent, {
          width: '400px',
          data: { message: this.erroMessage }
        });
         },
      (error: any) => {
        console.error('There was an error!', error);
      }
    );
    //alert ("Updated Data Successfully")
 this.gridDataSource={
  paginate: true,
  store: new CustomStore({
      key: 'addDoc_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SavedDraftDocument/GetDraftData', {headers})  
          .subscribe(res => {
           (resolve(res));
          // alert(JSON.stringify(res))
          }, (err) => {
            reject(err);
          });
    });
    },
  }),
};

   this.visibleStepper=false;
   });
  this.selectedValue=null;

 
  
}
     }
  
// alert(this.selectedValue)


  

updateFormParameters(AddDocId:any){
  let docid: number = parseInt(AddDocId);
 
  this.AddDocumentinfo.AddDoc_id=docid;
 // alert(AddDocId)

 //1st Stepper

    this.AddDocumentinfo.Title_Doc=this.form1.value.doctitle;   
    this.AddDocumentinfo.Sub_title_doc=this.form1.value.subtitle;   
    this.AddDocumentinfo.Obj_Doc=this.form1.value.objective;
    this.AddDocumentinfo.DocTypeID=this.form1.value.documenttype;
    this.AddDocumentinfo.Doc_CategoryID=this.form1.value.docCategory;
    this.AddDocumentinfo.Doc_SubCategoryID=this.form1.value.docsubCat;

    //2nd Stepper
  
   this.AddDocumentinfo.Doc_Confidentiality=this.form2.value.docConfidentiality;
//alert(this.form2.value.OtpMethod)
   this.AddDocumentinfo.OtpMethod=this.form2.value.OtpMethod;

     this.AddDocumentinfo.Eff_Date=this.form2.value.effDate;
     
    this.AddDocumentinfo.Initial_creation_doc_date=(this.form2.value.initialCreationDate!='')?this.form2.value.initialCreationDate:null;
    this.AddDocumentinfo.Doc_internal_num=this.form2.value.docIntNum;
    this.AddDocumentinfo.Doc_Inter_ver_num=this.form2.value.docIntVerNum;
    this.AddDocumentinfo.Doc_Phy_Valut_Loc=this.form2.value.docPhyValLoc;
    this.AddDocumentinfo.Doc_process_Owner=this.form2.value.docProcOwner;
    this.AddDocumentinfo.Doc_Approver=this.form2.value.docApprover;
    this.AddDocumentinfo.Date_Doc_Approver=(this.form2.value.dateOfDocApprovel!='')?this.form2.value.dateOfDocApprovel:null; 
    this.AddDocumentinfo.Date_Doc_Revision=(this.form2.value.docLastRevDate!='')?this.form2.value.docLastRevDate:null;
    this.AddDocumentinfo.AuthorityTypeID=this.form2.value.pubAutType;
    this.AddDocumentinfo.AuthoritynameID=this.form2.value.NameOfAuth;
    this.AddDocumentinfo.NatureOf_Doc_id=this.form2.value.NatureOfDoc;
    //this.AddDocumentinfo.Keywords_tags=this.UpdateForm.value.Keywords;

    const UpdateKeywords = this.form2.value.Keywords;
    
    if (Array.isArray(UpdateKeywords) && UpdateKeywords.length > 0) {
      this.AddDocumentinfo.Keywords_tags = UpdateKeywords.join(', ');
      // Additional code inside the condition if needed
    } else {
      // Handle the case where no value is selected (null or empty array)
      console.log('No key values');
    }
    
    //3rd Stepper
     if(this.isPanelVisible==true){
      
      this.AddDocumentinfo.Review_Frequency_Status=1;
      this.AddDocumentinfo.freq_period=this.form3.value.freq_period;
      this.AddDocumentinfo.freq_period_type=this.form3.value.freq_period_type;
      this.AddDocumentinfo.review_start_Date=this.form3.value.review_start_Date;
     }
     else{
      this.AddDocumentinfo.Review_Frequency_Status=0;
     }
    
     if (this.isdoclinkpanelVisible === true) {
      this.AddDocumentinfo.Doc_Linking_Status=1;
      const pubdocValue = this.form3.value.pubdoc;
    
      if (Array.isArray(pubdocValue) && pubdocValue.length > 0) {
        this.AddDocumentinfo.pub_doc = pubdocValue.join(', ');
        // Additional code inside the condition if needed
      } else {
        // Handle the case where no value is selected (null or empty array)
        console.log('No value selected for pubdoc');
      }
    }
    else{
      this.AddDocumentinfo.Doc_Linking_Status=0;
     }
       
    this.AddDocumentinfo.publisher_comments=this.form3.value.publishercomments;
    this.AddDocumentinfo.indicative_reading_time=parseInt(this.form3.value.indicativereadingtime);
    this.AddDocumentinfo.Time_period=this.form3.value.timeperiod;

    // this.AddDocumentinfo.freq_period=this.UpdateForm.value.freq_period;
    // this.AddDocumentinfo.freq_period_type=this.UpdateForm.value.freq_period_type;
    // this.AddDocumentinfo.review_start_Date=this.UpdateForm.value.review_start_Date;
    // this.AddDocumentinfo.pub_doc=this.UpdateForm.value.pubdoc;
    // this.AddDocumentinfo.publisher_comments=this.UpdateForm.value.publishercomments;
    // this.AddDocumentinfo.indicative_reading_time=this.UpdateForm.value.indicativereadingtime;
    // this.AddDocumentinfo.Time_period=this.UpdateForm.value.timeperiod;
 // console.log(JSON.stringify(this.AddDocumentinfo))

  }

  FormParameters2(AddDocId:any){
    let docid: number = parseInt(AddDocId);
    this.AddDocumentinfo.AddDoc_id=docid;
    //alert(AddDocId)
  
      this.AddDocumentinfo.Title_Doc=this.form1.value.doctitle;   
      this.AddDocumentinfo.Sub_title_doc=this.form1.value.subtitle;   
      this.AddDocumentinfo.Obj_Doc=this.form1.value.objective;
      this.AddDocumentinfo.DocTypeID=this.form1.value.documenttype;
      this.AddDocumentinfo.Doc_CategoryID=this.form1.value.docCategory;
      this.AddDocumentinfo.Doc_SubCategoryID=this.form1.value.docsubCat;
  
  
    }
    FormParameters3(AddDocId:any){
      let docid: number = parseInt(AddDocId);
      this.AddDocumentinfo.AddDoc_id=docid;
      //alert(AddDocId)
    
        this.AddDocumentinfo.Title_Doc=this.form1.value.doctitle;   
        this.AddDocumentinfo.Sub_title_doc=this.form1.value.subtitle;   
        this.AddDocumentinfo.Obj_Doc=this.form1.value.objective;
        this.AddDocumentinfo.DocTypeID=this.form1.value.documenttype;
        this.AddDocumentinfo.Doc_CategoryID=this.form1.value.docCategory;
        this.AddDocumentinfo.Doc_SubCategoryID=this.form1.value.docsubCat;
        this.AddDocumentinfo.Doc_Confidentiality=this.form2.value.docConfidentiality;
        
         this.AddDocumentinfo.OtpMethod=this.form2.value.OtpMethod;
        this.AddDocumentinfo.Eff_Date=this.form2.value.effDate;
       this.AddDocumentinfo.Initial_creation_doc_date=this.form2.value.initialCreationDate;
       this.AddDocumentinfo.Doc_internal_num=this.form2.value.docIntNum;
       this.AddDocumentinfo.Doc_Inter_ver_num=this.form2.value.docIntVerNum;
       this.AddDocumentinfo.Doc_Phy_Valut_Loc=this.form2.value.docPhyValLoc;
       
       this.AddDocumentinfo.Doc_process_Owner=this.form2.value.docProcOwner;
    
       this.AddDocumentinfo.Doc_Approver=this.form2.value.docApprover;
       this.AddDocumentinfo.Date_Doc_Approver=this.form2.value.dateOfDocApprovel; 
       this.AddDocumentinfo.Date_Doc_Revision=this.form2.value.docLastRevDate;
       this.AddDocumentinfo.AuthorityTypeID=this.form2.value.pubAutType;
       this.AddDocumentinfo.AuthoritynameID=this.form2.value.NameOfAuth;
       this.AddDocumentinfo.NatureOf_Doc_id=this.form2.value.NatureOfDoc;
       //this.AddDocumentinfo.Keywords_tags=this.UpdateForm.value.Keywords;
   
       const UpdateKeywords = this.form2.value.Keywords;
       
       if (Array.isArray(UpdateKeywords) && UpdateKeywords.length > 0) {
         this.AddDocumentinfo.Keywords_tags = UpdateKeywords.join(', ');
         // Additional code inside the condition if needed
       } else {
         // Handle the case where no value is selected (null or empty array)
         console.log('No key values');
       }
    
      }

getAuthorityType(){
  this.http.get(URL+'/AuthorityTypeMaster/GetAuthorityTypeMasterDetails').subscribe((data:any)=>{
    this.AuthorityTypeArray=data;
    
  })

}
getAuthorityNamebyId(id:any){
  
  console.log('Selected authorityTypeID:', id.value);

  this.authorityTypeID=id;
 
  if (this.authorityTypeID) { 
    this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.authorityTypeID).subscribe((data: any) => {
      this.AuthorityName = data;
    });
  } else {
    //alert('docTypeID is null or undefined'); // Add some error handling
  }
}
stepperNav1() {
  
  // if (this.form1.valid) {
  //   this.isStep1Completed=true;
  //   this.isStep2Completed=false;
  //   this.isStep3Completed=false;
  //   this.isStep4Completed=false;
   
  // }else{
  
  //   const invalidFields = [];
  //   const controls = this.form1.controls;
  
  //   for (const field in controls) {
  //     if (controls[field].invalid) {
  //       invalidFields.push(field);
  //     }
  //   }
  
  //   if (invalidFields.length > 0) {
     
  //     this.erroMessage=`Please provide valid information for the following fields: ${invalidFields.join(', ')}`;
  //     //console.error('No main file selected');
      
  //     this.dialog.open(DaidailogeComponent, {
  //       width: '400px',
  //       data: { message: this.erroMessage }
  //     });
     
  //   }
  // }
    
            
       }
       stepperNav4(){
        
        //alert(this.isMainFileUploaded)
          // if (this.isMainFileUploaded == true){
          //   this.isStep1Completed=true;
          //   this.isStep2Completed=true;
          //   this.isStep3Completed=false;
          //   this.isStep4Completed=false;  
          //   //this.buttontoclick.nativeElement.click();
        
          // }
          // else{
            
          //     // Handle the error scenario
             
          //     this.erroMessage ="Please Upload  Main Document file before submitting.";
          //     console.error('No main file selected');
             
          //     alert(this.erroMessage)
          //     this.dialog.open(DaidailogeComponent, {
          //       width: '400px',
          //       data: { message: this.erroMessage }
          //     });
          //     return; // Exit the function if no main file was selected
            
           
          // }
      
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
            //     //alert(this.erroMessage)
            //     this.dialog.open(DaidailogeComponent, {
            //       width: '400px',
            //       data: { message: this.erroMessage }
            //     });
            //   }
            // }
               
          
        }        
getNatureOfDocument(){
  this.http.get(URL+'/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data:any)=>{
    this.NatureOfDocument=data;
    
  })

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

selectDocConfidentiality(event: any){

  console.log('Selected:', event.value);

  if (event.value === 'General') {

    // this.General = true;

    // this.confidential=false;

    this.phoneno=false;
    this.form2.get('OtpMethod')?.setValue("N/A");
  }

  else {

    this.phoneno=true;
    this.form2.get('OtpMethod')?.setValue("email");
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

  //this.AddDocumentinfo.Doc_process_Owner=this.form2.value.docProcOwner;

 console.log("ONTEXTBOXCHANGE",JSON.stringify(localStorage.getItem('processOwner')))
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
docApprover_displayExpr(usR_ID:any) {

  this.docApprover=usR_ID.firstname;
  const userId = usR_ID.id;
  localStorage.setItem('docApprover', this.docApprover);
    console.log("docApprover_displayExpr",JSON.stringify(localStorage.getItem('docApprover')))
  //localStorage.setItem('username_${userId}',this.username)
  return usR_ID.firstname && `${usR_ID.firstname} , ${usR_ID.department_Master_name} `;
}


OnDocApproverChange(event: any) {
  // Your logic here
  // For example, updating the processOwner variable
  this.docApprover = event.target.value;
  //console.log(this.processOwner)
  localStorage.setItem('docApprover', this.docApprover);
 console.log("OnDocApproverTextbox",JSON.stringify(localStorage.getItem('docApprover')))
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
    this.form2.controls['docProcOwner'].setValue(this.processOwner);

  } else {
    // Handle the case where no users are selected
    localStorage.removeItem('processOwner');
    this.processOwner = null;
  }
}
onSelectionDocumentApprover(e: any){

  if (e.selectedRowsData && e.selectedRowsData.length > 0) {
      const processApproverNames = e.selectedRowsData.map((user: any) => user.firstname);
    this.docApprover = processApproverNames.join(', ');
   localStorage.setItem('docApprover',  this.docApprover);
    
    console.log("Selected Process Approver:",  this.docApprover);
    console.log("onSelectionDocumentApprover",JSON.stringify(localStorage.getItem('docApprover')))
    this.form2.controls['docApprover'].setValue(this.docApprover);

  } else {
    
    localStorage.removeItem('docApprover');
    this.docApprover = null;
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

onCheckboxChange(event: any) {

  // console.log('Checkbox for Document review frequency changed:', event.target.checked);
  // this.isPanelVisible = event.target.checked;

  console.log('Checkbox for Document review frequency changed:', event.target.checked);
  this.isPanelVisible = event.target.checked;
  const reviewFrequencyStatus = event.target.checked ? 1 : 0;
  this.form3.get('Review_Frequency_Status').setValue(reviewFrequencyStatus);
 
}
ondoclinkChange(event:any) {

  console.log('Checkbox for Document Linking changed:', event.target.checked);
  this.isdoclinkpanelVisible = event.target.checked;
  const docLinkingStatus = event.target.checked ? 1 : 0;
  this.form3.get('Doc_Linking_Status').setValue(docLinkingStatus);
 
 }
  


SelectFrequencyPeriod(event: any){

  console.log('Selected:', event.value);

  

  if (event.value===1) {

 

    this.TextBox1=true;

  }
  else if (event.value===2) {

   

    this.TextBox1=true;

  }
  else if (event.value===3) {


    this.TextBox1=true;

  }
  else if (event.value===4) {


    this.TextBox1=true;

  }

  else {

    this.TextBox1=false;

   

  }

}

changeTimePeriod(event:any)  {

  console.log('Selected Time period',event.value);

  

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

removeMainFile() {
  this.mainFile = null; // Reset the main file to null when removing
  this.isMainFileUploaded = false;
}
onFileSelected(event: any) {
  //this.selectedFiles = [];
  
//alert(this.selectedFiles)
    
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
removeFile(index: number) {
  if (index >= 0 && index < this.selectedFiles.length) {
    this.selectedFiles.splice(index, 1);
} 

}


updateFormattedDate(controlName: string, value: Date) {
  if (value) {
    const formattedDate = this.formatDate(value);
    this.form2.get(controlName)?.setValue(formattedDate, { emitEvent: false });
  }
}
updateFormattedDate1(controlName: string, value: Date) {
  if (value) {
    const formattedDate = this.formatDate(value);
    this.form3.get(controlName)?.setValue(formattedDate, { emitEvent: false });
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
SecondStepperDiscard(){

  const dialogRef = this.dialog.open(ToasterComponent, {
    width: '400px',
     data: { message:"Are you sure, you want to Discard the Draft" }
  });
  dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'The dialog was closed');

      if (result == true) {
        let abcd:UpdateAddDocument=new UpdateAddDocument();
        abcd.AddDoc_id=parseInt(this.selectedValue);

        let user:any=this.session.getUser();
        user=JSON.parse(user as any)
        const userid:number=user.profile.userid;
        abcd.ChangedBy=userid;

        //alert(JSON.stringify(abcd))
        this.http.post(URL + '/DocumentDiscard/SaveDraftDiscard',abcd)
        .subscribe(
          (response: any) => {
           this.adddocidpkid=parseInt(response);
          
               this.erroMessage ="Discard Successfully";
     
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
    });
}
ThirdStepperDiscard(){
//   const isConfirmed =confirm('Are you sure you want to Discard the form');
//     if(isConfirmed){
//      let formData: any;
 
//   //  let arrayToInt: number = parseInt(this.Userid1.join(''));
//  //   alert(JSON.stringify(this.Ass_editProvideAccess_form.value))
//     formData = {
//        AddDoc_id: parseInt(this.form2.value.AddDoc_id),
//       //AssessementTemplateID: this.assessementtempid,
//      UserID: this.userId.toString(),
//     };
//       console.log('Form Data:', formData);

//       this.http.post(URL + '/Assessment/RemoveAssProvideAccess',formData)
//       .subscribe((response: any) => {
//         console.log('Assessement Permission Removed Succefully ', response);
//         // Handle the response from the server if needed
//         window.alert('Assessement Permission Removed Succefully');
//        this.Ass_editProvideAccess_form.reset();
//        this.reloadComponent();
//       },
//       (error: any) => {
       
//         window.alert('Error Saving Data');
//       });
//     }
  // const dialogRef = this.dialog.open(DaidailogeComponent, {
  //   width: '400px',
  //    data: { message:"Are you sure you want to Discard the form" }
  // });
  // dialogRef.afterClosed().subscribe(result => {
  //   window.location.reload();
  // });
}
// MainDocSaveDraft(){

//   if(this.form1.invalid){
//     let invalidFields: any[] = [];
//        invalidFields = invalidFields.concat(
//         Object.keys(this.form1.controls)
//         .filter(key => this.form1.get(key).invalid)
//         .map(key => {
//             switch(key) {
//                 case 'documenttype': return 'Document Type';
//                 case 'docCategory': return 'Document Category';
//                 case 'docsubCat': return 'Document Sub Category';
//                 case 'doctitle': return 'Title of Document';
//                 case 'objective': return 'Objective of Document';
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
//   else{
 
//     const formData: FormData = new FormData();
//     let  EntityMasterID: number= parseInt(this.form1.value.Entity_Master_id);
//     if (this.mainFile instanceof File) { 
//     formData.append('mainFile', this.mainFile, this.mainFile.name);
//   } else {
//     this.erroMessage ="Please Upload  Main Document file before submitting.";
//     console.error('No main file selected');
//     this.dialog.open(DaidailogeComponent, {
//       width: '400px',
//       data: { message: this.erroMessage }
//     });
//     return; 
//   }
//   if (this.selectedFiles) {
//     for (let file of this.selectedFiles) {
//       formData.append('supportFiles', file, file.name);
//     }
//   }
//   const userId = this.userdata.profile.userid;
//   formData.append('USR_ID', userId);
//   Object.keys(this.form1.controls).forEach(key => {
//     formData.append(key, this.form1.get(key).value);
//   });

//    this.FormParameters2(this.selectedValue);
// alert(JSON.stringify(formData))
//    this.http.post(URL + '/MainDocSaveDraft/MainDocSaveDraftDetails', formData)
//    .subscribe(
//      (response: any) => {
//       this.adddocidpkid=parseInt(response);
  
//           this.erroMessage ="Save Successfully";

//        const dialogRef = this.dialog.open(DaidailogeComponent, {
//          width: '400px',
//          data: { message: this.erroMessage }
//        });
//        dialogRef.afterClosed().subscribe(result => {
//          window.location.reload();
//        });
//      }
//    )
//   }
  
// }

MainDocSaveDraft() {
  
  //alert(JSON.stringify(this.form1.value))
  
  if (this.form1.invalid) {
    let invalidFields: any[] = [];
    invalidFields = invalidFields.concat(
      Object.keys(this.form1.controls)
        .filter(key => this.form1.get(key).invalid)
        .map(key => {
          switch (key) {
            case 'documenttype': return 'Document Type';
            case 'docCategory': return 'Document Category';
            case 'docsubCat': return 'Document Sub Category';
            case 'doctitle': return 'Title of Document';
            case 'objective': return 'Objective of Document';
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
  } else {
    const formData: FormData = new FormData();
    let EntityMasterID: number = parseInt(this.form1.value.Entity_Master_id);

    if (this.mainFile instanceof File) {
      formData.append('mainFile', this.mainFile, this.mainFile.name);
    } else {
      this.erroMessage = "Please Upload Main Document file before submitting.";
      console.error('No main file selected');
      this.dialog.open(DaidailogeComponent, {
        width: '400px',
        data: { message: this.erroMessage }
      });
      return;
    }

    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        if (file instanceof File) {
          formData.append('supportFiles', file, file.name);
        } else {
          console.error('Invalid file in selectedFiles:', file);
        }
      }
    }

    const userId = this.userdata.profile.userid;
    formData.append('USR_ID', userId);
    formData.append('AddDoc_id', this.selectedValue);
       formData.append('Document_Id', this.DocumentID);
    

    // Object.keys(this.form1.controls).forEach(key => {
    //   formData.append(key, this.form1.get(key).value); 
    // });
    formData.append('Title_Doc',this.form1.value.doctitle);   
    formData.append('Sub_title_doc',this.form1.value.subtitle);   
    formData.append('Obj_Doc',this.form1.value.objective);
    formData.append('DocTypeID',this.form1.value.documenttype);
    formData.append('Doc_CategoryID',this.form1.value.docCategory);
    formData.append('Doc_SubCategoryID',this.form1.value.docsubCat);

    this.FormParameters2(this.selectedValue);
    console.log(JSON.stringify(formData))

    this.http.post(URL + '/MainDocSaveDraft/MainDocSaveDraftDetails', formData)
      .subscribe(
        (response: any) => {
          this.adddocidpkid = parseInt(response);
          this.erroMessage = "Save Successfully";

          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          });
        },
        (error: any) => {
          console.error('There was an error!', error);
        }
      );
  }
}



AttributesSaveDraft(){

  this.forminvalidfields=[];
  //const processOwner = localStorage.getItem('processOwner');
  //|| (!processOwner) || processOwner.trim() == '' 

  if (this.form1.invalid || this.form2.invalid  ) {

  
    let invalidFields: any[] = [];
  
    // Process form1
    invalidFields = invalidFields.concat(
        Object.keys(this.form1.controls)
        .filter(key => this.form1.get(key).invalid)
        .map(key => {
            switch(key) {
              // case 'Entity_Master_id': return 'Entity ';
              //   case 'Unit_location_Master_id': return 'Unit Location';
              case 'documenttype': return 'Document Type';
              case 'docCategory': return 'Document Category';
              case 'docsubCat': return 'Document Sub Category';
              case 'doctitle': return 'Title of Document';
              case 'objective': return 'Objective of Document';
                default: return key; // Return the key itself if no user-friendly name is needed
            }
        })
      );
    
    invalidFields = invalidFields.concat(
      Object.keys(this.form2.controls)
      .filter(key => this.form2.get(key).invalid)
      .map(key => {
        switch(key) {
          case 'docConfidentiality': return 'Document Confidentiality';
          case 'effDate': return 'Effective Date';
          case 'docProcOwner': return 'Document Process Owner';
          case 'pubAutType': return 'Authority Type';
          case 'NameOfAuth': return 'Name of Authority';
          case 'NatureOfDoc': return 'Nature of Document';
  
          // ... other cases for other field names
          default: return key; // Return the key itself if no user-friendly name is needed
      }
      })
  );
  // if (!processOwner || processOwner.trim() === '') {
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
    const formData: FormData = new FormData();

    const processOwner = localStorage.getItem('processOwner');
    const docApprover = localStorage.getItem('docApprover');
    if (this.form2.valid && processOwner && processOwner.trim() !== '' ) {
      
       const effDate = (this.form2.get('effDate') as FormControl).value;
       // || new Date().toISOString().split('T')[0]; // Use current date if Eff_Date is not set, though it's required.
       const defaultDatesFields = ['initialCreationDate', 'dateOfDocApprovel', 'docLastRevDate'];
  
      defaultDatesFields.forEach(field => {
        const dateControl = this.form2.get(field) as FormControl;
        if (!dateControl.value) {
          dateControl.setValue(effDate);
        }
      });
     
    }
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
        if (file instanceof File) {
          formData.append('supportFiles', file, file.name);
        } else {
          console.error('Invalid file in selectedFiles:', file);
        }
      }
    }


    formData.append('AddDoc_id', this.selectedValue);
    
    formData.append('Document_Id', this.DocumentID);
    
   this.FormParameters3(this.selectedValue);
   Object.keys(this.form1.controls).forEach(key => {
    formData.append(key, this.form1.get(key).value);
  });

  Object.keys(this.form2.controls).forEach(key => {
    formData.append(key, this.form2.get(key).value);
  });
// if(processOwner){
//   formData.append('docProcOwner', processOwner);

// }

  if (docApprover) {
    formData.append('docApprover', docApprover);
  }
  else if(!docApprover || docApprover.trim() === '')
  {
    formData.append('docApprover', 'N/A'); 
  }
    const userId = this.userdata.profile.userid;
  formData.append('USR_ID', userId);

  
//console.log(JSON.stringify(this.AddDocumentinfo))

   this.http.post(URL + '/AttributeSaveDraft/AttributeSaveDraftDetails', this.AddDocumentinfo,{headers})
   .subscribe(
     (response: any) => {
      this.adddocidpkid=parseInt(response);
     // alert("Save Successfully");
     this.erroMessage = "Save Successfully";
          this.http.post(URL + '/AttributeSaveDraft/SaveDocument', formData)
      .subscribe(
        (response: any) => {
          this.adddocidpkid = parseInt(response);
         // this.erroMessage = "Save Successfully";

          const dialogRef = this.dialog.open(DaidailogeComponent, {
            width: '400px',
            data: { message: this.erroMessage }
          });
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          });
        },
        (error: any) => {
          console.error('There was an error!', error);
        }
      );

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
}

