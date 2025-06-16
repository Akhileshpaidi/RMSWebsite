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
import { RiskCauseList, RiskClassification, riskinitialassessmentimpactfactor } from 'src/app/inspectionservices.service';
import { contTestContrReelevance } from '../../../inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-contr-test-para-rele-catg',
  templateUrl: './contr-test-para-rele-catg.component.html',
  styleUrls: ['./contr-test-para-rele-catg.component.scss']
})
export class ContrTestParaReleCatgComponent {

  

  dataSource: any;

  riskCasl:contTestContrReelevance=new contTestContrReelevance();

  categorydata: any;

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'cont_test_cont_relevance_id',
        load: () => this.sendRequest(URL + '/cont_test_cont_relevance/Getcont_test_cont_relevanceModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/cont_test_cont_relevance/Insertcont_test_cont_relevanceModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/cont_test_cont_relevance/Updatecont_test_cont_relevanceModelDetails', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/cont_test_cont_relevance/Deletecont_test_cont_relevanceModelDetails', 'DELETE', {
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
                // alert(JSON.stringify(res))
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
  
    this.riskCasl.cont_test_cont_relevance_id=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCasl.cont_test_cont_relevance_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCasl.cont_test_cont_relevance_name=data.values.cont_test_cont_relevance_name;
    this.riskCasl.cont_test_cont_relevance_desc=data.values.cont_test_cont_relevance_desc;
     
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
onValueChanged(event:any,data:any):void{
data.setValue(event.value)
}

}
