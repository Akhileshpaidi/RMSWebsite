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
  selector: 'app-risk-common-assessment-template-rules',
  templateUrl: './risk-common-assessment-template-rules.component.html',
  styleUrls: ['./risk-common-assessment-template-rules.component.scss']
})
export class RiskCommonAssessmentTemplateRulesComponent {
  formGroup:any;
  configForm:any;
  RiskRegisterHeaders:any;
  contolRegisterHeaders:any;
  keyControls = [
    { id: 1, name: 'Mandatory' },
    { id: 1, name: 'Recommended' },
    { id: 1, name: ' Non-Mandatory' },
  ];
  keyControls12 = [
    { id: 1, name: 'Mandatory' },
    { id: 1, name: 'Recommended' },
    { id: 1, name: ' Non-Mandatory' },
  ];
  NONkeyControlsDOC= [
    { id: 1, name: 'Mandatory' },
    { id: 1, name: 'Recommended' },
    { id: 1, name: ' Non-Mandatory' },
  ];
  NONkeyControlsTOE= [
    { id: 1, name: 'Mandatory' },
    { id: 1, name: 'Recommended' },
    { id: 1, name: ' Non-Mandatory' },
  ];
  NONkeyControlsGEN= [
    { id: 1, name: 'Mandatory' },
    { id: 1, name: 'Recommended' },
    { id: 1, name: ' Non-Mandatory' },
  ];
  userdata: any;
  constructor(private fb: FormBuilder,private http: HttpClient, public session: SessionService, public dialog: MatDialog, private router: Router) {}


  ngOnInit(): void {
    // Initialize the form group with the form controls and their default values
    this.configForm = this.fb.group({
      first: this.fb.group({
        keyControls: ['',Validators.required],
        keyControlDOCToggle: [false],
        keyControls12:['',Validators.required],
        keyControlTOEToggle: [true]
  
      }),
      second: this.fb.group({
        keyRemarks: [],
      }),
      third: this.fb.group({
        NONkeyControlsDOC: ['',Validators.required],
        NONkeyControlDOCToggle: [true],
        NONkeyControlsTOE:['',Validators.required],
        NONkeyControlTOEToggle: [false],
        NONkeyControlsGEN:['',Validators.required],
        NONkeyControlGENToggle:[true]
  
      }),
      fourth: this.fb.group({
        NonkeyRemarks: [],
      }),
      five: this.fb.group({
        
        Permissionriskregistor: [true],
        RiskRegisterHeaders:[''],
      }),
      six: this.fb.group({
        
        Permissioncontrolregistor: [true],
        contolRegisterHeaders: [''],
      }),
      seven: this.fb.group({
        
        DuplicateHybridControls: [false],
        DuplicateBusinessProcessControls: [false],
        DuplicateRiskThreatpecificControls:[false],
        DuplicateControlActivityType:[false]
      }),
      eight: this.fb.group({
        
        UnmappedHybridControls: [false],
        UnmappedBusinessProcessControls:[false],
        UnmappedRiskThreatpecificControls:[false],
        UnmappedControlActivityType:[false]
      }),
      
    });

    let user: any = this.session.getUser();
    // console.log(user)
         this.userdata = JSON.parse(user); //userdata.profile.userid
       //  alert(JSON.stringify(this.userdata))
         console.log("userid", this.userdata.profile.userid);
  
     //    this.fetchConfiguration();
  }
  // fetchConfiguration(): void {
  //   this.http.get<ConfigSetting[]>(`${URL}/`, { headers })
  //     .subscribe((response: ConfigSetting[]) => {
  //       console.log(response); // Log the entire response
  //       if (response && response.length > 0) {
  //         response.forEach((config: ConfigSetting) => {
  //           switch (config.configuration) {
  //             case 'Select Risk Register Headers to be viewed':
  //               this.configForm.patchValue({
  //                 first: {
  //                   keyControls: config.controls,
  //                   keyControlDOCToggle: config.togglecontrols,
                 
  //                   keycontrol12: config.controls,
  //                   keyControlTOEToggle: config.togglecontrols 
                
  //                 }
  //               });
  //               break;
  //             case 'Set Compliance Period':
  //               this.configForm.patchValue({
  //                 second: {
  //                   compliancePeriodEnabled: config.grantpermission,
  //                   compliancePeriod: config.parameters
  //                 }
  //               });
  //               break;
  //             case 'Set Update Days':
  //               this.configForm.patchValue({
  //                 third: {
  //                   updateDaysEnabled: config.grantpermission,
  //                   updateDays: config.parameters
  //                 }
  //               });
  //               break;
  //             case 'Set Review Edit Permission':
  //               this.configForm.patchValue({
  //                 fourth: {
  //                   editReviewEnabled: config.grantpermission
  //                 }
  //               });
  //               break;
  //             case 'Set Approval Edit Permission':
  //               this.configForm.patchValue({
  //                 fivth: {
  //                   editApprovalEnabled: config.grantpermission
  //                 }
  //               });
  //               break;
  //             case 'Set Audit Edit Permission':
  //               this.configForm.patchValue({
  //                 sixth: {
  //                   editAuditEnabled: config.grantpermission
  //                 }
  //               });
  //               break;
  //           }
  //         });
  //       }
  //     }, error => {
  //       console.error('Error fetching configuration:', error);
  //     });
  // }


