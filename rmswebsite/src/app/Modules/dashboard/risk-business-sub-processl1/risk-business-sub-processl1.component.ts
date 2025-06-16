
import { BusinessSubProcessL1 } from 'src/app/inspectionservices.service';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BusinessProcess, entitytype} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';

import { Component, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Column } from 'devextreme/ui/data_grid';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-business-sub-processl1',
  templateUrl: './risk-business-sub-processl1.component.html',
  styleUrls: ['./risk-business-sub-processl1.component.scss']
})
export class RiskBusinessSubProcessl1Component {
  dataSource:any;
  typedata:any;
  Entity:any;
  Department:any;
  Function:any;
  location:any;
  Buinessinfo:BusinessSubProcessL1=new BusinessSubProcessL1();
  
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({
      key: 'businessProcessL1ID',
    
      load: () => this.sendRequest1(URL + '/BusinessSubProcessL1/GetBusinessSubProcesssL1'),
      
      insert: (values) => this.sendRequest1(URL + '/BusinessSubProcessL1/InsertBusinessSubProcessL1', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest1(URL + '/BusinessSubProcessL1/UpdateBusinessSubProcessL1', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest1(URL + '/BusinessSubProcessL1/DeleteBusinessSubProcessL1', 'DELETE', {
           key
       })
  
  });
  this.typedata={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/BusinessProcess/GetBusinessProcessDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
  this.Entity={ 
    store: new CustomStore({
    key: 'entity_Master_id',
    loadMode: 'raw',
    load:()=>{return new Promise((resolve, reject) => {
      this.http.get(URL + '/UnitMaster/GetEntityNames', {headers})
        .subscribe(res => {
         (resolve(res));
  
        }, (err) => {
          reject(err);
        });
  });
  },
  }),
  };
 
  this.getunitlocation = this.getunitlocation.bind(this);
   this.getDepartment = this.getDepartment.bind(this);
 this.getFunction = this.getFunction.bind(this);

  }
  getDepartment(event: any) {

    // this.Department={ 
    //   store: new CustomStore({
    //   key: 'department_Master_id',
    //   loadMode: 'raw',
    //   load:()=>{return new Promise((resolve, reject) => {
    //     this.http.get(URL + '/DepartmentName/GetDepartmentName', {headers})
    //       .subscribe(res => {
    //        (resolve(res));
    
    //       }, (err) => {
    //         reject(err);
    //       });
    // });
    // },
    // }),
    const Entity_Master_id = parseInt(event.data?.entityid) ; 
      const Unit_location_Master_id = parseInt(event.data?.unitlocationid) ; 
     
      this.Department={ 
        store: new CustomStore({
        key: 'department_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          //this.http.get(URL + '/DepartmentName/GetDepartmentName', {headers})
          this.http.get(URL + '/Department/GetDepartment?EntityMasterid='+Entity_Master_id+'&&Unitid='+Unit_location_Master_id+'', {headers})
            .subscribe(res => {
             (resolve(res));
      
            }, (err) => {
              reject(err);
            });
      });
      },
      }),
    filter: event.data ? ['unitlocationid', '=', event.data.unitlocationid] : null,
  
    };
    return this.Department;
  }
  getFunction(event: any) {
  
    // this.Function={ 
    //   store: new CustomStore({
    //   key: 'riskBusinessfunctionid',
    //   loadMode: 'raw',
    //   load:()=>{return new Promise((resolve, reject) => {
    //     this.http.get(URL + '/BusinessName/GetBusinessName', {headers})
    //       .subscribe(res => {
    //        (resolve(res));
    
    //       }, (err) => {
    //         reject(err);
    //       });
    // });
    // },
    // }),
    const Entity_Master_id = parseInt(event.data?.entityid) ; 
      const Unit_location_Master_id = parseInt(event.data?.unitlocationid) ; 
      const Departmentid = parseInt(event.data?.departmentid) ; 
     
      this.Function={ 
        store: new CustomStore({
        key: 'riskBusinessfunctionid',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/Function/GetFunctionDetails?EntityMasterid='+Entity_Master_id+'&&Unitid='+Unit_location_Master_id+' &&departmentid='+Departmentid+'', {headers})
            .subscribe(res => {
             (resolve(res));
      
            }, (err) => {
              reject(err);
            });
      });
      },
      }),
    filter: event.data ? ['departmentid', '=', event.data.departmentid] : null,
    };
    return this.Function;
  }
  getunitlocation(event: any) {

    this.location={
      paginate: true,
      store: new CustomStore({
        key: 'unit_location_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
    filter: event.data ? ['entity_Master_id', '=', event.data.entityid] : null,
    };
    return this.location;
  }
  setDocumentTypeValue(this: Column, newData: any, value: number, currentRowData: any) {
    newData.unitlocationid = null;
    if (this.defaultSetCellValue !== undefined) {
      this.defaultSetCellValue(newData, value, currentRowData);
    } else {
            console.error('defaultSetCellValue is undefined');
     
    }
  }
  setDepartment(this: Column, newData: any, value: number, currentRowData: any) {
    newData.departmentid = null;
    if (this.defaultSetCellValue !== undefined) {
      this.defaultSetCellValue(newData, value, currentRowData);
    } else {
            console.error('defaultSetCellValue is undefined');
     
    }
  }
  setBusiness(this: Column, newData: any, value: number, currentRowData: any) {
    newData.riskBusinessfunctionid = null;
    if (this.defaultSetCellValue !== undefined) {
      this.defaultSetCellValue(newData, value, currentRowData);
    } else {
            console.error('defaultSetCellValue is undefined');
     
    }
  }
  sendRequest1(url: string, method: string = 'GET', data: any = {}): any {
  
    let result;
  
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
            this.http.put(url,this.Buinessinfo,{headers})
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
            this.http.post(url,this.Buinessinfo,{headers})
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
        
    this.Buinessinfo.businessProcessL1ID=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.Buinessinfo.businessProcessL1ID=data.key;
  
    this.params(data);
   }
   
   params(data:any={}){
    this.Buinessinfo.businessprocessID =data.values.businessprocessID;
     this.Buinessinfo.businessSubProcessL1Name =data.values.businessSubProcessL1Name;
     this.Buinessinfo.businessSubProcessL1Description =data.values.businessSubProcessL1Description;
     this.Buinessinfo.subProcessObjestive =data.values.subProcessObjestive;
     this.Buinessinfo.unitlocationid =data.values.unitlocationid;
     this.Buinessinfo.entityid =data.values.entityid;
     this.Buinessinfo.departmentid =data.values.departmentid;
     this.Buinessinfo.riskBusinessfunctionid=data.values.riskBusinessfunctionid;
   }
  exportGrid1(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['Enity Types Of Assessment']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "entityTypeAssessment.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    //alert("test")
    const doc = new jsPDF();
    doc.text('entity Types Of Assessment',75,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('entityTypeAssessment.pdf');
    });
  }
  }
}
