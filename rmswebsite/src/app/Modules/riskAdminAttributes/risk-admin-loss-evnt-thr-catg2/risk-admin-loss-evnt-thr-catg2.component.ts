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
import { losseventthreacategory_l2, RiskClassification } from 'src/app/inspectionservices.service';
import { risk_admin_letc_l2 } from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-admin-loss-evnt-thr-catg2',
  templateUrl: './risk-admin-loss-evnt-thr-catg2.component.html',
  styleUrls: ['./risk-admin-loss-evnt-thr-catg2.component.scss']
})
export class RiskAdminLossEvntThrCatg2Component {
  dataSource: any;
  Getloss_event_threat_category:any;
  riskCate:risk_admin_letc_l2=new risk_admin_letc_l2();
  userdata:any;
  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    popupTitle: string = 'Add Loss Event Threat Category (L2)';

  onEditingStart(e: any) {
  
    if (e.data) { 
      this.popupTitle = 'Edit Loss Event Threat Category (L2)';
    }
  }

  onInitNewRow(e: any) {
   
    this.popupTitle = 'Add Loss Event Threat Category (L2)'; 
  }
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_letc_l2_id',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/Getrisk_admin_letc_l2'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertrisk_admin_letc_l2', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updaterisk_admin_letc_l2', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleterisk_admin_letc_l2', 'DELETE', {
             key
         }) 
    });


//     this.http.get(URL+"/RiskSupAdminController/Getloss_event_threat_category",{headers}).subscribe(res=>{
// this.Getloss_event_threat_category=res;
//     });



    this.Getloss_event_threat_category={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskSupAdminController/Getrisk_admin_letc_l1', {headers})
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
  
    this.riskCate.risk_admin_letc_l2_id=0;
    this.params(data);
   
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_letc_l2_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    this.riskCate.risk_admin_LETC_L1_id=data.values.risk_admin_LETC_L1_id;
    this.riskCate.risk_admin_letc_l2_name=data.values.risk_admin_letc_l2_name;
    this.riskCate.risk_admin_letc_l2_desc=data.values.risk_admin_letc_l2_desc;
    this.riskCate.risk_admin_letc_l2_show_desc=data.values.risk_admin_letc_l2_show_desc;
    this.riskCate.createdby = this.userdata.profile.userid; 
   }
   onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
  //  this.ref.detectChanges();
  } 
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['loss event threat category (L2)']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "loss_event_threat_category_l2.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('loss_event_threat_category_l2',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('loss_event_threat_category_l2.pdf');
      });
    }
  }
}