  onSubmit(): void {
   // alert(1)

    if (this.configForm.invalid) {
      alert('Form is invalid! Please fill in all required fields.');
      console.log('Form validation errors:', this.configForm.errors);
      return;
    }

    alert('Form is valid, proceeding with submission...');
    // Handle form submission

      alert (1);
      const pistdatalist: ConfigSetting[] = [];
  
      // Handling first group
      const first = this.configForm.get('first');
      if (first) {
        pistdatalist.push(
          {
          configuration: 'Select Testing Design of Control (DOC)',
          controls: first.get('keyControls').value,
          togglecontrols: true,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Whether Change allowed during creation of Assessment Template',
          controls: '0',
          togglecontrols: first.get('keyControlDOCToggle').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Select Testing Operating Effectiveness (TOE) to be',
          controls: first.get('keyControls12').value,
          togglecontrols: true,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Whether Change allowed during creation of Assessment Template',
          controls:'0',
          togglecontrols: first.get('keyControlTOEToggle').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
         
        }
      );
    }
      // Handling second group
      const second = this.configForm.get('second');
      if (second) {
        pistdatalist.push( {
          configuration: 'Remarks for Key Control Settings',
          controls:'0',
          togglecontrols: true,
          remarks: second.get('keyRemarks').value,
          createdby: this.userdata.profile.userid
        }
      );
     //   pistdatalist.push(postdata1);
      }
  
      // Handling third group
      const third = this.configForm.get('third');
      if (third) {
        pistdatalist.push({
          configuration: 'Select Testing Design of Control (DOC) to be',
          controls: third.get('NONkeyControlsDOC').value,
          togglecontrols: true,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Whether Change allowed during creation of Assessment Template',
          controls:'0',
          togglecontrols: third.get('NONkeyControlDOCToggle').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Select Testing Operating Effectiveness (TOE) to be',
          controls: third.get('NONkeyControlsTOE').value,
          togglecontrols: true,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Whether Change allowed during creation of Assessment Template',
          controls:'0',
          togglecontrols: third.get('NONkeyControlTOEToggle').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Whether Change allowed during creation of Assessment Template',
          controls: third.get('NONkeyControlsGEN').value,
          togglecontrols: true,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Whether Change allowed during creation of Assessment Template',
          controls:'0',
          togglecontrols: third.get('NONkeyControlGENToggle').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        }
      );
      }
  
      // Handling fourth group
      const fourth = this.configForm.get('fourth');
      if (fourth) {
        pistdatalist.push ({
          configuration: 'Remarks for NON-Key Control Settings',
          controls:'0',
          togglecontrols: false,
          remarks: fourth.get('NonkeyRemarks').value,
          createdby: this.userdata.profile.userid
        });
       // pistdatalist.push(postdata2);
      }
  
      // Handling five group
      const five = this.configForm.get('five');
      if (five) {
        pistdatalist.push({
          configuration: 'Allow Permission for Risk Register details to be viewed',
          controls:'0',
          togglecontrols: five.get('Permissionriskregistor').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },
        {
          configuration: 'Select Risk Register Headers to be viewed',
          controls: '0',// five.get('RiskRegisterHeaders')?.value 
          togglecontrols:false,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        }
      );
      }
  
      // Handling six group
      const six = this.configForm.get('six');
      if (six) {
        pistdatalist.push({
          configuration: 'Allow Permission for Control Register details to be viewed',
          controls:'0',
          togglecontrols: six.get('Permissioncontrolregistor').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: 'Select Risk Register Headers to be viewed',
          controls: '0',  //six.get('contolRegisterHeaders')?.value 
          togglecontrols:true,
          remarks:'0',
          createdby: this.userdata.profile.userid,
        });
      }
  
      // Handling seven group
      const seven = this.configForm.get('seven');
      if (seven) {
        pistdatalist.push({
          configuration: 'Hybrid Controls',
          controls:'0',
          togglecontrols: seven.get('DuplicateHybridControls').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: 'Business Process Controls',
          controls:'0',
          togglecontrols: seven.get('DuplicateBusinessProcessControls').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: 'Risk Threat Specific Controls',
          controls:'0',
          togglecontrols: seven.get('DuplicateRiskThreatpecificControls').value,
          remarks:'0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: 'Control Activity Type',
          controls:'0',
          togglecontrols: seven.get('DuplicateControlActivityType').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        }
      );
      }
      const eight = this.configForm.get('eight');
      if (eight) {
        pistdatalist.push({
          configuration: ' Hybrid Controls',
          controls:'0',
          togglecontrols: eight.get('UnmappedHybridControls').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: ' Business Process Controls',
          controls:'0',
          togglecontrols: eight.get('UnmappedBusinessProcessControls').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: 'Risk Threat Specific Controls',
          controls:'0',
          togglecontrols: eight.get('UnmappedRiskThreatpecificControls').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        },{
          configuration: 'Control Activity Type',
          controls:'0',
          togglecontrols: eight.get('UnmappedControlActivityType').value,
          remarks: '0',
          createdby: this.userdata.profile.userid,
        }
      );
      }
  
      console.log('Submitted Data:', pistdatalist);

      alert(JSON.stringify(pistdatalist))
  
  this.http.put(URL + '/RiskAssessmementTemplate/insertRiskAssessmementTemplate', pistdatalist, { headers })
  .subscribe({
    next: (response: any) => {
      console.log(response, 'response');
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: "Data saved Successfully" },
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
    controls: string;
    togglecontrols:boolean;
    remarks:string;
    createdby:number;
     // Allow additional properties
  }
  
