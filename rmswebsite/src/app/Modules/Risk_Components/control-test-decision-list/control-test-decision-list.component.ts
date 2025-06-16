import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { risk_controltestdecisionlist} from '../../../inspectionservices.service';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-control-test-decision-list',
  templateUrl: './control-test-decision-list.component.html',
  styleUrls: ['./control-test-decision-list.component.scss']
})
export class ControlTestDecisionListComponent {
  dataSource: any;
  start:any=1;
  inputAttr:any;
  value:any;
  ControlTestingPARAMETERS:any;
  riskCatlev:risk_controltestdecisionlist=new risk_controltestdecisionlist();

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_controlTestDecisionList_id',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/Getrisk_controltestdecisionlist'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertrisk_controltestdecisionlists', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updaterisk_controltestdecisionlists', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleterisk_controltestdecisionlists', 'DELETE', {
             key
         })
    });
   

    this. ControlTestingPARAMETERS={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/cont_test_cont_relevance/Getcont_test_cont_relevanceModelDetails', {headers})
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


    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
 
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
            // alert(JSON.stringify(this.updateParameters));
             return new Promise((resolve, reject) => {
           
              this.http.put(url,this.riskCatlev,{headers})
                .subscribe(res => {
                 (resolve(res));
                
                }, (err) => {
                  reject(err.error);
                  console.log('Error details:', err.message, err.status, err.error); 
                });
              });
              break;
          case 'POST':
          
             this.insertParameters(data);
             return new Promise((resolve, reject) => {
              this.http.post(url,this.riskCatlev,{headers})
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

  onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
  //  this.ref.detectChanges();
  } 
  onValueChangedforcolor(evt: any, data: any): void {  
    data.setValue(evt.value);  
    // this.ref.detectChanges(); // Uncomment if change detection is needed
}
  sliderchange(event:any,data:any){
data.setValue(event.value);
  }
  
  insertParameters(data:any={}){
 // alert(JSON.stringify(data))
    this.riskCatlev.Risk_controlTestDecisionList_id=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.Risk_controlTestDecisionList_id=data.key;
    
   
    this.params(data);
   }
   
   params(data:any={}){
   
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.ControlTestingParametersName=data.values.controlTestingParametersName;
    this.riskCatlev.ControlTestDecisionName=data.values.controlTestDecisionName;
    this.riskCatlev.ControlTesDecisionDescription=data.values.controlTesDecisionDescription;
    this.riskCatlev.ControlTestDecisionRatingScore=data.values.controlTestDecisionRatingScore;
    this.riskCatlev.colorReference=data.values.colorReference;

      }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Control Test Decision List']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ControlTestDecisionList.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ControlTestDecisionList',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ControlTestDecisionList.pdf');
      });
    }
  }
}
