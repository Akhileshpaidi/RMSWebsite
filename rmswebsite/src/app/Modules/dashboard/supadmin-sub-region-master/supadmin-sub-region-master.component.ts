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
  selector: 'app-supadmin-sub-region-master',
  templateUrl: './supadmin-sub-region-master.component.html',
  styleUrls: ['./supadmin-sub-region-master.component.scss']
})
export class SupadminSubRegionMasterComponent {
  dataSource: any;
  typedata: any;

  userdata: any;
  createdBy: any;
  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({

        key: 'sub_RegionMasterID',
        load: () => this.sendRequest(URL + '/SuperAdminSubRegion/GetSubRegionDetails'),
        
        insert: (values) => this.sendRequest(URL + '/SuperAdminSubRegion/InsertSubRegionDetails', 'POST', {
            //values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/SuperAdminSubRegion/UpdateSubRegionDetails', 'PUT', {
             key,
             //values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/SuperAdminSubRegion/DeleteSubRegionDetails', 'DELETE', {
             key
         })
    });


    this.typedata={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
           // this.http.get(URL + '/Region/GetRegionDetails', {headers})
            this.http.get(URL + '/SuperAdminRegion/GetRegionDetails', {headers})

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
                sub_RegionMasterID:data.key,
                regionMasterID:data.values.regionMasterID,
                sub_RegionName:data.values.sub_RegionName,
                description:data.values.description,
                //createdBy: this.createdBy
              };
             // alert (JSON.stringify(putdata))
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
        sub_RegionMasterID:data.values.sub_RegionMasterID?data.values.sub_RegionMasterID:0,
        regionMasterID:data.values.regionMasterID,
                sub_RegionName:data.values.sub_RegionName,
                description:data.values.description,
        //createdBy: this.createdBy
      };
             
            //  alert(JSON.stringify(postdata))
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
        worksheet.addRow(['SubRegion List']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "sub_regionmaster.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("SubRegion List", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('sub_regionmaster.pdf');
        });
      }
    }

}
