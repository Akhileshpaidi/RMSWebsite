import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DepartmentModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-risk-category',
  templateUrl: './risk-category.component.html',
  styleUrls: ['./risk-category.component.scss']
})
export class RiskCategoryComponent {
  dataSource: any;
    // DocumentTypeData:any;
   // SectorModelinfo:sectorModel=new SectorModel();
    ngOnInit(): void {
    }
    constructor(private http: HttpClient) {
      this.dataSource = new CustomStore({

          key: 'riskCategoryMasterID',
          load: () => this.sendRequest(URL + '/risk_category/GetriskcategoryDetails'),
          
          insert: (values) => this.sendRequest(URL + '/risk_category/InsertriskcategoryDetails', 'POST', {
              //values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/risk_category/UpdateriskcategoryDetails', 'PUT', {
               key,
               //values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/Nature_Of_Law/DeleteriskcategoryDetails', 'DELETE', {
               key
           })
      });
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
                       console.log(JSON.stringify(res))
                      }, (err) => {
                        reject(err);
                      });
                });
                  break;
              case 'PUT':
                let putdata:any={
                  RiskCategoryMasterID:data.key,
                  RiskCategoryName:data.values.riskCategoryName,
        Description:data.values.description

                };
                // this.updateParameters(data);
                 return new Promise((resolve, reject) => {
                  this.http.put(url,putdata,{headers})
                    .subscribe(res => {
                     (resolve(res));
      
                    }, (err) => {
                      reject(err);
                    });
                  });
                  break;
              case 'POST':
        //alert(JSON.stringify(data))
        let postdata:any={
          RiskCategoryMasterID:data.values.riskCategoryMasterID?data.values.riskCategoryMasterID:0,
          RiskCategoryName:data.values.riskCategoryName,
        Description:data.values.description
          

        };
               
                alert(JSON.stringify(postdata))
                 //this.insertParameters(data);
                 return new Promise((resolve, reject) => {
                  this.http.post(url,postdata,{headers})
                    .subscribe(res => {
                     (resolve(res));
                    }, (err) => {
                      reject(err);
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
      
      // insertParameters(data:any={}){
      
      //  this.DepartmentModelinfo.Department_Master_id=0;
      //  this.params(data);
      // }
      
      // updateParameters(data:any={}){
      // this.DepartmentModelinfo.Department_Master_id=data.key;
      //  this.params(data);
      // }
      
      params(data:any={}){
        
        // this.DepartmentModelinfo.Department_Master_id=data.values.department_Master_id;

        //this.SectorModelinfo.SectorName =data.values.SectorName;
       
               
      }
      exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet"); 
          worksheet.addRow(['Region List']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "regionmaster.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("Region List", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('regionmaster.pdf');
          });
        }
      }

}
