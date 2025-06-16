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
  selector: 'app-sub-sector-master',
  templateUrl: './sub-sector-master.component.html',
  styleUrls: ['./sub-sector-master.component.scss']
})
export class SubSectorMasterComponent {
  dataSource: any;
  typedata: any;
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({

        key: 'subSectorMasterID',
        load: () => this.sendRequest(URL + '/SubSectorMaster/GetSubSectorMasterDetails'),
        
        insert: (values) => this.sendRequest(URL + '/SubSectorMaster/InsertSubSectorMasterDetails', 'POST', {
            //values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/SubSectorMaster/UpdateSubSectorMasterDetails', 'PUT', {
             key,
             //values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/SubSectorMaster/DeleteSubSectorMasterDetails', 'DELETE', {
             key
         })
    });


    this.typedata={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/SectorMaster/GetSectorMasterDetails', {headers})
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
                SubSectorMasterID:data.key,
                SectorID:data.values.sectorID,
                SubSectorName:data.values.subSectorName,
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
        SubSectorMasterID:data.values.SubSectorMasterID?data.values.SubSectorMasterID:0,
        SectorID:data.values.sectorID,
        SubSectorName:data.values.subSectorName,
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
    
   
    
   
    exportGrid(e:any) {
      if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        worksheet.addRow(['SubSector List']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Subsectormaster.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("SubSector List", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('Subsectormaster.pdf');
        });
      }
    }
}
