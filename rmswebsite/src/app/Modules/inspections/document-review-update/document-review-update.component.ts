import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';

import { UpdateAddDocument, RepositoryFiles } from 'src/app/inspectionservices.service';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
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
import { InspectionservicesService, Document } from 'src/app/inspectionservices.service';
import { DocCategory } from 'src/app/inspectionservices.service';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ProvideAccess } from 'src/app/inspectionservices.service';
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
import { Tag } from '../update-pub-doc/update-pub-doc.component';
import { MatChipInputEvent } from '@angular/material/chips';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-document-review-update',
  templateUrl: './document-review-update.component.html',
  styleUrls: ['./document-review-update.component.scss']
})
export class  DocumentReviewUpdateComponent {
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
  loading: boolean = false;
  Check_Doc_Rev_Freq: any;
  Check_Doc_Link: any;
  processOwner: any;
  docApprover: any;
  data = [
    { id: 1 },
    { id: 2 },
    // Add more rows as needed
  ];
  minDate = new Date().toISOString().split('T')[0];
  files: Document[] = [];
  DocumentSubCategoryData: any;
  DocumentCategoryData: any;
  DocumentfilesData: any;
  SelectedCategory: any;
  SelectedSubCategory: any;
  gridDataSource: any;
  publDoc: any;
  adddocId: any;
  selectedValue: any;
  visibleStepper: any;
  AddDocId: any;
  Userinfo: any;
  Useridvalue:any;

  gridBoxValue1: any | undefined;
  gridBoxValue: number[] = [3];
  isUserBoxOpened: boolean;
  isUserBoxOpened1: boolean;
  isGridBoxOpened: boolean;
  isPanelVisible: boolean = false;
  isdoclinkpanelVisible: boolean = false;
  TextBox1 = true;
  selectedOption: any[] = [];
  SelectedOption: any;
  SelectedAuthType: any;
  AuthorityNameData: any;
  AddDocumentinfo: UpdateAddDocument = new UpdateAddDocument();
  DocfileInfo: RepositoryFiles = new RepositoryFiles();
  UpdateForm: FormGroup;
  DocTypeArray: any[] = [];
  docTypeID: any;
  DocCategory: any;
  authoritynameID: any;
  doc_CategoryID: any;
  DocSubCat: any[] = [];
  doc_SubCategoryID: any;
  review_start_Date:any;

  //UpdateForm1Group
  NatureOfDocument: any[] = [];
  AuthorityTypeArray: any[] = [];
  AuthorityName: any[] = [];
  authorityTypeID: any;
  usergridColumns: any = [{
    dataField: 'firstname',
    caption: 'Name'
  }, 'department_Master_name'];
  form: any;

