import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, enableProdMode } from '@angular/core';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DefaultNotifiers, DocumentType} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { loadMessages } from 'devextreme/localization';
import { DxDataGridComponent } from 'devextreme-angular';
import { Column } from 'devextreme/ui/data_grid';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';

import { DxDataGridModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { DxTextBoxModule } from 'devextreme-angular';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  if (!/localhost/.test(document.location.host)) {
    enableProdMode();
  }
@Component({
  selector: 'app-default-notifier',
  templateUrl: './default-notifier.component.html',
  styleUrls: ['./default-notifier.component.scss']
})

export class DefaultNotifierComponent {

  yourDataSource = [
    { userEmailIDs: ['example1@gmail.com', 'example2@gmail.com'] }
  ];
  userdatalist:any;
   simpleProducts:string[] = [
    
  ];
  // @ViewChild('Obj_Doc') textarea!: ElementRef;
  // Notifier!:FormGroup;
  // DocumentTypeData:any;
  // docTypeID:any;
  // SelectedDocType:any;
  // DocumentCategoryData:any;
  // doc_CategoryID : any;
  // SelectedDocCategory: any;
  // DocumentSubCategoryData:any;

//   constructor(private http: HttpClient , private router: Router,private fb:FormBuilder,private dialog:MatDialog) {

//   this.DocumentTypeData={
//     paginate: true,
//     store: new CustomStore({
//         key: 'Value',
//         loadMode: 'raw',
//         load:()=>{return new Promise((resolve, reject) => {
//           this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails', {headers})
//             .subscribe(res => {
//              (resolve(res));

//             }, (err) => {
//               reject(err);
//             });
//       });
//       },
//     }),
//   };
//   }
//   ngOnInit(): void {
//     this.Notifier=this.fb.group({
//       DefaultNotifiersID :'',

//       DocumentType :'',
//       DocumentCategory :'',
//       DocumentSubCategory:'',
//       UserEmailIDs :'',
//     })
//   }
//   onInput() {
//     this.resize();
//    }
//    private resize() {
//     const textareaElement = this.textarea.nativeElement;
//     //textareaElement.style.overflow = 'hidden';
//     textareaElement.style.height = 'auto';
//     textareaElement.style.height = textareaElement.scrollHeight + 'px';
//   }
//   getDocCategory(event: any) {
//     console.log("selected Type id: ", event.value);
//     this.docTypeID = event.value;
//      this.SelectedDocType=null;
//     this.DocumentCategoryData={
//       paginate: true,
//       store: new CustomStore({
//           key: 'Value',
//           loadMode: 'raw',
//           load:()=>{return new Promise((resolve, reject) => {
//             this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+this.docTypeID, {headers})
//               .subscribe(res => {
//                (resolve(res));

//               }, (err) => {
//                 reject(err);
//               });
//         });
//         },
//       }),
//     };
//    }
//    getsubCategory(event: any) {
//     console.log("selected Type id: ", event.value);
//     this.doc_CategoryID = event.value;
//      this.SelectedDocCategory=null;
//     this.DocumentSubCategoryData={
//       paginate: true,
//       store: new CustomStore({
//           key: 'Value',
//           loadMode: 'raw',
//           load:()=>{return new Promise((resolve, reject) => {
//             this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.doc_CategoryID, {headers})
//               .subscribe(res => {
//                (resolve(res));

//               }, (err) => {
//                 reject(err);
//               });
//         });
//         },
//       }),
//     };
//    }
//    Save(){

//     let postdata={
//       'DefaultNotifiersID' :0,

//       'DocumentType' :this.Notifier.value.DocumentType,
//       'DocumentCategory' :this.Notifier.value.DocumentCategory,
//       'DocumentSubCategory' :this.Notifier.value.DocumentSubCategory,
//       'UserEmailIDs' :this.Notifier.value.UserEmailIDs,
//     }
//    alert(JSON.stringify(postdata))
//     this.http.post(`${BASE_URL}/DefaultNotifiers/SaveDefaultNotifiers`,postdata,{headers}).subscribe((response:any)=>{

//       this.dialog.open(DaidailogeComponent,{
//           width:'550px',data:{message:response}
//       })  ;
//       // dialogRef.afterClosed().subscribe(result => {
//       //   window.location.reload();
//       // });

//     }
//   )}

// Cancel(){
//   this.reloadComponent();
// }
// reloadComponent() {
//   const currentUrl = this.router.url;
//   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//     this.router.navigate([currentUrl]);
//   });
// }
dataSource:any;
DocumentType:any;
DocumentCategory:any;
DocumentSubCategory:any;
DocumentCategoryData:any;
DocSubCategoryData:any;
tblUsers:any;
DefaultNotifiersinfo:DefaultNotifiers=new DefaultNotifiers();
  editableProducts: any[]=[];
   docTypeID: any;
   doc_CategoryID: any;
   doc_SubCategoryID: any;
   emailid:any;
   additional_emailid_notifiers:any;
 // item:any;
ngOnInit(): void {
  loadMessages({
      "en": {
         // "dxDataGrid-editingDeleteRow": "Delete",
         // "dxDataGrid-editingAddRow": "Add Document Type"
      }
    });
}
getemailids(data: any) {
  if (data && data.value) {
    return data.value.toString().split(',');
  }
  return [];
}
onValueChanged1(event: any, data: any) {
  data.setValue(event.value);
  this.ref.detectChanges();

}
setDocumentTypeValue(this: Column, newData: any, value: number, currentRowData: any) {
 
  newData.doc_CategoryID = null;
  if (this.defaultSetCellValue !== undefined) {
    this.defaultSetCellValue(newData, value, currentRowData);
  } else {
    // Handle the case where defaultSetCellValue is undefined
    // This could be logging an error or providing default behavior
    console.error('defaultSetCellValue is undefined');
    // Provide a default behavior or any necessary action
  }
}
setSubDocValue(this: Column, newData: any, value: number, currentRowData: any) {

  newData.doc_SubCategoryID = null;
  if (this.defaultSetCellValue !== undefined) {
    this.defaultSetCellValue(newData, value, currentRowData);
  } else {
       console.error('defaultSetCellValue is undefined');
     }
}
constructor(private http: HttpClient,private ref: ChangeDetectorRef) {

  

  this.http.get(URL + '/tblUsers/GettblUsersDetailswithentity', {headers})
  .subscribe(res => {
    this.userdatalist=res as any;
    this.simpleProducts.splice(0,this.simpleProducts.length)
    this.userdatalist.forEach((element:any) => {
      this.simpleProducts.push(element.firstname)
    });
    

   

  });

  
  this.dataSource = new CustomStore({
      key: 'defaultNotifiersID',
      load: () => this.sendRequest(URL + '/DefaultNotifiers/GetDefaultNotifiersDetails'),
      
      insert: (values) => this.sendRequest(URL + '/DefaultNotifiers/InsertDefaultNotifiersDetails', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/DefaultNotifiers/UpdateDefaultNotifiersDetails', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest(URL + '/DefaultNotifiers/DeleteDefaultNotifiersDetails', 'DELETE', {
           key
       })
  });

this.DocumentType={
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

this.tblUsers={
  paginate: true,
  store: new CustomStore({
      key: 'usR_ID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/tblUsers/GettblUsersDetails', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
};

this.GetDocSubCategory = this.GetDocSubCategory.bind(this);
this.getDocumentCategory = this.getDocumentCategory.bind(this);

}
cellTemplate(container:any, options:any) {
  const noBreakSpace = '\u00A0';

  const assignees = (options.value || []).map(
    (assigneeId: number) => options.column!.lookup!.calculateCellValue!(assigneeId),
  );
  const text = assignees.join(', ');

  container.textContent = text || noBreakSpace;
  container.title = text;
}
getDocumentCategory(options:any) {
  console.log('inside method')
  console.log(options);
 
  const filteredData = {
    store:  new CustomStore({
      key: 'doc_CategoryID',
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
    filter: options.data ? ['docTypeID', '=', options.data.docTypeID] : null,
  };

  console.log('Filtered Data:', filteredData);
  return filteredData;
}

GetDocSubCategory(options:any){
   console.log('inside method')
  console.log(options);
let filteredData:any = [];

   filteredData = {
    store:  new CustomStore({
      key: 'doc_SubCategoryID',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        
        this.http.get(URL + '/DocSubCateg/GetDocSubCategDetails', {headers})
      
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
   filter: options.data ? ['doc_CategoryID', '=', options.data.doc_CategoryID] : null,
  };

 
  console.log('Filtered Data:', filteredData);
  return filteredData;
}
onChangeParams() {
  //alert('onchange');
}
setMissionValue(rowData: any, value: any): void {
  // alert(value)
  rowData.docTypeID = value
}


// onCustomItemCreating(e: any) {
//   const newValue = e.text;
  
//   if (this.validateEmailFormat(newValue)) {
//    e.customItem = {usR_ID:newValue,firstname:newValue,emailid:newValue};
//   } else {
//     e.customItem = null;
//     e.cancel = true;
//     alert("Enter Valid Email ID")
//   }
// }

onCustomItemCreating1(e: any, data1:any) {
  const newValue1 = e.text;
  
  if (this.validateEmailFormat(newValue1)) {
  
    e.customItem = newValue1;
  } else {
    e.customItem = null;
    e.cancel = true;
    alert("Enter Valid Email ID")
    setTimeout(() => {
      const currentTags = data1.value.slice(); // Copy the current tags
      const index = currentTags.indexOf(newValue1);
      if (index > -1) {
        currentTags.splice(index, 1); // Remove the invalid email
        data1.setValue(currentTags); // Update the tags
      }
    }, 0);
  }
}

// validateEmail(params: any) {
//   return this.validateEmailFormat(params.value);
// }
 
validateEmailFormat(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
onEditorPreparing(e:any) {
  
  if (e.parentType === 'dataRow' && e.dataField === 'doc_CategoryID') {
   console.log('onEditorPreparing')
    e.editorOptions.disabled = (typeof e.row.data.docTypeID !== 'number');
  }
}
sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
  let result;

  switch(method) {
      case 'GET':
          return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
              .subscribe(res => {
               (resolve(res));
           //    alert(JSON.stringify(res))
              }, (err) => {
                reject(err);
              });
        });
          break;
      case 'PUT':
    //  alert('put')
         this.updateParameters(data);
        
         return new Promise((resolve, reject) => {
          this.http.put(url,this.DefaultNotifiersinfo,{headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err.error);
            });
          });
          break;
      case 'POST':
   
         this.insertParameters(data);
         return new Promise((resolve, reject) => {
          this.http.post(url,this.DefaultNotifiersinfo,{headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err.error);
            });
          });
        //  let postdata={
        //  "docTypeID":this.docTypeID,
        //   "doc_CategoryID":this.doc_CategoryID,
        //   "doc_SubCategoryID":this.doc_SubCategoryID,
       
        //  "emailid": this.emailid,
        //  "additional_emailid_notifiers":this.additional_emailid_notifiers,
        //  }
        //  alert(postdata)
        //  this.http.post(URL + '/DefaultNotifiers/SaveDefaultNotifiers',postdata,{headers})
        //  .subscribe((response: any) => {
        //    console.log('Data Save Succefully ', response);
        //  window.alert('Data Saved Successfully');
        //    this.reloadComponent();
        //  },
        //  (error: any) => {
          
        //    window.alert('Error Saving Data');
        //  });
          break;
      case 'DELETE':
        return new Promise((resolve, reject) => {
          this.http.delete(url+'?id='+data.key)
            .subscribe(res => {
             (resolve(res));
            }, (err) => {
              reject(err);
            });
          });
          break;
  }



}
  reloadComponent() {
    throw new Error('Method not implemented.');
  }
insertParameters(data:any={}){
  
  this.DefaultNotifiersinfo.defaultNotifiersID=0;
  this.params(data);
 }
 
 updateParameters(data:any={}){
 this.DefaultNotifiersinfo.defaultNotifiersID=data.key;
  this.params(data);
 }
 
 params(data:any={}){
   this.DefaultNotifiersinfo.docTypeID=data.values.docTypeID;
   this.DefaultNotifiersinfo.doc_CategoryID=data.values.doc_CategoryID;
   this.DefaultNotifiersinfo.doc_SubCategoryID=data.values.doc_SubCategoryID;

   //this.DefaultNotifiersinfo.emailid =data.values.emailid.join(",");
  this.DefaultNotifiersinfo.emailid = (data.values.emailid!=null)?data.values.emailid.join(","):null;
  this.DefaultNotifiersinfo.additional_emailid_notifiers=(data.values.additional_emailid_notifiers!=null)?data.values.additional_emailid_notifiers.join(","):null;
//alert(JSON.stringify( this.DefaultNotifiersinfo))
   //this.DefaultNotifiersinfo.additional_emailid_notifiers=data.values.additional_emailid_notifiers.join(",");
  //  this.docTypeID = data.values.docTypeID;
  //  this.doc_CategoryID = data.values.doc_CategoryID;
  //  this.doc_SubCategoryID = data.values.doc_SubCategoryID;
  //  this.emailid=data.values.emailid.join(",");
  //  this.additional_emailid_notifiers=data.values.additional_emailid_notifiers.join(",");
  //alert(JSON.stringify(this.DocumentTypeinfo));

  this.ref.detectChanges();
  
 }

 getCategoryData() {

  // console.log("selected Type id: ", event.value);
  // this.docTypeID = event.value;
  
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
 }
 getsubCategoryData() {
  this.DocSubCategoryData={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/DocSubCateg/GetDocSubCategDetails', {headers})
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
 onValueChanged(evt: any, data: any): void {  
 
   data.setValue(evt.value);  
   
   this.ref.detectChanges();
 }  



 exportGrid(e:any) {
   if (e.format === 'xlsx') {
     const workbook = new Workbook(); 
     const worksheet = workbook.addWorksheet("Main sheet"); 
     worksheet.addRow(['Document Types']);
     worksheet.addRow([]);
     exportDataGrid({ 
       worksheet: worksheet, 
       component: e.component,
     }).then(function() {
       workbook.xlsx.writeBuffer().then(function(buffer) { 
         saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Defaultnotifiers.xlsx"); 
       }); 
     }); 
     e.cancel = true;
   } 
   else if (e.format === 'pdf') {
     const doc = new jsPDF();
     doc.text('Document Type',88,10);// name indicate header and values for Adujstment
     doc.setFontSize(12);
     exportDataGridToPdf({
       jsPDFDocument: doc,
       component: e.component,
     }).then(() => {
       doc.save('Defaultnotifiers.pdf');
     });
   }
 }
}
