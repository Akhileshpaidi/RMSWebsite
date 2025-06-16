import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DirectUpload} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';


const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');

interface Data {
  id: number;
  CompanyName :string;
  // ... other properties
}
interface Data1 {
  id: number;
  FileType :string;
  // ... other properties
}
@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.scss'],

})


export class AdminConfigComponent  implements OnInit {
  uploadForm: any;
  response:any;
  DirectuploadModel:any;
 // sizeLimits: any;
  documentdata:any;
  dataSource:any;
  dataSource1:any;
  DirectUploadinfo:DirectUpload=new DirectUpload();
  form: any;
  form1: any;

  selectedFiltereddataNames: string[] = [];
  selectedFiltereddataIds: number[] = [];
  filteredData: { [key: string]: Data } = {
    ".PDF":  { id: 1, CompanyName: ".PDF" },
    ".PPTX": { id: 2, CompanyName: ".PPTX" },
    ".PPT":  { id: 3, CompanyName: ".PPT" },
    ".DOC":  { id: 4, CompanyName: ".DOC" },
    ".DOCX": { id: 5, CompanyName: ".DOCX" },
  };
  
  selectedFiltereddataNames1: string[] = [];
  selectedFiltereddataIds1: number[] = [];
  filteredData1: { [key: string]: Data1 } = {

    ".PDF":  {id: 1, FileType: '.PDF'},
    ".PPTX": { id: 2,FileType: '.PPTX'},
    ".PPT":  { id:3,FileType: '.PPT'},
    ".DOC":  {id: 4, FileType: '.DOC'},
    ".DOCX": {id: 5, FileType: '.DOCX'},
    ".XLS":  {id: 6, FileType: '.XLS'},
    ".XLSX": {id: 7, FileType: '.XLSX'},
    ".ZIP":  { id: 8,FileType: '.ZIP'},
    ".SVG":  { id: 9,FileType: '.SVG'},
    ".TIFF":  { id:10,FileType: '.TIFF'},
    // ".JPEG": {id: 11,FileType: '.JPEG'},
  
  };
  
  // constructor(private formBuilder: FormBuilder, private http: HttpClient,) {}

  // ngOnInit() {
  //   this.uploadForm = new FormGroup({
  //     noOfDocuploaded: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  //     sizelimit: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern('^[0-9]*$'),
  //       (control) => {
  //         if (control.value < 5) {
  //           return { lessThanFive: true };
  //         }
  //         return null;
  //       },
  //     ])
  //   });
  // }

  ngOnInit(): void {
   
    this.form.valueChanges.subscribe((val: any) => console.log("Form values:", val));
    //this.form2.valueChanges.subscribe((val: any) => console.log("Form2 values:", val));
    //this.form3.valueChanges.subscribe((val: any) => console.log("Form3 values:", val));
   // this.checkboxForm.valueChanges.subscribe((val: any) => console.log("Form3 checkboxForm values:", val));
  }

