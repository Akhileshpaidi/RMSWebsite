import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, enableProdMode } from '@angular/core';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DefaultNotifiers, DocumentType, Risk_Default_Notifiers} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { loadMessages } from 'devextreme/localization';
import { DxDataGridComponent } from 'devextreme-angular';
import { Column } from 'devextreme/ui/data_grid';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';

import { DxDataGridModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { DxTextBoxModule } from 'devextreme-angular';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  if (!/localhost/.test(document.location.host)) {
    enableProdMode();
  }
@Component({
  selector: 'app-risk-default-notifiers',
  templateUrl: './risk-default-notifiers.component.html',
  styleUrls: ['./risk-default-notifiers.component.scss']
})
export class RiskDefaultNotifiersComponent {
  userdatalist:any;
  simpleProducts:string[] = [
   
 ];
dataSource:any;
EntityType:any;
LocationType:any;
sessionData: any;
EntityID:any;
Selectedunit:any;

UnitID:any;
SelectedDepartment:any;
DefaultNotifiersinfo:Risk_Default_Notifiers=new Risk_Default_Notifiers();

setDocumentTypeValue(this: Column, newData: any, value: number, currentRowData: any) {
 //alert(value)
  newData.Unit_location_Master_id = null;
  if (this.defaultSetCellValue !== undefined) {
    this.defaultSetCellValue(newData, value, currentRowData);
    
   
  } else {
    console.error('defaultSetCellValue is undefined');
    
  }
}
setUnitlocationValue(this: Column, newData: any, value: number, currentRowData: any) {
 
   newData.Department_Master_id = null;
   if (this.defaultSetCellValue !== undefined) {
     this.defaultSetCellValue(newData, value, currentRowData);
     
    
   } else {
     console.error('defaultSetCellValue is undefined');
     
   }
 }
 constructor(private http: HttpClient,private ref: ChangeDetectorRef ,private session: SessionService,) {
    
  this.http.get(URL + '/tblUsers/GettblUsersDetails', {headers})
  .subscribe(res => {
    this.userdatalist=res as any;
    this.simpleProducts.splice(0,this.simpleProducts.length)
    this.userdatalist.forEach((element:any) => {
      this.simpleProducts.push(element.firstname)
    });
  });
  
  this.dataSource = new CustomStore({
    key: 'riskDefaultNotifiersID',
    load: () => this.sendRequest(URL + '/RiskDefaultNotifiers/GetRiskDefaultNotifiers'),
    
    insert: (values) => this.sendRequest(URL + '/RiskDefaultNotifiers/InsertRiskDefaultNotifiers', 'POST', {
        // values: JSON.stringify(values)
        values
    }),
    update: (key, values) => this.sendRequest(URL + '/RiskDefaultNotifiers/UpdateRiskDefaultNotifiers', 'PUT', {
         key,
        //  values: JSON.stringify(values)
        values
     }),
     remove: (key) => this.sendRequest(URL + '/RiskDefaultNotifiers/DeleteRiskDefaultNotifiers', 'DELETE', {
         key
     })
});

this.EntityType={
  paginate: true,
  store: new CustomStore({
   key: 'Entity_Master_id',
   loadMode: 'raw',
   load:()=>{return new Promise((resolve, reject) => {
   this.http.get(URL + '/UnitMaster/GetEntityNames' ,{headers})
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
this.DepartmentDB = this.DepartmentDB.bind(this);

  }
  getunitlocation(options:any) {
    console.log('inside method')
    console.log(options);
       const filteredData = {
      store:  new CustomStore({
        key: 'Unit_location_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          
          this.http.get(URL + '/UnitLocationMaster/GetAllUnitLocations', {headers})
        
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['entity_Master_id', '=', options.data.entity_Master_id] : null,
    };
  
    console.log('Filtered Data:', filteredData);
    return filteredData;
  }
  DepartmentDB(options:any) {
    console.log('inside method')
    console.log(options);
       const filteredData = {
      store:  new CustomStore({
        key: 'departmentid',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          
          this.http.get(URL + '/locationdepartmentmapping/GetlocationdepartmentmappingDetails', {headers})
        
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['unitlocationid', '=', options.data.unit_location_Master_id] : null,
    };
  
    console.log('Filtered Data:', filteredData);
    return filteredData;
  }
  
onCustomItemCreating1(e: any, data1:any) {
  const newValue1 = e.text;
  
  if (this.validateEmailFormat(newValue1)) {
  
    e.customItem = newValue1;
  } else {
    e.customItem = null;
    e.cancel = true;
    alert("Enter Valid Email ID")
    setTimeout(() => {
      const currentTags = data1.value.slice(); // Copy the current tags
      const index = currentTags.indexOf(newValue1);
      if (index > -1) {
        currentTags.splice(index, 1); // Remove the invalid email
        data1.setValue(currentTags); // Update the tags
      }
    }, 0);
  }
}
validateEmailFormat(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
  sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
    let result;
  
    switch(method) {
        case 'GET':
            return new Promise((resolve, reject) => {
              this.http.get(url, {headers})
                .subscribe(res => {
                 (resolve(res));
             //    alert(JSON.stringify(res))
                }, (err) => {
                  reject(err);
                });
          });
            break;
        case 'PUT':
      //  alert('put')
           this.updateParameters(data);
          
           return new Promise((resolve, reject) => {
            this.http.put(url,this.DefaultNotifiersinfo,{headers})
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
            this.http.post(url,this.DefaultNotifiersinfo,{headers})
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
   this.DefaultNotifiersinfo.riskDefaultNotifiersID=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.DefaultNotifiersinfo.riskDefaultNotifiersID=data.key;
    this.params(data);
   }
   
   params(data:any={}){
     this.DefaultNotifiersinfo.entity_Master_id=data.values.entity_Master_id;
     this.DefaultNotifiersinfo.unit_location_Master_id=data.values.unit_location_Master_id;
     this.DefaultNotifiersinfo.department_Master_id=data.values.department_Master_id;
      this.DefaultNotifiersinfo.emailid = (data.values.emailid!=null)?data.values.emailid.join(","):null;
    this.DefaultNotifiersinfo.additional_emailid_notifiers=(data.values.additional_emailid_notifiers!=null)?data.values.additional_emailid_notifiers.join(","):null;
     this.ref.detectChanges();
   }

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Document Types']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DocumentType.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Document Type',88,10);// name indicate header and values for Adujstment
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('DocumentType.pdf');
      });
    }
  }
}
