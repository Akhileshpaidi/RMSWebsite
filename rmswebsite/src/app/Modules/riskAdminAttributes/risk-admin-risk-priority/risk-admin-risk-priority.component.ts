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

import { SessionService } from 'src/app/core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { risk_admin_riskpriority } from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-admin-risk-priority',
  templateUrl: './risk-admin-risk-priority.component.html',
  styleUrls: ['./risk-admin-risk-priority.component.scss']
})
export class RiskAdminRiskPriorityComponent {


  dataSource: any;
  start:any=1;
  inputAttr:any;
  value:any;
  userdata:any;
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  riskCatlev:risk_admin_riskpriority=new risk_admin_riskpriority();

  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_riskPriorityId',
        load: () => this.sendRequest(URL + '/risk_admin_riskpriority/Getrisk_admin_riskpriority'),
        
        insert: (values) => this.sendRequest(URL + '/risk_admin_riskpriority/Insertrisk_admin_riskpriority', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_admin_riskpriority/Updaterisk_admin_riskpriority', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_admin_riskpriority/Deleterisk_admin_riskpriority', 'DELETE', {
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
    rowData.rating_level_min = evt.value;
  
  }
  
  onMaxValueChanged(evt: any, rowData: any): void {
    this.max=evt.value;
    rowData.rating_level_max = evt.value;
   
  }
  
  onRangeValueChanged(evt: any, rowData: any): void {
    rowData.rating_level_min = evt.start;
    rowData.rating_level_max = evt.end;
  }
  
  


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
          // alert(JSON.stringify(this.updateParameters));
           return new Promise((resolve, reject) => {
         
            this.http.put(url,this.riskCatlev,{headers})
              .subscribe(res => {
               (resolve(res));
              
              }, (err) => {
                reject(err.error);
                console.log('Error details:', err.message, err.status, err.error); 
              });
            });
            break;
          case 'POST':
          
             this.insertParameters(data);
             return new Promise((resolve, reject) => {
              this.http.post(url,this.riskCatlev,{headers})
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
 // alert(JSON.stringify(data))
    this.riskCatlev.risk_admin_riskPriorityId=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.risk_admin_riskPriorityId=data.key;
    
   
    this.params(data);
   }
   
   params(data:any={}){
   
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.risk_admin_riskPriorityName=data.values.risk_admin_riskPriorityName;
    this.riskCatlev.risk_priority_description=data.values.risk_priority_description;
    this.riskCatlev.rating_level_min = data.values.rating_level_min;
    this.riskCatlev.rating_level_max =data.values.rating_level_max;
    this.riskCatlev.color_code=data.values.color_code;
    this.riskCatlev.createdby = this.userdata.profile.userid;
    //this.riskCatlev.array=this.valArray;
    console.log("This is My Form Details:",JSON.stringify(this.riskCatlev));


      }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Risk Intensity']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "RiskIntensity.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('RiskIntensity',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('RiskIntensity.pdf');
      });
    }
  }


}
