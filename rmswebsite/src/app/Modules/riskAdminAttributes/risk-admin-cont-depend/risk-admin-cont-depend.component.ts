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
import { risk_admin_contrdepen, RiskControlDependency } from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-admin-cont-depend',
  templateUrl: './risk-admin-cont-depend.component.html',
  styleUrls: ['./risk-admin-cont-depend.component.scss']
})
export class RiskAdminContDependComponent {

  dataSource: any;
  userdata:any;
  riskCondep:risk_admin_contrdepen=new risk_admin_contrdepen();

  categorydata: any;

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_contrDepenid',
        load: () => this.sendRequest(URL + '/Controldependency/Getrisk_admin_contrdepen'),
        
        insert: (values) => this.sendRequest(URL + '/Controldependency/Insertrisk_admin_contrdepen', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/Controldependency/Updaterisk_admin_contrdepen', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/Controldependency/Deleterisk_admin_contrdepen', 'DELETE', {
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
           
              this.http.put(url,this.riskCondep,{headers})
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
              this.http.post(url,this.riskCondep,{headers})
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
  
    this.riskCondep.risk_admin_contrDepenid=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCondep.risk_admin_contrDepenid=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCondep.risk_admin_contrDepenname=data.values.risk_admin_contrDepenname;
    this.riskCondep.risk_admin_contrDependesc=data.values.risk_admin_contrDependesc;
    this.riskCondep.createdby = this.userdata.profile.userid; 
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
