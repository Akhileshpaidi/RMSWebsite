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
import { risk_admin_bpmatratscaleindicator} from 'src/app/inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-admin-bp-matur-rat-scale',
  templateUrl: './risk-admin-bp-matur-rat-scale.component.html',
  styleUrls: ['./risk-admin-bp-matur-rat-scale.component.scss']
})
export class RiskAdminBpMaturRatScaleComponent {
  dataSource: any;
  riskCate:risk_admin_bpmatratscaleindicator=new risk_admin_bpmatratscaleindicator();
  userdata:any;
  valArray:number[][]=[];
 categorydata: any;
 public typedata:any[]=[
  
     { id: 1, name: 'Yes' },
     { id: 2, name: 'No' }   
   ];

   min:number=0;
   max:number=0;

 constructor(private http: HttpClient, private session: SessionService,) {
   this.dataSource = new CustomStore({
       key: 'risk_admin_bpmatratscaleindicatorid',
       load: () => this.sendRequest(URL + '/RiskSupAdminController/Getrisk_admin_bpmatratscaleindicator'),
       
       insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertrisk_admin_bpmatratscaleindicator', 'POST', {
           // values: JSON.stringify(values)
           values
       }),
       update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updaterisk_admin_bpmatratscaleindicator', 'PUT', {
            key,values
        }),
        remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleterisk_admin_bpmatratscaleindicator', 'DELETE', {
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
 rowData.bpMaturityRatingScaleIndicators_rating_min = evt.value;
}

onMaxValueChanged(evt: any, rowData: any): void {
 this.max=evt.value;
 rowData.bpMaturityRatingScaleIndicators_rating_max = evt.value;
 
}

onRangeValueChanged(evt: any, rowData: any): void {
 rowData.bpMaturityRatingScaleIndicators_rating_min = evt.start;
 rowData.bpMaturityRatingScaleIndicators_rating_max = evt.end;
}



   sendRequest(url: string, method: string = 'GET', data: any = {}): any {
 
 console.log(data)
   switch(method) {
         case 'GET':
             return new Promise((resolve, reject) => {
               this.http.get(url, {headers})
                 .subscribe((res:any) => {
                  (resolve(res));
                  res.forEach((ele:any) => {
                   this.valArray.push([ele.bpMaturityRatingScaleIndicators_rating_min,ele.bpMaturityRatingScaleIndicators_rating_max]);
                        
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
 
   this.riskCate.risk_admin_bpmatratscaleindicatorid=0;
   this.params(data);
   
  }
  
  updateParameters(data:any={}){
  this.riskCate.risk_admin_bpmatratscaleindicatorid=data.key;
   this.params(data);
  }
  
  params(data:any={}){
  
   //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
   this.riskCate.risk_admin_bpmatratscaleindicatorname=data.values.risk_admin_bpmatratscaleindicatorname;
   this.riskCate.risk_admin_bpmatratscaleindicatordesc=data.values.risk_admin_bpmatratscaleindicatordesc;
   this.riskCate.BPMaturityRatingScaleIndicators_rating_min = data.values.bpMaturityRatingScaleIndicators_rating_min;
   this.riskCate.BPMaturityRatingScaleIndicators_rating_max = data.values.bpMaturityRatingScaleIndicators_rating_max;
   this.riskCate.array=this.valArray;
   this.riskCate.createdby = this.userdata.profile.userid; 
  }

 
 


 exportGrid(e:any) {
   if (e.format === 'xlsx') {
     const workbook = new Workbook(); 
     const worksheet = workbook.addWorksheet("Main sheet");
     worksheet.addRow(['BP Maturity Rating Scale Indicators']);
     worksheet.addRow([]); 
     exportDataGrid({ 
       worksheet: worksheet, 
       component: e.component,
     }).then(function() {
       workbook.xlsx.writeBuffer().then(function(buffer) { 
         saveAs(new Blob([buffer], { type: "application/octet-stream" }), "BPMaturityRatingScaleIndicators.xlsx"); 
       }); 
     }); 
     e.cancel = true;
   } 
   else if (e.format === 'pdf') {
     const doc = new jsPDF();
     doc.text('BPMaturityRatingScaleIndicators',75,10);
     doc.setFontSize(12);
 
     exportDataGridToPdf({
       jsPDFDocument: doc,
       component: e.component,
     }).then(() => {
       doc.save('BPMaturityRatingScaleIndicators.pdf');
     });
   }
 }

}
