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
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-loss-event-threat-category-l3',
  templateUrl: './loss-event-threat-category-l3.component.html',
  styleUrls: ['./loss-event-threat-category-l3.component.scss']
})
export class LossEventThreatCategoryL3Component {
  dataSource: any;
  Getloss_event_threat_category:any;
  riskCate:losseventthreacategory_l3=new losseventthreacategory_l3();
  selectedL1Value:any;
  categorydata: any;
  Getloss_event_threat_category_l2:any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    onEditorPreparing(e:any) {
  
      if (e.parentType === 'dataRow' && e.dataField === 'lossEventThreaCategory_L2_id') {
       console.log('onEditorPreparing')
        e.editorOptions.disabled = (typeof e.row.data.loss_Event_Threat_Category_id !== 'number');
      }
    }

    onL1ValueChanged(this: Column, newData: any, value: number, currentRowData: any) {
      newData.lossEventThreaCategory_L2_id = null;
      if (this.defaultSetCellValue !== undefined) {
        this.defaultSetCellValue(newData, value, currentRowData);
      } else {
        // Handle the case where defaultSetCellValue is undefined
        // This could be logging an error or providing default behavior
        console.error('defaultSetCellValue is undefined');
        // Provide a default behavior or any necessary action
      }
    }
 
   
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'lossEventThreaCategory_L3_id',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/Getloss_event_threat_category_l3'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertloss_event_threat_category_l3', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updateloss_event_threat_category_l3', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleteloss_event_threat_category_l3', 'DELETE', {
             key
         }) 
    });


//     this.http.get(URL+"/RiskSupAdminController/Getloss_event_threat_category",{headers}).subscribe(res=>{
// this.Getloss_event_threat_category=res;
//     });

 


    this.Getloss_event_threat_category={
      paginate: true,
      store: new CustomStore({
          key: 'loss_Event_Threat_Category_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskSupAdminController/Getloss_event_threat_category', {headers})
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
        key: 'lossEventThreaCategory_L2_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/RiskSupAdminController/Getloss_event_threat_category_l2', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['loss_Event_Threat_Category_id', '=', options.data.loss_Event_Threat_Category_id] : null,
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
  
    this.riskCate.lossEventThreaCategory_L3_id=0;
    this.params(data);
   
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.lossEventThreaCategory_L3_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
    this.riskCate.Loss_Event_Threat_Category_id=data.values.loss_Event_Threat_Category_id;
    this.riskCate.lossEventThreaCategory_L2_id=data.values.lossEventThreaCategory_L2_id;
    this.riskCate.lossEventThreaCategory_L3_Name=data.values.lossEventThreaCategory_L3_Name;
    this.riskCate.lossEventThreaCategory_L3_Des=data.values.lossEventThreaCategory_L3_Des;
    this.riskCate.lossEventThreaCategory_L3_show_des=data.values.lossEventThreaCategory_L3_show_des;
     
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
