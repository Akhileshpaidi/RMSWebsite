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
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
import { risk_admin_inter_contr_comp, RiskClassification } from 'src/app/inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-admin-intercontrcompon',
  templateUrl: './risk-admin-intercontrcompon.component.html',
  styleUrls: ['./risk-admin-intercontrcompon.component.scss']
})
export class RiskAdminIntercontrcomponComponent {
  dataSource: any;
  Getloss_event_threat_category:any;
  riskCate:risk_admin_inter_contr_comp=new risk_admin_inter_contr_comp();
  userdata:any;
  categorydata: any;
 

    popupTitle: string = 'Add Internal Control Component';

  onEditingStart(e: any) {
  
    if (e.data) { 
      this.popupTitle = 'Edit Internal Control Component';
    }
  }

  onInitNewRow(e: any) {
   
    this.popupTitle = 'Add Internal Control Component'; 
  }
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_inter_contr_comp_id',
        load: () => this.sendRequest(URL + '/risk_admin_controller/get_internal_control_comp'),
        
        insert: (values) => this.sendRequest(URL + '/risk_admin_controller/insert_internal_control_comp', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_admin_controller/Update_internal_con_comp', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_admin_controller/delete_internal_con_comp', 'DELETE', {
             key
         }) 
    });


//     this.http.get(URL+"/RiskSupAdminController/Getloss_event_threat_category",{headers}).subscribe(res=>{
// this.Getloss_event_threat_category=res;
//     });



    this.Getloss_event_threat_category={
      paginate: true,
      store: new CustomStore({
          key: 'control_measure_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskSupAdminController/getrisk_admin_control_measures', {headers})
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
  
    this.riskCate.risk_admin_inter_contr_comp_id=0;
    this.params(data);
   
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_inter_contr_comp_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    this.riskCate.selected_control_measure=data.values.selected_control_measure;
    this.riskCate.risk_admin_inter_contr_comp_name=data.values.risk_admin_inter_contr_comp_name;
    this.riskCate.risk_admin_inter_contr_comp_desc=data.values.risk_admin_inter_contr_comp_desc;
    this.riskCate.createdby = this.userdata.profile.userid; 
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Internal Control Component']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "InternalControlComponent.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('InternalControlComponent',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('InternalControlComponent.pdf');
      });
    }
  }
}
