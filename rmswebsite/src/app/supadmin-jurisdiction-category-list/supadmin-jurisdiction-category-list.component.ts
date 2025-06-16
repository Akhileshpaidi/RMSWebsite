import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { jurisdictioncategory} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';



const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-jurisdiction-category-list',
  templateUrl: './supadmin-jurisdiction-category-list.component.html',
  styleUrls: ['./supadmin-jurisdiction-category-list.component.scss']
})
export class SupadminJurisdictionCategoryListComponent {
  dataSource: any;
  // DocumentTypeData:any;
  judinfo:jurisdictioncategory=new jurisdictioncategory();
  userdata: any;
  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({
        key: 'jurisdiction_category_id',
        load: () => this.sendRequest(URL + '/SupAdmin_Jurisdiction/GetJurisdiction'),
        
        insert: (values) => this.sendRequest(URL + '/SupAdmin_Jurisdiction/InsertJurisdiction', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/SupAdmin_Jurisdiction/UpdateJurisdiction', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/SupAdmin_Jurisdiction/DeleteJurisdiction', 'DELETE', {
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
        this.judinfo.createdby = this.userdata.profile.userid;
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
                 this.http.put(url,this.judinfo,{headers})
                   .subscribe(res => {
                    (resolve(res));
     
                   }, (err) => {

                   // alert(err.error)
                     reject(err.error);
                   });
                 });
                 break;
        
          case 'POST':
             this.insertParameters(data);
             return new Promise((resolve, reject) => {
              this.http.post(url,this.judinfo,{headers})
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

    this.judinfo.jurisdiction_category_id=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.judinfo.jurisdiction_category_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    //this.judinfo.jurisdiction_category_id=data.values.jurisdiction_category_id
     this.judinfo.jurisdiction_categoryname=data.values.jurisdiction_categoryname;
    this.judinfo.jurisdiction_category_description=data.values.jurisdiction_category_description;
    this.judinfo.createdby = this.userdata.profile.userid;
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['jurisdiction Names']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "jurisdiction.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('jurisdiction Name  ',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('jurisdiction.pdf');
      });
    }
  }

}
