import { Component } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.scss']
})
export class ViewQueryComponent {
  trackingId: string | null = null;
  queryData:any;
  filedata:any;
  fileList: any[] = [];
  fileListReview: any[] = [];
  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,) {}

  ngOnInit() {
    const savedData = localStorage.getItem('selectedQuery');
    if (savedData) {
      this.queryData = JSON.parse(savedData);
      console.log("query data",this.queryData)
      const params = new HttpParams()
         .set('trackingNo',this.queryData.trackingNo);
         this.http.get<any[]>(URL + '/UserMaster/GetFiles/', { headers, params }).subscribe({
           next: (res) => {
            this.fileList=res;
            //this.menuItems = this.flattenComponents(res);
           },
           error: (err) => {
             console.error('Error fetching typemodule:', err);
           }
         });
         //Review File Attachments
         this.http.get<any[]>(URL + '/UserMaster/GetReviewFiles/', { headers, params }).subscribe({
           next: (res) => {
            this.fileListReview=res;
            //this.menuItems = this.flattenComponents(res);
           },
           error: (err) => {
             console.error('Error fetching typemodule:', err);
           }
         });
      //this.fileList=this.queryData.files;
      // if (!Array.isArray(this.queryData.resolutionfiles)) {
      //   this.queryData.resolutionfiles = [this.queryData.resolutionfiles];
      // }
      // console.log("query resolutionfiles data",this.queryData.resolutionfiles)

    } else {
      console.warn("No data found, redirecting...");
      this.router.navigate(['/']); // Redirect if no data
    }
    // this.trackingId = this.route.snapshot.paramMap.get('id'); // Get the Tracking ID from URL
    // this.queryData=this.route.snapshot.paramMap.get('id');
   // this.loadQueryDetails();
  }
  //http://localhost:18593/weatherforecast
  getDownloadUrl(fileName: string): string {
    const params = new HttpParams()
         .set('fileName',fileName);
         this.http.get<any[]>(URL + '/UserMaster/download/', { headers, params }).subscribe({
           next: (res) => {
            this.filedata=res;
            //this.menuItems = this.flattenComponents(res);
           },
           error: (err) => {
             console.error('Error fetching typemodule:', err);
           }
         });
         return this.filedata;
   // return URL+`/UserMaster/download/${fileName}`;
  }  

  downloadFile(fileId: number) {
    window.location.href = URL +`/UserMaster/DownloadFile/${fileId}`;
  }
  downloadReviewFile(fileId: number) {
    window.location.href = URL +`/UserMaster/DownloadReviewFile/${fileId}`;
  }
  goBack() {
    window.history.back(); // This will take the user to the previous page
  }

  loadQueryDetails() {
    // Call API or fetch the data based on this.trackingId
  }

}
