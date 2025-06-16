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
import { DxDataGridTypes  } from 'devextreme-angular/ui/data-grid';

type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-assessment-templete-subtype',
  templateUrl: './risk-assessment-templete-subtype.component.html',
  styleUrls: ['./risk-assessment-templete-subtype.component.scss']
})
export class RiskAssessmentTempleteSubtypeComponent {

  dataSource: any;
  typedata: any;

  userdata: any;
  createdBy: any;
  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({

        key: 'subtypeID',
        load: () => this.sendRequest(URL + '/assessmentsubtype/GetAssessmenttemplateSubTypeDetails'),
        
        insert: (values) => this.sendRequest(URL + '/assessmentsubtype/InsertassessmentsubtypeDetails', 'POST', {
            //values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/assessmentsubtype/UpdateassessmentsubtypeDetails', 'PUT', {
             key,
             //values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/assessmentsubtype/DeleteassessmentsubtypeDetails', 'DELETE', {
             key
         })
    });


    this.typedata={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/riskAssessmentAttribute/GetriskAssessmentAttributeDetails', {headers})
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
      //alert('onchange');
    }
    isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
      return row?.data.source=="No";
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
                subtypeID:data.key,
                typeID:data.values.typeID,
                subtypename:data.values.subtypename,
                description:data.values.description,
                createdBy: this.createdBy
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
        subtypeID:data.values.subtypeID?data.values.subtypeID:0,
        typeID:data.values.typeID,
        subtypename:data.values.subtypename,
        description:data.values.description,
        createdBy: this.createdBy
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
        worksheet.addRow(['Sub Type List']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "SubType.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("Sub Type List", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('subtype.pdf');
        });
      }
    }

}

