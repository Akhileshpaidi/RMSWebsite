import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef,NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup,FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { ImportRemedyComponent } from '../../report/import-remedy/import-remedy.component';
import { ReportService } from 'src/app/core/services/report/report.service';



import { DocCategory} from 'src/app/inspectionservices.service';

import { ValueType, Workbook } from 'exceljs';
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

import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent,
} from 'devextreme-angular';

import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import {  ElementRef, ViewChild } from '@angular/core';
import { roleComponentIdList } from 'src/app/shared/comsponent-list';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-doc-rev-period-status',
  templateUrl: './doc-rev-period-status.component.html',
  styleUrls: ['./doc-rev-period-status.component.scss']

})
export class DocRevPeriodStatusComponent {
  @ViewChild('Obj_Doc') textarea!: ElementRef;
  gridColumns:any=[  {
    dataField: 'title_Doc', caption: 'Title' },
    { dataField: 'sub_title_doc', caption: 'Sub Title', visible: false,
    },
    { dataField: 'document_Id', caption: 'Document ID' },
    {dataField: 'versionControlNo',caption: 'Version No.' },
   { dataField: 'publisher_name',caption: 'Name of Uploader' },
    { dataField: 'noofDays', caption: 'No of Days'},
      
 'docTypeName','doc_CategoryName','doc_SubCategoryName',
 { dataField: 'review_start_Date',caption: 'Review Start Date',dataType:'date', format:'dd-MMM-yyyy' },'validations']
  Selectedtopic:any;
  usR_ID :any;
   gridDataSource: any;
   Documentcategory:any;
   processOwner:any;
   DocCategory:any;
   adddocId:any;
  docApprover: any;
  NameOfAuth:any;
   //TextBox=false;
  authoritynameID: any;
  Check_Doc_Rev_Freq:any;
  Check_Doc_Link:any;
   visiblestepper=false;
   selectedDocTypeID: any; // Change the type to match your data type
   selectedDocCategoryID: any; // Change the type to match your data type
   selectedDocSubCategoryID: any; // Change the type to match your data type
   title: string = ''; // Example for a string property
   subTitle: string = ''; // Example for a string property
   objective: string = ''; // Example for a string property
   reportForm!: FormGroup;
   selectedOption:any;
   gridData:any;
   freq_period:any;
   visibleStepper:any;
   formdata!: DxFormModule;
   DocumentTypeData:any;
   DocumentCategoryData:any;
   DocumentSubCategoryData:any;
   AuthorityTypeData:any;
   AuthorityNameData:any;
   //NatureOfDocument:any;
   freq_period_type:any;
   AddDocId:any;
  
   selectedFile: File | null = null;
   UpdateForm:FormGroup;
   form:any;
    daysDifference:any
    // reviewstatus:any;
  gridData1: any ;
  router: any;
  doc_CategoryID : any;
  SelectedDocCategory: any;
  SelectedDocType:any;
  docTypeID:any;
  SelectedAuthType:any;
  datePipe: any;
userdata: any = [];
  
