import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { regionmaster, regions} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-supadmin-region-master',
  templateUrl: './supadmin-region-master.component.html',
  styleUrls: ['./supadmin-region-master.component.scss']
})
export class SupadminRegionMasterComponent {
  dataSource: any;
  userdata: any;
    // DocumentTypeData:any;
   SectorModelinfo:regionmaster=new regionmaster();
    ngOnInit(): void {
      this.addUserDataToRequest();
    }
    constructor(private http: HttpClient,  private session: SessionService ) {
      this.dataSource = new CustomStore({

          key: 'regionMasterID',
          load: () => this.sendRequest(URL + '/SuperAdminRegion/GetRegionDetails'),
          
          insert: (values) => this.sendRequest(URL + '/SuperAdminRegion/InsertRegionDetails', 'POST', {
              //values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/SuperAdminRegion/UpdateRegionDetails', 'PUT', {
               key,
               //values: JSON.stringify(values)
               
              values
           }),
           remove: (key) => this.sendRequest(URL + '/SuperAdminRegion/DeleteRegionDetails', 'DELETE', {
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
        addUserDataToRequest(): void {
          let user: any = this.session.getUser();
          this.userdata = JSON.parse(user);
          console.log("userid", this.userdata.profile.userid);
        
          // Example: Add user data to the 'createdBy' field in Typeinfo
          //this.SectorModelinfo.createdBy = this.userdata.profile.userid;
        }

        sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
          let result;
          switch(method) {
            case 'GET':
                return new Promise((resolve, reject) => {
                  this.http.get(url, {headers})
                    .subscribe(res => {
                     (resolve(res));
                    }, (err) => {
                      reject(err);
                    });
              });
                break;
          //   case 'PUT':
          //      this.updateParameters(data);
          // alert(JSON.stringify(this.SectorModelinfo))

          //      return new Promise((resolve, reject) => {
          //       this.http.post(url,this.SectorModelinfo,{headers})
          //         .subscribe(res => {
          //          (resolve(res));
      
          //         }, (err) => {
          //           reject(err.error);
          //         });
          //       });
          //       break;
          case 'PUT':
            this.updateParameters(data);
            return new Promise((resolve, reject) => {
             // alert(JSON.stringify(this.SectorModelinfo))
             this.http.post(url,this.SectorModelinfo,{headers})
               .subscribe(res => {
                (resolve(res));
                
 
               }, (err) => {
                 //alert("err section")
                 reject(err.error);
               });
             });
             break;
            case 'POST':
               this.insertParameters(data);
               return new Promise((resolve, reject) => {
                this.http.post(url,this.SectorModelinfo,{headers})
                  .subscribe(res => {
                   (resolve(res));
                  }, (err) => {
                    reject(err.error);
                  });
                });
                break;
                case 'DELETE':
                  // alert(data.key);
                   this.http.get(URL + '/Sup_SubRegion/Sup_SubRegionDetailsget?id=' + data.key, { headers })
                     .subscribe((res: any) => {
                          return new Promise((resolve, reject) => {
                                 this.http.delete(url+'?id='+data.key)
                                   .subscribe(res => {
                                    (resolve(res));
                                   }, (err) => {
                                     reject(err.error);
                                   });
                                   window.location.reload();
                                 });
                     
                     });
                   break;
        }
      
      
      }
      
      insertParameters(data:any={}){
      
       this.SectorModelinfo.regionMasterID=0;
       this.params(data);
      }
      
      updateParameters(data:any={}){
      this.SectorModelinfo.regionMasterID=data.key;
   
       this.params(data);
      }
      
      params(data:any={}){
        
        //this.SectorModelinfo.RegionMasterID=data.values.department_Master_id;

        this.SectorModelinfo.regionName =data.values.regionName;
        this.SectorModelinfo.regionDesc =data.values.regionDesc;
        //this.SectorModelinfo.createdBy = this.userdata.profile.userid;
               
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
