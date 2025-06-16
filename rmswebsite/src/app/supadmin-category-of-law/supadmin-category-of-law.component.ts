import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Categoryoflaw} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-category-of-law',
  templateUrl: './supadmin-category-of-law.component.html',
  styleUrls: ['./supadmin-category-of-law.component.scss']
})
export class SupadminCategoryOfLawComponent {
  dataSource: any;
  // DocumentTypeData:any;
  Typeinfo:Categoryoflaw=new Categoryoflaw();
  userdata: any;
  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({
        key: 'category_of_law_ID',
        load: () => this.sendRequest(URL + '/SupAdminCatageorylaw/GetCatageorylaws'),
        
        insert: (values) => this.sendRequest(URL + '/SupAdminCatageorylaw/InsertCatageorylaw', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/SupAdminCatageorylaw/UpdateCatageorylaw', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/SupAdminCatageorylaw/DeleteCatageorylaw', 'DELETE', {
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

    this.Typeinfo.category_of_law_ID=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.Typeinfo.category_of_law_ID=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
     this.Typeinfo.law_Categoryname=data.values.law_Categoryname;
    this.Typeinfo.category_of_Law_Description=data.values.category_of_Law_Description;
    this.Typeinfo.createdby = this.userdata.profile.userid;
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Entity Names']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Entitymaster.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ENity Name  ',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Entitymaster.pdf');
      });
    }
  }

}
