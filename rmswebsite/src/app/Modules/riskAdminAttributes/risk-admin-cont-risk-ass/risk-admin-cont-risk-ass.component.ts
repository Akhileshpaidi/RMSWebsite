import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { risk_admin_control_risk_of_assessment} from 'src/app/inspectionservices.service';
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
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SessionService } from 'src/app/core/Session/session.service';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');



@Component({
  selector: 'app-risk-admin-cont-risk-ass',
  templateUrl: './risk-admin-cont-risk-ass.component.html',
  styleUrls: ['./risk-admin-cont-risk-ass.component.scss']
})
export class RiskAdminContRiskAssComponent {

  dataSource:any;
  riskCate:risk_admin_control_risk_of_assessment=new risk_admin_control_risk_of_assessment();
  min:number=0;
  max:number=0;
  userdata:any;
  valArray:number[][]=[];

  constructor(private http: HttpClient,public dialog: MatDialog, private session: SessionService,){

    this.dataSource = new CustomStore({
      key: 'control_risk_of_assessment_id',
      load: () => this.sendRequest(URL + '/RiskSupAdminController/Getrisk_admin_control_risk_of_assessment'),
      
      insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertrisk_admin_control_risk_of_assessment', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updaterisk_admin_control_risk_of_assessments', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleterisk_admin_control_risk_of_assessments', 'DELETE', {
           key
       })
  });
  
  let user: any = this.session.getUser();
  this.userdata = JSON.parse(user);
  console.log("userid", this.userdata.profile.userid);
}
isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
  return row?.data.isImported=="No";
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
this.riskCate.control_risk_of_assessment_range_min = data.values.control_risk_of_assessment_range_min;
this.riskCate.control_risk_of_assessment_range_max =data.values.control_risk_of_assessment_range_max;
this.riskCate.array=this.valArray;
this.riskCate.createdby = this.userdata.profile.userid; 
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
