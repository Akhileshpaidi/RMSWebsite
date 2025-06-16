import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EntityMaster} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');


@Component({
  selector: 'app-entity-master',
  templateUrl: './entity-master.component.html',
  styleUrls: ['./entity-master.component.scss']
})
export class EntityMasterComponent {
  dataSource: any;
  // DocumentTypeData:any;
 Typeinfo:EntityMaster=new EntityMaster();
  //Typeinfo:UnitMasterModel=new UnitMasterModel();
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'entity_Master_id',
        load: () => this.sendRequest(URL + '/UnitMaster/GetEntityNames'),
        
        insert: (values) => this.sendRequest(URL + '/UnitMaster/InsertEntityNames', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/UnitMaster/UpdateEntityNames', 'PUT', {
             key,
            //  values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/UnitMaster/DeleteEntityNames', 'DELETE', {
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
  
  
  
  
  
  
  
  
    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
      let result;
  
      switch(method) {
          case 'GET':
              return new Promise((resolve, reject) => {
                this.http.get(url, {headers})
                  .subscribe(res => {
                   (resolve(res));
                  // console.log(JSON.stringify(res))
                  }, (err) => {
                    reject(err);
                  });
            });
              break;
          case 'PUT':
             this.updateParameters(data);
             return new Promise((resolve, reject) => {
              this.http.put(url,this.Typeinfo,{headers})
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
              this.http.post(url,this.Typeinfo,{headers})
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

    this.Typeinfo.Entity_Master_id=0;
    this.params(data);
   }
   
   updateParameters(data:any={}){
   this.Typeinfo.Entity_Master_id=data.key;
    this.params(data);
   }
   
   params(data:any={}){
    
     this.Typeinfo.Entity_Master_Name=data.values.entity_Master_Name;
    this.Typeinfo.Entity_Master_Desc=data.values.entity_Master_Desc;
     
   }
  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Entity Names']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Entitymaster.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('ENity Name  ',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Entitymaster.pdf');
      });
    }
  }
  }

