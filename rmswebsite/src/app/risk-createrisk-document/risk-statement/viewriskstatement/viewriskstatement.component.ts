import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
@Component({
  selector: 'app-viewriskstatement',
  templateUrl: './viewriskstatement.component.html',
  styleUrls: ['./viewriskstatement.component.scss']
})
export class ViewriskstatementComponent {
  viewStatement:any;
  isLinkCopied: boolean = false;
  Risk:any;
  riskStatementID:any;
  userdata:any;
  maxReferences: number = 5;
  Statement:any;
  constructor(private http: HttpClient,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private zone: NgZone,
 
  ) 
  {
   
    this.Statement = this.fb.group({
      riskstatement: [''],
      riskdescription: [''],
      references: this.fb.array([])
    });
    this.viewStatement = {
      paginate: true,
      store: new CustomStore({
        key: 'riskStatementID',
        loadMode: 'raw',
        load: () => {
      
                  return new Promise((resolve, reject) => {
            this.http.get(URL + '/RiskStatement/GetRiskStatement', { headers })
              .subscribe(res => {
           //    this.compliance_details = (res as any[]).length;
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        },
      }),
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.riskStatementID = queryParams['riskStatementID']; // Make sure this key matches the one in editAct
      console.log(queryParams['riskStatementID']);
      //alert(queryParams['actregulatoryid']);
      this.retrieveFiles(this.riskStatementID);
    });
  
  
    let user: any = this.session.getUser();
     
    this.userdata = JSON.parse(user);
  
    console.log("userid", this.userdata.profile.userid);
  }
  retrieveFiles(riskStatementID: any): void {
    this.http.get(`${BASE_URL}/RiskStatement/GetRiskStatementByID/${riskStatementID}`)
      .subscribe((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
         // alert(JSON.stringify(data))
          console.log(data)
          this.Risk=data;
          const pubList = data[0];
          alert(JSON.stringify(pubList))

          this.Statement.controls['riskstatement']?.setValue(pubList.riskStatementName);
          this.Statement.controls['riskdescription']?.setValue(pubList.riskDescription);
          this.Statement.controls['createdBy']?.setValue(pubList.createdBy);
          this.Statement.controls['createdOn']?.setValue(pubList.createdOn);
 
        if (Array.isArray(pubList.actfiles)) {
          pubList.actfiles.forEach((file: any) => {
          
            this.addReferenceField(file);
          });
        }
      } else {
      }
    }, error => {
      console.error('Error occurred while retrieving data:', error);
    });
  }
  addReferenceField(file?: any): void {
    if (this.references.length < this.maxReferences) {
      const referenceGroup = this.fb.group({
        statementFileID: [file ? file.statementFileID : null],
        referenceType: [file?file.filecategory:''],
        referencetypeValue: [file && file.filecategory === 'Weblink' ? file.filePath : ''],
        referenceText: [file && file.filecategory === 'Text' ? file.filePath : ''],
        file_attachment: [file && file.filecategory === 'FileAttach' ? file.fileName : ''],
       
      });
      this.references.push(referenceGroup);
    } else {
      alert('You can add up to 5 references only.');
    }
  }
  get references(): FormArray {
    return this.Statement.get('references') as FormArray;
  }
  okClicked2(e:any){
    alert(e)
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
    alert(filePath)
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
  Back(){
    this.router.navigate(['/dashboard/Risk_Library/viewlistriskstatement']);
  }
}
