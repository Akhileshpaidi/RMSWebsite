import { ChangeDetectorRef, Component } from '@angular/core';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { userlocationmapping} from 'src/app/inspectionservices.service';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule, } from 'devextreme-angular/ui/button';
import { DxDateBoxModule } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { Column } from 'devextreme/ui/data_grid';
import { E } from '@angular/cdk/keycodes';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

  interface Role {
    rolE_ID: number;
    rolE_NAME: string;
    // other properties
  }
  export interface User {
    usR_ID: string;
    name: string;
    emailid: string;
    mobilenumber: string; // Ensure types are consistent with your actual data.
    roles: string;
    designation: string | null; // Based on your data, this can be null.
    entityname: string;
    unit_location_Master_name: string;
    department_Master_name: string;
    roleNames: string;
    usR_STATUS: string;
  }
  
  
@Component({
  selector: 'app-user-location-mapping',
  templateUrl: './user-location-mapping.component.html',
  styleUrls: ['./user-location-mapping.component.scss']
})
export class UserLocationMappingComponent {
  dataSource: any;
  typedata:any;
  Location:any;
  usR_ID:any;
  role:any;
  roleData: any[] = [];
  selectedRoles: number[] = [];
  firstname:any;
  datestart:any;
  dateend:any;
  
  selectedUser: any ; // User is a hypothetical model class for your user details
userDetailsVisible: boolean = false;
selectedUserlist: any;
  // DocumentTypeData:any;
  userlocationmappinginfo:userlocationmapping=new userlocationmapping();
  Userinfo: any;
  

