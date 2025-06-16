import { Component } from '@angular/core'
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { SessionService } from 'src/app/core/Session/session.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0]: never;
import {  risk_admin_asscontracptcrit } from 'src/app/inspectionservices.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-admin-asse-contr-acct-cri',
  templateUrl: './risk-admin-asse-contr-acct-cri.component.html',
  styleUrls: ['./risk-admin-asse-contr-acct-cri.component.scss']
})
export class RiskAdminAsseContrAcctCriComponent {

  dataSource: any;
   riskCate:risk_admin_asscontracptcrit=new risk_admin_asscontracptcrit();
   valArray:number[][]=[];
   userdata:any;
  categorydata: any;
  public typedata:any[]=[
   
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }   
    ];

    min:number=0;
    max:number=0;
 
  constructor(private http: HttpClient, private session: SessionService,) {
    this.dataSource = new CustomStore({
        key: 'risk_admin_asscontracptCritid',
        load: () => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Getrisk_admin_asscontracptcrit'),
        
        insert: (values) => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Insertrisk_admin_asscontracptcrit', 'POST', {
            // values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Updaterisk_admin_asscontracptcrit', 'PUT', {
             key,values
         }),
         remove: (key) => this.sendRequest(URL + '/risk_asses_contr_accep_crit/Deleterisk_admin_asscontracptcrit', 'DELETE', {
             key
         })
    });
   
    let user: any = this.session.getUser();
    this.userdata = JSON.parse(user);
    console.log("userid", this.userdata.profile.userid);
  }
  isUpdateIconVisible({ row }: FirstArgument<DxDataGridTypes.Editing['allowUpdating'| 'allowDeleting']>){
    return row?.data.isImported=="No";
  }
  onValueChanged(evt: any, data: any): void {  
  
    data.setValue(evt.value);  
  //  this.ref.detectChanges();
  } 
  onValueChangedforcolor(evt: any, data: any): void {  
    data.setValue(evt.value);  
    // this.ref.detectChanges(); // Uncomment if change detection is needed
}
onMinValueChanged(evt: any, rowData: any): void {
  
  this.min=evt.value;
  rowData.risk_Asses_contr_accep_crit_min_range = evt.value;
}

onMaxValueChanged(evt: any, rowData: any): void {
  this.max=evt.value;
  rowData.risk_Asses_contr_accep_crit_max_range = evt.value;
  
}

onRangeValueChanged(evt: any, rowData: any): void {
  rowData.risk_Asses_contr_accep_crit_min_range = evt.start;
  rowData.risk_Asses_contr_accep_crit_max_range = evt.end;
}



    sendRequest(url: string, method: string = 'GET', data: any = {}): any {
  
  console.log(data)
    switch(method) {
          case 'GET':
              return new Promise((resolve, reject) => {
                this.http.get(url, {headers})
                  .subscribe((res:any) => {
                   (resolve(res));
                   res.forEach((ele:any) => {
                    this.valArray.push([ele.risk_Asses_contr_accep_crit_min_range,ele.risk_Asses_contr_accep_crit_max_range]);
                         
                   });
                  }, (err) => {
                    reject(err);
                  });
            });
              break;
          case 'PUT':
           
             this.updateParameters(data);
      
             return new Promise((resolve, reject) => {
              this.http.put(url,this.riskCate,{headers})
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
              this.http.post(url,this.riskCate,{headers})
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
  
    this.riskCate.risk_admin_asscontracptCritid=0;
    this.params(data);
    
   }
   
   updateParameters(data:any={}){
   this.riskCate.risk_admin_asscontracptCritid=data.key;
    this.params(data);
   }
   
   params(data:any={}){
   
    //this.riskCate.risk_categorization_id=data.values.risk_categorization_id;
    this.riskCate.risk_admin_asscontracptCritname=data.values.risk_admin_asscontracptCritname;
    this.riskCate.risk_admin_asscontracptCritdesc=data.values.risk_admin_asscontracptCritdesc;
    this.riskCate.risk_Asses_contr_accep_crit_min_range = data.values.risk_Asses_contr_accep_crit_min_range;
    this.riskCate.risk_Asses_contr_accep_crit_max_range = data.values.risk_Asses_contr_accep_crit_max_range;
    this.riskCate.array=this.valArray;
    //alert(JSON.stringify(this.riskCate))
   
    this.riskCate.createdby = this.userdata.profile.userid; 
  }
  
  


  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['control measure']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "control_measure.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('control_measure',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('control_measure.pdf');
      });
    }
  }


}
