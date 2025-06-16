import { ChangeDetectorRef, NgZone} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DocCategory} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss'],
})



export class QuestionBankComponent implements OnInit {
 
  dataSource: any;
  DocumentTypeData:any;
  DocumentCategoryinfo:DocCategory=new DocCategory();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
    this.dataSource = new CustomStore({
        key: 'doc_CategoryID', 
        load: () => this.sendRequest(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/DocCategoryMaster/InsertDocCategoryMasterModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/DocCategoryMaster/UpdateDocCategoryMasterModelDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/DocCategoryMaster/DeleteDocCategoryMasterModelDetails', 'DELETE', {
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
  
  
}
  
  onChangeParams() {
   // alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.doc_CategoryID = value
   
  
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
            this.http.put(url,this.DocumentCategoryinfo,{headers})
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
            this.http.post(url,this.DocumentCategoryinfo,{headers})
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

 this.DocumentCategoryinfo.doc_CategoryID=0;
 this.params(data);
}

updateParameters(data:any={}){
this.DocumentCategoryinfo.doc_CategoryID=data.key;
 this.params(data);
}

params(data:any={}){
  this.DocumentCategoryinfo.DocTypeID=data.values.docTypeID;
 
  this.DocumentCategoryinfo.doc_CategoryName=data.values.doc_CategoryName;
 
  this.DocumentCategoryinfo.doc_CategoryDescription=data.values.doc_CategoryDescription;
  this.ref.detectChanges();
}


onValueChanged(evt: any, data: any): void {  
  
  data.setValue(evt.value);  
  this.ref.detectChanges();
}  
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['Document Category']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Documnetcategory.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Document Category',88,10);//header and Adjustment
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Documnetcategory.pdf');
    });
  }
}
}