  ngOnInit(): void {
    this.loadRoles();
  }
  constructor(private changeDetector: ChangeDetectorRef,private http: HttpClient) {
    this.dataSource = new CustomStore({
        key: 'user_location_mapping_id',
        load: () => this.sendRequest(URL + '/userlocationmapping/GetuserlocationmappingDetails'),
        
        insert: (values) => this.sendRequest(URL + '/userlocationmapping/InsertuserlocationmappingDetails', 'POST', {
            //values: JSON.stringify(values)
            values
        }),
        update: (key, values) => this.sendRequest(URL + '/userlocationmapping/UpdateuserlocationmappingDetails', 'PUT', {
             key,
             //values: JSON.stringify(values)
            values
         }),
         remove: (key) => this.sendRequest(URL + '/userlocationmapping/userlocationmappingDetails', 'DELETE', {
             key
         })
    });

    this.typedata={
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
    this.Location={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails', {headers})
              .subscribe(res => {
               (resolve(res));
                console.log(JSON.stringify(res))
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };
    this.firstname={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UserMaster/GetuserMasterDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

    this.role={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/RoleDetails/GetRoleDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

    this.Userinfo={
      paginate: true,
      store: new CustomStore({
          key: 'usR_ID',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/UserMaster/GetActiveUserDetails', {headers})
              .subscribe(res => {
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

    this.getFilteredLocations = this.getFilteredLocations.bind(this);

  }

  getFilteredLocations(options:any) {

    const filteredData = {
      store:  new CustomStore({
        key: 'unit_location_Master_id',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/UnitLocationMaster/GetUnitLocationDetails', {headers})
            .subscribe(res => {
             (resolve(res));
  
            }, (err) => {
              reject(err);
            });
      });
      },
    }),
      filter: options.data ? ['entity_Master_id', '=', options.data.entity_Master_id] : null,
    };
  
    console.log('Filtered Data:', filteredData);
  
    return filteredData;
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
                     console.log(JSON.stringify(res))
                    }, (err) => {
                      reject(err);
                    });
              });
                break;
            case 'PUT':
               this.updateParameters(data);
               return new Promise((resolve, reject) => {
                this.http.put(url,this.userlocationmappinginfo,{headers})
                  .subscribe(res => {
                   (resolve(res));
    
                  }, (err) => {
                    reject(err);
                  });
                });
                break;
            case 'POST':
               this.insertParameters(data);
               console.log(JSON.stringify(this.userlocationmappinginfo))
               return new Promise((resolve, reject) => {
                this.http.post(url,this.userlocationmappinginfo,{headers})
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
    
     this.userlocationmappinginfo.user_location_mapping_id=0;
     this.params(data);
    }
    
    updateParameters(data:any={}){
    this.userlocationmappinginfo.user_location_mapping_id=data.key;
     this.params(data);
    }
    
    params(data:any={}){
      // alert("PARAMS loop ")
      this.userlocationmappinginfo.Entity_Master_id=data.values.entity_Master_id;
      this.userlocationmappinginfo.Unit_location_Master_id=data.values.unit_location_Master_id;
      //this.userlocationmappinginfo.ROLE_ID=data.values.rolE_ID;
      this.userlocationmappinginfo.ROLE_ID = this.selectedRoles;
      this.userlocationmappinginfo.USR_ID=data.values.usR_ID;
      this.userlocationmappinginfo.user_location_mapping_start_Date =data.values.user_location_mapping_start_Date;
      this.userlocationmappinginfo.user_location_mapping_End_Date =data.values.user_location_mapping_End_Date ;
      console.log(JSON.stringify(this.userlocationmappinginfo))
    }

    setEntityTypeValue(this: Column, newData: any, value: number, currentRowData: any) {
      newData.unit_location_Master_id = null;
      if (this.defaultSetCellValue !== undefined) {
        this.defaultSetCellValue(newData, value, currentRowData);
      } else {
        // Handle the case where defaultSetCellValue is undefined
        // This could be logging an error or providing default behavior
        console.error('defaultSetCellValue is undefined');
        // Provide a default behavior or any necessary action
      }
    }

    onEditorPreparing(e:any) {
  
      if (e.parentType === 'dataRow' && e.dataField === 'unit_location_Master_id') {
       console.log('onEditorPreparing')
        e.editorOptions.disabled = (typeof e.row.data.entity_Master_id !== 'number');
      }
    }
    exportGrid(e:any) {
      if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        worksheet.addRow(['User Location Mapping List']);
        worksheet.addRow([]);
        exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
        }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer) { 
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "UserMappinglist.xlsx"); 
          }); 
        }); 
        e.cancel = true;
      } 
      else if (e.format === 'pdf') {
        const doc = new jsPDF();
        doc.text("User Location Mapping List", 80,10); // Adjust the position as needed
        doc.setFontSize(12);
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save('UserMappinglist.pdf');
        });
      }
    }

    cellTemplate(container:any, options:any) {
      const noBreakSpace = '\u00A0';
    
      if (!Array.isArray(options.value)) {
        console.error("Expected options.value to be an array, but got: ", options.value);
        container.textContent = noBreakSpace;
        return;
      }
    
      const assignees = options.value.map(
        (assigneeId: number) => options.column!.lookup!.calculateCellValue!(assigneeId),
      );
      const text = assignees.join(', ');
    
      container.textContent = text || noBreakSpace;
      container.title = text;
    }

    loadRoles() {
      this.http.get<Role[]>(URL + '/RoleDetails/GetRoleDetails', {headers}).subscribe(
        (roles) => {
          this.roleData = roles;
          //alert(JSON.stringify(this.roleData))
        },
        (err) => {
          // Handle errors here
        }
      );
    
      }

      toggleRoleSelection(roleId: number) {
        const index = this.selectedRoles.indexOf(roleId);
        if (index >= 0) {
          this.selectedRoles.splice(index, 1); // Remove the role if it's already selected
        } else {
          this.selectedRoles.push(roleId); // Add the role if it's not selected
        }
      }

      onUserSelect(event: any) {
        console.log(" onUserSelect : ", event.value);
        this.usR_ID = event.value;
        
        this.http.get<User[]>(URL + '/UserLocationMapping/GetuserDetailsbyUserID?userid='+this.usR_ID, {headers})
        .subscribe(res => {
          
          this.selectedUser = res[0];
          console.log(this.selectedUser)
          this.changeDetector.detectChanges();
          console.log(this.selectedUser?.usR_ID);
          console.log(this.selectedUser?.firstname);
          this.userDetailsVisible = true;
        }, (err) => {
          console.error("API call error: ", err);
         
        });
      
       }
}
