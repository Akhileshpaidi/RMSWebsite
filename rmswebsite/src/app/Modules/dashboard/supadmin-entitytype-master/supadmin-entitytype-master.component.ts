import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { entitytype} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-supadmin-entitytype-master',
  templateUrl: './supadmin-entitytype-master.component.html',
  styleUrls: ['./supadmin-entitytype-master.component.scss']
})
export class SupadminEntitytypeMasterComponent {
  dataSource2: any;
  
  entityTypeinfo: entitytype= new entitytype();
  userdata: any;

  ngOnInit(): void {
    this.addUserDataToRequest();
  }
  constructor(private http: HttpClient, private session: SessionService) {
  this.dataSource2 = new CustomStore({
    key: 'entitytypeid',
  
    load: () => this.sendRequest1(URL + '/SuperAdminEntityType/GetEntityTypeMasterDetails'),
    
    insert: (values) => this.sendRequest1(URL + '/SuperAdminEntityType/InsertEntityTypeDetails', 'POST', {
        // values: JSON.stringify(values)
        values
    }),
    update: (key, values) => this.sendRequest1(URL + '/SuperAdminEntityType/UpdateEntityTypeDetails', 'PUT', {
         key,
        //  values: JSON.stringify(values)
        values
     }),
     remove: (key) => this.sendRequest1(URL + '/SuperAdminEntityType/DeleteEntityTypeDetails', 'DELETE', {
         key
     })



     
});


}
addUserDataToRequest(): void {
  let user: any = this.session.getUser();
  this.userdata = JSON.parse(user);
  console.log("userid", this.userdata.profile.userid);

  // Example: Add user data to the 'createdBy' field in Typeinfo
  this.entityTypeinfo.createdBy = this.userdata.profile.userid;
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
          this.http.put(url,this.entityTypeinfo,{headers})
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
          this.http.post(url,this.entityTypeinfo,{headers})
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
this.entityTypeinfo.entitytypeid=data.key;
this.params1(data);
}

params1(data:any={}){


this.entityTypeinfo.entitytypename=data.values.entitytypename;
this.entityTypeinfo.entitytypeDesc=data.values.entitytypeDesc;
this.entityTypeinfo.createdBy = this.userdata.profile.userid;
}
exportGrid1(e:any) {
if (e.format === 'xlsx') {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Main sheet"); 
  worksheet.addRow(['Entity Type Master']);
  worksheet.addRow([]);
  exportDataGrid({ 
    worksheet: worksheet, 
    component: e.component,
  }).then(function() {
    workbook.xlsx.writeBuffer().then(function(buffer) { 
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Entity Type Master.xlsx"); 
    }); 
  }); 
  e.cancel = true;
} 
else if (e.format === 'pdf') {
  //alert("test")
  const doc = new jsPDF();
  doc.text('Entity Type Master',75,10);
  doc.setFontSize(12);
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: e.component,
  }).then(() => {
    doc.save('Entity Type Master.pdf');
  });
}
}
  
onValueChanged(evt: any, data: any): void {  
  
  data.setValue(evt.value);  
  
}  
}
