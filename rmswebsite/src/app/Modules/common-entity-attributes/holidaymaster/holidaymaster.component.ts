import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { hoildasymaster} from 'src/app/inspectionservices.service';
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
  selector: 'app-holidaymaster',
  templateUrl: './holidaymaster.component.html',
  styleUrls: ['./holidaymaster.component.scss']
})
export class HolidaymasterComponent {
  dataSource2: any;
  userdata: any;
  typedata: any;
  // DocumentTypeData:any;

 SubTypeinfo: hoildasymaster= new hoildasymaster();
  timeday: { paginate: boolean; store: CustomStore<any, any>; };
  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
   


    this.dataSource2 = new CustomStore({
      key: 'holidayid',
    
      load: () => this.sendRequest1(URL + '/holidaymaster/GetholidaymasterDetails'),
      
      insert: (values) => this.sendRequest1(URL + '/holidaymaster/InsertholidaymasterDetails', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest1(URL + '/holidaymaster/UpdateholidaymasterDetails', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest1(URL + '/holidaymaster/DeleteholidaymasterDetails', 'DELETE', {
           key
       })



       
  });

  this.typedata = {
    paginate: true,
    store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load: () => {
        return new Promise((resolve) => {
          const predefinedData = [
            { id: 1, recurence: 'Every' },
            { id: 2, recurence: 'Onces' },
            // Add more predefined values as needed
          ];

          resolve(predefinedData);
        });
      },
    }),
  };


  this.timeday = {
    paginate: true,
    store: new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load: () => {
        return new Promise((resolve) => {
          const predefinedData = [
            { timeid: 1, holidaytimeperiod: 'Date' },
            { timeid: 2, holidaytimeperiod: 'Hour' },
            { timeid: 3, holidaytimeperiod: 'Day' },
            { timeid: 4, holidaytimeperiod: 'Week' },
            { timeid: 5, holidaytimeperiod: 'Month' },
            { timeid: 6, holidaytimeperiod: 'Year' },
          ];

          resolve(predefinedData);
        });
      },
    }),
  };
  
  
  
  

 
  }
  
  addUserDataToRequest(): void {
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("userid", this.userdata.profile.userid);

    // Example: Add user data to the 'createdBy' field in Typeinfo
    this.SubTypeinfo.createdby = this.userdata.profile.userid;
  }
 
  
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.source=="No";
  }
  
  onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.docTypeID = value
    }


sendRequest1(url: string, method: string = 'GET', data: any = {}): any {

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
         this.updateParameters1(data);
         console.log(data)
         return new Promise((resolve, reject) => {
          this.http.put(url,this.SubTypeinfo,{headers})
            .subscribe(res => {
             (resolve(res));
           //  alert(JSON.stringify(res))

            }, (err) => {
              alert(JSON.stringify(err))
              reject(err.error);
            });
          });
          break;
      case 'POST':
         this.insertParameters1(data);
        // alert(this.SubTypeinfo)
         console.log(data);
         
         return new Promise((resolve, reject) => {
          this.http.post(url,this.SubTypeinfo,{headers})
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

insertParameters1(data:any={}){

//this.SubTypeinfo.subType_id=0;
this.params1(data);
}

updateParameters1(data:any={}){
this.SubTypeinfo.holidayid=data.key;
//this.params1(JSON.stringify(data));
this.params1(data); 
}

params1(data:any={}){
//alert(data)
console.log(data)
this.SubTypeinfo.holidayname=data.values.holidayname;
this.SubTypeinfo.recurence=data.values.recurence;
this.SubTypeinfo.holidaydescription=data.values.holidaydescription;
this.SubTypeinfo.holidaytimeperiod=data.values.holidaytimeperiod;
this.SubTypeinfo.hoildaytimeinterval=data.values.hoildaytimeinterval;  
this.SubTypeinfo.createdby = this.userdata.profile.userid;
}
exportGrid1(e:any) {
if (e.format === 'xlsx') {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Main sheet"); 
  worksheet.addRow(['Sub-Types Of Assessment']);
  worksheet.addRow([]);
  exportDataGrid({ 
    worksheet: worksheet, 
    component: e.component,
  }).then(function() {
    workbook.xlsx.writeBuffer().then(function(buffer) { 
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "unitlocationmaster.xlsx"); 
    }); 
  }); 
  e.cancel = true;
} 
else if (e.format === 'pdf') {
  //alert("test")
  const doc = new jsPDF();
  doc.text('Sub-Types Of Assessment',75,10);
  doc.setFontSize(12);
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: e.component,
  }).then(() => {
    doc.save('unitlocationmaster.pdf');
  });
}
}
}
