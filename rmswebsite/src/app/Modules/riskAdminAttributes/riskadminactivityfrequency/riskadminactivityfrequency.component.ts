import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { activityfrequency} from 'src/app/inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-riskadminactivityfrequency',
  templateUrl: './riskadminactivityfrequency.component.html',
  styleUrls: ['./riskadminactivityfrequency.component.scss']
})
export class RiskadminactivityfrequencyComponent {
  dataSource: any;
  start:any=1;
  userdata:any;
  inputAttr:any;
  value:any;
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  riskCatlev:activityfrequency=new activityfrequency();
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'activityid',
        load: () => this.sendRequest(URL + '/adminactivityfrequency/Getadminactivityfrequency'),
        
        insert: (values) => this.sendRequest(URL + '/adminactivityfrequency/insertadminactivityfrequency', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/adminactivityfrequency/Updateadminactivityfrequency', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/adminactivityfrequency/Deleteadminactivityfrequency', 'DELETE', {
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


    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
 
    switch(method) {
          case 'GET':
              return new Promise((resolve, reject) => {
                this.http.get(url, {headers})
                  .subscribe((res:any) => {
                   (resolve(res));
                   res.forEach((ele:any) => {
                    this.valArray.push([ele.risk_inherent_rating_level_min,ele.risk_inherent_rating_level_max]);
                         
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
                 this.min=0;
                 this.max=0;
                
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

  onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
  //  this.ref.detectChanges();
  } 
  onValueChangedforcolor(evt: any, data: any): void {  
    data.setValue(evt.value);  
    // this.ref.detectChanges(); // Uncomment if change detection is needed
}
  sliderchange(event:any,data:any){
data.setValue(event.value);
  }
  
  
  insertParameters(data:any={}){
 // alert(JSON.stringify(data))
    this.riskCatlev.activityid=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.activityid=data.key;
    
   
    this.params(data);
   }
   
   params(data:any={}){
   
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.activityname=data.values.activityname;
    this.riskCatlev.activitydesc=data.values.activitydesc;
    //this.riskCatlev.risk_admin_likeoccfact_value=data.values.risk_admin_likeoccfact_value;
    this.riskCatlev.createdby = this.userdata.profile.userid; 
    this.riskCatlev.activityvalue = data.values.activityvalue;


// this.start = this.riskCatlev.risk_natureof_cont_occu_rating;


      }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Risk Activity Frequency']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "activityfrequency.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Risk Activity Frequency',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('activityfrequency.pdf');
      });
    }
  }

}


