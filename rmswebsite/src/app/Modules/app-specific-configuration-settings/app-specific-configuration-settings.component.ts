import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';


const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-app-specific-configuration-settings',
  templateUrl: './app-specific-configuration-settings.component.html',
  styleUrls: ['./app-specific-configuration-settings.component.scss']
})
export class AppSpecificConfigurationSettingsComponent  implements OnInit {
  configForm: any;
  userdata:any;

  constructor(private fb: FormBuilder,private http: HttpClient, public session: SessionService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
    first: this.fb.group({
      schedulerEnabled: [true],
      timeOption: ['realTime'],
      fixedDaysAndTime: this.fb.group({
        fixedDays: [1, Validators.min(1)],
        fixedTimeHour: ['06:00']
      })
    }),
    second : this.fb.group({
      compliancePeriodEnabled: [true],
      compliancePeriod: [ 90,Validators.min(1)],
    }),
    third: this.fb.group({
      updateDaysEnabled: [true],
      updateDays: [ 20, Validators.min(1)],
    }),
    fourth: this.fb.group({
      editReviewEnabled: [false],
    }),
    fivth: this.fb.group({
      editApprovalEnabled: [false],
    }),
    sixth: this.fb.group({
      editAuditEnabled: [false]
    })
  });
  let user: any = this.session.getUser();
  // console.log(user)
       this.userdata = JSON.parse(user); //userdata.profile.userid
     //  alert(JSON.stringify(this.userdata))
       console.log("userid", this.userdata.profile.userid);

       this.fetchConfiguration();
  }
  fetchConfiguration(): void {
    this.http.get<ConfigSetting[]>(`${URL}/Appspecifyconfiguration/getAppspecifyconfiguration`, { headers })
      .subscribe((response: ConfigSetting[]) => {
        console.log(response); // Log the entire response
        if (response && response.length > 0) {
          response.forEach((config: ConfigSetting) => {
            switch (config.configuration) {
              case 'Set Scheduler run cycle (Frequency)':
                this.configForm.patchValue({
                  first: {
                    schedulerEnabled: config.grantpermission,
                    timeOption: config.timeperiod === 'RealTime' ? 'realTime' : 'fixedTime',
                    fixedDaysAndTime: {
                      fixedDays: config.parameters,
                      fixedTimeHour: config.timeperiod !== 'RealTime' ? config.timeperiod : '06:00'
                    }
                  }
                });
                break;
              case 'Set Compliance Period':
                this.configForm.patchValue({
                  second: {
                    compliancePeriodEnabled: config.grantpermission,
                    compliancePeriod: config.parameters
                  }
                });
                break;
              case 'Set Update Days':
                this.configForm.patchValue({
                  third: {
                    updateDaysEnabled: config.grantpermission,
                    updateDays: config.parameters
                  }
                });
                break;
              case 'Set Review Edit Permission':
                this.configForm.patchValue({
                  fourth: {
                    editReviewEnabled: config.grantpermission
                  }
                });
                break;
              case 'Set Approval Edit Permission':
                this.configForm.patchValue({
                  fivth: {
                    editApprovalEnabled: config.grantpermission
                  }
                });
                break;
              case 'Set Audit Edit Permission':
                this.configForm.patchValue({
                  sixth: {
                    editAuditEnabled: config.grantpermission
                  }
                });
                break;
            }
          });
        }
      }, error => {
        console.error('Error fetching configuration:', error);
      });
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      const pistdatalist: ConfigSetting[] = [];

      const first = this.configForm.get('first');
      if (first) {
        const schedulerEnabled = first.get('schedulerEnabled')?.value;
        const timeOption = first.get('timeOption')?.value;
        let postdata: ConfigSetting = {
          configuration: 'Set Scheduler run cycle (Frequency)',
          grantpermission: schedulerEnabled,
        };

       
        if (timeOption === 'fixedTime') {
          const fixedDaysAndTime = first.get('fixedDaysAndTime');
          postdata = {
            ...postdata,
            parameters: parseInt(fixedDaysAndTime?.get('fixedDays')?.value),
            timeperiod: fixedDaysAndTime?.get('fixedTimeHour')?.value,
            createdby:this.userdata.profile.userid
          };
        } else if (timeOption === 'realTime') {
          postdata = {
            ...postdata,
            parameters: 0 ,
            timeperiod: 'RealTime',
            createdby:this.userdata.profile.userid
          };
        }

        pistdatalist.push(postdata);
      }

      const second = this.configForm.get('second');
      if (second) {
        const postdata1: ConfigSetting = {
          configuration: 'Set Compliance Period',
          grantpermission: second.get('compliancePeriodEnabled')?.value,
          parameters:parseInt(second.get('compliancePeriod')?.value),
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata1);
      }

      const third = this.configForm.get('third');
      if (third) {
        const postdata3: ConfigSetting = {
          configuration: 'Set Update Days',
          grantpermission: third.get('updateDaysEnabled')?.value,
          parameters: parseInt(third.get('updateDays')?.value),
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata3);
      }

      const fourth = this.configForm.get('fourth');
      if (fourth) {
        const postdata4: ConfigSetting = {
          configuration: 'Set Review Edit Permission',
          grantpermission: fourth.get('editReviewEnabled')?.value,
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata4);
      }

      const fivth = this.configForm.get('fivth');
      if (fivth) {
        const postdata5: ConfigSetting = {
          configuration: 'Set Approval Edit Permission',
          grantpermission: fivth.get('editApprovalEnabled')?.value,
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata5);
      }

      const sixth = this.configForm.get('sixth');
      if (sixth) {
        const postdata6: ConfigSetting = {
          configuration: 'Set Audit Edit Permission',
          grantpermission: sixth.get('editAuditEnabled')?.value,
          createdby:this.userdata.profile.userid
        };
        pistdatalist.push(postdata6);
      }

      console.log(pistdatalist);

   //   alert(JSON.stringify(pistdatalist))

      this.http.put(URL + '/Appspecifyconfiguration/insertAppspecifyconfiguration', pistdatalist, { headers })
      .subscribe({
        next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Data Updated Successfully" },
          });
          this.configForm.reset();
          this.reloadComponent();
        },
        error: (error) => {
          console.error('Error from API:', error);
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Error: An error occurred while processing your request." }
          });
        }
      });
  }
  }


  clear():void{
      this.reloadComponent();
     
  }
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
interface ConfigSetting {
  configuration: string;
  grantpermission: any;
  parameters?: number;
  timeperiod?: string;
  createdby?: string;
  createddate?: string;
  status?: string;
  [key: string]: any;   // Allow additional properties
}
