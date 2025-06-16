import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserModel,UnitMaster,EntityMaster,DepartmentModel,RoleModel, JurisdictionLocation} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { DxSelectBoxModule } from 'devextreme-angular';
import { Column } from 'devextreme/ui/data_grid';
import { SessionService } from 'src/app/core/Session/session.service';
// import { passwordMatchValidator } from 'path-to-validator-file';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-supadmin-jurisdiction-location',
  templateUrl: './supadmin-jurisdiction-location.component.html',
  styleUrls: ['./supadmin-jurisdiction-location.component.scss']
})
export class SupadminJurisdictionLocationComponent {
  dataSource: any; // Replace this with your actual data source
  countries: any[] = [];
  states: any[] = [];
  selectedCountryId: any;
  selectedCountryStates: any[] = [];
  //DxSelectBoxModule,
  CountryMaster:any;
  StateMaster:any; 
  EntityID: any;
  Districtmaster:any;
  userdata: any;
  //jurisdiction_country_id:any;

  Typeinfo:JurisdictionLocation=new JurisdictionLocation();
  constructor(private http: HttpClient, private session: SessionService) {
    this.dataSource = new CustomStore({
      key: 'jurisdiction_location_id',
      load: () => this.sendRequest(URL + '/SupAdmin_JurisdictionLocation/GetJurisdictionLocationDetails'),
      
      insert: (values) => this.sendRequest(URL + '/SupAdmin_JurisdictionLocation/InsertJurisdictionLocationDetails', 'POST', {
           //values: JSON.stringify(values)
          values
      }),
      update: (key, values) => this.sendRequest(URL + '/SupAdmin_JurisdictionLocation/UpdateJurisdictionLocationDetails', 'PUT', {
           key,
          //  values: JSON.stringify(values)
          values
       }),
       remove: (key) => this.sendRequest(URL + '/SupAdmin_JurisdictionLocation/DeleteJurisdictionLocationDetails', 'DELETE', {
           key
       })
  });
  
  // private fetchCountries() {
  //   // Replace 'YOUR_BACKEND_API_URL/countries' with the actual endpoint to fetch countries from your backend
  //   this.http.get<any[]>(URL + '/Country/GetCountries').subscribe(
  //     (countries: any[]) => {
  //       this.CountryMaster = countries;
  //     },
  //     error => {
  //       console.error('Error fetching countries:', error);
  //     }
  //   );
  // };

  this.CountryMaster={
    paginate: true,
    store: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/Country/GetCountries', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
  };
  this.getFilteredStates = this.getFilteredStates.bind(this);
  }

  ngOnInit() {
    
    this.addUserDataToRequest(); 
  }

  // onCountryValueChanged(e: any) {
  //   alert("yughxzhjvgghuf")
  //   this.selectedCountryId = e.value;
  //   this.fetchStatesByCountry(this.selectedCountryId);
    
  // }


  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet");
      worksheet.addRow(['Jurisdiction Location List']);
      worksheet.addRow([]); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "jurisdictionlocationlist.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      doc.text('Jurisdiction Location List ',75,10);
      doc.setFontSize(12);
  
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('jurisdictionlocationlist.pdf');
      });
    }
  }
  onEditorPreparing(e:any) {
  
    if (e.parentType === 'dataRow' && e.dataField === 'jurisdiction_state_id') {
     console.log('onEditorPreparing')
      //e.editorOptions.disabled = (typeof e.row.data.jurisdiction_state_id !== 'number');
    }
  }




  getFilteredStates(options:any) {
    console.log('inside method')
    console.log(options);
   
    const filteredData = {
      store:  new CustomStore({
        key: 'jurisdiction_state_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/States/GetStates', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['jurisdiction_country_id', '=', options.data.jurisdiction_country_id] : null,
    };
  
    console.log('Filtered Data:', filteredData);
  
    return filteredData;
  }
  
  setDocumentTypeValue(this: Column, newData: any, value: number, currentRowData: any) {
    newData.jurisdiction_state_id = null;
    if (this.defaultSetCellValue !== undefined) {
      this.defaultSetCellValue(newData, value, currentRowData);
    } else {
      // Handle the case where defaultSetCellValue is undefined
      // This could be logging an error or providing default behavior
      console.error('defaultSetCellValue is undefined');
      // Provide a default behavior or any necessary action
    }
  }
  onChangeParams() {
    //alert('onchange');
  }
  setMissionValue(rowData: any, value: any): void {
    // alert(value)
    rowData.jurisdiction_state_id = value
   
  
  //     this.masterservice.getEquipmentsByMission(value).subscribe((params) => {
  //      alert(params.equipmentID);
  //       rowData.equipmentID = params.equipmentID;
  //  });
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
         //   alert(JSON.stringify(this.Typeinfo))
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
    
addUserDataToRequest(): void {
  let user: any = this.session.getUser();
  this.userdata = JSON.parse(user);
  console.log("userid", this.userdata.profile.userid);

  // Example: Add user data to the 'createdBy' field in Typeinfo
  this.Typeinfo.createdby = this.userdata.profile.userid;
}
insertParameters(data:any={}){

  this.Typeinfo.jurisdiction_location_id=0;
  this.params(data);
 }
 
 updateParameters(data:any={}){
 this.Typeinfo.jurisdiction_location_id=data.key;
  this.params(data);
 }
 
 params(data:any={}){
   this.Typeinfo.jurisdiction_country_id=data.values.jurisdiction_country_id;
   this.Typeinfo.jurisdiction_state_id=data.values.jurisdiction_state_id;
  
   this.Typeinfo.jurisdiction_district=(data.values.jurisdiction_district)!=undefined?data.values.jurisdiction_district:'None';
   this.Typeinfo.createdby = this.userdata.profile.userid;
  
 //alert(JSON.stringify(this.Typeinfo.jurisdiction_district))
   //this.ref.detectChanges();
 }

}
