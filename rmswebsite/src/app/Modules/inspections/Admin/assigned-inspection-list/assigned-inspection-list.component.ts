    
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DocSubCategory} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ChangeDetectorRef } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular';
import { Column } from 'devextreme/ui/data_grid';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-assigned-inspection-list',
  templateUrl: './assigned-inspection-list.component.html',
  styleUrls: ['./assigned-inspection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignedInspectionListComponent implements OnInit {

  dataSource: any;
  
  user:any;
  SelectedType:any;
  docTypeID:any;
  DocumentTypeData:any;
  DocumentCategoryData:any;
  DocumentCategoryData1:any;
  DocumentSubCategoryinfo:DocSubCategory=new DocSubCategory();
  selectedDocumentType: any; 
  ngOnInit(): void {
   
  }
  onEditorPreparing(e:any) {
  
    if (e.parentType === 'dataRow' && e.dataField === 'doc_CategoryID') {
     console.log('onEditorPreparing')
      e.editorOptions.disabled = (typeof e.row.data.docTypeID !== 'number');
    }
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
  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
  
    this.dataSource = new CustomStore({
        key: 'doc_SubCategoryID',
        load: () => this.sendRequest(URL + '/DocSubCategory/GetDocSubCategoryModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/DocSubCategory/InsertDocSubCategoryModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/DocSubCategoryMaster/UpdateDocSubCategoryMasterModelDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/DocSubCategoryMaster/DeleteDocSubCategoryMasterModelDetails', 'DELETE', {
             key
         })
    });
  



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
  

 
  
  this.getFilteredCategory = this.getFilteredCategory.bind(this);

  
}

getFilteredCategory(options:any) {
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







  
  onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
   
  
  //     this.masterservice.getEquipmentsByMission(value).subscribe((params) => {
  //      alert(params.equipmentID);
  //       rowData.equipmentID = params.equipmentID;
  //  });
  }








  sendRequest(url: string, method: string = 'GET', data: any = {}): any {

    let result;

    switch(method) {
        case 'GET':
            return new Promise((resolve, reject) => {
              this.http.get(url, {headers})
                .subscribe(res => {
                 (resolve(res));
                }, (err) => {
                  reject(err);
                });
          });
            break;
        case 'PUT':
           this.updateParameters(data);
           return new Promise((resolve, reject) => {
            this.http.put(url,this.DocumentSubCategoryinfo,{headers})
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
            this.http.post(url,this.DocumentSubCategoryinfo,{headers})
              .subscribe(res => {
               (resolve(res));
              }, (err) => {
                reject(err.error);
              });
            });
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



insertParameters(data:any={}){

 this.DocumentSubCategoryinfo.doc_SubCategoryID=0;
 this.params(data);
}

updateParameters(data:any={}){
this.DocumentSubCategoryinfo.doc_SubCategoryID=data.key;
 this.params(data);
}

params(data:any={}){
  this.DocumentSubCategoryinfo.doc_CategoryID=data.values.doc_CategoryID;
  this.DocumentSubCategoryinfo.docTypeID=data.values.docTypeID;
 
  this.DocumentSubCategoryinfo.doc_SubCategoryName=data.values.doc_SubCategoryName;
 
  this.DocumentSubCategoryinfo.doc_SubCategoryDescription=data.values.doc_SubCategoryDescription;
  this.ref.detectChanges();
}

onValueChanged(evt: any, data: any): void {  
  
  data.setValue(evt.value);  
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


  
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['Document SubCategory']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DocumentSubCategory.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Document subcategory',85,10);//header and adujstment
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('DocumentSubCategory.pdf');
    });
  }
}
}



