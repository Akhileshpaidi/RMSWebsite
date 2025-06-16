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
import { action_priority_list, RiskClassification } from 'src/app/inspectionservices.service';
import { risk_admin_actiprilist } from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-admin-action-prio-list',
  templateUrl: './risk-admin-action-prio-list.component.html',
  styleUrls: ['./risk-admin-action-prio-list.component.scss']
})
export class RiskAdminActionPrioListComponent {
  dataSource: any;
  userdata:any;
  riskCate:risk_admin_actiprilist=new risk_admin_actiprilist();

  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_actiPriListid',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/getrisk_admin_actiprilist'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/insertrisk_admin_actiprilist', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/updaterisk_admin_actiprilist', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/deleterisk_admin_actiprilist', 'DELETE', {
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


    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
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
  
    this.riskCate.risk_admin_actiPriListid=0;
    this.params(data);
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_actiPriListid=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCate.risk_admin_actiPriListname=data.values.risk_admin_actiPriListname;
    this.riskCate.risk_admin_actiPriListdesc=data.values.risk_admin_actiPriListdesc;
    this.riskCate.createdby = this.userdata.profile.userid; 
     
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['action priority list']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "action_priority_list.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('action_priority_list',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('action_priority_list.pdf');
      });
    }
  }
}
