import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { residual_risk_rating} from 'src/app/inspectionservices.service';
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

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-residual-risk-rating',
  templateUrl: './residual-risk-rating.component.html',
  styleUrls: ['./residual-risk-rating.component.scss']
})
export class ResidualRiskRatingComponent {
  dataSource:any;
  riskCate:residual_risk_rating=new residual_risk_rating();
  min:number=0;
  max:number=0;
  valArray:number[][]=[];
  popupTitle: string = 'Add Residual Risk Rating';

  onEditingStart(e: any) {

  console.log(JSON.stringify(e.data))
    if (e.data) { 
    
      this.popupTitle = 'Edit Residual Risk Rating';
      const ratingLevelMin = e.data.residual_risk_rating_min_rating;
      const rating_level_max=e.data.residual_risk_rating_max_rating;

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
   
    this.popupTitle = 'Add Residual Risk Rating'; 
  } 
  constructor(private http: HttpClient,public dialog: MatDialog){

    this.dataSource = new CustomStore({
      key: 'residual_risk_rating_id',
      load: () => this.sendRequest(URL + '/RiskSupAdminController/Getresidual_risk_rating'),
      
      insert: (values) => this.sendRequest(URL + '/RiskSupAdminController/Insertresidual_risk_rating', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/RiskSupAdminController/Updateresidual_risk_ratings', 'PUT', {
           key,values
       }),
       remove: (key) => this.sendRequest(URL + '/RiskSupAdminController/Deleteresidual_risk_ratings', 'DELETE', {
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

  rowData.setValue = evt.value;

}

onMaxValueChanged(evt: any, rowData: any): void {
  this.max=evt.value;
  rowData.setValue = evt.value;

 
 
}

onRangeValueChanged(evt: any, rowData: any): void {
  rowData.residual_risk_rating_min_rating = evt.start;
  rowData.residual_risk_rating_max_rating = evt.end;
}



public residual_risk_rating_min_rating: number = 0;
public residual_risk_rating_max_rating: number = 0;
  
  validateMinValue = (e: any) => {
    const min = e.value;
    const max = this.residual_risk_rating_min_rating;
    return min < max;
  };
  
  validateMaxValue = (e: any) => {
    const max = e.value;
    const min = this.residual_risk_rating_max_rating;
    return max > min;
  };
sendRequest(url: string, method: string = 'GET', data: any = {}): any {

switch(method) {
      case 'GET':
          return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
              .subscribe((res:any) => {
               (resolve(res));
               res.forEach((ele:any) => {
                this.valArray.push([ele.residual_risk_rating_min_rating,ele.residual_risk_rating_max_rating]);
                     
               });
             //  alert(JSON.stringify(this.valArray));
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


  this.riskCate.residual_risk_rating_id=0;

  this.params(data);
 

}

updateParameters(data:any={}){
this.riskCate.residual_risk_rating_id=data.key;

this.params(data);
}

params(data:any={}){

//this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
this.riskCate.residual_risk_rating_name=data.values.residual_risk_rating_name;
this.riskCate.residual_risk_rating_desc=data.values.residual_risk_rating_desc;
this.riskCate.color_code=data.values.color_code;
this.riskCate.residual_risk_rating_min_rating = data.values.residual_risk_rating_min_rating;
this.riskCate.residual_risk_rating_max_rating =data.values.residual_risk_rating_max_rating;
this.riskCate.array=this.valArray;
}



  





exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Residual Risk Rating']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ResidualRiskRating.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ResidualRiskRating',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ResidualRiskRating.pdf');
      });
    }
  }

}
