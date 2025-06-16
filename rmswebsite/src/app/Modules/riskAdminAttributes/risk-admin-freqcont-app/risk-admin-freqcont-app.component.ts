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
import { risk_admin_frqcontrapplid, risk_frqof_contr_appl, risk_natureof_cont_occu} from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-admin-freqcont-app',
  templateUrl: './risk-admin-freqcont-app.component.html',
  styleUrls: ['./risk-admin-freqcont-app.component.scss']
})
export class RiskAdminFreqcontAppComponent {

  dataSource: any;
  start:any=1;
  userdata:any;
  riskCatlev:risk_admin_frqcontrapplid=new risk_admin_frqcontrapplid();

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_frqcontrapplidid',
        load: () => this.sendRequest(URL + '/FrequencyOfControlApplied/Getrisk_admin_frqcontrapplid'),
        
        insert: (values) => this.sendRequest(URL + '/FrequencyOfControlApplied/Insertrisk_admin_frqcontrapplid', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/FrequencyOfControlApplied/Updaterisk_admin_frqcontrapplid', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/FrequencyOfControlApplied/Deleterisk_admin_frqcontrapplid', 'DELETE', {
             key
         })
    });
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("userid", this.userdata.profile.userid);
  }
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.isImported=="No";
  }
  onValueChanged(event:any,data:any):void{
    data.setValue(event.value);
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
  sliderchange(event:any,data:any){
data.setValue(event.value);
  }
  
  insertParameters(data:any={}){
 // alert(JSON.stringify(data))
    this.riskCatlev.risk_admin_frqcontrapplidid=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.risk_admin_frqcontrapplidid=data.key;
    
   
    this.params(data);
   }
   
   params(data:any={}){
   
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.risk_admin_frqcontrapplidname=data.values.risk_admin_frqcontrapplidname;
    this.riskCatlev.risk_admin_frqcontrappliddesc=data.values.risk_admin_frqcontrappliddesc;
    this.riskCatlev.risk_frqof_contr_appl_rating=data.values.risk_frqof_contr_appl_rating;
// this.start = this.riskCatlev.risk_natureof_cont_occu_rating;
this.riskCatlev.createdby = this.userdata.profile.userid; 

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
