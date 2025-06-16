import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomStore } from 'devextreme-aspnet-data-nojquery';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
const headers = new HttpHeaders();
@Component({
  selector: 'app-review-status-settings',
  templateUrl: './review-status-settings.component.html',
  styleUrls: ['./review-status-settings.component.scss']
})
export class ReviewStatusSettingsComponent {
  configForm: any;
  ReviewStatusData:any;
  Formdata: any = [];

  
  constructor(private http: HttpClient ,private session:SessionService, private dialog: MatDialog, private fb: FormBuilder){
    this.configForm = this.fb.group({
      compliancePeriod: '',
      Immediatedays: '',
      Immediatedays2: '',
      expiringdays: '',
      expiringdays2: '',
      Notdue: '',
    })

    this.http.get(`${BASE_URL}/ReviewStatusSettings/GetReviewStatusData`, { headers })
    .subscribe((response: any) => {
      console.log(response)
      this.Formdata = response as any;
      
      (this.configForm.get('compliancePeriod') as FormControl).setValue(this.Formdata.filter((item: any) => {
        return item.reviewStatusName == 'Expired';
      })[0].maximumDays);
      (this.configForm.get('Immediatedays') as FormControl).setValue(this.Formdata.filter((item: any) => {
        return item.reviewStatusName == 'Take Immediate Action';
      })[0].minimumDays);
      (this.configForm.get('Immediatedays2') as FormControl).setValue(this.Formdata.filter((item: any) => {
        return item.reviewStatusName == 'Take Immediate Action';
      })[0].maximumDays);
      (this.configForm.get('expiringdays') as FormControl).setValue(this.Formdata.filter((item: any) => {
        return item.reviewStatusName == 'Expiring Soon';
      })[0].minimumDays);
      (this.configForm.get('expiringdays2') as FormControl).setValue(this.Formdata.filter((item: any) => {
        return item.reviewStatusName == 'Expiring Soon';
      })[0].maximumDays);
      (this.configForm.get('Notdue') as FormControl).setValue(this.Formdata.filter((item: any) => {
        return item.reviewStatusName == 'Not Due';
      })[0].minimumDays);
    });
   

  }
  onSubmit(){
    
    
      let user:any=this.session.getUser();
      user=JSON.parse(user as any)
      const userid:number=user.profile.userid;
      
      let postdata=[
        
        {'ReviewStatusID':1,'ReviewStatusName':'Expired', 'MinimumDays':this.configForm.value.compliancePeriod,'MaximumDays':0,'ModifiedBy':userid},
        {'ReviewStatusID':2,'ReviewStatusName':'Take Immediate Action','MinimumDays':this.configForm.value.Immediatedays, 'MaximumDays':this.configForm.value.Immediatedays2,'ModifiedBy':userid},
       {'ReviewStatusID':3,'ReviewStatusName':'Expiring Soon','MinimumDays':this.configForm.value.expiringdays, 'MaximumDays':this.configForm.value.expiringdays2,'ModifiedBy':userid},
        {'ReviewStatusID':4,'ReviewStatusName':'Not Due','MinimumDays':this.configForm.value.Notdue, 'MaximumDays':61,'ModifiedBy':userid},
       
      ];
      alert(JSON.stringify(postdata))
      this.http.post(`${BASE_URL}/ReviewStatusSettings/UpdateReviewStatus`,postdata,{headers}).subscribe((response:any)=>{
        this.dialog.open(DaidailogeComponent,{
            width:'550px',data:{message:response}
        })  ;  
      
      
    });
 }



 
}