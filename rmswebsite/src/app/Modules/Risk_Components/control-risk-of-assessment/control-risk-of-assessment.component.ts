import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { control_risk_of_assessment} from 'src/app/inspectionservices.service';
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
  selector: 'app-control-risk-of-assessment',
  templateUrl: './control-risk-of-assessment.component.html',
  styleUrls: ['./control-risk-of-assessment.component.scss']
})
export class ControlRiskOfAssessmentComponent {

  dataSource:any;
  riskCate:control_risk_of_assessment=new control_risk_of_assessment();
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  popupTitle: string = 'Add Control Risk of Assessment';

  onEditingStart(e: any) {

  console.log(JSON.stringify(e.data))
    if (e.data) { 
    
      this.popupTitle = 'Edit Control Risk of Assessment';
      const ratingLevelMin = e.data.control_risk_of_assessment_range_min;
      const rating_level_max=e.data.control_risk_of_assessment_range_max;

this.valArray = this.valArray.map(innerArray => 
  innerArray.filter((ele: number) => ele !== ratingLevelMin && ele !== rating_level_max) // Filter out unwanted elements
).filter(innerArray => innerArray.length > 0); // Remove empty arrays

   
    }
  }
  onEditCanceled(event: any): void {
    // this.newRowData = {};
    
   }

  onInitNewRow(e: any) {
   
    this.popupTitle = 'Add Control Risk of Assessment'; 
  } 
  constructor(private http: HttpClient,public dialog: MatDialog){

    this.dataSource = new CustomStore({
      key: 'control_risk_of_assessment_id',
      load: () => this.sendRequest(URL + '/RiskSupAdminController/Get_control_risk_of_assessment'),
      
      insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insert_control_risk_of_assessment', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Update_control_risk_of_assessment', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Delete_control_risk_of_assessment', 'DELETE', {
           key
       })
  });
  
  
  }
  
  

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

onMaxValueChanged(evt: any, rowData: any): void {
  this.max=evt.value;
  rowData.setValue = evt.value;
 
}

onRangeValueChanged(evt: any, rowData: any): void {
  rowData.control_risk_of_assessment_range_min = evt.start;
  rowData.control_risk_of_assessment_range_max = evt.end;
}


public control_risk_of_assessment_range_min: number = 0;
public control_risk_of_assessment_range_max: number = 0;
  
  validateMinValue = (e: any) => {
    const min = e.value;
    const max = this.control_risk_of_assessment_range_max;
    return min < max;
  };
  
  validateMaxValue = (e: any) => {
    const max = e.value;
    const min = this.control_risk_of_assessment_range_min;
    return max > min;
  };

sendRequest(url: string, method: string = 'GET', data: any = {}): any {

switch(method) {
      case 'GET':
          return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
              .subscribe((res:any) => {
               (resolve(res));
               res.forEach((ele:any) => {
                this.valArray.push([ele.control_risk_of_assessment_range_min,ele.control_risk_of_assessment_range_max]);
                     
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


  this.riskCate.control_risk_of_assessment_id=0;

  this.params(data);
 

}

updateParameters(data:any={}){
this.riskCate.control_risk_of_assessment_id=data.key;

this.params(data);
}

params(data:any={}){

//this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
this.riskCate.control_risk_of_assessment_name=data.values.control_risk_of_assessment_name;
this.riskCate.control_risk_of_assessment_desc=data.values.control_risk_of_assessment_desc;
this.riskCate.color_code=data.values.color_code;
this.riskCate.control_risk_of_assessment_range_min =data.values.control_risk_of_assessment_range_min;
this.riskCate.control_risk_of_assessment_range_max =data.values.control_risk_of_assessment_range_max;
this.riskCate.array=this.valArray;
}





exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet");
    worksheet.addRow(['Control Risk of Assessment']);
    worksheet.addRow([]); 
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ControlRiskofAssessment.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('ControlRiskofAssessment',75,10);
    doc.setFontSize(12);

    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('ControlRiskofAssessment.pdf');
    });
  }
}



}
