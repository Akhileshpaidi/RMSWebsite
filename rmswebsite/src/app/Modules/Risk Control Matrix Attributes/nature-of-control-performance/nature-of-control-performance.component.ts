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
import { RiskNatureOfControlPerformance } from '../../../inspectionservices.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-nature-of-control-performance',
  templateUrl: './nature-of-control-performance.component.html',
  styleUrls: ['./nature-of-control-performance.component.scss']
})
export class NatureOfControlPerformanceComponent {



  dataSource: any;

  riskNatCate:RiskNatureOfControlPerformance=new RiskNatureOfControlPerformance();

  categorydata: any;
  popupTitle: string = 'Add Nature of Control Performance';

  onEditingStart(e: any) {
  
    if (e.data) { 
      this.popupTitle = 'Edit Nature of Control Performance';
    }
  }

  onInitNewRow(e: any) {
   
    this.popupTitle = 'Add Nature of Control Performance'; 
  }

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'natureOf_control_perf_id',
        load: () => this.sendRequest(URL + '/NatureOfControlPerformance/GetNatureOfControlPerformanceModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/NatureOfControlPerformance/InsertNatureOfControlPerformanceModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/NatureOfControlPerformance/UpdateNatureOfControlPerformanceModelDetails', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/NatureOfControlPerformance/DeleteNatureOfControlPerformanceModelDetails', 'DELETE', {
             key
         })
    });
   

  }
  onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
  //  this.ref.detectChanges();
  }
  sliderchange(event:any,data:any){
    data.setValue(event.value);
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
           
              this.http.put(url,this.riskNatCate,{headers})
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
              this.http.post(url,this.riskNatCate,{headers})
                .subscribe(res => {
                 (resolve(res));
                 //alert(JSON.stringify(res))
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
  
    this.riskNatCate.natureOf_control_perf_id=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskNatCate.natureOf_control_perf_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskNatCate.risk_natureOf_control_perf_name=data.values.risk_natureOf_control_perf_name;
    this.riskNatCate.risk_natureOf_control_perf_desc=data.values.risk_natureOf_control_perf_desc;
    this.riskNatCate.risk_natureOf_control_perf_rating=data.values.risk_natureOf_control_perf_rating;
     console.log("params",JSON.stringify(this.riskNatCate));
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Nature of Control Performance']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "NatureofControlPerformance.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('NatureofControlPerformance',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('NatureofControlPerformance.pdf');
      });
    }
  }


}
     