  constructor(private fb: FormBuilder,private http: HttpClient) {
        this.form1 =  this.fb.group ({
         noOfDocuploaded: ['', Validators.required],
         sizelimit: ['', Validators.required],
         allowedFileTypes:['', Validators.required],
        })
        
        this.form =  this.fb.group ({
          sizelimit: ['', Validators.required],
          allowedFileTypes:['', Validators.required],
         })
    this.dataSource = new CustomStore({
      key: 'admin_config_id',
    
      load: () => this.sendRequest(URL + '/DiectUploadsizemaster/GetMainDocuments'),
      
      // insert: (values) => this.sendRequest(URL + '/UnitMaster/InsertEntityNames', 'POST', {
      //     // values: JSON.stringify(values)
      //     values
      // }),
      update: (key, values) => this.sendRequest(URL + '/DiectUploadsizemaster/UpdateMainDocuments', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest(URL + '/DiectUploadsizemaster/DeleteMainDocuments', 'DELETE', {
           key
       })



       
  });
  this.dataSource1 = new CustomStore({
    key: 'admin_config_id',
  
    load: () => this.sendRequest1(URL + '/DiectUploadsizemaster/GetSupportDocuments'),
    
    // insert: (values) => this.sendRequest(URL + '/UnitMaster/InsertEntityNames', 'POST', {
    //     // values: JSON.stringify(values)
    //     values
    // }),
    update: (key, values) => this.sendRequest1(URL + '/DiectUploadsizemaster/UpdateSupportDocuments', 'PUT', {
         key,
        //  values: JSON.stringify(values)
        values
     }),
     remove: (key) => this.sendRequest1(URL + '/DiectUploadsizemaster/DeleteSupportDocuments', 'DELETE', {
         key
     })



     
});

  }
  get sizelimits() {
    return this.uploadForm.get('sizelimits') as FormArray;
  }

  updateSizeLimits() {
    const noOfDocs = +this.uploadForm.get('noOfDocuploaded').value; // Convert to a number
    this.sizelimits.clear();
    
    for (let i = 0; i < noOfDocs; i++) {
      this.sizelimits.push(this.fb.control(null));
    }

  
   
  }
  
  onGridSelectionChanged(event: any) {
    console.log(event); // Check the structure of the event in the browser console
    this.selectedRowKeys = event.selectedRowKeys;
    this.gridBoxValue = this.selectedRowKeys;
    
  }
  onGridSelectionChange(event: any) {
    console.log(event); // Check the structure of the event in the browser console
    this.selectedRowKeys = event.selectedRowKeys;
    this.gridBoxValue = this.selectedRowKeys;
  }
  logSelectedRowKeys() {
    console.log('Selected Row Keys:', this.selectedRowKeys);
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
          this.http.put(url,this.DirectUploadinfo,{headers})
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
              .subscribe(res =>{
                (resolve(res));
              },(err) =>{
                reject(err);
              });
            })
            break;
      case 'POST':
         this.insertParameters(data);
         return new Promise((resolve, reject) => {
          this.http.post(url,this.DirectUploadinfo,{headers})
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

this.DirectUploadinfo.admin_config_id=0;
this.params(data);
}

updateParameters(data:any={}){
this.DirectUploadinfo.admin_config_id=data.key;
this.params(data);
}
deleteParameters(data:any={}){
  this.DirectUploadinfo.admin_config_id=data.key;
  this.params(data);
}

params(data:any={}){
this.DirectUploadinfo.noOfDocuploaded=data.values.noOfDocuploaded;

this.DirectUploadinfo.sizelimit=data.values.sizelimit;

this.DirectUploadinfo.allowedFileTypes=data.values.allowedFileTypes;

this.DirectUploadinfo.admin_config_status=data.values.admin_config_status;

}

sendRequest1(url: string, method: string = 'GET', data1: any = {}): any {

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
         this.updateParameters1(data1);
         return new Promise((resolve, reject) => {
          this.http.put(url,this.DirectUploadinfo,{headers})
            .subscribe(res => {
             (resolve(res));

            }, (err) => {
              reject(err);
            });
          });
          break;
          case 'DELETE':
            return new Promise((resolve, reject) => {
              this.http.delete(url+'?id='+data1.key)
              .subscribe(res =>{
                (resolve(res));
              },(err) =>{
                reject(err);
              });
            })
            break;
      case 'POST':
         this.insertParameters1(data1);
         return new Promise((resolve, reject) => {
          this.http.post(url,this.DirectUploadinfo,{headers})
            .subscribe(res => {
             (resolve(res));
            }, (err) => {
              reject(err);
            });
          });
          break;
    
  }



}

insertParameters1(data1:any={}){

this.DirectUploadinfo.admin_config_id=0;
this.params(data1);
}

updateParameters1(data1:any={}){
this.DirectUploadinfo.admin_config_id=data1.key;
this.params(data1);
}
deleteParameters1(data:any={}){
  this.DirectUploadinfo.admin_config_id=data.key;
  this.params(data);
}

params1(data1:any={}){
this.DirectUploadinfo.noOfDocuploaded=data1.values.noOfDocuploaded;

this.DirectUploadinfo.sizelimit=data1.values.sizelimit;

this.DirectUploadinfo.allowedFileTypes=data1.values.allowedFileTypes;

this.DirectUploadinfo.admin_config_status=data1.values.admin_config_status;

}

gridBoxValue: any[] = [];
selectedRowKeys: any[] = [];

// get filteredData() {
//   return this.data;
// }
// get filteredData1() {
//   return this.data1;
// }

exportGrid(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['File Category']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "admin-config.component.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text("File Category", 80,10); // Adjust the position as needed
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('admin-config.component.pdf');
    });
  }
}
exportGrid1(e:any) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook(); 
    const worksheet = workbook.addWorksheet("Main sheet"); 
    worksheet.addRow(['File Category']);
    worksheet.addRow([]);
    exportDataGrid({ 
      worksheet: worksheet, 
      component: e.component,
    }).then(function() {
      workbook.xlsx.writeBuffer().then(function(buffer) { 
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "admin-config.component.xlsx"); 
      }); 
    }); 
    e.cancel = true;
  } 
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    doc.text("File Category", 80,10); // Adjust the position as needed
    doc.setFontSize(12);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('admin-config.component.pdf');
    });
  }
}

