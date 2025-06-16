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
import { asseControlAccpCrit } from '../../../inspectionservices.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-ass-control-accept-crite',
  templateUrl: './ass-control-accept-crite.component.html',
  styleUrls: ['./ass-control-accept-crite.component.scss']
})
export class AssControlAcceptCriteComponent {


  dataSource: any;
   riskCate:asseControlAccpCrit=new asseControlAccpCrit();
   valArray:number[][]=[];
  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    min:number=0;
    max:number=0;
    popupTitle: string = 'Add Assessment Control Acceptance Criteria';

    onEditingStart(e: any) {
  
    console.log(JSON.stringify(e.data))
      if (e.data) { 
      
        this.popupTitle = 'Edit Assessment Control Acceptance Criteria';
        const ratingLevelMin = e.data.risk_Asses_contr_accep_crit_min_range;
        const rating_level_max=e.data.risk_Asses_contr_accep_crit_max_range;
  
  this.valArray = this.valArray.map(innerArray => 
    innerArray.filter((ele: number) => ele !== ratingLevelMin && ele !== rating_level_max) // Filter out unwanted elements
  ).filter(innerArray => innerArray.length > 0); // Remove empty arrays
  
      console.log("min Val:"+ratingLevelMin+"  max Val:"+rating_level_max+"  filtered Array Val:"+this.valArray)
      }
    }
    onEditCanceled(event: any): void {
      // this.newRowData = {};
     //  window.location.reload();
     }
  
    onInitNewRow(e: any) {
     
      this.popupTitle = 'Add Assessment Control Acceptance Criteria'; 
    } 
  
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_Asses_contr_accep_crit_id',
        load: () => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Getrisk_asses_contr_accep_critModelDetails'),
        
        insert: (values) => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Insertrisk_asses_contr_accep_critModelDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Updaterisk_asses_contr_accep_critModelDetails', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Deleterisk_asses_contr_accep_critModelDetails', 'DELETE', {
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
  rowData.risk_Asses_contr_accep_crit_min_range = evt.value;
}

onMaxValueChanged(evt: any, rowData: any): void {
  this.max=evt.value;
  rowData.risk_Asses_contr_accep_crit_max_range = evt.value;
  
}

onRangeValueChanged(evt: any, rowData: any): void {
  rowData.risk_Asses_contr_accep_crit_min_range = evt.start;
  rowData.risk_Asses_contr_accep_crit_max_range = evt.end;
}

public risk_Asses_contr_accep_crit_min_range: number = 0;
public risk_Asses_contr_accep_crit_max_range: number = 0;
  
  validateMinValue = (e: any) => {
    const min = e.value;
    const max = this.risk_Asses_contr_accep_crit_min_range;
    return min < max;
  };
  
  validateMaxValue = (e: any) => {
    const max = e.value;
    const min = this.risk_Asses_contr_accep_crit_max_range;
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
                    this.valArray.push([ele.risk_Asses_contr_accep_crit_min_range,ele.risk_Asses_contr_accep_crit_max_range]);
                         
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
  
    this.riskCate.risk_Asses_contr_accep_crit_id=0;
    this.params(data);
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_Asses_contr_accep_crit_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
   
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCate.risk_Asses_contr_accep_crit_name=data.values.risk_Asses_contr_accep_crit_name;
    this.riskCate.risk_Asses_contr_accep_crit_desc=data.values.risk_Asses_contr_accep_crit_desc;
    this.riskCate.risk_Asses_contr_accep_crit_min_range = data.values.risk_Asses_contr_accep_crit_min_range;
    this.riskCate.risk_Asses_contr_accep_crit_max_range = data.values.risk_Asses_contr_accep_crit_max_range;
    this.riskCate.array=this.valArray;
   // alert(JSON.stringify(this.riskCate))
   
   }

  
  


  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['control measure']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "control_measure.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('control_measure',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('control_measure.pdf');
      });
    }
  }



}
