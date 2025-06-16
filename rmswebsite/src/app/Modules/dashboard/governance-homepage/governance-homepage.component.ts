import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { RoleService } from 'src/app/core/services/role/role.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  ViewEncapsulation } from '@angular/core';

const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-governance-homepage',
  templateUrl: './governance-homepage.component.html',
  styleUrls: ['./governance-homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GovernanceHomepageComponent implements OnInit {
   range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  // notifications = [
  //   { date: '10/Jan/2025 15:45:22', topic: 'XXXXXX x x x x x x x x x' },
  //   { date: '10/Jan/2025 15:45:22', topic: 'XXXXXX x x x x x x x x x' },
  //   { date: '10/Jan/2025 15:45:22', topic: 'XXXXXX x x x x x x x x x' },
  //   { date: '10/Jan/2025 15:45:22', topic: 'XXXXXX x x x x x x x x x' },
  //   { date: '10/Jan/2025 15:45:22', topic: 'XXXXXX x x x x x x x x x' }
  // ];
  notifications:any;
  userdata: any = [];
  user_id:any;
firstName: string = '';
departmentName: string = '';
classification: any;
gridDataSource:any;
acknowledgementCount:any;
readinginProgress:any;
assessmentinProgress:any;
beginAssessment:any;
managementMonitoredAssessment:any;
expiredcount:any;
documentReviewStatus:any;
expiredCount:any;
expiringSoonCount:any;
takeimmidiateAction:any;
formData:any;
today:any;
oneMonthAgo:any;
selected:any;
NewlyPublishedDoc:any;
savedDraft:any;
DisabledPublishedDoc:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService,
    private http: HttpClient,
    private role:RoleService
  ) {
    function formatDate(date: Date): string {
      const correctedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return correctedDate.toISOString().split('T')[0];
    }
    
    const currentDate = new Date();
    this.today = formatDate(currentDate);
    
    const oneMonthAgoDate = new Date(currentDate);
    oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
    this.oneMonthAgo = formatDate(oneMonthAgoDate);
    
    this.selected = "Publishing";
    
  }
  ngOnInit() {
    let user: any = this.session.getUser();
    // //console.log(user)
    this.userdata = JSON.parse(user);//userdata.profile.userid
    //console.log("userid",this.userdata.profile.userid)
    ////console.log("profile",this.userdata.profile.useremailid)
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    const userId = this.userdata.profile.userid;
    this.user_id = userId;
    this.firstName = this.userdata.profile.firstname;
    this.departmentName = this.userdata.profile.departmentName;
    const storedData:any = localStorage.getItem('user');
    const parsedData = JSON.parse(storedData);
//Role id
   const rolesArray = parsedData && parsedData.role.roles;
    const firstRole = rolesArray && rolesArray.length > 0 ? rolesArray[0] : null;
// Extract roleid from the first role, or set to null if no roles
const RoleId = firstRole ? firstRole.roleid : null;
console.log('RoleId:', RoleId);
 //   alert(JSON.stringify(RoleId))
    // Load grid data based on the user ID
    this.loadGridData(userId,RoleId);
  }
  private loadGridData(userId: string,RoleId:string): void {
    console.log('User ID:', userId); 
    this.role.GetAcknowlwdgedata(userId).subscribe(
      response => {
        //alert(JSON.stringify(response))
        this.acknowledgementCount=response.length;
        //console.log('Email sent successfully:', response);
        //this.openOtpDialog(generatedOtp);
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
    this.role.GetAckUserAccessability(userId).subscribe(
      response => {
        this.readinginProgress=response.length;
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
    this.role.GetAssesmentsInitiated(userId).subscribe(
      response => {
        this.assessmentinProgress=response.length;
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
    // this.role.GetActiveScheduleAssesment(userId).subscribe(
    //   response => {
    //     this.beginAssessment=response.length;
    //   },
    //   error => {
    //     console.error('Error sending email:', error);
    //   }
    // );
    this.role.GetAssessmentdata().subscribe(
      (response:any) => {
        this.managementMonitoredAssessment=response.length;
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
    // this.role.GetAssessmentexpiredcount().subscribe(
    //   (response:any) => {
    //     this.expiredcount=response.length;
    //   },
    //   error => {
    //     console.error('Error sending email:', error);
    //   }
    // );
    this.http.get(URL + '/SavedDraftDocuments/GetPublishedData2/'+RoleId+ '/' +userId, {headers})
    .subscribe(res => {
      console.log('Grid Datasource value:', res);
      if (Array.isArray(res)) { // Ensure the response is an array
        const expiredCount = res.filter(doc => doc.validations === "Expired").length;
        const expiringSoonCount = res.filter(doc => doc.validations === "Expiring Soon").length;
        const takeImmidiateAction = res.filter(doc => doc.validations === "Take Immediate Action").length;
  
        console.log("Expired Count:", expiredCount);
        console.log("Expiring Soon Count:", expiringSoonCount);
        console.log("Take Immidiate Action Count:", takeImmidiateAction);
        // Store the counts in component variables if needed
        this.expiredCount = expiredCount;
        this.expiringSoonCount = expiringSoonCount;
        this.takeimmidiateAction=takeImmidiateAction;
      } else {
        console.error("Invalid response format: Expected an array");
      }

    }, (err) => {
      console.error("Error fetching data:", err);
    });
     let formData = {
      datetype: this.selected,
      today: this.today,
      //this.range.value.end ? this.range.value.end.toISOString().split('T')[0] : null,
      oneMonthAgo: this.oneMonthAgo,
      //this.range.value.start ? this.range.value.start.toISOString().split('T')[0] : null,
  };
 
    this.http.get(URL + '/GovControlReportsController/GetDrftsSaved')
    .subscribe((res:any) => {
      console.log('Saved Draft:', res);
      this.savedDraft=res.length;
    }, (err) => {
      console.error("Error fetching data:", err);
    });
    //Newly Published Documents
     this.sendRequest1(URL + '/GovControlReportsController/GetPubDocList', formData)
                .then(response => {
                    console.log("Request successful, response: ", response);
                    this.NewlyPublishedDoc=response.length;
                    return response;
                })
                .catch(error => {
                    console.error("Request failed, error: ", error);
                    throw error;
                });
    //Disabled Published Documents
    this.sendRequest1(URL + '/GovControlReportsController/GetDocumentDisabled', formData)
                .then(response => {
                    console.log("Request successful, response: ", response);
                    this.DisabledPublishedDoc=response.length;
                    return response;
                })
                .catch(error => {
                    console.error("Request failed, error: ", error);
                    throw error;
                });

    // this.role.GetPublishedData2(RoleId,userId).subscribe(
    //   response => {
    //     console.log('Grid Datasource value:', response);
    //     this.documentReviewStatus=response.length;
    //   },
    //   error => {
    //     console.error('Error sending email:', error);
    //   }
    // );

    this.sendRequest1(URL + '/NotificationCenterController/getrecords/' + this.user_id,headers)
    .then(response => {
        console.log("Request successful, response: ", response);
        this.notifications = response;
       // this.NewlyPublishedDoc=response.length;
        return response;
    })
    .catch(error => {
        console.error("Request failed, error: ", error);
        throw error;
    });
//xpired COunt
    this.sendRequest1(URL + '/GovControlReportsContoller/getexpiredAssessmentcount/' + this.user_id,headers)
    .then(response => {
        console.log("Request successful, response: ", response);
        this.expiredcount = response.expiredCount;
        //alert(Js)
       // this.NewlyPublishedDoc=response.length;
        return response;
    })
    .catch(error => {
        console.error("Request failed, error: ", error);
        throw error;
    });
// Scheduled Count
    this.sendRequest1(URL + '/GovControlReportsContoller/getScheduledAssessmentcount/' + this.user_id,headers)
    .then(response => {
        console.log("Request successful, response: ", response);
        this.beginAssessment = response.scheduledCount;
        //alert(Js)
       // this.NewlyPublishedDoc=response.length;
        return response;
    })
    .catch(error => {
        console.error("Request failed, error: ", error);
        throw error;
    });
    }
    sendRequest1(url: string, data: any): Promise<any> {
      const queryString = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
      return fetch(`${url}?${queryString}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      });
  }
  
  NotificationDetails()
  {
    //Notifications&Alerts dashboard/Notification
    this.router.navigate(['dashboard/Notification']);
  }
  help()
  {
    //this.router.navigate(['dashboard/GGT_Governance/help-desk']);
    this.router.navigate(['dashboard/profile'], { 
      //queryParams: { tab: 'general-tasks', menu: 'profile' } 
    });
  }
  AttentionDetails()
  {
    this.router.navigate(['dashboard/inspection/doc-rev-period-status']);
  }
  navigateToPage(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
    // Logic to activate the corresponding tab and menu
    //inventory/ack-request
   // this.router.navigate(['/dashboard/inventory/ack-request']  );
  }
  navigatereadinginProgress(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
   // this.router.navigate(['/dashboard/inventory/doc-user-access']);
  }
  navigateassessmentinProgress(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
    // Logic to activate the corresponding tab and menu
    //dashboard/Manage-assessment/My%20Assessements
    //this.router.navigate(['/dashboard/Manage-assessment/My Assessements'] );
  }
  navigateBeginAssessment(tab: string, menu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}`);
    // Logic to activate the corresponding tab and menu
    //dashboard/Manage-assessment/My%20Assessements
   // this.router.navigate(['/dashboard/Begin-Assessement'] );
  }
  navigatemanagementMonitoredAssessment(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
   // this.router.navigate(['/dashboard/mitigation-controls/management-monitored-assessment'] );
  }
  navigateNewlyPublished(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
    //this.router.navigate(['/dashboard/ReportsGCT/published-doc-list']);
  }
  navigateNewlyPublishedsavedDraft(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
   // this.router.navigate(['/dashboard/ReportsGCT/app-documentdraftsavedlist']);
  }
  navigateNewlyPublishedDisabled(tab: string, menu: string, subMenu: string) {
    console.log(`Navigating to: Tab - ${tab}, Menu - ${menu}, SubMenu - ${subMenu}`);
   // this.router.navigate(['/dashboard/ReportsGCT/app-disableddocumentslist']);
  }
}
