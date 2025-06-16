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
import { riskConEffRatingModel, RiskClassification } from 'src/app/inspectionservices.service';
import { DxDropDownButtonComponent,DxDropDownButtonModule,  DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  type Color = string;


@Component({
  selector: 'app-risk-admin-risk-conteff-rat',
  templateUrl: './risk-admin-risk-conteff-rat.component.html',
  styleUrls: ['./risk-admin-risk-conteff-rat.component.scss']
})
export class RiskAdminRiskCOnteffRatComponent {
  dropDownButton: DxDropDownButtonComponent["instance"] |any;
  userdata:any;
  dataSource: any;
  color: string = "";
  riskCate:riskConEffRatingModel=new riskConEffRatingModel();

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

    
  constructor(private http: HttpClient , private session: SessionService,) {

  
    

    this.dataSource = new CustomStore({
        key: 'risk_admin_RiskContrEffeRating_id',
        load: () => this.sendRequest(URL + '/risk_admin_controller/getRiskContrEffeRating'),
        
        insert: (values) => this.sendRequest(URL + '/risk_admin_controller/InsertRiskContrEffeRating', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_admin_controller/UpdateRiskContrEffeRating', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_admin_controller/DeleteRiskConEffRating', 'DELETE', {
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
  
    this.riskCate.risk_admin_RiskContrEffeRating_id=0;
    this.params(data);
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_RiskContrEffeRating_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
   
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCate.risk_admin_RiskContrEffeRatingName=data.values.risk_admin_RiskContrEffeRatingName;
    this.riskCate.risk_admin_RiskContrEffeRatingDesc=data.values.risk_admin_RiskContrEffeRatingDesc;
    this.riskCate.risk_admin_RiskContrEffeColor=data.values.risk_admin_RiskContrEffeColor;
    this.riskCate.risk_admin_RiskContrEffeRatingRating=data.values.risk_admin_RiskContrEffeRatingRating;
    this.riskCate.createdby = this.userdata.profile.userid; 
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
