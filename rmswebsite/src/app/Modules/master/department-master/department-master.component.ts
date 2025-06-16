import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DepartmentModel,InspectionservicesService} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DxToastModule, DxToastComponent } from 'devextreme-angular';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.scss']
})

export class DepartmentMasterComponent {
 dataSource: any;
 
    // DocumentTypeData:any;
    DepartmentModelinfo:DepartmentModel=new DepartmentModel();
  newDepartmentName: any;
    ngOnInit(): void {
    }
    constructor(private http: HttpClient,private InspectionservicesService:InspectionservicesService) {
      this.dataSource = new CustomStore({
          key: 'department_Master_id',
          load: () => this.sendRequest(URL + '/DepartmentMaster/GetDepartmentMasterDetails'),
          
          insert: (values) => this.sendRequest(URL + '/DepartmentMaster/InsertDepartmentMasterDetails', 'POST', {
              //values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/DepartmentMaster/UpdateDepartmentMasterDetails', 'PUT', {
               key,
               //values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/DepartmentMaster/DepartmentMasterDetails', 'DELETE', {
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


        sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
         
      
          switch(method) {
              case 'GET':
                  return new Promise((resolve, reject) => {
                    this.http.get(url, {headers})
                      .subscribe(res => {
                       (resolve(res));
                       console.log(JSON.stringify(res))
                      }, (err) => {
                        reject(err.error);
                      });
                });
                  break;
              case 'PUT':
                    
                 this.updateParameters(data);
                // this.addDepartment(data);
                 return new Promise((resolve, reject) => {
                  this.http.put(url,this.DepartmentModelinfo,{headers})
                    .subscribe(res => {
                     (resolve(res));
      
                    }, (err) => {
                      reject(err.error);
                    });
                  });
                  break;
              case 'POST':
             
              this.insertParameters(data);
              // this.addDepartment(data);
                  return new Promise((resolve, reject) => {
                    this.http.post(url,this.DepartmentModelinfo,{headers})
                      .subscribe(res => {
                       (resolve(res));
                      }, (err) => {
                        //  alert(JSON.stringify(err.error))
                        //  console.log(err)
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
                          reject(err.error);
                        });
                      });
                      break;
          }
      
      
      
      }
      
      insertParameters(data:any={}){
      
       this.DepartmentModelinfo.Department_Master_id=0;
       this.params(data);
      }
      
      updateParameters(data:any={}){
      this.DepartmentModelinfo.Department_Master_id=data.key;
       this.params(data);
      }
      
      params(data:any={}){
        
      // this.DepartmentModelinfo.Department_Master_id=data.values.department_Master_id;

        this.DepartmentModelinfo.Department_Master_name =data.values.department_Master_name;
       
        this.DepartmentModelinfo.Department_Master_Desc =data.values.department_Master_Desc;
        
      }
      exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet"); 
          worksheet.addRow(['Department List']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DepartmentMaster.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("Department List", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('DepartmentMaster.pdf');
          });
        }
      }



      
    }

