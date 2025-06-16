import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { frequencymaster} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-frequency-master',
  templateUrl: './supadmin-frequency-master.component.html',
  styleUrls: ['./supadmin-frequency-master.component.scss']
})
export class SupadminFrequencyMasterComponent {
  dataSource2: any;
  userdata: any;
  typedata: any;
  // DocumentTypeData:any;

 SubTypeinfo: frequencymaster= new frequencymaster();
  timeday: { paginate: boolean; store: CustomStore<any, any>; };


  ngOnInit(): void {
    this.addUserDataToRequest(); 
  }
  constructor(private http: HttpClient, private session: SessionService) {
   


    this.dataSource2 = new CustomStore({
      key: 'frequencyid',
    
      load: () => this.sendRequest1(URL + '/SupAdminFrequencyMaster/GetFrequencyMasterDetails'),
      
      insert: (values) => this.sendRequest1(URL + '/SupAdminFrequencymaster/InsertFrequencyMasterDetails', 'POST', {
          // values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest1(URL + '/SupAdminFrequencymaster/UpdateFrequencyMasterDetails', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest1(URL + '/SupAdminFrequencyMaster/DeleteFrequencyMasterDetails', 'DELETE', {
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
            { id: 1, recurenceid: 'Every' },
            { id: 2, recurenceid: 'Onces' },
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
            { timeid: 1, timeperiod: 'Mins' },
            { timeid: 2, timeperiod: 'Hours' },
            { timeid: 3, timeperiod: 'Days' },
            { timeid: 4, timeperiod: 'Weeks' },
            { timeid: 5, timeperiod: 'Month' },
            { timeid: 6, timeperiod: 'Year' },

             // Add more predefined values as needed
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
        //  alert(JSON.stringify(this.SubTypeinfo))
         return new Promise((resolve, reject) => {
          this.http.put(url,this.SubTypeinfo,{headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
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
this.SubTypeinfo.frequencyid=data.key;
//this.params1(JSON.stringify(data));
this.params1(data); 
}

params1(data:any={}){
//alert(data)
console.log(data)
this.SubTypeinfo.recurenceid=data.values.recurenceid;
this.SubTypeinfo.frequencyperiod=data.values.frequencyperiod;
this.SubTypeinfo.frequencyDescription=data.values.frequencyDescription;
this.SubTypeinfo.timeperiod=data.values.timeperiod;
this.SubTypeinfo.timeinterval=data.values.timeinterval;
 this.SubTypeinfo.nooffrequencyintervals=data.values.nooffrequencyintervals;
 this.SubTypeinfo.createdby = this.userdata.profile.userid;
}
exportGrid1(e:any) {
if (e.format === 'xlsx') {
  const workbook = new Workbook(); 
  const worksheet = workbook.addWorksheet("Main sheet"); 
  worksheet.addRow(['Frequency Master']);
  worksheet.addRow([]);
  exportDataGrid({ 
    worksheet: worksheet, 
    component: e.component,
  }).then(function() {
    workbook.xlsx.writeBuffer().then(function(buffer) { 
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Frequency Master.xlsx"); 
    }); 
  }); 
  e.cancel = true;
} 
else if (e.format === 'pdf') {
  //alert("test")
  const doc = new jsPDF();
  doc.text('SFrequency Master',75,10);
  doc.setFontSize(12);
  exportDataGridToPdf({
    jsPDFDocument: doc,
    component: e.component,
  }).then(() => {
    doc.save('Frequency Master.pdf');
  });
}
}

}
