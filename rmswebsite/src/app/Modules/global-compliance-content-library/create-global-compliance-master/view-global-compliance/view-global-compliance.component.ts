import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { UserService } from 'src/app/core/services/user/user.service';

import { Subscription, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MoreRelatedInfoDialogboxComponent } from '../more-related-info-dialogbox/more-related-info-dialogbox.component';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  export interface Tag  {
    name: string;
  }
@Component({
  selector: 'app-view-global-compliance',
  templateUrl: './view-global-compliance.component.html',
  styleUrls: ['./view-global-compliance.component.scss']
})

export class ViewGlobalComplianceComponent {

  viewglobalcompliance:any;
  viewComplianceDetails:any;
  actname:any;
  rulename:any;
  SelectedComplianceDetails:any;
  pharameters: number | undefined;
  view_global_compliance:any;
  linkCopiedStates: { [key: string]: boolean } = {};
  compliance_details:number | undefined;
  isVisibleDetails:boolean = false;
  isComplianceListVisible:boolean = true;
  GridColumns: any[] = [
    // {
    //   dataField: 'global_compliance_id',
    //   caption: 'Global Id'
    // },
    {
      dataField: 'act_name',
      caption: 'Act Name'
    },
    
    {
      dataField: 'rule_name',
      caption: 'Rule Name'
    },
    {
      dataField: 'compliance_name',
      caption: 'Compliance Name'
    },
    {
      dataField: 'compliance_des',
      caption: 'Compliance Description'
    },
    {
      dataField: 'compliance_type',
      caption: 'Compliance Type'
    },
    {
      dataField: 'keywors_tags',
      caption: 'Keywords'
    },
    {
      caption: 'Actions',
      cellTemplate: 'viewButtonTemplate',
      fixed: true, 
      fixedPosition: 'right' 
     }
   
   
   
  ];



  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private user: UserService,
    private fb: FormBuilder,
    private role: RoleService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    //private service:ExitNav,
  )
    {

  }
  ngOnInit(): void {
    this.viewglobalcompliance = this.fb.group({

      categorylaw:['',Validators.required],
      naturelaw:['',Validators.required],
      regulatoryAuthority:['',Validators.required],
      jurisdictioncategory:['',Validators.required],
      country:['',Validators.required],
      state:['',Validators.required],
      distict:['',Validators.required],
      business:[''],
      industury:['']


    });
   this.viewComplianceDetails = this.fb.group({

   })
     this.view_global_compliance = {
      paginate: true,
      store: new CustomStore({
        key: 'create_compliance_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/createglobalcompliance/GetGlobalComplianceDetails', { headers })
              .subscribe(res => {
                this.compliance_details = (res as any[]).length;
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };

     this.actname={
      paginate: true,
      store: new CustomStore({
          key: 'Value',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/Actregulatory/GetActregulatory', {headers})
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

  calculateSerialNumber(cellInfo: CellInfo): number {
    return cellInfo.rowIndex + 1;
  }
  getRules(event: any) {
    var selectedActId = event.value;
    this.rulename = {
      paginate: true,
      store: new CustomStore({
        key: 'act_rule_regulatory_id',
        loadMode: 'raw',
        load: () => {
          return new Promise((resolve, reject) => {
            this.http.get(URL + '/SupAdmin_ActRegulatory/GetrulesandregulatoryByID/' + selectedActId, { headers })
              .subscribe(
                (res: any) => {
                  resolve(res);
                },
                (err: any) => {
                  reject(err);
                }
              );
          });
        }
      })
    };
  }
  handleSelectionChanges(event: any) {
    try {
      console.log('Event:', event);
  
      const selectedRows = event.selectedRowsData;
      if (selectedRows.length > 0) {
        const selectedComplianceIds = selectedRows
          .filter((item: any) => item.create_company_compliance_id !== undefined)
          .map((item: any) => item.create_company_compliance_id);
  
        // Set the array of IDs directly to the form control
        //this.maplocation.get('complianceid')?.setValue(selectedComplianceIds);
      } else {
       // this.maplocation.get('complianceid')?.setValue(null);
      }
  
      console.log('Selected Rows:', selectedRows);
    } catch (error) {
      console.error('Error in handleSelectionChanges:', error);
    }
  }
  showPopup(rule: any) {
    const dialogRef = this.dialog.open(MoreRelatedInfoDialogboxComponent, {
      width: '600px',
      data: rule[0],
      disableClose: true // Prevents closing the dialog by clicking outside of it
    });
  }
  onViewButtonClick(e:any){
    console.log("selectedId",e.create_compliance_id)
this.pharameters = e.create_compliance_id;
    
            this.http.get(URL + '/createglobalcompliance/GetSelectedGlobalComplianceDetailsByID/'+this.pharameters, { headers })
              .subscribe((res:any) => {
                this.isComplianceListVisible= false
                this.SelectedComplianceDetails = res;
                console.log("details",this.SelectedComplianceDetails)
                this.isVisibleDetails=true
               console.log("this is my get data",JSON.stringify(this.SelectedComplianceDetails))
              }, (err) => {
                console.error('Error fetching rules:', err);
              });
            }
            copyLink(link: string) {
              navigator.clipboard.writeText(link).then(() => {
                  this.linkCopiedStates[link] = true;
                  setTimeout(() => {
                      this.linkCopiedStates[link] = false;
                  }, 3000); // Reset the copied message after 3 seconds
              }).catch(error => {
                  console.error('Unable to copy link: ', error);
              });
          }
          
            download(filePath: string, fileType: string): void {
              const apiUrl = `${URL}/actdownload/actDownLoadFiles?filePath=${filePath}`;
            
              this.http.get(apiUrl, { responseType: 'blob' }).pipe(
                catchError((error: any) => {
                  console.error('Error occurred while downloading file:', error);
                  return throwError('Something went wrong in file download. Please try again later.');
                })
              ).subscribe((res: Blob) => {
            console.log(res)
            //alert (JSON.stringify(res))
                // Extract filename from the URL
                const filenameFromUrl = this.getFileNameFromPath(filePath);
            
                // Create a blob URL to trigger the download
                const blob = new Blob([res], { type: fileType });
                const url = window.URL.createObjectURL(blob);
                
                // Create a link element and click on it to trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = filenameFromUrl;
                document.body.appendChild(link);
                link.click();
            
                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
              });
            }
            
     getFileNameFromPath(filePath: string): string {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }
  isRowSelected(){

  }
  onCloseButtonClick() {
    this.isVisibleDetails = false;
    this.isComplianceListVisible= true;
  }
getFormattedDate(dateString: string): string {
  // Check if dateString is null, empty, or invalid
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'N/A';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

}
interface CellInfo {
  rowIndex: number;
  // Add other properties if needed

  
}