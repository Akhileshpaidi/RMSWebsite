import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RiskTreatmentDecisionList} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ChangeDetectorRef, NgZone} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxRangeSliderModule, DxNumberBoxModule } from 'devextreme-angular';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');



@Component({
  selector: 'app-risk-treatment-decision-list',
  templateUrl: './risk-treatment-decision-list.component.html',
  styleUrls: ['./risk-treatment-decision-list.component.scss']
})
export class RiskTreatmentDecisionListComponent {
  dataSource:any;
  riskCate:RiskTreatmentDecisionList=new RiskTreatmentDecisionList();

  
  constructor(private http: HttpClient,public dialog: MatDialog){

    this.dataSource = new CustomStore({
      key: 'risk_treatmentDecisionList_id',
      load: () => this.sendRequest(URL + '/RiskSupAdminController/GetRiskTreatmentDecisionLists'),
      
      insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/InsertRiskTreatmentDecisionLists', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/UpdateRiskTreatmentDecisionLists', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/DeleteRiskTreatmentDecisionLists', 'DELETE', {
           key
       })
  });
  
  
  }


  onValueChanged(evt: any, data: any): void {  

    data.setValue(evt.value);  
    //  this.ref.detectChanges();
    } 

  sendRequest(url: string, method: string = 'GET', data: any = {}): any {

    switch(method) {
          case 'GET':
              return new Promise((resolve, reject) => {
                this.http.get(url, {headers})
                  .subscribe(res=> {
                   (resolve(res));
                  }, (err) => {
                    reject(err);
                  });
            });
              break;
              case 'PUT':
               
              this.updateParameters(data);
       
              return new Promise((resolve, reject) => {
               this.http.put(url,this.riskCate,{headers})
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
               this.http.post(url,this.riskCate,{headers})
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
    
    
      this.riskCate.Risk_treatmentDecisionList_id=0;
    
      this.params(data);
     
    
    }
    
    updateParameters(data:any={}){
    this.riskCate.Risk_treatmentDecisionList_id=data.key;
    
    this.params(data);
    }
    
    params(data:any={}){
    
   
    this.riskCate.Risk_treatmentDecisionList_Name=data.values.risk_treatmentDecisionList_Name;
    this.riskCate.Risk_treatmentDecisionList_Des=data.values.risk_treatmentDecisionList_Des;

    }
    
    
    
      
    
    
    
    
    
    exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet");
          worksheet.addRow(['Risk Treatment Decision List']);
          worksheet.addRow([]); 
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "RiskTreatmentDecisionList.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text('RiskTreatmentDecisionList',75,10);
          doc.setFontSize(12);
      
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('RiskTreatmentDecisionList.pdf');
          });
        }
      }
    

}
