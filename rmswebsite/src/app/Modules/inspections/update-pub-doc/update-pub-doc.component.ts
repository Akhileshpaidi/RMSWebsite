import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';

import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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




export interface Tag  {
  name: string;
}
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-update-pub-doc',
  templateUrl: './update-pub-doc.component.html',
  styleUrls: ['./update-pub-doc.component.scss']
})
export class UpdatePubDocComponent implements OnInit,AfterViewInit  {

  @ViewChild('Obj_Doc') textarea!: ElementRef;
  @ViewChild('chipListInput') chipListInput!: ElementRef<HTMLInputElement>;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.UpdateForm.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
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
      this.UpdateForm.controls['Keywords'].setValue(this.tags.map(tag => tag.name));
    }
    // Clear the input field explicitly
    this.chipListInput.nativeElement.value = '';
  }


  Useridvalue:any;
  loading: boolean = false;
  gridColumns:any;
  Check_Doc_Rev_Freq:any;
Check_Doc_Link:any;
  processOwner:any;
  docApprover :any;
  data = [
    { id: 1 },
    { id: 2 },
    // Add more rows as needed
  ];
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
  gridBoxValue1:number[]=[];
  gridBoxValue: number[] = [];
  isUserBoxOpened:boolean;
  isUserBoxOpened1:boolean;
  isGridBoxOpened : boolean;
  isPanelVisible: boolean=false;
  isdoclinkpanelVisible:boolean=false;
  TextBox1=true;
  //selectedOption:any[] = [];
   Review_Frequency_Status:any;
   Doc_Linking_Status:any;
  SelectedOption:any;
  SelectedAuthType:any;
  AuthorityNameData:any;
  AddDocumentinfo:UpdateAddDocument=new UpdateAddDocument();
  DocfileInfo:RepositoryFiles=new RepositoryFiles();
  UpdateForm :any;
 
