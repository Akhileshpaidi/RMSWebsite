import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { CompliancePeriod } from 'src/app/inspectionservices.service';
import ArrayStore from 'devextreme/data/array_store';
import { DxCheckBoxModule } from 'devextreme-angular';
import { NgZone } from '@angular/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  export interface Tag  {
    name: string;
  }
@Component({
  selector: 'app-compliance-period',
  templateUrl: './compliance-period.component.html',
  styleUrls: ['./compliance-period.component.scss']
})
export class CompliancePeriodComponent {
  CompliancePerioddataSource: any;
  
  optionsdata:any;
  data:any;
  
  ChooseOptions:Array<{id:number,text:string}>=[];
  Typeinfo: CompliancePeriod=new  CompliancePeriod();
  userdata: any;
  EndCompliance:boolean= true;
  ngOnInit(): void {
    this.addUserDataToRequest();
    this.ChooseOptions=[
      { id:1,text:'No Selection' },
      { id:2,text:'YYYY' },
      { id:3,text:'YY'  }
    ];

    this.optionsdata = new ArrayStore({
      data: this.ChooseOptions,
      key: "id"
    }); 

  }
  constructor(private http: HttpClient, private session: SessionService,  private zone: NgZone) {
    this.CompliancePerioddataSource = new CustomStore({
        key: 'compliance_period_id',
        //load: () => this.sendRequest(URL + '/complianceperiod/GetcomplianceperiodDetails'),
        load: (options) => {
          return this.sendRequest(URL + '/complianceperiod/GetcomplianceperiodDetails')
              .then((data: string | any[]) => {
                  // Set EndCompliance value based on retrieved data
                  if (data && data.length > 0) {
                      this.EndCompliance = data[0].check_box;
                  }
                  console.log(data)
                  return data;
              });
      },
        
        insert: (values) => this.sendRequest(URL + '/complianceperiod/InsertcomplianceperiodDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/complianceperiod/UpdatecomplianceperiodDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/complianceperiod/DeletecomplianceperiodDetails', 'DELETE', {
             key
         })
    });


  }
    onChangeParams() {
      //alert('onchange');
    }

      toggleChecked(event: any) {
        this.zone.run(() => {
          this.EndCompliance = event.value;
        });
      }
      addUserDataToRequest(): void {
        let user: any = this.session.getUser();
        this.userdata = JSON.parse(user);
        console.log("userid", this.userdata.profile.userid);
    
        // Example: Add user data to the 'createdBy' field in Typeinfo
        this.Typeinfo.createdby = this.userdata.profile.userid;
      }

  sendRequest(url: string, method: string = 'GET', data: any = {}): any {
    let result;
    switch(method) {
        case 'GET':
            return new Promise((resolve, reject) => {
              this.http.get(url, { headers })
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
            });
            break;
            
        case 'PUT':
            this.updateParameters(data);
            return new Promise((resolve, reject) => {
              this.http.put(url, this.Typeinfo, { headers })
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err.error);
                });
            });
            break;
        case 'POST':
            this.insertParameters(data);
            return new Promise((resolve, reject) => {
              this.http.post(url, this.Typeinfo, { headers })
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err.error);
                });
            });
            break;
        case 'DELETE':
            return new Promise((resolve, reject) => {
              this.http.delete(url + '?id=' + data.key)
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
            });
            break;
    }
  }
  
  insertParameters(data: any = {}) {
    this.Typeinfo.compliance_period_id = 0;
    this.params(data);
    this.Typeinfo.check_box = this.EndCompliance;
  }
  
  updateParameters(data: any = {}) {
    this.Typeinfo.compliance_period_id = data.key;
    this.params(data);
    this.Typeinfo.check_box = this.EndCompliance;
  }
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    // alert( row?.data.isImportedData)
    return row?.data.isImportedData=="No";
  }
  // params(data: any = {}) {
  //   this.Typeinfo.compliance_period_start = data.values.compliance_period_start;
  //   this.Typeinfo.compliance_period_end = data.values.compliance_period_end;
  //   this.Typeinfo.start_compliance_year_format = data.values.start_compliance_year_format; // Updated property name
  //   this.Typeinfo.end_compliance_year_format = data.values.end_compliance_year_format; // Updated property name
  //   this.Typeinfo.compliance_period_description = data.values.compliance_period_description;
  //   this.Typeinfo.check_box = this.EndCompliance;
  //   this.Typeinfo.createdby = this.userdata.profile.userid;
  // }
  params(data: any = {}) {
    // Set the start period and format regardless of the EndCompliance flag
    this.Typeinfo.compliance_period_start = data.values.compliance_period_start;
    this.Typeinfo.start_compliance_year_format = data.values.start_compliance_year_format;
  
    // Handle the end period and format based on the EndCompliance flag
    if (!this.EndCompliance) {
      this.Typeinfo.compliance_period_end = undefined;
      this.Typeinfo.end_compliance_year_format = undefined;
    } else {
      // Ensure data.values has valid end period and format before setting
      this.Typeinfo.compliance_period_end = data.values.compliance_period_end || undefined;
      this.Typeinfo.end_compliance_year_format = data.values.end_compliance_year_format || undefined;
    }
  
    // Set other fields
    this.Typeinfo.compliance_period_description = data.values.compliance_period_description;
    this.Typeinfo.createdby = this.userdata.profile.userid;
  }
//   calculateCompliancePeriod(rowData: RowData) {
//     if (rowData && rowData.compliance_period_start && rowData.compliance_period_end) {
//         return `${rowData.compliance_period_start} - ${rowData.compliance_period_end}`;
//     }
//     return '';
// }

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Compliance Period']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "CompliancePeriod.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Compliance Period',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('CompliancePeriod.pdf');
      });
    }
  }
}
interface RowData {
  compliance_period_start: string;
  compliance_period_end: string;
  // Add other properties as needed
}
