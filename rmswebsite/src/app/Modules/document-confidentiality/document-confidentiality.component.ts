
import { ChangeDetectorRef, NgZone} from '@angular/core';
import { Component, OnInit ,enableProdMode} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
 import { DocumentConfidential, DocumentType} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { loadMessages } from 'devextreme/localization';
import { DxDataGridComponent } from 'devextreme-angular';
import { ViewChild } from '@angular/core';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  if (!/localhost/.test(document.location.host)) {
    enableProdMode();
  }
@Component({
  selector: 'app-document-confidentiality',
  templateUrl: './document-confidentiality.component.html',
  styleUrls: ['./document-confidentiality.component.scss']
})
export class DocumentConfidentialityComponent {
  dataSource:any
 DocumentTypeinfo:DocumentConfidential=new DocumentConfidential();

  TaskData = [
    {  task_name: 'General' },
    {  task_name: 'Confidential' }
  ];
  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
    this.dataSource = new CustomStore({
        key: 'documentConfidentialityID',
        load: () => this.sendRequest(URL + '/Confidentiality/GetDocumentConfidentiality'),
        
        insert: (values) => this.sendRequest(URL + '/Confidentiality/InsertDocumentConfidentiality', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/Confidentiality/UpdateDocumentConfidentiality', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/Confidentiality/DeleteDocumentConfidentiality', 'DELETE', {
             key
         })
    });
 
  
  
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
         console.log(JSON.stringify(data))
         alert(JSON.stringify(this.DocumentTypeinfo))
         return new Promise((resolve, reject) => {
          this.http.put(url,this.DocumentTypeinfo,{headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err.error);
            });
          });
          break;
      case 'POST':
   
         this.insertParameters(data);
         console.log(JSON.stringify(data))
         return new Promise((resolve, reject) => {
          this.http.post(url,this.DocumentTypeinfo,{headers})
            .subscribe(res => {
             (resolve(res));
            }, (err) => {
              reject(err.error);
              //reject(err);
            });
          });
          break;
      case 'DELETE':
        console.log(JSON.stringify(data))
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
  
  this.DocumentTypeinfo.documentConfidentialityID=0;
  this.params(data);
 }
 
 updateParameters(data:any={}){
 this.DocumentTypeinfo.documentConfidentialityID=data.key;
  this.params(data);
 }
 
 params(data:any={}){
   this.DocumentTypeinfo.confidentialityName=data.values.confidentialityName;
   this.DocumentTypeinfo.description = data.values.description;
   this.DocumentTypeinfo.waterMark=data.values.waterMark;
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
    worksheet.addRow(['Document Types']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DocumentType.xlsx"); 
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
      doc.save('DocumentType.pdf');
    });
  }
}
}
