import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';

import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  export interface Tag  {
    name: string;
  }
@Component({
  selector: 'app-view-risk-register',
  templateUrl: './view-risk-register.component.html',
  styleUrls: ['./view-risk-register.component.scss']
})

export class ViewRiskRegisterComponent {
  viewriskregister:any;
  statement:any;
  isregisterListVisible:boolean = true;
  riskstatemntVisible:boolean=false;
  view_risk_register:any;
  view_statement:any;
  Register:any;
  pharameters: number | undefined;
  SelectedRegisterDetails:any;
  isVisibleDetails:boolean = false;
  viewRegisterDetails:any;
  linkCopiedStates: { [key: string]: boolean } = {};
  Risk:any;
  isLinkCopied: boolean = false;
  circleBoxColor: any;
  riskMasterID:any;
  statementid:any;
  StatementID:any;
  SelectedRegister:any;
  selectedOption:any;
  GridColumns: any[] = [
    
    {
      dataField: 'uniqueDocumentID',
      caption: 'Risk Doc ID'
    },
    
    {
      dataField: 'nameofRiskDocumentRegister',
      caption: 'Risk Document Name'
    },
    {
      dataField: 'risk_admin_inherRiskRatingLevlname',
      caption: 'Inherent Risk Rating Level '
    },
    {
      dataField: 'appetiteStatement',
      caption: 'Risk Appetite'
    },
   {
      dataField: 'noOfRiskStatements',
      caption: 'No Of Statements'
    },
    {
      dataField: 'firstname',
      caption: 'Business Function at Head'
    },
    // {
    //   dataField: 'noOfRiskStatements',
    //   caption: 'Document Status'
    // },
    {
      dataField: 'documentEffectiveDate',
      caption: 'Effective Date'
    },
    // {
    //   dataField: 'documentEffectiveDate',
    //   caption: 'Last Edited By/On'
    // },
    {
      dataField: 'natureOf_Doc_Name',
      caption: 'Document Classification'
    },
    {
      dataField: 'riskbusinessname',
      caption: 'Business Function'
    },
    {
      dataField: 'combinedFields',
      caption: 'Entity/Unit Location/Deparment'
    },
    {
      caption: 'Actions',
      cellTemplate: 'viewButtonTemplate',
      fixed: true, 
      fixedPosition: 'right' 
    }
   
   
   
  ];
  GridColumnsRisk: any[] = [
    
    {
      dataField: 'riskStatementName',
      caption: 'Risk Statement Name'
    },
   {
      dataField: 'riskDescription',
      caption: 'Risk Discription'
    },
    {
      dataField: 'businessProcessName',
      caption: 'Business Process'
    },
    {
      dataField: 'risk_admin_riskImpactRating_name',
      caption: 'Risk Impact Rating'
    },
   {
      dataField: 'risk_admin_likeoccfact_name',
      caption: 'Risk Likelihood'
    },
    {
      dataField: 'priorityName',
      caption: 'Risk Priority'
    },
       {
      dataField: 'repeatReviewFrequency',
      caption: 'Risk Review Frequency'
    },
    {
      dataField: 'firstname',
      caption: 'Risk Owner'
    },
    // {
    //   dataField: 'firstname',
    //   caption: 'Business Process Owner'
    // },
    {
      caption: 'Actions',
      cellTemplate: 'viewButtonTemplate',
      fixed: true, 
      fixedPosition: 'right' 
    }
   
   
   
  ];
  constructor(private http: HttpClient, private fb: FormBuilder,private Router: Router,
   
  )
    {
      

  }
  ngOnInit(): void {
        this.viewriskregister = this.fb.group({
          Register:[''],
        
        });
        this.statement = this.fb.group({
          riskStatement:[''],
        
        });
        this.viewRegisterDetails=this.fb.group({

        })

    this.view_risk_register={
      paginate: true, 
      store: new CustomStore({
        key: 'riskRegisterMasterID',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
           
            this.http.get(URL + '/AddRiskRegister/GetAddRiskRegisterDetails', {headers})
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

  onViewButtonClick(e:any){
  this.riskstatemntVisible=true;
    console.log("selected nameofRiskDocumentRegister  : ", e.nameofRiskDocumentRegister);
    this.pharameters = e.riskRegisterMasterID
alert(e.nameofRiskDocumentRegister)
    this.view_statement={
      paginate: true, 
      store: new CustomStore({
        key: 'riskRegisterMasterID',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
           
            this.http.get(URL + '/ViewListRiskStatement/GetViewListRiskStatement?nameofRiskDocumentRegister='+e.nameofRiskDocumentRegister, {headers})
              .subscribe(res => {
                alert(JSON.stringify(res))
                this.isregisterListVisible= false;
               
          
               (resolve(res));
    
              }, (err) => {
                reject(err);
              });
        });
        },
      }),
    };

    
      
    // console.log("selectedId",e.riskRegisterMasterID)
    // this.pharameters = e.riskRegisterMasterID;
    // this.http.get(URL + '/viewRiskRegister/GetviewRiskRegisterDetailsByID/'+this.pharameters, { headers })
    // .subscribe((res:any) => {
    //   this.isregisterListVisible= false
    //   this.SelectedRegisterDetails = res;
    //   console.log("details",this.SelectedRegisterDetails)
      
    //   this.isVisibleDetails=true
    //  console.log("this is my get data",JSON.stringify(this.SelectedRegisterDetails))
    // }, (err) => {
    //   console.error('Error fetching rules:', err);
    // });
  }
  StatementButtonClick(e:any){
    //  console.log("selectedId",e.riskRegisterMasterID)
    // this.pharameters = e.riskRegisterMasterID;
    //    this.http.get(URL + '/viewRiskRegister/GetviewRiskRegisterDetailsByID?riskRegisterMasterID='+e.riskRegisterMasterID, {headers})
    // .subscribe((res:any) => {
    //   console.log(JSON.stringify(res))
      
     
    //   this.SelectedRegisterDetails = res;
    //   console.log("details",this.SelectedRegisterDetails)
    //  this.riskstatemntVisible=false;
    //   this.isVisibleDetails=true;
    // }, (err) => {
    //   console.error('Error fetching rules:', err);
    // });
    ///*********** */
  //   alert("view")
  //   console.log('Form values:', e.riskRegisterMasterID); 
  //   this.riskMasterID = e.riskRegisterMasterID;
 
  // localStorage.setItem('riskRegisterMasterID', e.riskRegisterMasterID);
  //   this.Router.navigate(['/dashboard/CreateRisk_Document/view-list-risk-statement'], {
    
  //   });
 
  console.log('Form values:', e.riskRegisterMasterID); 
  this.riskMasterID = e.riskRegisterMasterID;
  this.StatementID = e.riskStatementID;
localStorage.setItem('riskRegisterMasterID', e.riskRegisterMasterID);
localStorage.setItem('riskStatementID', e.riskStatementID);

  this.Router.navigate(['/dashboard/CreateRisk_Document/view-list-risk-statement'], {
  
  });

  }

  EditRegister(e:any){
    console.log('Form values:', e.riskRegisterMasterID); 
    alert(e.riskRegisterMasterID)
    this.riskMasterID = e.riskRegisterMasterID;
    this.statementid = e.riskStatementID;
  localStorage.setItem('riskRegisterMasterID', e.riskRegisterMasterID);
  localStorage.setItem('riskStatementID', e.riskStatementID);
    this.Router.navigate(['/dashboard/CreateRisk_Document/edit-risk-register'], {
     
      queryParams: { riskMasterID: this.riskMasterID }
      
    });
  }
  // EditRegister(riskRegisterMaster){
  //   console.log('Form values:',riskRegisterMasterID);
  //   alert(riskRegisterMasterID) 
  //   this.riskMasterID = riskRegisterMasterID;
  //   this.Router.navigate(['dashboard/CreateRisk_Document/edit-risk-register'], {
      
  //   });
  // }
  getFileNameFromPath(filePath: string): string {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }
  copyLink(link: string) {
    const el = document.createElement('textarea');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.isLinkCopied = true;
    setTimeout(() => {
      this.isLinkCopied = false;
    }, 3000);
  }
extractFilenameFromUrl(url: string): string {
  // Extract the filename part from the URL
  const parts = url.split('/');
  return parts[parts.length - 1];
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
    const filenameFromUrl = this.extractFilenameFromUrl(filePath);

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
}
