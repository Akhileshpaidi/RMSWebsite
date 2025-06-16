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
import { risk_intensity, risk_natureof_cont_occu, riskImpactRating, RiskInherentRatingLevel, RiskLikelihood} from '../../../inspectionservices.service';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-intensity',
  templateUrl: './risk-intensity.component.html',
  styleUrls: ['./risk-intensity.component.scss']
})
export class RiskIntensityComponent {

  dataSource: any;
  start:any=1;
  inputAttr:any;
  value:any;
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  riskCatlev:risk_intensity=new risk_intensity();
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_intensity_id',
        load: () => this.sendRequest(URL + '/RiskIntensity/GetRiskRiskIntensity'),
        
        insert: (values) => this.sendRequest(URL + '/RiskIntensity/InsertRiskIntensity', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskIntensity/UpdateRiskIntensity', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskIntensity/DeleteRiskIntensity', 'DELETE', {
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
    rowData.risk_intensity_level_range_min = evt.value;
  
  }
  
  onMaxValueChanged(evt: any, rowData: any): void {
    this.max=evt.value;
    rowData.risk_intensity_level_range_max = evt.value;
   
  }
  
  onRangeValueChanged(evt: any, rowData: any): void {
    rowData.risk_intensity_level_range_min = evt.start;
    rowData.risk_intensity_level_range_max = evt.end;
  }



    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
 
    switch(method) {
          case 'GET':
              return new Promise((resolve, reject) => {
                this.http.get(url, {headers})
                  .subscribe((res:any) => {
                   (resolve(res));
                   res.forEach((ele:any) => {
                  //  this.valArray.push([ele.risk_intensity_level_range_min,ele.risk_intensity_level_range_max]);
                         
                   });
                  }, (err) => {
                    reject(err);
                  });
            });
              break;
          case 'PUT':
           
             this.updateParameters(data);
          //  alert(JSON.stringify(this.updateParameters(data)));
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
    this.riskCatlev.risk_intensity_id=0;
    
     this.params(data);
   }
   
   updateParameters(data:any={}){
   this.riskCatlev.risk_intensity_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
   
   // this.riskCatlev.risk_natureof_cont_occu_id=data.values.risk_natureof_cont_occu_id;
    this.riskCatlev.risk_intensity_name=data.values.risk_intensity_name;
    this.riskCatlev.risk_intensity_desc=data.values.risk_intensity_desc;
    this.riskCatlev.risk_intensity_level_range_min = data.values.risk_intensity_level_range_min;
    this.riskCatlev.risk_intensity_level_range_max =data.values.risk_intensity_level_range_max;
    this.riskCatlev.colour_reference=data.values.colour_reference;
    //this.riskCatlev.array=this.valArray;
    console.log("This is My Form Details:",JSON.stringify(this.riskCatlev));
   // alert(JSON.stringify(this.riskCatlev))


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
