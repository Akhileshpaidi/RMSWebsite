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
import { risk_admin_riskimpactrating} from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-admin-risk-impact-rating',
  templateUrl: './risk-admin-risk-impact-rating.component.html',
  styleUrls: ['./risk-admin-risk-impact-rating.component.scss']
})
export class RiskAdminRiskImpactRatingComponent {

  dataSource: any;
  start:any=1;
  inputAttr:any;
  value:any;
  userdata:any;
  riskCatlev:risk_admin_riskimpactrating=new risk_admin_riskimpactrating();

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_riskImpactRating_id',
        load: () => this.sendRequest(URL + '/adminRiskImpact/GetadminRiskImpact'),
      
        insert: (values) => this.sendRequest(URL + '/adminRiskImpact/InsertadminRiskImpact', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/adminRiskImpact/UpdateadminRiskImpact', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/adminRiskImpact/DeleteAdminRiskImpact', 'DELETE', {
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
              JSON.stringify(this.riskCatlev);
              this.http.post(url,this.riskCatlev,{headers})
                .subscribe(res => {
                
                 (resolve(res));
                 console.log(JSON.stringify(res))
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
  
  
      let user: any = this.session.getUser();
      this.userdata = JSON.parse(user);
      console.log("userid", this.userdata.profile.userid);
  
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
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.isImported=="No";
  }
  insertParameters(data:any={}){
  
    this.riskCatlev.risk_admin_riskImpactRating_id=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.risk_admin_riskImpactRating_id=data.key;
    
   
    this.params(data);
   }
   
   params(data:any={}){
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("userid", this.userdata.profile.userid);

  
   //alert(this.userdata.profile.userid);
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.risk_admin_riskImpactRating_name=data.values.risk_admin_riskImpactRating_name;
    this.riskCatlev.risk_admin_riskImpactRating_desc=data.values.risk_admin_riskImpactRating_desc;
    this.riskCatlev.risk_admin_riskImpactRating_value=data.values.risk_admin_riskImpactRating_value;
    this.riskCatlev.color_reference=data.values.color_reference;
    this.riskCatlev.createdby = this.userdata.profile.userid;
// this.start = this.riskCatlev.risk_natureof_cont_occu_rating;
   console.log(this.riskCatlev);

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
