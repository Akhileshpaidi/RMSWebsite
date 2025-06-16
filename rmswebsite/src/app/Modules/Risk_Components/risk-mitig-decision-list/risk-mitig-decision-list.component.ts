import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { RiskCauseList, RiskClassification, riskinitialassessmentimpactfactor, riskmitigationdecision } from 'src/app/inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-mitig-decision-list',
  templateUrl: './risk-mitig-decision-list.component.html',
  styleUrls: ['./risk-mitig-decision-list.component.scss']
})
export class RiskMitigDecisionListComponent {


  dataSource: any;

  riskCasl:riskmitigationdecision=new riskmitigationdecision();

  categorydata: any;

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_mitigation_decision_id',
        load: () => this.sendRequest(URL + '/risk_mitigation_decision/Getrisk_mitigation_decisionModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/risk_mitigation_decision/Insertrisk_mitigation_decisionModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_mitigation_decision/Updaterisk_mitigation_decisionModelDetails', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_mitigation_decision/Deleterisk_mitigation_decisionModelDetails', 'DELETE', {
             key
         })
    });
   

  }


    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  //  alert(JSON.stringify(data))
  console.log(data)
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
              this.http.put(url,this.riskCasl,{headers})
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
              this.http.post(url,this.riskCasl,{headers})
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
  
    this.riskCasl.Risk_mitigation_decision_id=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCasl.Risk_mitigation_decision_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCasl.Risk_mitigation_decision_name=data.values.risk_mitigation_decision_name;
    this.riskCasl.Risk_mitigation_decision_desc=data.values.risk_mitigation_decision_desc;
     
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Type Of Risk Name']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "TypeOfRisk.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('TypeOfRisk',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('TypeOfRisk.pdf');
      });
    }
  }



}
