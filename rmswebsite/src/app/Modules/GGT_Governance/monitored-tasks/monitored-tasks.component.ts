import { Component } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-monitored-tasks',
  templateUrl: './monitored-tasks.component.html',
  styleUrls: ['./monitored-tasks.component.scss']
})
export class MonitoredTasksComponent {
  EntityID: any;
  selectedentity:any;
  UnitMaster:any; 
  EntityName:any;
  AuthorityTypeID: any;
  AuthorityName:any;
  AuthorityTypeData:any;
  AuthorityNameData:any;
  docTypeID:any;
  Documentcategory: any;
  Selectedtopic:any;
  DocumentTypeData:any
  Doc_CategoryID:any;
  Documentsubcategory:any;
  NatureOfDocument:any;

  constructor(private http: HttpClient,

    ) 
    {
      this.DocumentTypeData={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/DocTypeMaster/GetDocTypeMasterModelDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
       
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       this.NatureOfDocument={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/NatureOfDocument/GetNatureOfDocumentDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
       
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
       
      this.EntityName={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/UnitMaster/GetEntityNames', {headers})
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
      };
      this.AuthorityTypeData={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/AuthorityName/GetAuthorityNameDetails', {headers})
                .subscribe(res => {
                 (resolve(res));
       
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
       };
      
       this.AuthorityNameData={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/AuthorityName/GetAuthorityNameDetails', {headers})
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
    
    getUnitLocation(event: any) {
      console.log("selected Type id: ", event.value);
      this.EntityID = event.value;
      this.selectedentity=null;  
      this.UnitMaster={
        paginate: true,
        store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails/'+this.EntityID, {headers})
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
     getAuthorityNamebyId(id:any){
   
      console.log('Selected AuthorityTypeID:', id.value);
     
      this.AuthorityTypeID=id;
     
      if (this.AuthorityTypeID) { 
        this.http.get(URL + '/AuthorityName/GetAuthorityNameModelDetailsByAuthorityTypeID/' + this.AuthorityTypeID).subscribe((data: any) => {
          this.AuthorityName = data;
        });
      } else {
        //alert('docTypeID is null or undefined'); // Add some error handling
      }
     }
     getDocTypes(event: any) {
      console.log("selected Type id: ", event.value);
      this.docTypeID = event.value;
       this.Selectedtopic=null;  
      this.Documentcategory={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/DocCategoryMaster/GetDocCategoryMasterModelDetailsByDocTypeID/'+this.docTypeID, {headers})
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
     getsubDocTypes(event: any) {
      console.log("selected Type id: ", event.value);
      this.Doc_CategoryID = event.value;
       this.Selectedtopic=null;  
      this.Documentsubcategory={
        paginate: true,
        store: new CustomStore({
            key: 'Value',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/DocSubCategory/GetDocSubCategoryModelDetailsbyId/'+this.Doc_CategoryID, {headers})
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
     getNatureOfDocument(){
      this.http.get(URL+'/NatureOfDocument/GetNatureOfDocumentDetails').subscribe((data:any)=>{
        this.NatureOfDocument=data;
        
      })
     
     }

}
