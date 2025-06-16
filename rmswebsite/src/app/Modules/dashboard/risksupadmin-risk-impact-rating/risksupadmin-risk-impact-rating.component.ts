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
import { risk_natureof_cont_occu, riskImpactRating} from '../../../inspectionservices.service';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risksupadmin-risk-impact-rating',
  templateUrl: './risksupadmin-risk-impact-rating.component.html',
  styleUrls: ['./risksupadmin-risk-impact-rating.component.scss']
})
export class RisksupadminRiskImpactRatingComponent {
  dataSource: any;
  start:any=1;
  inputAttr:any;
  value:any;
  riskCatlev:riskImpactRating=new riskImpactRating();
 

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'impactRatingID',
        load: () => this.sendRequest(URL + '/RiskImpact/GetRiskImpact'),
        
        insert: (values) => this.sendRequest(URL + '/RiskImpact/InsertRiskImpact', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskImpact/UpdateRiskImpact', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskImpact/DeleteRiskImpact', 'DELETE', {
             key
         })
    });
   

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
    this.riskCatlev.ImpactRatingID=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.ImpactRatingID=data.key;
    
   
    this.params(data);
   }
   
   params(data:any={}){
   
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.RiskImpactRatingName=data.values.riskImpactRatingName;
    this.riskCatlev.RiskImpactRatingDescription=data.values.riskImpactRatingDescription;
    this.riskCatlev.RiskImpactRatingScale=data.values.riskImpactRatingScale;
    this.riskCatlev.colour_reference=data.values.colour_reference;
// this.start = this.riskCatlev.risk_natureof_cont_occu_rating;


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


