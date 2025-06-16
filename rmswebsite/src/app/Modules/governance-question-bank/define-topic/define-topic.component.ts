import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {topic} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-define-topic',
  templateUrl: './define-topic.component.html',
  styleUrls: ['./define-topic.component.scss']
})
export class DefineTopicComponent {
  dataSource: any;
  topicdata:any;
  // DocumentTypeData:any;
  topicinfo:topic=new topic();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'topic_id',
        load: () => this.sendRequest(URL + '/topic/GettopicDetails'),
        
        insert: (values) => this.sendRequest(URL + '/topic/InserttopicDetails', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/topic/UpdatetopicDetails', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/topic/DeletetopicDetails', 'DELETE', {
             key
         })
    });

    this.topicdata={
      paginate: true,
      store: new CustomStore({
       
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
           
            this.http.get(URL + '/Subject/GetSubjectDetails', {headers})
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
                }, (err) => {
                  reject(err);
                });
          });
            break;
        case 'PUT':
           this.updateParameters(data);
           return new Promise((resolve, reject) => {
            this.http.put(url,this.topicinfo,{headers})
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
            this.http.post(url,this.topicinfo,{headers})
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

insertParameters(data:any={}){
// alert("vishu")
// alert(JSON.stringify(data))
 //this.topicinfo.topic_id=0;
 this.params(data);
}

updateParameters(data:any={}){
this.topicinfo.topic_id=data.key;
 this.params(data);
}

params(data:any={}){
  //alert(JSON.stringify(data))
  this.topicinfo.subject_id=data.values.subject_id;
  this.topicinfo.topic_Name=data.values.topic_Name;
  this.topicinfo.topic_Desc=data.values.topic_Desc;
  
}
exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['Topics List Of Subjects']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "TopicsList.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text('Topics List Of Subjects',80,10);
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('TopicsList.pdf');
    });
  }
}



}
