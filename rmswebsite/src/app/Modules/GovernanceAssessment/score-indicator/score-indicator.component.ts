import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ScoreIndicatorModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

interface ValidationParams {
  data: {
    scoreminrange: number;
  };
  value: number;
}
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-score-indicator',
  templateUrl: './score-indicator.component.html',
  styleUrls: ['./score-indicator.component.scss']
})


export class ScoreIndicatorComponent {
dataSource: any;
    // DocumentTypeData:any;
    ScoreIndicatorinfo:ScoreIndicatorModel=new ScoreIndicatorModel();
    ngOnInit(): void {
    }
    constructor(private http: HttpClient) {
      this.dataSource = new CustomStore({
          key: 'score_id',
          load: () => this.sendRequest(URL + '/ScoreIndicator/GetScoreIndicatorDetails'),
          
          insert: (values) => this.sendRequest(URL + '/ScoreIndicator/InsertScoreIndicatorDetails', 'POST', {
              // values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/ScoreIndicator/UpdateScoreIndicatorDetails', 'PUT', {
               key,
              //  values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/ScoreIndicator/DeleteScoreIndicatorDetails', 'DELETE', {
               key
           })
      });
   
    
  }
    
    onChangeParams() {
      alert('onchange');
    }
    setMissionValue(rowData: any, value: any): void {
      // alert(value)
      rowData.docTypeID = value
      }
  
  
  
  
  
  
  
  
    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
      let result;
  
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
              this.http.put(url,this.ScoreIndicatorinfo,{headers})
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
              this.http.post(url,this.ScoreIndicatorinfo,{headers})
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
  
   this.ScoreIndicatorinfo.Score_id=0;
   this.params(data);
  }
  
  updateParameters(data:any={}){
  this.ScoreIndicatorinfo.Score_id=data.key;
   this.params(data);
  }
  
  params(data:any={}){
   // this.ScoreIndicatorinfo.Score_id=data.values.score_id;
    this.ScoreIndicatorinfo.Score_Name=data.values.score_Name;
    this.ScoreIndicatorinfo.scoremaxrange=data.values.scoremaxrange;
    this.ScoreIndicatorinfo.scoreminrange=data.values.scoreminrange
    this.ScoreIndicatorinfo.Score_Range=data.values.score_Range;
    this.ScoreIndicatorinfo.Score_Desc=data.values.score_Desc;
    
  }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Score Indicators']) 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ScoreIndicator.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Score Indicator',85,10);
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ScoreIndicator.pdf');
      });
    }
  }
  validateNonNegative(params: any): boolean {
    return params.value >= 0;
    
}
// validateScoreRange = (params: ValidationParams) => {
//   const minRange = params.data.scoreminrange;
//   const maxRange = params.value;

//   if (maxRange <= minRange) {
//     alert( "Max score should be greater than min score." )
//     return "Max score should be greater than min score.";
//   }

//   return true;
// }


}
