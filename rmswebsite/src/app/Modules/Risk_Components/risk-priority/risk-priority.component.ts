import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { riskPriority} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { ChangeDetectorRef, NgZone} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxRangeSliderModule, DxNumberBoxModule } from 'devextreme-angular';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-priority',
  templateUrl: './risk-priority.component.html',
  styleUrls: ['./risk-priority.component.scss']
})
export class RiskPriorityComponent {
 
  dataSource:any;
  riskCate:riskPriority=new riskPriority();
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  
 



  

  constructor(private http: HttpClient,public dialog: MatDialog){

    this.dataSource = new CustomStore({
      key: 'risk_priority_id',
      load: () => this.sendRequest(URL + '/RiskSupAdminController/GetRiskPriority'),
      
      insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/InsertRiskPriority', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/UpdateRiskPriority', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/DeleteRiskPriority', 'DELETE', {
           key
       })
  });
  
  
  }
  public rating_level_min: number = 0;
public rating_level_max: number = 0;
  
  validateMinValue = (e: any) => {
    const min = e.value;
    const max = this.rating_level_max;
    return min < max;
  };
  
  validateMaxValue = (e: any) => {
    const max = e.value;
    const min = this.rating_level_min;
    return max > min;
  };

onValueChanged(evt: any, data: any): void {  

data.setValue(evt.value);  
//  this.ref.detectChanges();
} 
onValueChangedforcolor(evt: any, data: any): void {  
data.setValue(evt.value);  
// this.ref.detectChanges(); // Uncomment if change detection is needed
}
onMinValueChanged(evt: any, rowData: any): void {
  
  this.min=evt.value;
  rowData.setValue = evt.value;

}

// onMaxValueChanged(evt: any, rowData: any): void {
//   this.max=evt.value;
//   rowData.setValue = evt.value;
 
// }

// onRangeValueChanged(evt: any, rowData: any): void {
//   rowData.rating_level_min = evt.start;
//   rowData.rating_level_max = evt.end;
// }




sendRequest(url: string, method: string = 'GET', data: any = {}): any {

switch(method) {
      case 'GET':
          return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
              .subscribe((res:any) => {
               (resolve(res));
               res.forEach((ele:any) => {
               // this.valArray.push([ele.rating_level_min,ele.rating_level_max]);
                     
               });
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
        // window.location.reload();
          
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


  this.riskCate.risk_priority_id=0;

  this.params(data);
 

}

updateParameters(data:any={}){
this.riskCate.risk_priority_id=data.key;

this.params(data);
}

params(data:any={}){

//this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
this.riskCate.risk_priority_name=data.values.risk_priority_name;
this.riskCate.risk_priority_description=data.values.risk_priority_description;
this.riskCate.color_code=data.values.color_code;
this.riskCate.rating_level_min = data.values.rating_level_min;
this.riskCate.rating_level_max =data.values.rating_level_max;
//this.riskCate.array=this.valArray;
console.log('priority test data ',JSON.stringify(this.riskCate));                                                                                                            
}



  





exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Risk Priority']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "RiskPriority.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('RiskPriority',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('RiskPriority.pdf');
      });
    }
  }

 
  
}
