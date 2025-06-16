import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DocumentType, KeyImprovementIndictor} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-key-improvement-indicators',
  templateUrl: './key-improvement-indicators.component.html',
  styleUrls: ['./key-improvement-indicators.component.scss']
})
export class KeyImprovementIndicatorsComponent {

  dataSource: any;
  checklevelname:any;
  scorename:any;
  // DocumentTypeData:any;
  KeyImprinfo:KeyImprovementIndictor=new KeyImprovementIndictor();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'key_Impr_Indicator_id',
        load: () => this.sendRequest(URL + '/KeyImprovementIndicator/GetKeyImprovementIndicatorDetails'),
        
        insert: (values) => this.sendRequest(URL + '/KeyImprovementIndicator/InsertKeyImprovementIndicatorDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/KeyImprovementIndicator/UpdateKeyImprovementIndicatorDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/KeyImprovementIndicator/DeleteKeyImprovementIndicatorDetails', 'DELETE', {
             key
         })
    });
    this.scorename=new CustomStore({
      key:'',
     load:() => this.sendRequest(URL+'/ScoreIndicator/GetScoreIndicatorDetails')
    });
    this.checklevelname=new CustomStore({
      key:'',
     load:() => this.sendRequest(URL+'/CompetencySkill/GetCompetencySkillDetails')
    });

    this.scorename={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/ScoreIndicator/GetScoreIndicatorDetails', {headers})
              .subscribe(res => {
               (resolve(res));
               console.log(JSON.stringify(res))
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
  
    this.checklevelname={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/CompetencySkill/GetCompetencySkillDetails', {headers})
              .subscribe(res => {
               (resolve(res));
               console.log(JSON.stringify(res))
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
}
  
  onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
    }


  
    onValueChanged(evt: any, data: any): void {  
  
      data.setValue(evt.value);  
   
    } 




  sendRequest(url: string, method: string = 'GET', data: any = {}): any {

    let result;
//alert(JSON.stringify(data))
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
            this.http.put(url,this.KeyImprinfo,{headers})
            
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
            
            this.http.post(url,this.KeyImprinfo,{headers})
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

 this.KeyImprinfo.key_Impr_Indicator_id=0;
 //alert(JSON.stringify(data))
 this.params(data);
 
}

updateParameters(data:any={}){
this.KeyImprinfo.key_Impr_Indicator_id=data.key;
 this.params(data);
}

params(data:any={}){
 
  this.KeyImprinfo.key_Impr_Indicator_Name=data.values.key_Impr_Indicator_Name;
  this.KeyImprinfo.Score_id=data.values.score_id;
  this.KeyImprinfo.competency_id=data.values.competency_id;
 this.KeyImprinfo.key_Impr_Indicator_DESC=data.values.key_Impr_Indicator_DESC;
  
}
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['Key Improvement Indicators'])
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ImprovementIndicators.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Key Improvement Indicators',75,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('ImprovementIndicators.pdf');
    });
  }
}


}
