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
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-unit-location-type',
  templateUrl: './supadmin-unit-location-type.component.html',
  styleUrls: ['./supadmin-unit-location-type.component.scss']
})
export class SupadminUnitLocationTypeComponent {
  dataSource: any;
  userdata: any;
  createdBy: any;
  // DocumentTypeData:any;
 // SectorModelinfo:sectorModel=new SectorModel();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({

        key: 'unitTypeID',
        load: () => this.sendRequest(URL + '/SupAdminUnitLocationType/GetUnitLocationTypeDetails'),
        
        insert: (values) => this.sendRequest(URL + '/SuperAdminUnitLocationType/InsertUnitLocationTypeDetails', 'POST', {
            //values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/SuperAdminUnitLocationType/UpdateUnitLocationTypeDetails', 'PUT', {
             key,
             //values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/SuperadminUnitLocationType/DeleteUnitLocationTypeDetails', 'DELETE', {
             key
         })
    });
  }
    onChangeParams() {
     // alert('onchange');
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
        this.createdBy = this.userdata.profile.userid;
      }


      sendRequest(url: string, method: string = 'GET', data: any = {}): any {

        let result;
          
      this.addUserDataToRequest();
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
                UnitTypeID:data.key,
                UnitTypeName:data.values.unitTypeName,
                unittypeDesc:data.values.unittypeDesc,
                createdBy: this.createdBy
  
              };
              // this.updateParameters(data);
               return new Promise((resolve, reject) => {
                this.http.put(url,putdata,{headers})
                  .subscribe(res => {
                   (resolve(res));
    
                  }, (err) => {
                    reject(err.error);
                  });
                });
                break;
            case 'POST':
      //alert(JSON.stringify(data))
      let postdata:any={
        UnitTypeID:data.values.unitTypeID?data.values.unitTypeID:0,
        UnitTypeName:data.values.unitTypeName,
        unittypeDesc:data.values.unittypeDesc,
        createdBy: this.createdBy
      };
             
           //   alert(JSON.stringify(postdata))
               //this.insertParameters(data);
               return new Promise((resolve, reject) => {
                this.http.post(url,postdata,{headers})
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
        worksheet.addRow(['UnitType List']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "unittypemaster.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("UnitType List", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('unittypemaster.pdf');
        });
      }
    }

}
