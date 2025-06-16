import { Component} from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SubType, Type} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-definesubtype',
  templateUrl: './definesubtype.component.html',
  styleUrls: ['./definesubtype.component.scss']
})
export class DefinesubtypeComponent {

  dataSource2: any;
  SubTypeinfo: SubType= new SubType();
  typedata: any;
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
  this.dataSource2 = new CustomStore({
    key: 'subType_id',
  
    load: () => this.sendRequest1(URL + '/SubType/GetSubTypeDetails'),
    
    insert: (values) => this.sendRequest1(URL + '/SubType/InsertSubTypeDetails', 'POST', {
        // values: JSON.stringify(values)
        values
    }),
    update: (key, values) => this.sendRequest1(URL + '/SubType/UpdateSubTypeDetails', 'PUT', {
         key,
        //  values: JSON.stringify(values)
        values
     }),
     remove: (key) => this.sendRequest1(URL + '/SubType/DeleteSubTypeDetails', 'DELETE', {
         key
     })



     
});

this.typedata={
  paginate: true,
  store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load:()=>{return new Promise((resolve, reject) => {
        this.http.get(URL + '/Type/GetTypeDetails', {headers})
          .subscribe(res => {
           (resolve(res));

          }, (err) => {
            reject(err);
          });
    });
    },
  }),
};
}
sendRequest1(url: string, method: string = 'GET', data: any = {}): any {

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
         this.updateParameters1(data);
         return new Promise((resolve, reject) => {
          this.http.put(url,this.SubTypeinfo,{headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err.error);
            });
          });
          break;
      case 'POST':
         this.insertParameters1(data);
         return new Promise((resolve, reject) => {
          this.http.post(url,this.SubTypeinfo,{headers})
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

insertParameters1(data:any={}){

//this.SubTypeinfo.subType_id=0;
this.params1(data);
}

updateParameters1(data:any={}){
this.SubTypeinfo.subType_id=data.key;
this.params1(data);
}

params1(data:any={}){

this.SubTypeinfo.type_id=data.values.type_id;
this.SubTypeinfo.subType_Name=data.values.subType_Name;
this.SubTypeinfo.subType_DESC=data.values.subType_DESC;

}
exportGrid1(e:any) {
if (e.format === 'xlsx') {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Main sheet"); 
  worksheet.addRow(['Assessment Template Sub-Types']);
  worksheet.addRow([]);
  exportDataGrid({ 
    worksheet: worksheet, 
    component: e.component,
  }).then(function() {
    workbook.xlsx.writeBuffer().then(function(buffer) { 
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "AssessmentTemplateSub-Type.xlsx"); 
    }); 
  }); 
  e.cancel = true;
} 
else if (e.format === 'pdf') {
  //alert("test")
  const doc = new jsPDF();
  doc.text('Assessment Template Sub-Types',75,10);
  doc.setFontSize(12);
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: e.component,
  }).then(() => {
    doc.save('AssessmentTemplateSub-Type.pdf');
  });
}
}
}
