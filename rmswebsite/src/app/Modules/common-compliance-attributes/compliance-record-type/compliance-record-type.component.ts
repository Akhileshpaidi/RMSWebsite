import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { ComplianceRecordType } from 'src/app/inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-compliance-record-type',
  templateUrl: './compliance-record-type.component.html',
  styleUrls: ['./compliance-record-type.component.scss']

})
export class ComplianceRecordTypeComponent {
  dataSource: any;
  // DocumentTypeData:any;
  Typeinfo:ComplianceRecordType=new ComplianceRecordType();
  userdata: any;
  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({
        key: 'compliance_record_type_id',
        load: () => this.sendRequest(URL + '/ComplianceRecordType/GetComplianceRecordDetails'),
        
        insert: (values) => this.sendRequest(URL + '/ComplianceRecordType/InsertComplianceRecordDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/ComplianceRecordType/UpdateComplianceRecordDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/ComplianceRecordType/DeleteComplianceRecordDetails', 'DELETE', {
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
        this.Typeinfo.compliance_createdby = this.userdata.profile.userid;
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
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.source=="No";
  }
  insertParameters(data:any={}){

    this.Typeinfo.compliance_record_type_id=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.Typeinfo.compliance_record_type_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
     this.Typeinfo.compliance_record_name=data.values.compliance_record_name;
    this.Typeinfo.compliance_record_description=data.values.compliance_record_description;
    this.Typeinfo.compliance_createdby = this.userdata.profile.userid;
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Compliance Record Type Names']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ComplianceRecordType.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Compliance Record Type Names',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('ComplianceRecordType.pdf');
      });
    }
  }
}

