import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TaskModel} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.scss']
})
export class TaskMasterComponent {
  dataSource: any;
    // DocumentTypeData:any;
    TaskTypeinfo:TaskModel=new TaskModel();
    ngOnInit(): void {
    }
    constructor(private http: HttpClient) {
      this.dataSource = new CustomStore({
          key: 'task_id',
          load: () => this.sendRequest(URL + '/TaskMaster/GetTaskMasterDetails'),
          
          insert: (values) => this.sendRequest(URL + '/TaskMaster/InsertTaskMasterDetails', 'POST', {
              // values: JSON.stringify(values)
              values
          }),
          update: (key, values) => this.sendRequest(URL + '/TaskMaster/UpdateTaskMasterDetails', 'PUT', {
               key,
              //  values: JSON.stringify(values)
              values
           }),
           remove: (key) => this.sendRequest(URL + '/TaskMaster/DeleteTaskMasterDetails', 'DELETE', {
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
  
  
  
  
onValueChanged(evt: any, data: any): void {  
  
  data.setValue(evt.value);  
  
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
              this.http.put(url,this.TaskTypeinfo,{headers})
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
              this.http.post(url,this.TaskTypeinfo,{headers})
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
  
   this.TaskTypeinfo.task_id=0;
   this.params(data);
  }
  
  updateParameters(data:any={}){
  this.TaskTypeinfo.task_id=data.key;
   this.params(data);
  }
  
  params(data:any={}){
   
    this.TaskTypeinfo.task_name=data.values.task_name;
   
    this.TaskTypeinfo.task_desc=data.values.task_desc;
    
  }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      worksheet.addRow(['Task List']);
      worksheet.addRow([]);
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "TaskMaster.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text("Task List", 100,10); // Adjust the position as needed
      doc.setFontSize(12);
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('TaskMaster.pdf');
      });
    }
  }
}