DocTypeArray :any[]=[];
docTypeID:any;
DocCategory:any;
authoritynameID:any;
doc_CategoryID:any;
DocSubCat:any[]=[];
doc_SubCategoryID:any;


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
 
  
  TextBox2=true;
  DropdownBox2=false;
 

           gridList(addDoc_id:any) {
            return addDoc_id && `${addDoc_id.title_Doc} , ${addDoc_id.publisher_name} , ${addDoc_id.docTypeName} , ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} , ${addDoc_id.publisher_Date_Range} , ${addDoc_id.eff_Date} , ${addDoc_id.keywords_tags} , ${addDoc_id.authorityTypeName} , ${addDoc_id.authorityName} , ${addDoc_id.natureOf_Doc_Name}`;
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
            return ID && `${ID.document_Id} ${ID.document_Name}
            ${ID.publisher_Date_Range}
            `;
          }


        


  ngOnInit(): void {
   
    this.selectedprocessownerType=2;
    this.selecteddocapproverType=2;
    localStorage.removeItem('processOwner');
    this.processOwner = null;

    localStorage.removeItem('docApprover');
    this.docApprover = null;

    this.UpdateForm.get('effDate').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('effDate', value);
    });
  
    this.UpdateForm.get('initialCreationDate').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('initialCreationDate', value);
    });
    this.UpdateForm.get('dateOfDocApprovel').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('dateOfDocApprovel', value);
    });
    this.UpdateForm.get('docLastRevDate').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('docLastRevDate', value);
    });
    this.UpdateForm.get('review_start_Date').valueChanges.subscribe((value:any) => {
      this.updateFormattedDate('review_start_Date', value);
    });

    this.UpdateForm.valueChanges.subscribe((val: any) => console.log("UpdateForm values:", val));
  }





  constructor(public dialog: MatDialog,private InspectionservicesService: InspectionservicesService,private http: HttpClient, private ref: ChangeDetectorRef, private zone: NgZone,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
  
    private report: ReportService,
    private formBuilder: FormBuilder,)
     {

      this.isUserBoxOpened1=false;
      this.isGridBoxOpened = false;
      this.isUserBoxOpened=false;
      
      this.getDocType();
    this.getNatureOfDocument();
   this.getAuthorityType();
   


   this.UpdateForm = this.formBuilder.group({
    documenttype: ['', Validators.required],
    docCategory: ['', Validators.required],
    docsubCat: ['', Validators.required],
    doctitle: ['',Validators.required],
    subtitle: [''],
    objective:['', Validators.required],
    docConfidentiality:['', Validators.required],
    OtpMethod: [''],
    effDate:['', Validators.required],
    initialCreationDate: [''],
    docIntNum: [''],
    docIntVerNum: [''],
    docPhyValLoc: [''],
    docProcOwner: [''],
    docApprover: [''],
    dateOfDocApprovel: [''],
    docLastRevDate: [''],
    pubAutType: ['', Validators.required],
    NameOfAuth: ['', Validators.required],
    NatureOfDoc: ['', Validators.required],
 
    Keywords: [''],
   
    pubdoc: [''],
    publishercomments: [''],
    indicativereadingtime: ['', Validators.required],
    timeperiod:  ['', Validators.required],
    freq_period_type:  [''],
    review_start_Date:  [''],
    freq_period:  [''],
    ischecked:[false],
    ischecked2:[false]
   
  });












  const storedData:any = localStorage.getItem('user');
  const parsedData = JSON.parse(storedData);
  //Role id
  const rolesArray = parsedData && parsedData.role.roles;
  const firstRole = rolesArray && rolesArray.length > 0 ? rolesArray[0] : null;
  
  
  const RoleId = firstRole ? firstRole.roleid : null;
  console.log('RoleId:', RoleId);
  
  
  
  if(RoleId==2){
    this.gridColumns=[ 
      {
        dataField: 'document_Id',
        caption: 'Document ID'
            }, {
      dataField: 'title_Doc',
      caption: 'Title'
          },   {
            dataField: 'sub_title_doc',
            caption: 'Sub Title',
            visible: false,
           
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
            
                },   {
                        dataField: 'versionControlNo',
                        caption: 'Version No.'
                            },
            'docTypeName','doc_CategoryName','doc_SubCategoryName',
            {
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
           'authorityTypeName','authorityName',
           {
            dataField: 'natureOf_Doc_Name',
            caption: 'Document Classification'
                },
           {
            dataField: 'doc_Confidentiality',
            caption: 'Nature of Confidentiality'
                },{
                  dataField: 'freq_period',
                  caption: 'Review Frequency'
                      },]
   
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
  this.Useridvalue=Userid;
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
        this.http.get(URL + '/PublishedDocDocument/GetPublishedDocDetails', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
};
 
  this.onChanges();
  
  }
  ngAfterViewInit() {
    // This will handle cases where the textarea is manually typed into
    this.resize();
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

  getDocType(){
    this.http.get(URL+'/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data:any)=>{
      this.DocTypeArray=data;
      
    })

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

 
  retrieveFiles(event:any): void {
   
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

   getUpdateFormData(event:any){
   
    this.visibleStepper=true;
    this.isGridBoxOpened = false;
    this.isPanelVisible=false;
    this.isdoclinkpanelVisible=false;
    console.log("selected Type id: ", event.value);
   
      this.selectedValue=event.value; 
      this.retrieveFiles( this.selectedValue);
    this.http.get(URL+'/SavedDraftDocument/GetPublishedDatabyid/'+this.selectedValue).subscribe((data:any)=>{

 
      if (Array.isArray(data) && data.length > 0) {
        // Data is an array and has at least one element
        const PubList = data[0]; // Access the first element of the array
       // alert(JSON.stringify(PubList));
       this.Check_Doc_Rev_Freq=PubList.review_Frequency_Status;
       this.Check_Doc_Link=PubList.doc_Linking_Status;
        let typeid=PubList.docTypeID;
        let AuthNameid=PubList.authorityTypeID;
        let docCatId=PubList.doc_CategoryID;
        this.DocCategory = this.makeAsyncDataSource(this.http,typeid);
      
         
      this.DocCategory.load().then((data: any) => {    
        this.zone.run(() => {
        this.UpdateForm.controls['docCategory'].setValue(PubList.doc_CategoryID);
        this.ref.detectChanges();
      });
     
     });
     this.doc_SubCategoryID = this.makeAsyncDataSource1(this.http,docCatId);
     this.doc_SubCategoryID.load().then((data: any) => {
       
      this.zone.run(() => {
     this.UpdateForm.controls['docsubCat'].setValue(PubList.doc_SubCategoryID);
      this.ref.detectChanges();
    });
   
   });


        this.UpdateForm.controls['documenttype'].setValue(PubList.docTypeID);
      
     
        this.UpdateForm.controls['doctitle'].setValue(PubList.title_Doc);
        this.UpdateForm.controls['subtitle'].setValue(PubList.sub_title_doc);
        this.UpdateForm.controls['objective'].setValue(PubList.obj_Doc);    
        this.UpdateForm.controls['docConfidentiality'].setValue(PubList.doc_Confidentiality);

   
        if (PubList.doc_Confidentiality=='Confidential') {
          // alert(versionChange.doc_Confidentiality)
           this.phoneno=true;
         //  this.form.get('OtpMethod')?.setValue("N/A");
   
         // Setting the form control
         } else {
           this.phoneno=false;
         }
         this.UpdateForm.controls['OtpMethod'].setValue(PubList.otpMethod);
      
        let effdate=new Date(PubList.eff_Date);
      //  alert(effdate)
       // let formattedeffDate= this.getFormattedDate(effdate);
        this.UpdateForm.controls['effDate'].setValue(effdate);
         let initial_creation_doc_date=new Date(PubList.initial_creation_doc_date);
        // let formattedDate= this.getFormattedDate(initial_creation_doc_date);
        this.UpdateForm.controls['initialCreationDate'].setValue(initial_creation_doc_date);
        this.UpdateForm.controls['docIntNum'].setValue(PubList.doc_internal_num);
        this.UpdateForm.controls['docIntVerNum'].setValue(PubList.doc_Inter_ver_num);
        this.UpdateForm.controls['docPhyValLoc'].setValue(PubList.doc_Phy_Valut_Loc);
        this.UpdateForm.controls['docProcOwner'].setValue(PubList.doc_process_Owner);
        this.UpdateForm.controls['docApprover'].setValue(PubList.doc_Approver);
        let Approvaldate=new Date(PubList.date_Doc_Approver);
       // let formattedApprovalDate= this.getFormattedDate(Approvaldate);
        this.UpdateForm.controls['dateOfDocApprovel'].setValue(Approvaldate);
        let LastRevdate=new Date(PubList.date_Doc_Revision);
      //  let formattedLastRevDate= this.getFormattedDate(LastRevdate);
        this.UpdateForm.controls['docLastRevDate'].setValue(LastRevdate);       
        this.UpdateForm.controls['pubAutType'].setValue(PubList.authorityTypeID);

        this.authoritynameID = this.makeAsyncDataSource1(this.http,AuthNameid);
        this.authoritynameID.load().then((data: any) => {
          
         this.zone.run(() => {
          this.UpdateForm.controls['NameOfAuth'].setValue(PubList.authoritynameID);      
         this.ref.detectChanges();
       });
      
      });
    
      
      this.UpdateForm.controls['NatureOfDoc'].setValue(PubList.natureOf_Doc_id);
     
      
        //this.UpdateForm.controls['Keywords'].setValue(PubList.keywords_tags);
        if (PubList.keywords_tags) {
          const keywordsArray = PubList.keywords_tags.split(',');
          this.tags = keywordsArray.map((keyword: string) => ({ name: keyword.trim() }));
        this.UpdateForm.controls['Keywords'].setValue(this.tags.map(tag => tag.name)); // Setting the form control
        } else {
          this.UpdateForm.controls['Keywords'].setValue(['']); // Set to an empty array if no keywords
        }
      

        if(this.Check_Doc_Rev_Freq==1){
       
         // this.onCheckboxChange(this.Check_Doc_Rev_Freq);
         this.isPanelVisible=true;
          this.UpdateForm.controls['freq_period_type'].setValue(PubList.freq_period_type);
          this.UpdateForm.controls['freq_period'].setValue(PubList.freq_period);
          let reviewStartdate=PubList.review_start_Date;
          //let formattedReviewDate= this.getFormattedDate(reviewStartdate);
          this.UpdateForm.controls['review_start_Date'].setValue(reviewStartdate);
        
        }
        else{
          this.isPanelVisible=false;
          this.UpdateForm.controls['freq_period_type'].setValue(PubList.freq_period_type);
          this.UpdateForm.controls['freq_period'].setValue(PubList.freq_period);
          let reviewStartdate=PubList.review_start_Date;
          //let formattedReviewDate= this.getFormattedDate(reviewStartdate);
          this.UpdateForm.controls['review_start_Date'].setValue(reviewStartdate);
        
        }
        if(this.Check_Doc_Link==1){
        //  this.ondoclinkChange(this.Check_Doc_Link);
        this.isdoclinkpanelVisible=true;
      
//  const pubDocArray = PubList.pub_doc.split(',');
// const formattedPubDoc = pubDocArray.join(',');

// this.UpdateForm.controls['pubdoc'].setValue(formattedPubDoc);
const pubDocString = PubList.pub_doc;
if (pubDocString) {
  const pubDocArray = pubDocString.split(','); // Split string into array
  const pubDocNumberArray = pubDocArray.map((id:any) => Number(id));
  this.ref.detectChanges();
  this.SelectedOption = pubDocNumberArray;
  

  // const selectedIDs = PubList.pub_doc.split(',').map(Number).filter((num: any) => !isNaN(num));
  // this.UpdateForm.controls['pubdoc'].setValue(selectedIDs);
  // this.ref.detectChanges();
  // this.SelectedOption = selectedIDs;

} else {
  const selectedIDs = PubList.pub_doc.split(',').map(Number).filter((num: any) => !isNaN(num));
   this.UpdateForm.controls['pubdoc'].setValue(selectedIDs);
  this.ref.detectChanges();
  // Set SelectedOption to an empty array if pubDocString is null or empty
  this.SelectedOption = [];
}

        }
        else{
          this.isdoclinkpanelVisible=false;
          let  selectedIDs:any =[];
          if(PubList.pub_doc){
            selectedIDs = PubList.pub_doc.split(',').map(Number).filter((num: any) => !isNaN(num));

          }
   this.UpdateForm.controls['pubdoc'].setValue(selectedIDs);
  this.ref.detectChanges();
  // Set SelectedOption to an empty array if pubDocString is null or empty
  this.SelectedOption = [];
        }
     
        this.UpdateForm.controls['publishercomments'].setValue(PubList.publisher_comments);

        this.UpdateForm.controls['indicativereadingtime'].setValue(PubList.indicative_reading_time);
       

        this.UpdateForm.controls['timeperiod'].setValue(PubList.time_period);
      
//alert(JSON.stringify(this.UpdateForm.value));
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
  SubmitUpdateForm(data: any = {}) {


    const processOwner = localStorage.getItem('processOwner');
    const docApprover = localStorage.getItem('docApprover');
    
    if (this.UpdateForm.valid && processOwner && processOwner.trim() !== '' ) {

      const effDate = this.UpdateForm.get('effDate')?.value || new Date().toISOString().split('T')[0]; // Use current date if Eff_Date is not set, though it's required.
      const defaultDatesFields = ['initialCreationDate', 'dateOfDocApprovel', 'docLastRevDate'];
  
      defaultDatesFields.forEach(field => {
        const dateControl = this.UpdateForm.get(field);
      if (dateControl) {
        const initialValue = dateControl.value;
          
        if (!dateControl.value) {
          dateControl.setValue(effDate);
        }
    }
   });
  }

    this.loading = true;
  
    // Update form parameters based on selected value
    this.updateFormParameters(this.selectedValue);
  
    // Trigger validation and update form validity
    this.UpdateForm.updateValueAndValidity();

    
  
  
    // Check if the form is valid
    if (this.UpdateForm.valid) {
     
      // If the form is valid, proceed with the HTTP post request
      this.http.post(URL + '/UpdateDoc/UpdatePublishedDoc', this.AddDocumentinfo, { headers }).subscribe((data: any) => {
        this.loading = false;
        const message = "Updated Data Successfully.";
      const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: message},
       
      });
      dialogErrorRef.afterClosed().subscribe(result => {
        // Perform any necessary actions after the dialog is closed
        this.visibleStepper = false;
        this.loading = false;

        this.ref.detectChanges(); // Manually trigger change detection
      });
      
      });
      this.selectedValue = null;
    } else {
     
      this.loading = false;
      // If the form is not valid, accumulate error messages for invalid controls
      const invalidControls: string[] = [];
  
        // Map control names to user-friendly names
        const controlNameMap: { [key: string]: string } = {
          'doctitle': 'Title of Document',
         // 'subtitle': 'Sub-Title of Document',
          'documenttype': 'Document Type',
          'docCategory': 'Document Category',
          'docsubCat': 'Document Sub Category',
          'objective': 'Objective of Document',
          'docConfidentiality': 'Document Confidentiality',
          'effDate': 'Effective Date',
          'docProcOwner': 'Document Process Owner',
          'pubAutType': 'Publishing Authority Type',
          'NameOfAuth': 'Name of Authority',
          'NatureOfDoc': 'Nature of Document',
          'indicativereadingtime': 'Indicative Reading Time',
          'timeperiod': 'Time Period ',
          'freq_period_type': 'Select Frequency Period Type',
          'review_start_Date': 'Enter Start Date for next Review',
          'freq_period': 'Enter Frequency period',
         
          // Add more mappings as needed

        

        };
        Object.keys(this.UpdateForm.controls).forEach(key => {
          const control = this.UpdateForm.get(key);
    
          if (control?.invalid) {
            Object.keys(control.errors || {}).forEach(errorKey => {
              const message = this.getErrorMessage(controlNameMap[key] || key, errorKey);
              invalidControls.push(message);
            });
          }
        });
    
        // Display error messages for all invalid controls
        if (invalidControls.length > 0) {
          const errorMessage = `Form is not valid. Please correct the following issues:\n${invalidControls.join('\n')}`;
          const dialogErrorRef = this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: errorMessage },
          });
        }
      }
  }
    
    // Helper method to get error messages for each control
    getErrorMessage(controlName: string, errorKey: string): string {
      const errorMessages: { [key: string]: string } = {
        'required': `${controlName} is required.`,
        // Add more error messages as needed
        panelClass: 'custom-error-dialog' // Add a custom class for styling
      };
    
      return errorMessages[errorKey] || `Validation error for ${controlName}.`;
    }
  
  
    onChanges(): void {
  
      this.UpdateForm.get('effDate')?.valueChanges.subscribe((val: string | number | Date) => {
        const initialDateControl = this.UpdateForm.get('initialCreationDate');
         
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
        const approvalDateControl = this.UpdateForm.get('dateOfDocApprovel');
        if (approvalDateControl && approvalDateControl.value && new Date(approvalDateControl.value) > new Date(val)) {
          approvalDateControl.setValue('');
        }
    
        // Update Document Last Revision Date if it's later than the new Effective Date
        const revisionDateControl = this.UpdateForm.get('docLastRevDate');
        if (revisionDateControl && revisionDateControl.value && new Date(revisionDateControl.value) > new Date(val)) {
          revisionDateControl.setValue('');
        }
    
      });
    }

updateFormParameters(AddDocId:any){
  let docid: number = parseInt(AddDocId);

  this.AddDocumentinfo.AddDoc_id=docid;
  let user:any=this.session.getUser();
  user=JSON.parse(user as any)
  const userid:number=user.profile.userid;
  const ChangedBy: string = user.profile.userid;

 
// this.formData.append('USR_ID', userid.toString());

  this.AddDocumentinfo.USR_ID= this.Useridvalue;
  this.AddDocumentinfo.ChangedBy= userid;
 //lert(this.AddDocumentinfo.ChangedBy);
 //1st Stepper

    this.AddDocumentinfo.Title_Doc=this.UpdateForm.value.doctitle;   
    this.AddDocumentinfo.Sub_title_doc=this.UpdateForm.value.subtitle;   
    this.AddDocumentinfo.Obj_Doc=this.UpdateForm.value.objective;
    this.AddDocumentinfo.DocTypeID=this.UpdateForm.value.documenttype;
    this.AddDocumentinfo.Doc_CategoryID=this.UpdateForm.value.docCategory;
    this.AddDocumentinfo.Doc_SubCategoryID=this.UpdateForm.value.docsubCat;
    //this.isFavorite = (PubList.favorite);
    //2nd Stepper
  
   this.AddDocumentinfo.Doc_Confidentiality=this.UpdateForm.value.docConfidentiality;
     
   this.AddDocumentinfo.OtpMethod=this.UpdateForm.value.OtpMethod;
     this.AddDocumentinfo.Eff_Date=this.UpdateForm.value.effDate;
    this.AddDocumentinfo.Initial_creation_doc_date=this.UpdateForm.value.initialCreationDate;
    this.AddDocumentinfo.Doc_internal_num=this.UpdateForm.value.docIntNum;
    this.AddDocumentinfo.Doc_Inter_ver_num=this.UpdateForm.value.docIntVerNum;
    this.AddDocumentinfo.Doc_Phy_Valut_Loc=this.UpdateForm.value.docPhyValLoc;

    if(this.selectedprocessownerType==1){
      let approver: string | null = localStorage.getItem('processOwner');
      this.AddDocumentinfo.Doc_process_Owner = approver !== null ? approver : undefined;
    }
    else{
      this.AddDocumentinfo.Doc_process_Owner=this.UpdateForm.value.docProcOwner;
    }
   
   
    if(this.selecteddocapproverType==1)
    {
      let approver: string | null = localStorage.getItem('docApprover');
      this.AddDocumentinfo.Doc_Approver = approver !== null ? approver : undefined;
      
    }
    else{
      this.AddDocumentinfo.Doc_Approver=this.UpdateForm.value.docApprover;
    }

 
    this.AddDocumentinfo.Date_Doc_Approver=this.UpdateForm.value.dateOfDocApprovel; 
    this.AddDocumentinfo.Date_Doc_Revision=this.UpdateForm.value.docLastRevDate;
    this.AddDocumentinfo.AuthorityTypeID=this.UpdateForm.value.pubAutType;
    this.AddDocumentinfo.AuthoritynameID=this.UpdateForm.value.NameOfAuth;
    this.AddDocumentinfo.NatureOf_Doc_id=this.UpdateForm.value.NatureOfDoc;
    //this.AddDocumentinfo.Keywords_tags=this.UpdateForm.value.Keywords;

    const UpdateKeywords = this.UpdateForm.value.Keywords;
    
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
      this.AddDocumentinfo.freq_period=this.UpdateForm.value.freq_period;
      this.AddDocumentinfo.freq_period_type=this.UpdateForm.value.freq_period_type;
      this.AddDocumentinfo.review_start_Date=this.UpdateForm.value.review_start_Date;
     }
     else{
      this.AddDocumentinfo.Review_Frequency_Status=0;
     }
    
     if (this.isdoclinkpanelVisible === true) {
      this.AddDocumentinfo.Doc_Linking_Status=1;
      const pubdocValue = this.UpdateForm.value.pubdoc;
    
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
       
  
   
    this.AddDocumentinfo.publisher_comments=this.UpdateForm.value.publishercomments;
    this.AddDocumentinfo.indicative_reading_time=this.UpdateForm.value.indicativereadingtime;
    this.AddDocumentinfo.Time_period=this.UpdateForm.value.timeperiod;
  
   
   

   //alert(JSON.stringify(this.AddDocumentinfo))


  }


  

//Document Attributes Code 

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
   // alert('docTypeID is null or undefined'); // Add some error handling
  }
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
    this.UpdateForm.get('OtpMethod').setValue("N/A");
  }

  else {

    this.phoneno=true;
    this.UpdateForm.get('OtpMethod').setValue("email");
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
      //this.gridBoxValue1=[];
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

  this.isPanelVisible = event.target.checked;
  console.log('Checkbox for Document review frequency changed:', event.target.checked);
}

ondoclinkChange(event:any) {
 
 this.isdoclinkpanelVisible = event.target.checked;
 console.log('Checkbox for Document Linking changed:', event.target.checked); 
 
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

updateFormattedDate(controlName: string, value: Date) {
  if (value) {
    const formattedDate = this.formatDate(value);
    this.UpdateForm.get(controlName).setValue(formattedDate, { emitEvent: false });
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
 
}