onFileTypeChange(): void {
  const selectedData = this.form.get('allowedFileTypes')?.value || [];
  this.selectedFiltereddataNames = [];
  const selectedFiltereddataIds: number[] = [];
  
  //alert( selectedData);

  for (const filterID of selectedData) {
    const data = this.filteredData[filterID]; // Use filterID as the key

    console.log("Current Data:", data);

    if (data && !this.selectedFiltereddataNames.includes(data.CompanyName)) {
      this.selectedFiltereddataNames.push(data.CompanyName);
      console.log("Added to selectedFiltereddataNames:", data.CompanyName);
      selectedFiltereddataIds.push(data.id);
    }
  }
  

  console.log("Final selectedFiltereddataNames:", this.selectedFiltereddataNames);
  console.log("Final selectedFiltereddataIds:", selectedFiltereddataIds);

  // Rest of your code...
}
onFileTypeChange1(): void {
  const selectedData1 = this.form1.get('allowedFileTypes')?.value || [];
  this.selectedFiltereddataNames1 = [];
  const selectedFiltereddataIds1: number[] = [];
  
  //alert( selectedData1);

  for (const filterID1 of selectedData1) {
    const data1 = this.filteredData1[filterID1]; // Use filterID as the key

    console.log("Current Data1:", data1);

    if (data1 && !this.selectedFiltereddataNames1.includes(data1.FileType)) {
      this.selectedFiltereddataNames1.push(data1.FileType);
      console.log("Added to selectedFiltereddataNames1:", data1.FileType);
      selectedFiltereddataIds1.push(data1.id);
    }
  }
  console.log("Final selectedFiltereddataNames1:", this.selectedFiltereddataNames1);
  console.log("Final selectedFiltereddataIds1:", selectedFiltereddataIds1);

  // Rest of your code...
}

onSubmit() {
  if (this.form.valid) {
      
      let formData: any;
      formData={
        sizelimit:this.form.value.sizelimit,
        allowedFileTypes:this.form.value.allowedFileTypes.join(',') 
      }
    console.log(JSON.stringify(formData))
     
  // Post request with formData and data
    this.http.post(URL + '/DiectUploadsizemaster/InsertMainDocuments', formData)
    .subscribe((response) => {
      console.log('Data Saved Successfully ', response);
      window.alert('Data Saved Successfully');
      this.dataSource = new CustomStore({
        key: 'admin_config_id',
      
        load: () => this.sendRequest(URL + '/DiectUploadsizemaster/GetMainDocuments'),
    
    });
      this.form.reset();
    //  this.reloadcomponent();
    },
    (error) => {
      console.error('Error', error);
      window.alert('Error Saving Data');
    });
    
   
  }
}
  reloadcomponent() {
    throw new Error('Method not implemented.');
  }
onSubmit1() {
  if (this.form1.valid) {
    let formData1: any;
    formData1={
      noOfDocuploaded:this.form1.value.noOfDocuploaded,
      sizelimit:this.form1.value.sizelimit,
      allowedFileTypes:this.form1.value.allowedFileTypes.join(',') 
    }
    console.log(JSON.stringify(formData1))
   
    this.http.post(URL + '/DiectUploadsizemaster/InsertSupportDocuments',formData1)
    .subscribe((response) => {
      console.log('Data Save Succefully ', response);
      // Handle the response from the server if needed
      window.alert('Data Saved Successfully');

      this.dataSource1 = new CustomStore({
        key: 'admin_config_id',
      
        load: () => this.sendRequest1(URL + '/DiectUploadsizemaster/GetSupportDocuments'),
        
    });
      this.form1.reset();
    },
    (error) => {
      console.error('Confit', error);
      window.alert('Error Saving Data');
    });
  }
}
onCancel() {
  this.form.reset();
  }
onCancel1() {
this.form1.reset();
}


}

