import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { businesssector, TypeOfRisk} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risksupadmin-typeofrisk',
  templateUrl: './risksupadmin-typeofrisk.component.html',
  styleUrls: ['./risksupadmin-typeofrisk.component.scss']
})
export class RisksupadminTypeofriskComponent {
  dataSource: any;
  Typeinfo:TypeOfRisk=new TypeOfRisk();
  userdata: any; 

  
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'typeOfRiskID',
        load: () => this.sendRequest(URL + '/SupAdminTypeOfRisk/GetTypeOfRisk'),
        
        insert: (values) => this.sendRequest(URL + '/SupAdminTypeOfRisk/InsertTypeOfRisk', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/SupAdminTypeOfRisk/UpdateTypeOfRisk', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/SupAdminTypeOfRisk/DeleteTypeOfRisk', 'DELETE', {
             key
         })
    });

  }
  onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
  //  this.ref.detectChanges();
  } 


  
    onChangeParams() {
      //alert('onchange');
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
                  // console.log(JSON.stringify(res))
                  }, (err) => {
                    reject(err);
                  });
            });
              break;
          case 'PUT':
           
             this.updateParameters(data);
             return new Promise((resolve, reject) => {
              this.http.put(url,this.Typeinfo,{headers})
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
              this.http.post(url,this.Typeinfo,{headers})
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
  
    this.Typeinfo.typeOfRiskID=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.Typeinfo.typeOfRiskID=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
     //this.Typeinfo.TypeOfRiskID=data.values.typeOfRiskName;
    this.Typeinfo.typeOfRiskName=data.values.typeOfRiskName;
    this.Typeinfo.typeOfRiskDescription=data.values.typeOfRiskDescription;
        //this.Typeinfo.createdBy = this.userdata.profile.userid;
     
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Type Of Risk Name']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "TypeOfRisk.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('TypeOfRisk',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('TypeOfRisk.pdf');
      });
    }
  }
}
