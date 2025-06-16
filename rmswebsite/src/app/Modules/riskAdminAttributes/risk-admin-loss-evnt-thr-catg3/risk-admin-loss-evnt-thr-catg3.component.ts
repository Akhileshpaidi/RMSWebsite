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
import { losseventthreacategory_l3, RiskClassification } from 'src/app/inspectionservices.service';
import { Column } from 'devextreme/ui/data_grid';
import { risk_admin_letc_l3 } from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-admin-loss-evnt-thr-catg3',
  templateUrl: './risk-admin-loss-evnt-thr-catg3.component.html',
  styleUrls: ['./risk-admin-loss-evnt-thr-catg3.component.scss']
})
export class RiskAdminLossEvntThrCatg3Component {
  dataSource: any;
  Getloss_event_threat_category:any;
  riskCate:risk_admin_letc_l3=new risk_admin_letc_l3();
  selectedL1Value:any;
  categorydata: any;
  userdata:any;
  Getloss_event_threat_category_l2:any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    onEditorPreparing(e:any) {
  
      if (e.parentType === 'dataRow' && e.dataField === 'risk_admin_letc_l2_id') {
       console.log('onEditorPreparing')
        e.editorOptions.disabled = (typeof e.row.data.risk_admin_LETC_L1_id !== 'number');
      }
    }

    onL1ValueChanged(this: Column, newData: any, value: number, currentRowData: any) {
      newData.risk_admin_letc_l2_id = null;
      if (this.defaultSetCellValue !== undefined) {
        this.defaultSetCellValue(newData, value, currentRowData);
      } else {
        // Handle the case where defaultSetCellValue is undefined
        // This could be logging an error or providing default behavior
        console.error('defaultSetCellValue is undefined');
        // Provide a default behavior or any necessary action
      }
    }
 
    popupTitle: string = 'Add Loss Event Threat Category (L3)';

    onEditingStart(e: any) {
    
      if (e.data) { 
        this.popupTitle = 'Edit Loss Event Threat Category (L3)';
      }
    }
  
    onInitNewRow(e: any) {
     
      this.popupTitle = 'Add Loss Event Threat Category (L3)'; 
    }

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_LETC_l3_id',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/Getrisk_admin_letc_l3'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertrisk_admin_letc_l3', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updaterisk_admin_letc_l3', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleterisk_admin_letc_l3', 'DELETE', {
             key
         }) 
    });


//     this.http.get(URL+"/RiskSupAdminController/Getloss_event_threat_category",{headers}).subscribe(res=>{
// this.Getloss_event_threat_category=res;
//     });

 


    this.Getloss_event_threat_category={
      paginate: true,
      store: new CustomStore({
          key: 'risk_admin_LETC_L1_id',
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
        key: 'risk_admin_letc_l2_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/RiskSupAdminController/Getrisk_admin_letc_l2', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['risk_admin_LETC_L1_id', '=', options.data.risk_admin_LETC_L1_id] : null,
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
  
    this.riskCate.risk_admin_LETC_l3_id=0;
    this.params(data);
   
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_LETC_l3_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    this.riskCate.risk_admin_LETC_L1_id=data.values.risk_admin_LETC_L1_id;
    this.riskCate.risk_admin_letc_l2_id=data.values.risk_admin_letc_l2_id;
    this.riskCate.risk_admin_LETC_l3_name=data.values.risk_admin_LETC_l3_name;
    this.riskCate.risk_admin_LETC_l3_desc=data.values.risk_admin_LETC_l3_desc;
    this.riskCate.risk_admin_LETC_l3_show_desc=data.values.risk_admin_LETC_l3_show_desc;
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
      worksheet.addRow(['loss event threat category(L3)']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "loss_event_threat_category_l3.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('loss_event_threat_category_l3',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('loss_event_threat_category_l3.pdf');
      });
    }
  }
}
