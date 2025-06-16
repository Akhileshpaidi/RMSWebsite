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
import { RiskAdminModel } from '../../../inspectionservices.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-admin-typeof-risk',
  templateUrl: './risk-admin-typeof-risk.component.html',
  styleUrls: ['./risk-admin-typeof-risk.component.scss']
})
export class RiskAdminTypeofRiskComponent {
  dataSource: any;
  
  typeofRisk:RiskAdminModel=new RiskAdminModel();
  userdata: any;
 
  constructor(private http: HttpClient, private session: SessionService) { 
    this.dataSource = new CustomStore({

        key: 'risk_Admin_typeOfRisk_id',
        load: () => this.sendRequest(URL + '/typeofRisk/GettypeofRisk'),
        
        insert: (values) => this.sendRequest(URL + '/typeofRisk/insertTypeofRisk', 'POST', {
            //values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/typeofRisk/updatetypeofRisk', 'PUT', {
             key,
             //values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/typeofRisk/DeletetypeofRisk', 'DELETE', {
             key
         })
    });


    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("userid", this.userdata.profile.userid);
  }
    onChangeParams() {
      alert('onchange');
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
               console.log(data)
               return new Promise((resolve, reject) => {
                this.http.put(url,this.typeofRisk,{headers})
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
                this.http.post(url,this.typeofRisk,{headers})
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
   
    onValueChanged(evt: any, data: any): void {  
  
      data.setValue(evt.value);  
    //  this.ref.detectChanges();
    } 
  
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.isImported=="No";
  }
    insertParameters(data:any={}){

      this.typeofRisk.Risk_Admin_typeOfRisk_id=0;
      this.params(data);
     }
     
     updateParameters(data:any={}){
     this.typeofRisk.Risk_Admin_typeOfRisk_id=data.key;
      this.params(data);
     }
    params(data:any={}){
      console.log(data)

      this.typeofRisk.Risk_Admin_typeOfRisk_name=data.values.risk_Admin_typeOfRisk_name;
      this.typeofRisk.Risk_Admin_typeOfRisk_desc=data.values.risk_Admin_typeOfRisk_desc;
     this.typeofRisk.createdby = this.userdata.profile.userid;
      
    }
    exportGrid(e:any) {
      if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        worksheet.addRow(['Law Types']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Law_Types.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("Law Types", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('Law_Types.pdf');
        });
      }
    }


}
