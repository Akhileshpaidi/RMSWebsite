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
import { __values } from 'tslib';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-sector-master',
  templateUrl: './sector-master.component.html',
  styleUrls: ['./sector-master.component.scss']
})
export class SectorMasterComponent {

  dataSource: any;
    // DocumentTypeData:any;
   // SectorModelinfo:sectorModel=new SectorModel();
    ngOnInit(): void {
    }
    constructor(private http: HttpClient) {
      this.dataSource = new CustomStore({

          key: 'sectorID',
          load: () => this.sendRequest(URL + '/SectorMaster/GetSectorMasterDetails'),
          
          insert: (values) => this.sendRequest(URL + '/SectorMaster/InsertSectorMasterDetails', 'POST', {
              //values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/SectorMaster/UpdateSectorMasterDetails', 'PUT', {
               key,
               //values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/SectorMaster/DeleteSectorMasterDetails', 'DELETE', {
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
                  SectorID:data.key,
                  SectorName:data.values.sectorName
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
          SectorID:data.values.sectorID?data.values.sectorID:0,
          SectorName:data.values.sectorName
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
          worksheet.addRow(['Sector List']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "sectormaster.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("Sector List", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('sectormaster.pdf');
          });
        }
      }
}
