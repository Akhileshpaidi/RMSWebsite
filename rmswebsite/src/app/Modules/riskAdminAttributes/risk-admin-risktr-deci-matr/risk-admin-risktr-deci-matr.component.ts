import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { risk_treatmetdecisionmatrix} from 'src/app/inspectionservices.service';
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
import { risk_admin_risktrdecimatrix } from '../../../inspectionservices.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-admin-risktr-deci-matr',
  templateUrl: './risk-admin-risktr-deci-matr.component.html',
  styleUrls: ['./risk-admin-risktr-deci-matr.component.scss']
})
export class RiskAdminRisktrDeciMatrComponent {
  dataSource:any;
  userdata:any;
  riskCate:risk_admin_risktrdecimatrix=new risk_admin_risktrdecimatrix();
  InherentRiskRatingLevelDataSource:any;
  RiskTreatmentDecisionDataSource:any;
  
  constructor(private http: HttpClient,public dialog: MatDialog,private session: SessionService,){

    this.dataSource = new CustomStore({
      key: 'risk_admin_risktrdecimatrixid',
      load: () => this.sendRequest(URL + '/RiskSupAdminController/Getrisk_admin_risktrdecimatrix'),
      
      insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertrisk_admin_risktrdecimatrix', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updaterisk_admin_risktrdecimatrix', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleterisk_admin_risktrdecimatrix', 'DELETE', {
           key
       })
  });


  this.InherentRiskRatingLevelDataSource={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/RiskInherentRatingLevel/GetRiskInherentRatingLevel', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };

  this. RiskTreatmentDecisionDataSource={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/RiskSupAdminController/Getrisk_admin_risktredecilist', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
  
  
  let user: any = this.session.getUser();
  this.userdata = JSON.parse(user);
  console.log("userid", this.userdata.profile.userid);
}
isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
  return row?.data.isImported=="No";
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
    
    
      this.riskCate.risk_admin_risktrdecimatrixid=0;
    
      this.params(data);
     
    
    }
    
    updateParameters(data:any={}){
    this.riskCate.risk_admin_risktrdecimatrixid=data.key;
    
    this.params(data);
    }
    
    params(data:any={}){
    
   
    this.riskCate.risk_admin_inherRiskRatingLevlid=data.values.risk_admin_inherRiskRatingLevlid;
    this.riskCate.risk_admin_risktrdecimatrixdesc=data.values.risk_admin_risktrdecimatrixdesc;
    this.riskCate.RiskTreatmentDecision=data.values.riskTreatmentDecision;
    this.riskCate.createdby = this.userdata.profile.userid; 
    console.log(JSON.stringify(data));

    }
    
    
    
      
    
    
    
    
    
    exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet");
          worksheet.addRow(['Risk Treatment Decision Matrix']);
          worksheet.addRow([]); 
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "RiskTreatmentDecisionMatrix.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text('RiskTreatmentDecisionMatrix',75,10);
          doc.setFontSize(12);
      
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('RiskTreatmentDecisionMatrix.pdf');
          });
        }
      }
}
