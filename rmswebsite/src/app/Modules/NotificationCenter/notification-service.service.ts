import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { SessionService } from 'src/app/core/Session/session.service';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');



@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService implements OnInit {

  userdata: any = [];
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
   
  }

 
  //userId:any=localStorage.getItem("USERID");
  
  constructor(private http:HttpClient,   private session: SessionService) { 
    let user1: any = this.session.getUser();
    
    this.userdata = JSON.parse(user1);
    console.log("userid", this.userdata.profile.userid);
  }


  getAllInboxMails():Observable<any>{
    console.log("userid", this.userdata.profile.userid);
    return this.http.get(URL+'/NotificationCenterController/getInbox/'+this.userdata.profile.userid,{headers});
  }
  getAllOutboxMails():Observable<any>{
    return this.http.get(URL+'/NotificationCenterController/getOutbox/'+this.userdata.profile.userid,{headers});
  }
  updateStausAsRead(MailNotificationID:number){

     return this.http.put(URL+'/NotificationCenterController/UpdateStatusAsRead',{MailNotificationID});
    
  }
  addMailFavourite(MailNotificationID:number,favourite:number){

    return this.http.put(URL+'/NotificationCenterController/AddFavourite',{MailNotificationID,favourite});
   
 }
  
}
