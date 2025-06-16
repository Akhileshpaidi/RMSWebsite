import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { keyarea} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-risk-question-bank-attribute-key-are',
  templateUrl: './risk-question-bank-attribute-key-are.component.html',
  styleUrls: ['./risk-question-bank-attribute-key-are.component.scss']
})
export class RiskQuestionBankAttributeKeyAreComponent {
  dataSource: any;
  userdata: any;
  typeID:any;
    // DocumentTypeData:any;
   SectorModelinfo:keyarea=new keyarea();
    ngOnInit(): void {
      this.addUserDataToRequest();
    }
    constructor(private http: HttpClient,  private session: SessionService ) {
      this.dataSource = new CustomStore({

          key: 'keyareaID',
          load: () => this.sendRequest(URL + '/Questionbankkeyarea/GetQuestionbankkeyareaDetails'),
          
          insert: (values) => this.sendRequest(URL + '/Questionbankkeyarea/InsertQuestionbankkeyareaDetails', 'POST', {
              //values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/Questionbankkeyarea/UpdateQuestionbankkeyareaDetails', 'PUT', {
               key,
               //values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/Questionbankkeyarea/DeleteQuestionbankkeyareaDetails', 'DELETE', {
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
          this.SectorModelinfo.createdBy = this.userdata.profile.userid;
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
            case 'PUT':
               this.updateParameters(data);
               return new Promise((resolve, reject) => {
                this.http.put(url,this.SectorModelinfo,{headers})
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
                this.http.post(url,this.SectorModelinfo,{headers})
                  .subscribe(res => {
                   (resolve(res));
                  }, (err) => {
                    reject(err.error);
                  });
                });
                break;
        //     case 'DELETE':
        //      alert( data.key)
        //   this.http.get(URL + '/Sub_Region/Sub_RegionDetailsget?id'+ data.key ,{headers})
        // .subscribe((res: any) => {
        //   if(res!=null){
        //    alert("Edit/Delete SubRegion Which is linked with Region")
        //  }
        
          
      
        //            return new Promise((resolve, reject) => {
        //         this.http.delete(url+'?id='+data.key)
        //           .subscribe(res => {
        //            (resolve(res));
        //           }, (err) => {0
        //             reject(err);
        //           });
        //         });

           
              
        //       });
            
        //       break;
        // }
        case 'DELETE':
 // alert(data.key);
  this.http.delete(URL + '/Questionbanksubkeyarea/QuestionbanksubkeyareaDetailsget?id=' + data.key, { headers })
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
      
       this.SectorModelinfo.keyareaID=0;
       this.params(data);
      }
      
      updateParameters(data:any={}){
      this.SectorModelinfo.keyareaID=data.key;
       this.params(data);
      }
      isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
        return row?.data.source=="No";
      }
      params(data:any={}){
        
        //this.SectorModelinfo.RegionMasterID=data.values.department_Master_id;

        this.SectorModelinfo.keyName =data.values.keyName;
        this.SectorModelinfo.keyDesc =data.values.keyDesc;
        this.SectorModelinfo.createdBy = this.userdata.profile.userid;
               
      }
      exportGrid(e:any) {
        if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet"); 
          worksheet.addRow([' Question Bank Attribute Define Key Area']);
          worksheet.addRow([]);
          exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
          }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "KeyArea.xlsx"); 
            }); 
          }); 
          e.cancel = true;
        } 
        else if (e.format === 'pdf') {
          const doc = new jsPDF();
          doc.text("Question Bank Attribute Define Key Area", 80,10); // Adjust the position as needed
          doc.setFontSize(12);
          exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
          }).then(() => {
            doc.save('keyarea.pdf');
          });
        }
      }

}
