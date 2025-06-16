
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthorityType} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ChangeDetectorRef, NgZone} from '@angular/core';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-inspector-inspection-list',
  templateUrl: './inspector-inspection-list.component.html',
  styleUrls: ['./inspector-inspection-list.component.scss'],
})
export class InspectorInspectionListComponent implements OnInit {
  dataSource: any;
  
  AuthorityTypeinfo:AuthorityType=new AuthorityType();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
    this.dataSource = new CustomStore({
        key: 'authorityTypeID',
        load: () => this.sendRequest(URL + '/AuthorityTypeMaster/GetAuthorityTypeMasterDetails'),
        
        insert: (values) => this.sendRequest(URL + '/AuthorityTypeMaster/InsertAuthorityTypeMasterDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/AuthorityTypeMaster/UpdateAuthorityTypeMasterDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/AuthorityTypeMaster/DeleteAuthorityTypeMasterDetails', 'DELETE', {
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
           return new Promise((resolve, reject) => {
            this.http.put(url,this.AuthorityTypeinfo,{headers})
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
            this.http.post(url,this.AuthorityTypeinfo,{headers})
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

 this.AuthorityTypeinfo.authorityTypeID=0;
 this.params(data);
}

updateParameters(data:any={}){
this.AuthorityTypeinfo.authorityTypeID=data.key;
 this.params(data);
}

params(data:any={}){
  //this.AuthorityTypeinfo.authorityTypeID=data.values.authorityTypeID;
 
  this.AuthorityTypeinfo.authorityTypeName=data.values.authorityTypeName;
 
  this.AuthorityTypeinfo.authorityTypeDescription=data.values.authorityTypeDescription;
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
    worksheet.addRow(['Types of Authority']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "AuthorityType.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Types of Authority',85,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('AuthorityType.pdf');
    });
  }
}
}
