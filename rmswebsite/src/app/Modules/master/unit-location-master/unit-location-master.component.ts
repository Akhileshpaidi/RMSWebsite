import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UnitMaster, EntityMaster} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-unit-location-master',
  templateUrl: './unit-location-master.component.html',
  styleUrls: ['./unit-location-master.component.scss']
})
export class UnitLocationMasterComponent {

  dataSource2: any;
  typedata: any;
  // DocumentTypeData:any;

 SubTypeinfo: UnitMaster= new UnitMaster();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
   


    this.dataSource2 = new CustomStore({
      key: 'unit_location_Master_id',
    
      load: () => this.sendRequest1(URL + '/UnitLocationMaster/GetUnitLocationDetails'),
      
      insert: (values) => this.sendRequest1(URL + '/UnitLocationMaster/InsertUnitLocationDetails', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest1(URL + '/UnitLocationMaster/UpdateUnitLocationDetails', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest1(URL + '/UnitLocationMaster/DeleteUnitLocationDetails', 'DELETE', {
           key
       })



       
  });

  this.typedata={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/UnitMaster/GetEntityNames', {headers})
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
  

 
  

  
  onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
    }














sendRequest1(url: string, method: string = 'GET', data: any = {}): any {

  let result;

  switch(method) {
      case 'GET':
          return new Promise((resolve, reject) => {
            this.http.get(url, {headers})
              .subscribe(res => {
               (resolve(res));
               console.log(JSON.stringify(res))
              }, (err) => {
                reject(err);
              });
        });
          break;
      case 'PUT':
         this.updateParameters1(data);
         //alert(JSON.stringify(this.SubTypeinfo))
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
this.SubTypeinfo.Unit_location_Master_id=data.key;
this.params1(data);
}

params1(data:any={}){

this.SubTypeinfo.Entity_Master_id=data.values.entity_Master_id;
this.SubTypeinfo.Unit_location_Master_name=data.values.unit_location_Master_name;
this.SubTypeinfo.Unit_location_Master_Desc=data.values.unit_location_Master_Desc;

}
exportGrid1(e:any) {
if (e.format === 'xlsx') {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Main sheet"); 
  worksheet.addRow(['Sub-Types Of Assessment']);
  worksheet.addRow([]);
  exportDataGrid({ 
    worksheet: worksheet, 
    component: e.component,
  }).then(function() {
    workbook.xlsx.writeBuffer().then(function(buffer) { 
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "unitlocationmaster.xlsx"); 
    }); 
  }); 
  e.cancel = true;
} 
else if (e.format === 'pdf') {
  //alert("test")
  const doc = new jsPDF();
  doc.text('Sub-Types Of Assessment',75,10);
  doc.setFontSize(12);
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: e.component,
  }).then(() => {
    doc.save('unitlocationmaster.pdf');
  });
}
}

}
