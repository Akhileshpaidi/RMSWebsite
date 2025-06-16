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
import { bpmaturityratingscaleindicators, RiskClassification } from 'src/app/inspectionservices.service';
import { DxDropDownButtonComponent,DxDropDownButtonModule,  DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-bp-maturity-rating-scale',
  templateUrl: './bp-maturity-rating-scale.component.html',
  styleUrls: ['./bp-maturity-rating-scale.component.scss']
})
export class BpMaturityRatingScaleComponent {
  dataSource: any;
   riskCate:bpmaturityratingscaleindicators=new bpmaturityratingscaleindicators();

   valArray:number[][]=[];
  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    min:number=0;
    max:number=0;
    popupTitle: string = 'Add BP Maturity Rating Scale Indicators';

    onEditingStart(e: any) {
  
    console.log(JSON.stringify(e.data))
      if (e.data) { 
      
        this.popupTitle = 'Edit BP Maturity Rating Scale Indicators';
        const ratingLevelMin = e.data.bpMaturityRatingScaleIndicators_rating_min;
        const rating_level_max=e.data.bpMaturityRatingScaleIndicators_rating_max;
  
  this.valArray = this.valArray.map(innerArray => 
    innerArray.filter((ele: number) => ele !== ratingLevelMin && ele !== rating_level_max) // Filter out unwanted elements
  ).filter(innerArray => innerArray.length > 0); // Remove empty arrays
  
      console.log("min Val:"+ratingLevelMin+"  max Val:"+rating_level_max+"  filtered Array Val:"+this.valArray)
      }
    }
    onEditCanceled(event: any): void {
      // this.newRowData = {};
      // window.location.reload();
     }
  
    onInitNewRow(e: any) {
     
      this.popupTitle = 'Add BP Maturity Rating Scale Indicators'; 
    } 
  
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'bpMaturityRatingScaleIndicators_id',
        load: () => this.sendRequest(URL + '/RiskSupAdminController/Getbpmaturityratingscaleindicators'),
        
        insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertbpmaturityratingscaleindicators', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updatebpmaturityratingscaleindicators', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deletebpmaturityratingscaleindicators', 'DELETE', {
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
public bpMaturityRatingScaleIndicators_rating_min: number = 0;
public bpMaturityRatingScaleIndicators_rating_max: number = 0;
  
  validateMinValue = (e: any) => {
    const min = e.value;
    const max = this.bpMaturityRatingScaleIndicators_rating_min;
    return min < max;
  };
  
  validateMaxValue = (e: any) => {
    const max = e.value;
    const min = this.bpMaturityRatingScaleIndicators_rating_min;
    return max > min;
  };


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
  
    this.riskCate.BPMaturityRatingScaleIndicators_id=0;
    this.params(data);
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.BPMaturityRatingScaleIndicators_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
   
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCate.BPMaturityRatingScaleIndicators_name=data.values.bpMaturityRatingScaleIndicators_name;
    this.riskCate.BPMaturityRatingScaleIndicators_desc=data.values.bpMaturityRatingScaleIndicators_desc;
   
    this.riskCate.BPMaturityRatingScaleIndicators_rating_min = data.values.bpMaturityRatingScaleIndicators_rating_min;
    this.riskCate.BPMaturityRatingScaleIndicators_rating_max = data.values.bpMaturityRatingScaleIndicators_rating_max ;
    this.riskCate.array=this.valArray;
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
