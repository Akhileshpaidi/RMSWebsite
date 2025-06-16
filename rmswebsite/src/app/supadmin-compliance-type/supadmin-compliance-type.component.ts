import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DepartmentModel, TypeOfCompliance} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { __values } from 'tslib';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-compliance-type',
  templateUrl: './supadmin-compliance-type.component.html',
  styleUrls: ['./supadmin-compliance-type.component.scss']
})
export class SupadminComplianceTypeComponent {
  dataSource: any;
  DocumentTypeData:any;
  userdata: any;
  typedata:any;
  Typeinfo: TypeOfCompliance=new  TypeOfCompliance();
 //  // SectorModelinfo:sectorModel=new SectorModel();
   ngOnInit(): void {
    this.addUserDataToRequest(); 
   }
   constructor(private http: HttpClient, private session: SessionService) {
     this.dataSource = new CustomStore({
 
         key: 'compliance_type_id',
         load: () => this.sendRequest(URL + '/SupAdminComplianceType/GetComplianceTypeDetails'),
         
         insert: (values) => this.sendRequest(URL + '/SupAdminComplianceType/InsertComplianceTypeDetails', 'POST', {
             //values: JSON.stringify(values)
             values
         }),
         update: (key, values) => this.sendRequest(URL + '/SupAdminComplianceType/UpdateComplianceTypeDetails', 'PUT', {
              key,
              //values: JSON.stringify(values)
             values
          }),
          remove: (key) => this.sendRequest(URL + '/SupAdminComplianceType/DeleteComplianceTypeDetails', 'DELETE', {
              key
          })
     });
     
   }
   onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
    }



    addUserDataToRequest(): void {
      let user: any = this.session.getUser();
      this.userdata = JSON.parse(user);
      console.log("userid", this.userdata.profile.userid);
  
      // Example: Add user data to the 'createdBy' field in Typeinfo
      this.Typeinfo.createdby = this.userdata.profile.userid;
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

  this.Typeinfo.compliance_type_id=0;
  this.params(data);
 }
 
 updateParameters(data:any={}){
 this.Typeinfo.compliance_type_id=data.key;
  this.params(data);
 }
 
 params(data:any={}){
  
   this.Typeinfo.compliance_type_name=data.values.compliance_type_name;
  this.Typeinfo.compliance_type_description=data.values.compliance_type_description;
  this.Typeinfo.createdby = this.userdata.profile.userid;
 }
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet");
    worksheet.addRow(['Compliance Type']);
    worksheet.addRow([]); 
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Compliancetype.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Compliance Type',75,10);
    doc.setFontSize(12);

    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Compliancetype.pdf');
    });
  }
}
}
