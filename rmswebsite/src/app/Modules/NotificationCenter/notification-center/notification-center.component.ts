import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../notification-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SessionService } from 'src/app/core/Session/session.service';
export interface Mail {
  mailNotificationID:number;
  subject: string;
  sentDate: string;
  receivedDate: string;
  sentBy:string;
  ReceivedBy:string;
  body: string;
  recevierStatus:string;
  favourite:number;
}
@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})

export class NotificationCenterComponent implements OnInit{
  selectedMail: any = null;
  selectedMailOutbox:any=null;
  origionalInbox:any[]=[];
  inboxMailList: any[] = [];
  outboxMailList: any[] = [];
  filterOptions: string[] = ['All','Latest First','Oldest First','Read', 'Unread','Favourite'];
  filterOptionsOutbox:string[]=['All','Latest First','Oldest First']
  selectedFilter:string='All'
//Constructor
constructor(private service:NotificationServiceService,private sanitizer: DomSanitizer,
  private session: SessionService){}
userdata: any = [];
ngOnInit(){
  let user1: any = this.session.getUser();
    
  this.userdata = JSON.parse(user1);
  console.log("userid", this.userdata.profile.userid);
  
this.getInboxList();
  this.service.getAllOutboxMails().subscribe((res:any)=>{
    this.outboxMailList=res||[];
   
  },(error)=>{
    console.log("error");
  })
}


//get Inbox Method
getInboxList(){
  this.service.getAllInboxMails().subscribe((res:any)=>{
    this.inboxMailList=res||[];
    this.origionalInbox=res||[];
  },(error)=>{
    console.log("error");
  })
}

//html dom sanitizer code
getSafeHtml(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
getSafeHtmlRemove(html: string): string {
  if (!html) return ''; // Handle empty case
  let plainText = html.replace(/<[^>]+>/g, ' '); // Remove HTML tags
  plainText = plainText.replace(/\s+/g, ' ').trim(); // Remove extra spaces
  return plainText;
}

  toggleStar(index: number,mail:Mail) {
    this.inboxMailList[index].starred = !this.inboxMailList[index].starred;
   
      this.service.addMailFavourite(mail.mailNotificationID,mail.favourite).subscribe((res:any)=>{
        this.getInboxList();
      })
    
   
  
  }

  mailOpen(mail:Mail){
    this.selectedMail = mail;
    if(mail.recevierStatus!="read"){
      this.service.updateStausAsRead(mail.mailNotificationID).subscribe((res:any)=>{
      this.getInboxList();
       })
    }
   
    
  }
  mailClose() {
    this.selectedMail = null;
  }
  mailOpenOutbox(mail:Mail){
    this.selectedMailOutbox = mail;
  }
  mailCloseOutbox() {
    this.selectedMailOutbox = null;
  }

  onFilterChange(event: any) {  
   const value=event.value.toLowerCase().trim();
    if(value==='read'){
      this.inboxMailList=this.origionalInbox.filter(mail=>mail.recevierStatus=="read");
     
    }else if(value==='unread'){
      this.inboxMailList=this.origionalInbox.filter(mail=>mail.recevierStatus=="delivered");
     
    }
    else if(value==='latest first'){
      this.inboxMailList.sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
    }
    else if(value==='oldest first'){
      this.inboxMailList.sort((a,b)=>new Date(a.created_at).getTime()-new Date(b.created_at).getTime());
    }
    else if(value==='favourite'){
      this.inboxMailList=this.origionalInbox.filter(mail=>mail.favourite==1);
     
    }
    else{
      this.inboxMailList=this.origionalInbox;
    }
  
  }

  
}
