
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthorityName} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ChangeDetectorRef, NgZone} from '@angular/core';
const URL = BASE_URL;
const headers = new HttpHeaders();
@Component({
  selector: 'app-authority-name',
  templateUrl: './authority-name.component.html',
  styleUrls: ['./authority-name.component.scss']
})
export class AuthorityNameComponent implements  OnInit {
  dataSource: any;
  AuthorityTypeData:any;
  AuthorityNameinfo:AuthorityName=new AuthorityName();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {
    this.dataSource = new CustomStore({
        key: 'authoritynameID',
        load: () => this.sendRequest(URL + '/AuthorityName/GetAuthorityNameDetails'),
        
        insert: (values) => this.sendRequest(URL + '/AuthorityName/InsertAuthorityNameModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/AuthorityName/UpdateAuthorityNameModelDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/AuthorityName/DeleteAuthorityNameModelDetails', 'DELETE', {
             key
         })
    });
  



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
  
  
}
  
  onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.authoritynameID = value
   
  
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
            this.http.put(url,this.AuthorityNameinfo,{headers})
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
            this.http.post(url,this.AuthorityNameinfo,{headers})
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

 this.AuthorityNameinfo.authoritynameID=0;
 this.params(data);
}

updateParameters(data:any={}){
this.AuthorityNameinfo.authoritynameID=data.key;
 this.params(data);
}

params(data:any={}){
  this.AuthorityNameinfo.authorityTypeID=data.values.authorityTypeID;
 
  this.AuthorityNameinfo.authorityName=data.values.authorityName;
 
  this.AuthorityNameinfo.authorityNameDescription=data.values.authorityNameDescription;
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
    worksheet.addRow(['Authority Name'])
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Authorityname.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Names of Authority',85,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Authorityname.pdf');
    });
  }
}}
