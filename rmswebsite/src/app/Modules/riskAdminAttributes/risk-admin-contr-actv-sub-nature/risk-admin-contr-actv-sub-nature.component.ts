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
import { risk_admin_control_activity_sub_nature, RiskClassification } from 'src/app/inspectionservices.service';
import { Column } from 'devextreme/ui/data_grid';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-admin-contr-actv-sub-nature',
  templateUrl: './risk-admin-contr-actv-sub-nature.component.html',
  styleUrls: ['./risk-admin-contr-actv-sub-nature.component.scss']
})
export class RiskAdminContrActvSubNatureComponent {
  dataSource: any;
  Getloss_event_threat_category:any;
  riskCate:risk_admin_control_activity_sub_nature=new risk_admin_control_activity_sub_nature();
  selectedL1Value:any;
  categorydata: any;
  userdata:any;
  Getloss_event_threat_category_l2:any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    onEditorPreparing(e:any) {
  
      if (e.parentType === 'dataRow' && e.dataField === 'risk_admin_control_activity_Nature_id') {
       console.log('onEditorPreparing')
        e.editorOptions.disabled = (typeof e.row.data.risk_admin_ControlActivityType_id !== 'number');
      }
    }

    onL1ValueChanged(this: Column, newData: any, value: number, currentRowData: any) {
      newData.risk_admin_control_activity_Nature_id = null;
      if (this.defaultSetCellValue !== undefined) {
        this.defaultSetCellValue(newData, value, currentRowData);
      } else {
        // Handle the case where defaultSetCellValue is undefined
        // This could be logging an error or providing default behavior
        console.error('defaultSetCellValue is undefined');
        // Provide a default behavior or any necessary action
      }
    }
 
    popupTitle: string = 'Add Control Activity Sub-Nature';

    onEditingStart(e: any) {
    
      if (e.data) { 
        this.popupTitle = 'Edit Control Activity Sub-Nature';
      }
    }
  
    onInitNewRow(e: any) {
     
      this.popupTitle = 'Add Control Activity Sub-Nature'; 
    }

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_Control_Activity_Sub_Nature_id',
        load: () => this.sendRequest(URL + '/risk_admin_controller/get_Control_Activity_sub_Nature'),
        
        insert: (values) => this.sendRequest(URL + '/risk_admin_controller/insert_risk_admin_controlactivity_sub_nature', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_admin_controller/Update_risk_admin_controlactivitysub_nature', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_admin_controller/delete_risk_admin_control_activity_sub_natures', 'DELETE', {
             key
         }) 
    });


//     this.http.get(URL+"/RiskSupAdminController/Getloss_event_threat_category",{headers}).subscribe(res=>{
// this.Getloss_event_threat_category=res;
//     });

 


    this.Getloss_event_threat_category={
      paginate: true,
      store: new CustomStore({
          key: 'risk_admin_ControlActivityType_id',
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
   
    this.getFilteredCategory = this.getFilteredCategory.bind(this);
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("userid", this.userdata.profile.userid);
  }
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.isImported=="No";
  }
  onCategoryChange(event:any){
    const catval=event.value;

    this.http.get(URL+"/RiskSupAdminController/Getloss_event_threat_category_l2_by_id/" + catval,{headers}).subscribe(res=>{
      this.Getloss_event_threat_category_l2=res;
          });
  }
  
 

  getFilteredCategory(options:any) {
    console.log('inside method')
    console.log(options);
   
    const filteredData = {
      store:  new CustomStore({
        key: 'risk_admin_control_activity_Nature_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/risk_admin_controller/get_Control_Activity_Nature', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['risk_admin_ControlActivityType_id', '=', options.data.risk_admin_ControlActivityType_id] : null,
    };
  
    console.log('Filtered Data:', filteredData);
  
    return filteredData;
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
  
    this.riskCate.risk_admin_Control_Activity_Sub_Nature_id=0;
    this.params(data);
   
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_Control_Activity_Sub_Nature_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    this.riskCate.risk_admin_ControlActivityType_id=data.values.risk_admin_ControlActivityType_id;
    this.riskCate.risk_admin_control_activity_Nature_id=data.values.risk_admin_control_activity_Nature_id;
    this.riskCate.risk_admin_Control_Activity_Sub_Nature_name=data.values.risk_admin_Control_Activity_Sub_Nature_name;
    this.riskCate.risk_admin_Control_Activity_Sub_Nature_desc=data.values.risk_admin_Control_Activity_Sub_Nature_desc;
    this.riskCate.createdby = this.userdata.profile.userid; 
     
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Control Activity Sub-Nature']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ControlActivitySub-Nature.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ControlActivitySub-Nature',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ControlActivitySub-Nature.pdf');
      });
    }
  }
}
