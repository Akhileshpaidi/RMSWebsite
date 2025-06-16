import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { DatePipe, Location } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  export interface Tag  {
    name: string;
  }
@Component({
  selector: 'app-view-list-risk-statement',
  templateUrl: './view-list-risk-statement.component.html',
  styleUrls: ['./view-list-risk-statement.component.scss']
})
export class ViewListRiskStatementComponent {
  viewRegisterDetails:any;
  SelectedRegisterDetails:any;
  isVisibleDetails:boolean = true;
  riskMasterID:any;
  isLinkCopied: boolean = false;

    constructor(private http: HttpClient, private fb: FormBuilder,public location:Location
     
    )
      {
        
  
    }
  
  ngOnInit() {

    console.log('Stored Data:', localStorage.getItem('riskRegisterMasterID')); 

    const storedData = localStorage.getItem('riskRegisterMasterID');
   // alert(localStorage.getItem('riskRegisterMasterID'))
      this.http.get(URL + '/viewRiskRegister/GetviewRiskRegisterDetailsByID?riskRegisterMasterID=' +localStorage.getItem('riskRegisterMasterID'), { headers })
      .subscribe(
        (res: any) => {
          console.log('API response:', res); 
          console.log(JSON.stringify(res.data))
          if (res) {
            console.log(JSON.stringify(res))
    
            this.SelectedRegisterDetails = res;  
           
          } else {
            console.log('No data received from the API');
          }
        },
        (err) => {
          console.error('Error fetching risk register details:', err);  // Log API errors
        }
      );
    
    this.viewRegisterDetails = this.fb.group({
     
    });
  
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
  download(filePath: string, fileType: string): void {
    const apiUrl = `${URL}/actdownload/actDownLoadFiles?filePath=${filePath}`;
  
    this.http.get(apiUrl, { responseType: 'blob' }).pipe(
      catchError((error: any) => {
        console.error('Error occurred while downloading file:', error);
        return throwError('Something went wrong in file download. Please try again later.');
      })
    ).subscribe((res: Blob) => {
  console.log(res)
 
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
  extractFilenameFromUrl(url: string): string {
    // Extract the filename part from the URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