  ngOnInit(): void {
    let user: any = this.session.getUser();
    // console.log(user)
    this.userdata = JSON.parse(user);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    const userId = this.userdata.profile.userid;

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
      Initial_creation_doc_date:''
    });

   this.visibleStepper=false;
   
  }
  isGridBoxOpened: boolean;
  gridBoxValue: number[] = [2];
  NatureOfDocument: any[] = [];

  constructor(private http: HttpClient, private ref: ChangeDetectorRef,private Router: Router, private route: ActivatedRoute,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
    private report: ReportService,
   private zone: NgZone,
   
    private formBuilder: FormBuilder,)
     {
     this.isGridBoxOpened = false;
     this.getNatureOfDocument();

     this.UpdateForm = this.formBuilder.group({
      reviewstartdate: [''], // Initialize form controls
      datedocrevision: [''],
      reviewstatus: [''],
      docLastRevDate:[''],
      Initialcreationdocdate:[''],
      subtitle:[''],
      doctitle:[''],
      objective:[''],
      DocIntervernum:[''],
      NoofDays:[''],
      docTypeID:[''],
      docCategory: [''],
      Doc_internal_num:[''],
      Doc_SubCategoryID:[''],
      NatureOf_Doc_id:[''],
      DocumentOwner:[''],
      AuthoritynameID:[''],
      freq_period:[''],
      NameOfAuth:['']  ,
      freq_period_type:[''],   
      docApprover:[''] 
      // Add other form controls here
    });


    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
//Role id
   const rolesArray = parsedData && parsedData.role.roles;
    const firstRole = rolesArray && rolesArray.length > 0 ? rolesArray[0] : null;
// Extract roleid from the first role, or set to null if no roles
const RoleId = firstRole ? firstRole.roleid : null;
console.log('RoleId:', RoleId);


      // this.checkboxForm = this.formBuilder.group({
      //   isChecked: false,
      //   isChecked2:false
      // });


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



  this.DocumentCategoryData={
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




  this.DocumentSubCategoryData={
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



  // this.NatureOfDocument={
  //   paginate: true,
  //   store: new CustomStore({
  //       key: 'Value',
  //       loadMode: 'raw',
  //       load:()=>{return new Promise((resolve, reject) => {
  //         this.http.get(URL + '/NatureOfDocument/GetNatureOfDocumentDetails', {headers})
  //           .subscribe(res => {
  //            (resolve(res));

  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  //     },
  //   }),
  // };




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

  // this.form = this.fb.group({
     //formArray: this.fb.array([
      this.form =  this.formBuilder.group ({
      DocTypeID: ['', Validators.required],
      Doc_CategoryID: ['', Validators.required],
      Doc_SubCategoryID: ['', Validators.required],
      Title_Doc: ['', Validators.required],
      Sub_title_doc: ['', Validators.required],
      Obj_Doc: ['', Validators.required],
     })


//UserId
  const Userid = parsedData ? parsedData.profile.userid : null;
  console.log('User id:', Userid);

console.log('Parsed value:', parsedData);
// alert(RoleId)
// alert(Userid)
this.gridDataSource={
  paginate: true,
  store: new CustomStore({
      key: 'addDoc_id',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/SavedDraftDocuments/GetPublishedData2/'+RoleId+ '/' +Userid, {headers})
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

  gridBox_displayExpr(addDoc_id:any) {
    return addDoc_id && `${addDoc_id.title_Doc}   `;
  }


  onDropdownValueChanged(event:any) {
    // alert(this.adddocId)
    // alert(JSON.stringify(this.gridData))
     this.isGridBoxOpened = false;
    this.visibleStepper=true;
    debugger;
         console.log("selected Type id: ", event.value);
     this.adddocId = event.value;
       this.selectedOption=this.adddocId ;
    


  //console.log(JSON.stringify(this.gridData))
  // this.http.get(URL + '/SavedDraftDocument/GetPublishedDatabyid/'+this.addDoc_id, {headers})

     this.http.get(URL+'/DocReviewStatus/GetDocReviewStatusbyid/'+this.adddocId).subscribe((data:any)=>{

//alert(JSON.stringify(data))
      if (Array.isArray(data) && data.length > 0) {

             const PubList = data[0]; // Access the first element of the array
             //alert(JSON.stringify(PubList))
             let AuthNameid = PubList.authorityTypeID;
             this.usR_ID = PubList.usR_ID;

             let docid=PubList.docTypeID;
         
             this.UpdateForm.controls['docTypeID'].setValue(PubList.docTypeID);
             this.Documentcategory = this.makeAsyncDataSourceDocumentCategory(this.http,docid);


           
           this.Documentcategory.load().then((data: any) => {
           this.zone.run(() => {
             this.UpdateForm.controls['docCategory'].setValue(PubList.doc_CategoryID);
             this.ref.detectChanges();
           });
          });

          let doc_CategoryID=PubList.doc_CategoryID;

          this.DocumentSubCategoryData = this.makeAsyncDataSourceSubDocumentCategory(this.http,doc_CategoryID);


         
           this.DocumentSubCategoryData.load().then((data: any) => {
           this.zone.run(() => {
             this.UpdateForm.controls['Doc_SubCategoryID'].setValue(PubList.doc_SubCategoryID);
             this.ref.detectChanges();
           });
          });
          this.UpdateForm.controls['subtitle'].setValue(PubList.sub_title_doc);
          this.UpdateForm.controls['doctitle'].setValue(PubList.title_Doc);
          this.UpdateForm.controls['objective'].setValue(PubList.obj_Doc);
       
          
           this.UpdateForm.controls['Initialcreationdocdate'].setValue(PubList.initial_creation_doc_date);
           this.UpdateForm.controls['docLastRevDate'].setValue(PubList.date_Doc_Revision);
           // this.UpdateForm.controls['NameOfAuth'].setValue(PubList.authorityName);
            this.UpdateForm.controls['freq_period'].setValue(PubList.freq_period +" " + PubList.freq_period_type);
            //this.UpdateForm.controls['freq_period_type'].setValue(PubList.freq_period_type);
            this.UpdateForm.controls['docApprover'].setValue(PubList.doc_Approver);
this.UpdateForm.controls['Doc_internal_num'].setValue(PubList.doc_internal_num);
this.UpdateForm.controls['NatureOf_Doc_id'].setValue(PubList.natureOf_Doc_id);


this.UpdateForm.controls['DocIntervernum'].setValue(PubList.doc_Inter_ver_num);
// let reviewStartdate:any = PubList.review_start_Date;
// const dte=reviewStartdate.toString().split('-')[2].toString().split(' ')[0]+'-'+reviewStartdate.toString().split('-')[1]+'-'+reviewStartdate.toString().split('-')[0];

//   this.UpdateForm.controls['reviewstartdate'].setValue(dte);
  this.UpdateForm.controls['reviewstartdate'].setValue(PubList.review_start_Date);

  this.UpdateForm.controls['reviewstatus'].setValue(PubList.validations);

  this.UpdateForm.controls['NoofDays'].setValue(PubList.noofDays);

  this.UpdateForm.controls['DocumentOwner'].setValue(PubList.doc_process_Owner);

  this.authoritynameID = this.makeAsyncDataSource1(this.http, AuthNameid);
        this.authoritynameID.load().then((data: any) => {

          this.zone.run(() => {
            this.UpdateForm.controls['AuthoritynameID'].setValue(PubList.authoritynameID);

            this.ref.detectChanges();
          });

        });

        setTimeout(() => this.resize(), 0);

// if (this.daysDifference >= 0 && this.daysDifference <= 30) {
// this.UpdateForm.controls['reviewstatus'].setValue("Take Immediate Action");
// }
// else if (this.daysDifference < 0) {

// //this.daysDifference=0;
// this.UpdateForm.controls['reviewstatus'].setValue("Expired");
// }
// else if (this.daysDifference >= 31 && this.daysDifference <= 60 ) {

// this.UpdateForm.controls['reviewstatus'].setValue("Expiring Soon");

// }
// else  if (this.daysDifference >= 60 )
// {

// this.UpdateForm.controls['reviewstatus'].setValue("Not Due");
// }

//const day: number = parseInt(parts[0]);

//const dateDocRevision :number = parseInt(parts[0]);
//alert(dateDocRevision)
// const immediateActionDays = 30;
//  const expiredDays = 0;
//         const expiringSoonStart = 31;
//         const expiringSoonEnd = 60;
const reviewStartDate1 :any= (PubList.review_start_Date);
const parts1 = reviewStartDate1.split('-');

//  const day1: number = parseInt(parts1[0]);

//  const reviewStartDate :number = parseInt(parts1[0]);
const today_Date:any=PubList.today_Date;
const parts = today_Date.split('-');
        const date1: Date = new Date(reviewStartDate1);
        const date2: Date = new Date(today_Date);

        if (!isNaN(date1.getTime())) {
        //  const timeDifference: number = date2.getTime() - date1.getTime(); // Difference in milliseconds
          const timeDifference: number = date1.getTime() - date2.getTime(); // Difference in milliseconds

          this.daysDifference   = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
         // alert(  this.daysDifference)


        } else {
          console.log('Invalid date format for reviewStartDate1');
        }


//this.daysDifference = (reviewStartDate- dateDocRevision) ;



   }




      // console.log(JSON.stringify(data))
      // this.UpdateForm.patchValue({
      //   documenttype: data.docTypeName,
      //   docCategory: data.doc_CategoryName,
      //   docsubCat: data.doc_SubCategoryName,
      //   doctitle: data.title_Doc,
      //   subtitle: data.sub_title_doc,
      //   objective: data.obj_Doc
      // });
  }
     )


  }
  public project4: any[] = [
    { id: 1, name: 'Days' },

    { id: 2, name: 'Week' },
    { id: 3, name: 'Month' },
    { id: 4, name: 'Year' }


  ];
  onInput() {
    this.resize();
   }
   private resize() {
     const textareaElement = this.textarea.nativeElement;
     //textareaElement.style.overflow = 'hidden';
     textareaElement.style.height = 'auto';
     textareaElement.style.height = textareaElement.scrollHeight + 'px';
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
  getNatureOfDocument() {
    this.http.get(URL + '/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data: any) => {
      this.NatureOfDocument = data;

    })

  }
  makeAsyncDataSourceDocumentCategory(http:HttpClient,doccategoryid:any) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_CategoryID',
      load() {
        return lastValueFrom(http.get(`${URL}/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/${doccategoryid}`, { headers }));
      },
    });
  }

  makeAsyncDataSourceSubDocumentCategory(http:HttpClient,docsubcategoryid:any) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'doc_SubCategoryID',
      load() {
        return lastValueFrom(http.get(`${URL}/DocSubCategory/GetDocSubCategoryModelDetailsbyId/${docsubcategoryid}`, { headers }));
      },
    });
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
   
  //  getFormattedDate(dateString: string): string {
  //   // Parse the date string into a JavaScript Date object
  //   const date = new Date(dateString);

  //   // Format the date to 'yyyy-MM-dd'
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // }
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
   OnTextboxChange(event: any) {
    // Your logic here
    // For example, updating the processOwner variable
    this.processOwner = event.target.value;
    //console.log(this.processOwner)
    localStorage.setItem('processOwner', this.processOwner);
   console.log("ONTEXTBOXCHANGE",JSON.stringify(localStorage.getItem('processOwner')))
  }
  // onGridBoxOptionChanged1(e: { name: string; }) {
  //   if (e.name === 'value') {
  //     this.isUserBoxOpened1 = false;
  //     this.ref.detectChanges();
  //   }
  // }
  OnDocApproverChange(event: any) {
    // Your logic here
    // For example, updating the processOwner variable
    this.docApprover = event.target.value;
    //console.log(this.processOwner)
    localStorage.setItem('docApprover', this.docApprover);
    console.log("OnDocApproverTextbox", JSON.stringify(localStorage.getItem('docApprover')))
  }

   onSubmit() {
    if (this.form.valid) {
        const formData: FormData = new FormData();

        // Append the file to formData, if there's a selected file
        if (this.selectedFile) {
            formData.append('File', this.selectedFile, this.selectedFile.name);
        }

        // Append other form values to formData
        Object.keys(this.form.controls).forEach(key => {
            formData.append(key, this.form.get(key).value);
        });
         console.log(JSON.stringify(formData))
        this.http.post(URL + '', formData)
            .subscribe(
                (response: any) => {
                    alert('Data saved successfully ');
                    console.log('Data saved successfully:', response);
                },
                (error: any) => {
                    console.error('Error saving data:', error);
                }
            );
    } else {
        alert("FORM INVALID");
    }
  }

  onClickButton(selectedvalue: any) {
     console.log('Form values:', selectedvalue.value); // Check the form values in the console
    this.adddocId = selectedvalue.value;// Retrieve the entire form data
    // Navigating to another page with queryParams
    this.Router.navigate(['/dashboard/inspection/document-review-disable'], {
      //queryParams: { adddocId: this.selectedOption,NoofDays:this.UpdateForm.controls['NoofDays'].value,reviewstatus:this.UpdateForm.controls['reviewstatus'].value ,reviewstartdate:this.UpdateForm.controls['reviewstartdate'].value }
      queryParams: { adddocId: this.selectedOption}
      
    });
  }

  onClickButton2(selectedvalue: any) {
   
    //console.log('Form values:', this.selectedOption.value); 
    this.adddocId = selectedvalue.value;
        //const formData = this.UpdateForm.value; // Retrieve the entire form data

    // Navigating to another page with queryParams
    this.Router.navigate(['/dashboard/inspection/document-review-version-change'], {
      queryParams: { adddocId: this.selectedOption,NoofDays:this.UpdateForm.controls['NoofDays'].value,reviewstatus:this.UpdateForm.controls['reviewstatus'].value }

      
    });
  }


  onClickButton1(selectedvalue: any) {
      console.log('Form values:', selectedvalue.value); 
    this.adddocId = selectedvalue.value;
  
    this.Router.navigate(['/dashboard/inspection/document-review-update'], {
      queryParams: { adddocId: this.selectedOption,NoofDays:this.UpdateForm.controls['NoofDays'].value,reviewstatus:this.UpdateForm.controls['reviewstatus'].value, Useridvalue:this.usR_ID

       }
    });
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
}
