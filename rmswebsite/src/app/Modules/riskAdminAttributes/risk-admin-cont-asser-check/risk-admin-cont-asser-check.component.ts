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
import { risk_db_control_assertion_check, RiskClassification } from 'src/app/inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-admin-cont-asser-check',
  templateUrl: './risk-admin-cont-asser-check.component.html',
  styleUrls: ['./risk-admin-cont-asser-check.component.scss']
})
export class RiskAdminContAsserCheckComponent {
  dataSource: any;
  Getloss_event_threat_category:any;
  riskCate:risk_db_control_assertion_check=new risk_db_control_assertion_check();
  userdata:any;
  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    popupTitle: string = 'Add Control Assertion Check';

  onEditingStart(e: any) {
  
    if (e.data) { 
      this.popupTitle = 'Edit Control Assertion Check';
    }
  }

  onInitNewRow(e: any) {
   
    this.popupTitle = 'Add Control Assertion Check'; 
  }
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_db_Control_Assertion_Check_id',
        load: () => this.sendRequest(URL + '/risk_admin_controller/get_Control_Assertion_Check'),
        
        insert: (values) => this.sendRequest(URL + '/risk_admin_controller/insert_risk_admin_Control_Assertion_Check', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_admin_controller/Update_risk_admin_Control_Assertion_Check', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_admin_controller/delete_risk_admin_Control_Assertion_Check', 'DELETE', {
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
            this.http.get(URL + '/risk_admin_controller/get_Control_Activity_Type', {headers})
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
  
    this.riskCate.risk_db_Control_Assertion_Check_id=0;
    this.params(data);
   
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_db_Control_Assertion_Check_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    this.riskCate.risk_admin_ControlActivityType_id=data.values.risk_admin_ControlActivityType_id;
    this.riskCate.risk_db_Control_Assertion_Check_name=data.values.risk_db_Control_Assertion_Check_name;
    this.riskCate.risk_db_Control_Assertion_Check_desc=data.values.risk_db_Control_Assertion_Check_desc;
    this.riskCate.createdby = this.userdata.profile.userid; 
     
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Control Assertion Check']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ControlAssertionCheck.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ControlAssertionCheck',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ControlAssertionCheck.pdf');
      });
    }
  }
}