  constructor(private route: ActivatedRoute,private router: Router, private InspectionservicesService: InspectionservicesService, private http: HttpClient, private ref: ChangeDetectorRef, private zone: NgZone,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
     private datePipe: DatePipe,
    private report: ReportService,
    private formBuilder: FormBuilder,
public location:Location
) {
    this.isUserBoxOpened1 = false;
    this.isGridBoxOpened = false;
    this.isUserBoxOpened = false;

    this.getDocType();
    this.getNatureOfDocument();
    this.getAuthorityType();





    this.UpdateForm = this.formBuilder.group({
      documenttype: ['', Validators.required],
      docCategory: ['', Validators.required],
      docsubCat: ['', Validators.required],
      doctitle: ['', Validators.required],
      subtitle: [''],
      objective: ['', Validators.required],
      docConfidentiality: ['', Validators.required],
      OtpMethod: [''],
      effDate: ['', Validators.required],
      initialCreationDate: [''],
      docIntNum: [''],
      docIntVerNum: [''],
      docPhyValLoc: [''],
      docProcOwner: ['', Validators.required],
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
      timeperiod: ['', Validators.required],
      freq_period_type: [''],
      review_start_Date: [''],
      freq_period: [''],
      NoofDays: [''],
      reviewstatus: [''],
      ischecked:[false],
      ischecked2:[false],

    });
    

    this.gridDataSource = {
      paginate: true,
      store: new CustomStore({
        key: 'addDoc_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/SavedDraftDocument/GetPublishedData', { headers })
              .subscribe(res => {
                (resolve(res));

              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };

    this.Userinfo = {
      paginate: true,
      store: new CustomStore({
        key: 'usR_ID',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/UserMaster/GetActiveUserDetails', { headers })
              .subscribe(res => {
                (resolve(res));

              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };


    this.publDoc = {
      paginate: true,

      store: new CustomStore({
        key: 'addDoc_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/PublishedDocDocument/GetPublishedDocDetails/', { headers })
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
  calculateFutureDate(event:any) {

    const period:number = parseInt(this.UpdateForm.value.freq_period);
    const unit:string = this.UpdateForm.value.freq_period_type;
   // const review_start_Date:string = this.review_start_Date;
// alert(period)
// alert(unit)
// alert(review_start_Date)
//     const currentDate = new Date(review_start_Date);
    const currentDate = new Date();
    let futureDate = new Date(currentDate);

//alert(unit)
    switch (unit) {
      case 'Days':
        futureDate.setDate(currentDate.getDate() + period);
        break;
      case 'Week':
        futureDate.setDate(currentDate.getDate() + period * 7);
        break;
        case 'Month':
          futureDate.setMonth(currentDate.getMonth() + period);
          break;
      case 'Year':
        futureDate.setFullYear(currentDate.getFullYear() + period);
        break;
      default:
        // Default to days if an invalid unit is provided
        futureDate.setDate(currentDate.getDate() + period);
        break;
    }
//alert(futureDate)
//alert(futureDate)
    this.UpdateForm.get('review_start_Date')?.setValue(this.datePipe.transform(futureDate, 'yyyy-MM-dd'));
  }

  compareDates() {
    const currentDate = new Date();
    const enteredStartDate = new Date(this.form.get('review_start_Date').value);

    // Compare dates
    if (currentDate < enteredStartDate) {
      console.log('Entered start date is in the future.');
    } else if (currentDate > enteredStartDate) {
      console.log('Entered start date is in the past.');
    } else {
      console.log('Entered start date is today.');
    }
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
  ngOnInit(event: any): void {

    this.selectedprocessownerType = 2;
    this.selecteddocapproverType = 2;
    localStorage.removeItem('processOwner');
    this.processOwner = null;

    localStorage.removeItem('docApprover');
    this.docApprover = null;


    this.visibleStepper = true;
    this.isGridBoxOpened = false;
    this.isPanelVisible = false;
    this.isdoclinkpanelVisible = false;



    // Assuming adddocId is set and available here

    this.route.queryParams.subscribe(params => {
      this.adddocId = params['adddocId'];
      this.Useridvalue=params['Useridvalue'];
      //alert(params['NoofDays'])
      this.UpdateForm.controls['NoofDays'].setValue(params['NoofDays']);
      this.UpdateForm.controls['reviewstatus'].setValue(params['reviewstatus']);

      // Now you can use adddocId in your component logic
      //console.log('Received adddocId:', adddocId);
      //alert(this.adddocId)
    });

    this.retrieveFiles(this.adddocId);

    this.http.get(URL + '/SavedDraftDocument/GetPublishedDatabyid/' + this.adddocId).subscribe((data: any) => {
    


      if (Array.isArray(data) && data.length > 0) {
        // Data is an array and has at least one element
        const PubList = data[0]; // Access the first element of the array

        this.Check_Doc_Rev_Freq = PubList.review_Frequency_Status;
        this.Check_Doc_Link = PubList.doc_Linking_Status;
        let typeid = PubList.docTypeID;
        let AuthNameid = PubList.authorityTypeID;
        let docCatId = PubList.doc_CategoryID;
        this.DocCategory = this.makeAsyncDataSource(this.http, typeid);


        this.DocCategory.load().then((data: any) => {
          this.zone.run(() => {
            this.UpdateForm.controls['docCategory'].setValue(PubList.doc_CategoryID);
            this.ref.detectChanges();
          });

        });
        this.doc_SubCategoryID = this.makeAsyncDataSource1(this.http, docCatId);
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

        let effdate = PubList.eff_Date;
        let formattedeffDate = this.getFormattedDate(effdate);
        this.UpdateForm.controls['effDate'].setValue(formattedeffDate);
        let initial_creation_doc_date = PubList.initial_creation_doc_date;
        let formattedDate = this.getFormattedDate(initial_creation_doc_date);
        this.UpdateForm.controls['initialCreationDate'].setValue(formattedDate);
        this.UpdateForm.controls['docIntNum'].setValue(PubList.doc_internal_num);
        this.UpdateForm.controls['docIntVerNum'].setValue(PubList.doc_Inter_ver_num);
        this.UpdateForm.controls['docPhyValLoc'].setValue(PubList.doc_Phy_Valut_Loc);
        this.UpdateForm.controls['docProcOwner'].setValue(PubList.doc_process_Owner);
        this.UpdateForm.controls['docApprover'].setValue(PubList.doc_Approver);
        let Approvaldate = PubList.date_Doc_Approver;
        let formattedApprovalDate = this.getFormattedDate(Approvaldate);
        this.UpdateForm.controls['dateOfDocApprovel'].setValue(formattedApprovalDate);
        let LastRevdate = PubList.date_Doc_Revision;
        let formattedLastRevDate = this.getFormattedDate(LastRevdate);
        this.UpdateForm.controls['docLastRevDate'].setValue(formattedLastRevDate);
        this.UpdateForm.controls['pubAutType'].setValue(PubList.authorityTypeID);

        this.authoritynameID = this.makeAsyncDataSource1(this.http, AuthNameid);
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

        this.UpdateForm.controls['freq_period_type'].setValue(PubList.freq_period_type);
        this.UpdateForm.controls['freq_period'].setValue(PubList.freq_period);

        let reviewStartdate:string = PubList.review_start_Date;
        // alert(reviewStartdate)
        // const dte=reviewStartdate.split('-')[2].split(' ')[0]+'-'+reviewStartdate.split('-')[1]+'-'+reviewStartdate.split('-')[0];

        let formattedReviewDate = this.getFormattedDate(reviewStartdate);
       
        this.UpdateForm.controls['review_start_Date'].setValue(formattedReviewDate);
        this.review_start_Date=PubList.review_start_Date;
        this.calculateFutureDate("");
        if (this.Check_Doc_Rev_Freq == 1) {

         
          this.isPanelVisible=true;
          this.UpdateForm.controls['freq_period_type'].setValue(PubList.freq_period_type);
          this.UpdateForm.controls['freq_period'].setValue(PubList.freq_period);
          let reviewStartdate=PubList.review_start_Date;
         this.UpdateForm.controls['review_start_Date'].setValue(reviewStartdate);
          

        }
        else {
          this.isPanelVisible = false;
         
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
        this.UpdateForm.controls['publishercomments'].setValue(PubList.publisher_comments);
        this.UpdateForm.controls['indicativereadingtime'].setValue(PubList.indicative_reading_time);
        this.UpdateForm.controls['timeperiod'].setValue(PubList.time_period);

        //alert(JSON.stringify(this.UpdateForm.value));
      } else {
        // Data is either not an array or it's empty
        // Handle this case as needed
      }


      setTimeout(() => this.resize(), 0);

    })

  }

  public project: any[] = [
    { id: 1, name: 'Direct Upload' },
    { id: 2, name: 'Create Document' }
  ];

  phoneno = false;
  public project1: any[] = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Confidential' }
  ];
  TextBox = true;
  DropdownBox = false;
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

  public tmperiod: any[] = [
    { id: 1, name: 'mins' },
    { id: 2, name: 'hrs' },
    { id: 3, name: 'days' }
  ];


  TextBox2 = true;
  DropdownBox2 = false;

  gridColumns: any = [
    {
      dataField: 'title_Doc',
      caption: 'Document Name'
    },
    'docTypeName', 'doc_CategoryName', 'doc_SubCategoryName',
    'eff_Date', 'keywords_tags', 'authorityTypeName', 'authorityName', 'natureOf_Doc_Name']



  gridList(addDoc_id: any) {
    return addDoc_id && `${addDoc_id.title_Doc} , ${addDoc_id.publisher_name} , ${addDoc_id.docTypeName} , ${addDoc_id.doc_CategoryName} , ${addDoc_id.doc_SubCategoryName} , ${addDoc_id.publisher_Date_Range} , ${addDoc_id.eff_Date} , ${addDoc_id.keywords_tags} , ${addDoc_id.authorityTypeName} , ${addDoc_id.authorityName} , ${addDoc_id.natureOf_Doc_Name}`;
  }


  gridBox_displayExpr(usR_ID: any) {
    if (usR_ID) {
      this.processOwner = usR_ID.firstname;

      localStorage.setItem('processOwner', this.processOwner);
      console.log("PROCESSOWNERGRIDBOX", JSON.stringify(localStorage.getItem('processOwner')))
      return usR_ID.firstname && `${usR_ID.firstname} , ${usR_ID.department_Master_name}`;
    }

  }
  publiDocColumns: any = ['document_Id', 'title_Doc', 'versionControlNo'];

  gridBox_displayExpr1(ID: any) {
    return ID && `${ID.document_Id} 
                       `;
  }
 





  

  getDocType() {
    this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails').subscribe((data: any) => {
      this.DocTypeArray = data;

    })

  }

  getDocTypes(event: any) {
    this.SelectedCategory = null;

    console.log("selected Type id: ", event.value);
    this.docTypeID = event.value;
    this.SelectedSubCategory = null;
    this.DocumentCategoryData = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/' + this.docTypeID, { headers })
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
    this.SelectedCategory = null;

    console.log("selected Type id: ", event.value);
    this.selectedValue = event.value;


    this.DocumentfilesData = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + 'api/DocRepository/GetDocRepositoryDetails/' + this.docTypeID, { headers })
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
    this.SelectedSubCategory = null;
    console.log("selected Type id: ", event.value);
    this.doc_CategoryID = event.value;

    this.DocumentSubCategoryData = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/' + this.doc_CategoryID, { headers })
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
    this.SelectedAuthType = null;
    this.AuthorityNameData = {
      paginate: true,
      store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.authorityTypeID, { headers })
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


  retrieveFiles(event: any): void {

    this.InspectionservicesService.getFiles(URL + '/DocRepository/GetDocRepositoryDetails/' + this.adddocId)
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

  getUpdateFormData(event: any) {


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


  makeAsyncDataSource(http: HttpClient, doctypeid: any) {

    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_CategoryID',
      load() {
        return lastValueFrom(http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID?DocTypeID=' + doctypeid, { headers }));
      },
    });
  }

  makeAsyncDataSource1(http: HttpClient, doc_CategoryID: any) {

    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_SubCategoryID',
      load() {
        return lastValueFrom(http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId?Doc_CategoryID=' + doc_CategoryID, { headers }));
      },
    });
  }
  SubmitUpdateForm(data: any = {}) {

    this.updateFormParameters(this.adddocId);
    //alert(JSON.stringify(this.AddDocumentinfo));
    // this.http.put(URL+'/AddDocument/UpdatePublishedDocData',obj,{headers}).subscribe((data:any)=>{
    //   alert ("Updated Data Successfully")
    // })
    //alert(JSON.stringify(this.AddDocumentinfo))

    this.http.post(URL + '/ReviewStatus/UpdatePublishedDocument', this.AddDocumentinfo, { headers }).subscribe((data: any) => {
      alert("Updated Data Successfully")
      
      this.visibleStepper = false;

      this.router.navigate(['dashboard/inspection/doc-rev-period-status'])

    });
    this.selectedValue = null;



  }


  updateFormParameters(AddDocId: any) {
   // alert(AddDocId)
    let docid: number = parseInt(AddDocId);
   this.AddDocumentinfo.AddDoc_id = docid;
    // alert(this.AddDocumentinfo.AddDoc_id);
    //1st Stepper
    //alert(this.Useridvalue)
   //this.AddDocumentinfo.USR_ID =this.Useridvalue.toString();
   let user:any=this.session.getUser();
   user=JSON.parse(user as any)
   const userid:number=user.profile.userid;
   const ChangedBy: string = user.profile.userid;
  
   this.AddDocumentinfo.USR_ID= this.Useridvalue;
   this.AddDocumentinfo.ChangedBy= userid;
   //alert(this.AddDocumentinfo.ChangedBy)
    this.AddDocumentinfo.Title_Doc = this.UpdateForm.value.doctitle;
    this.AddDocumentinfo.Sub_title_doc = this.UpdateForm.value.subtitle;
    this.AddDocumentinfo.Obj_Doc = this.UpdateForm.value.objective;
    this.AddDocumentinfo.DocTypeID = this.UpdateForm.value.documenttype;
    this.AddDocumentinfo.Doc_CategoryID = this.UpdateForm.value.docCategory;
    this.AddDocumentinfo.Doc_SubCategoryID = this.UpdateForm.value.docsubCat;

    //2nd Stepper

    this.AddDocumentinfo.Doc_Confidentiality = this.UpdateForm.value.docConfidentiality;
    this.AddDocumentinfo.Eff_Date = this.UpdateForm.value.effDate;
    this.AddDocumentinfo.Initial_creation_doc_date = this.UpdateForm.value.initialCreationDate;
    this.AddDocumentinfo.Doc_internal_num = this.UpdateForm.value.docIntNum;
    this.AddDocumentinfo.Doc_Inter_ver_num = this.UpdateForm.value.docIntVerNum;
    this.AddDocumentinfo.Doc_Phy_Valut_Loc = this.UpdateForm.value.docPhyValLoc;

    if (this.selectedprocessownerType == 1) {
      let approver: string | null = localStorage.getItem('processOwner');
      this.AddDocumentinfo.Doc_process_Owner = approver !== null ? approver : undefined;
    }
    else {
      this.AddDocumentinfo.Doc_process_Owner = this.UpdateForm.value.docProcOwner;
    }


    if (this.selecteddocapproverType == 1) {
      let approver: string | null = localStorage.getItem('docApprover');
      this.AddDocumentinfo.Doc_Approver = approver !== null ? approver : undefined;

    }
    else {
      this.AddDocumentinfo.Doc_Approver = this.UpdateForm.value.docApprover;
    }


    this.AddDocumentinfo.Date_Doc_Approver = this.UpdateForm.value.dateOfDocApprovel;
    this.AddDocumentinfo.Date_Doc_Revision = this.UpdateForm.value.docLastRevDate;
    this.AddDocumentinfo.AuthorityTypeID = this.UpdateForm.value.pubAutType;
    this.AddDocumentinfo.AuthoritynameID = this.UpdateForm.value.NameOfAuth;
    this.AddDocumentinfo.NatureOf_Doc_id = this.UpdateForm.value.NatureOfDoc;
    //this.AddDocumentinfo.Keywords_tags = this.UpdateForm.value.Keywords;

    const UpdateKeywords = this.UpdateForm.value.Keywords;
    
    if (Array.isArray(UpdateKeywords) && UpdateKeywords.length > 0) {
      this.AddDocumentinfo.Keywords_tags = UpdateKeywords.join(', ');
      // Additional code inside the condition if needed
    } else {
      // Handle the case where no value is selected (null or empty array)
      console.log('No key values');
    }
    //3rd Stepper
    if (this.isPanelVisible == true) {
      this.AddDocumentinfo.freq_period = parseInt(this.UpdateForm.value.freq_period);
      this.AddDocumentinfo.freq_period_type = this.UpdateForm.value.freq_period_type;

      this.AddDocumentinfo.review_start_Date = this.UpdateForm.value.review_start_Date;
    }

    if (this.isdoclinkpanelVisible == true) {
      if (this.UpdateForm.value.pubdoc != "") {
        this.AddDocumentinfo.pub_doc = this.UpdateForm.value.pubdoc;
      }

    }


    this.AddDocumentinfo.publisher_comments = this.UpdateForm.value.publishercomments;
    this.AddDocumentinfo.indicative_reading_time = parseInt(this.UpdateForm.value.indicativereadingtime);
    this.AddDocumentinfo.Time_period = this.UpdateForm.value.timeperiod;




    console.log(JSON.stringify(this.AddDocumentinfo))


  }




  //Document Attributes Code 

  getAuthorityType() {
    this.http.get(URL + '/AuthorityTypeMaster/GetAuthorityTypeMasterDetails').subscribe((data: any) => {
      this.AuthorityTypeArray = data;

    })

  }
  getAuthorityNamebyId(id: any) {

    console.log('Selected authorityTypeID:', id.value);

    this.authorityTypeID = id;

    if (this.authorityTypeID) {
      this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.authorityTypeID).subscribe((data: any) => {
        this.AuthorityName = data;
      });
    } else {
      //alert('docTypeID is null or undefined'); // Add some error handling
    }
  }

  getNatureOfDocument() {
    this.http.get(URL + '/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data: any) => {
      this.NatureOfDocument = data;

    })

  }









  selectDoc(event: any) {

    console.log('Selected:', event.value);

    if (event.value === 1) {

      // this.General = true;

      // this.confidential=false;

      this.phoneno = false;

    }

    else {

      this.phoneno = true;

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
    this.UpdateForm.get('OtpMethod')?.setValue("N/A");
  }

  else {

    this.phoneno=true;
    this.UpdateForm.get('OtpMethod')?.setValue("email");
    // this.General = false;

    // this.confidential=true;

  }

}

  selectProcessOwner(event: any) {

    console.log('Selected process owner:', event.value);
    // Clear localStorage and component state when switching modes
    localStorage.removeItem('processOwner');
    this.processOwner = null;
    if (event.value === 2) {
      //console.log("if 2");
      // this.General = true;

      // this.confidential=false;

      this.TextBox = true;
      this.DropdownBox = false;

      this.gridBoxValue = [];
      //this.form.get('Doc_process_Owner_Text').setValue(''); // Clear textbox value
      //localStorage.removeItem('processOwner'); // Clear localStorage
      console.log("textviewchange", JSON.stringify(localStorage.getItem('processOwner')))
    }

    else {
      //console.log("else 1");
      this.TextBox = false;
      this.DropdownBox = true;

      // this.General = false;

      // this.confidential=true;s

      //this.processOwner = null; // Clear dropdown selection
      //localStorage.removeItem('processOwner'); // Clear localStorage
      console.log("listviewchange", JSON.stringify(localStorage.getItem('processOwner')))
    }

  }

  selectdocApprover(event: any) {

    console.log('Selected:', event.value);
    console.log('Selected document Approver:', event.value);
    // Clear localStorage and component state when switching modes
    localStorage.removeItem('docApprover');
    this.docApprover = null;
    //this.gridBoxValue1=[];
    if (event.value === 1) {

      // this.General = true;

      // this.confidential=false;

      this.TextBox2 = false;
      this.DropdownBox2 = true;

      console.log("listviewchange", JSON.stringify(localStorage.getItem('docApprover')))
    }

    else {

      this.TextBox2 = true;
      this.DropdownBox2 = false;

      // this.General = false;

      // this.confidential=true;
      console.log("textviewchange", JSON.stringify(localStorage.getItem('docApprover')))
    }

  }
  docApprover_displayExpr(usR_ID: any) {

    this.docApprover = usR_ID.firstname;
    const userId = usR_ID.id;
    localStorage.setItem('docApprover', this.docApprover);
    console.log("docApprover_displayExpr", JSON.stringify(localStorage.getItem('docApprover')))
    //localStorage.setItem('username_${userId}',this.username)
    return usR_ID.firstname && `${usR_ID.firstname} , ${usR_ID.department_Master_name} `;
  }
  OnTextboxChange(event: any) {
    // Your logic here
    // For example, updating the processOwner variable
    this.processOwner = event.target.value;
    //console.log(this.processOwner)
    localStorage.setItem('processOwner', this.processOwner);
    console.log("ONTEXTBOXCHANGE", JSON.stringify(localStorage.getItem('processOwner')))
  }

  OnDocApproverChange(event: any) {
    // Your logic here
    // For example, updating the processOwner variable
    this.docApprover = event.target.value;
    //console.log(this.processOwner)
    localStorage.setItem('docApprover', this.docApprover);
    console.log("OnDocApproverTextbox", JSON.stringify(localStorage.getItem('docApprover')))
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


    console.log('Checkbox for Document review frequency changed:', event.target.checked);
    this.isPanelVisible = event.target.checked;


  }
  ondoclinkChange(event: any) {

    console.log('Checkbox for Document Linking changed:', event.target.checked);
    this.isdoclinkpanelVisible = event.target.checked;

  }



  SelectFrequencyPeriod(event: any) {

    console.log('Selected:', event.value);



    if (event.value === 1) {



      this.TextBox1 = true;

    }
    else if (event.value === 2) {



      this.TextBox1 = true;

    }
    else if (event.value === 3) {


      this.TextBox1 = true;

    }
    else if (event.value === 4) {


      this.TextBox1 = true;

    }

    else {

      this.TextBox1 = false;



    }

  }

  changeTimePeriod(event: any) {

    console.log('Selected Time period', event.value);



  }



}
