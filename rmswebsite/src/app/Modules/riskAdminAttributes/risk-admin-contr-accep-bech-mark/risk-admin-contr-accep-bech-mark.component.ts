import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { risk_admin_con_accept_benchmark} from 'src/app/inspectionservices.service';
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
  selector: 'app-risk-admin-contr-accep-bech-mark',
  templateUrl: './risk-admin-contr-accep-bech-mark.component.html',
  styleUrls: ['./risk-admin-contr-accep-bech-mark.component.scss']
})
export class RiskAdminContrAccepBechMarkComponent {
  userdata:any;
  dataSource:any;
  riskCate:risk_admin_con_accept_benchmark=new risk_admin_con_accept_benchmark();
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  popupTitle: string = 'Add Control Acceptance Benchmark';

  onEditingStart(e: any) {
  
    if (e.data) { 
      this.popupTitle = 'Edit Control Acceptance Benchmark';
    }
  }

  onInitNewRow(e: any) {
   
    this.popupTitle = 'Add Control Acceptance Benchmark'; 
  } 

  constructor(private http: HttpClient,public dialog: MatDialog,private session: SessionService,){

    this.dataSource = new CustomStore({
      key: 'risk_admin_con_accept_benchmark_id',
      load: () => this.sendRequest(URL + '/risk_admin_controller/Get_ControlAcceptanceBenchmark'),
      
      insert: (values) => this.sendRequest(URL + '/risk_admin_controller/Insert_ControlAcceptanceBenchmark', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/risk_admin_controller/Update_ControlAcceptanceBenchmark', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/risk_admin_controller/Delete_ControlAcceptanceBenchmark', 'DELETE', {
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
  rowData.risk_admin_con_accept_benchmark_min_level = evt.start;
  rowData.risk_admin_con_accept_benchmark_max_level = evt.end;
}




sendRequest(url: string, method: string = 'GET', data: any = {}): any {

switch(method) {
      case 'GET':
          return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
              .subscribe((res:any) => {
               (resolve(res));
               res.forEach((ele:any) => {
                this.valArray.push([ele.risk_admin_con_accept_benchmark_min_level,ele.risk_admin_con_accept_benchmark_max_level]);
                     
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


  this.riskCate.risk_admin_con_accept_benchmark_id=0;

  this.params(data);
 

}

updateParameters(data:any={}){
this.riskCate.risk_admin_con_accept_benchmark_id=data.key;

this.params(data);
}

params(data:any={}){

//this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
this.riskCate.risk_admin_con_accept_benchmark_name=data.values.risk_admin_con_accept_benchmark_name;
this.riskCate.risk_admin_con_accept_benchmark_desc=data.values.risk_admin_con_accept_benchmark_desc;
this.riskCate.risk_admin_con_accept_benchmark_color_code=data.values.risk_admin_con_accept_benchmark_color_code;
this.riskCate.risk_admin_con_accept_benchmark_min_level = data.values.risk_admin_con_accept_benchmark_min_level;
this.riskCate.risk_admin_con_accept_benchmark_max_level =data.values.risk_admin_con_accept_benchmark_max_level;
this.riskCate.array=this.valArray;
this.riskCate.createdby = this.userdata.profile.userid;                                                                                                          
}



  





exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Control Acceptance Benchmark']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ControlAcceptanceBenchmark.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ControlAcceptanceBenchmark',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ControlAcceptanceBenchmark.pdf');
      });
    }
  }

 
}
