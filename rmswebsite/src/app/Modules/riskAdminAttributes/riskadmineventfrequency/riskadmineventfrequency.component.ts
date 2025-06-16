import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { adminEventfrequency} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SessionService } from 'src/app/core/Session/session.service';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-riskadmineventfrequency',
  templateUrl: './riskadmineventfrequency.component.html',
  styleUrls: ['./riskadmineventfrequency.component.scss']
})
export class RiskadmineventfrequencyComponent {
  dataSource: any;
  userdata:any;
  // DocumentTypeData:any;
 Typeinfo:adminEventfrequency=new adminEventfrequency();
  //Typeinfo:UnitMasterModel=new UnitMasterModel();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient,private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'eventfrequencyid',
        load: () => this.sendRequest(URL + '/admineventfrequency/Getadmineventfrequency'),
        
        insert: (values) => this.sendRequest(URL + '/admineventfrequency/insertadmineventfrequency', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/admineventfrequency/Updateadmineventfrequency', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/admineventfrequency/Deleteadmineventfrequency', 'DELETE', {
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
    onChangeParams() {
      //alert('onchange');
    }
    setMissionValue(rowData: any, value: any): void {
      // alert(value)
      rowData.eventid = value
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

    this.Typeinfo.eventfrequencyid=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.Typeinfo.eventfrequencyid=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
     this.Typeinfo.eventfrequencyname=data.values.eventfrequencyname;
    this.Typeinfo.eventfrequencyDesc=data.values.eventfrequencyDesc;
    this.Typeinfo.createdby = this.userdata.profile.userid; 
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Risk Event Frequency']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "riskeventfrequency.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Risk Event Frequency',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('riskeventfrequency.pdf');
      });
    }
  }
  }
