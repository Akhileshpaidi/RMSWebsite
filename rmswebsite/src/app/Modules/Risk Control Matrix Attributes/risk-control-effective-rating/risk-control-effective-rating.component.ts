import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { riskcontroleffectivenessrating, RiskClassification } from 'src/app/inspectionservices.service';
import { DxDropDownButtonComponent,DxDropDownButtonModule,  DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { ItemObject, Service } from './colorapp.service'


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  type Color = string;


@Component({
  selector: 'app-risk-control-effective-rating',
 
  templateUrl: './risk-control-effective-rating.component.html',
  styleUrls: ['./risk-control-effective-rating.component.scss'],
  providers: [Service]
})
export class RiskControlEffectiveRatingComponent {
  dropDownButton: DxDropDownButtonComponent["instance"] |any;
  colors: Color[];
  dataSource: any;
  color: string = "";
  riskCate:riskcontroleffectivenessrating=new riskcontroleffectivenessrating();

  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    popupTitle: string = 'Add Risk Control Effectiveness Rating';

    onEditingStart(e: any) {
    
      if (e.data) { 
        this.popupTitle = 'Edit Risk Control Effectiveness Rating';
      }
    }
  
    onInitNewRow(e: any) {
     
      this.popupTitle = 'Add Risk Control Effectiveness Rating'; 
    }

    
  constructor(private http: HttpClient, private session: SessionService,service: Service) {

    this.colors = service.getColors();
    

    this.dataSource = new CustomStore({
        key: 'risk_contr_eff_rating_id',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/Getriskcontroleffectivenessrating'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertriskcontroleffectivenessrating', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updateriskcontroleffectivenessrating', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleteriskcontroleffectivenessrating', 'DELETE', {
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
  sliderchange(event:any,data:any){
data.setValue(event.value);
  }




    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
  console.log(data)
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
  
    this.riskCate.risk_contr_eff_rating_id=0;
    this.params(data);
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_contr_eff_rating_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
   
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCate.risk_contr_eff_rating_name=data.values.risk_contr_eff_rating_name;
    this.riskCate.risk_contr_eff_rating_desc=data.values.risk_contr_eff_rating_desc;
    this.riskCate.risk_contr_eff_rating_color=data.values.risk_contr_eff_rating_color;
    this.riskCate.risk_contr_eff_rating_rating=data.values.risk_contr_eff_rating_rating;
   
   }

  
   
  


  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Risk Control Effectiveness Rating']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "RiskControlEffectivenessRating.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('RiskControlEffectivenessRating',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('RiskControlEffectivenessRating.pdf');
      });
    }
  }

}
