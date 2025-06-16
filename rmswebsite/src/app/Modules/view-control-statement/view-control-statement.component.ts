import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-view-control-statement',
  templateUrl: './view-control-statement.component.html',
  styleUrls: ['./view-control-statement.component.scss']
})
export class ViewControlStatementComponent {
  controlname:any;
  control:any;
  control_statement_id:any;
  isLinkCopied: boolean = false;

  constructor(private http:HttpClient){

    this.controlname={
       paginate: true,
              store: new CustomStore({
                key: 'control_statement_id',
                loadMode: 'raw',
                load:()=>{return new Promise((resolve, reject) => {
                  this.http.get(URL + '/controlstatment/Getcontrolstatment',{headers})
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
    getcontroldetails(selectedactrule: any) {
      //console.log("Selected act_rule_regulatory_id : ", selectedactrule.value);
      this.control_statement_id = selectedactrule.value;
      this.http.get(URL + '/controlstatment/Getcontrolstatmentbyid/' + this.control_statement_id, { headers })
        .subscribe(
          (res: any) => {
            this.control = res;
            //alert(JSON.stringify(this.act_rule)) // Assign the fetched data to act_rule property
            //console.log(this.act_rule);
          },
          (err) => {
            console.error(err);
          }
        );
    
    
     
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
    // download(filePath: string, fileType: string): void {
    //   const apiUrl = `${URL}/actdownload/actDownLoadFiles?filePath=${filePath}`;
    
    //   this.http.get(apiUrl, { responseType: 'blob' }).pipe(
    //     catchError((error: any) => {
    //       console.error('Error occurred while downloading file:', error);
    //       return throwError('Something went wrong in file download. Please try again later.');
    //     })
    //   ).subscribe((res: Blob) => {
    // console.log(res)
    // //alert (JSON.stringify(res))
    //     // Extract filename from the URL
    //     const filenameFromUrl = this.extractFilenameFromUrl(filePath);
    
    //     // Create a blob URL to trigger the download
    //     const blob = new Blob([res], { type: fileType });
    //     const url = window.URL.createObjectURL(blob);
        
    //     // Create a link element and click on it to trigger the download
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = filenameFromUrl;
    //     document.body.appendChild(link);
    //     link.click();
    
    //     // Clean up
    //     window.URL.revokeObjectURL(url);
    //     document.body.removeChild(link);
    //   });
    // }
    
    extractFilenameFromUrl(url: string): string {
      // Extract the filename part from the URL
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
  }


