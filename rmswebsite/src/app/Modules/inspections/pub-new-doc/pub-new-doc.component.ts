import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { ReportService } from 'src/app/core/services/report/report.service';


@Component({
  selector: 'app-pub-new-doc',
  templateUrl: './pub-new-doc.component.html',
  styleUrls: ['./pub-new-doc.component.scss']
})
export class PubNewDocComponent {
  isPanelVisible: boolean = false;
  isdoclinkpanelVisible:boolean=false;
  isChecked: boolean = false;
  isChecked2:boolean=false;
  checkboxForm: FormGroup;
  reportForm!: FormGroup;
  sessionData: any;
  erroMessage: any;
  selectedproject = new FormControl('');
  selectedTimePeriod= new FormControl('');
  showUnitRates: boolean = false;
  showUpload = false;
  selectedDate: Date | undefined;
  createDoc=false;
  public project: any[] = [
    { id: 1, name: 'Direct Upload' },
    { id: 2, name: 'Create Document' }
  ];


    public tmperiod:any[]=[
      {id:1,name:'mins'},
      {id:2,name:'hrs'},
      {id:3,name:'days'}
    ];

  // General = false;
  // confidential=false;
  phoneno=false;
  public project1: any[] = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Confidential' }
  ];

  OptionSelectedActivateFields = false;
  OptionNotSelected=false;
  public project2: any[] = [
    { id: 1, name: 'OptionSelectedActivateFields' },
    { id: 2, name: 'OptionNotSelected' }
  ];

  constructor(
    // private router: Router,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private fb: FormBuilder,
    private report: ReportService,
    private formBuilder: FormBuilder,
   
  ) {

    this.checkboxForm = this.formBuilder.group({
      isChecked: false,
      isChecked2:false
    });
  }

  onCheckboxChange() {
    const isChecked = this.checkboxForm.get('isChecked')!.value;
    console.log('Checkbox checked:', isChecked);
  }
  ondoclinkChange() {
    const isChecked2 = this.checkboxForm.get('isChecked2')!.value;
    console.log('Checkbox doclink:', isChecked2);
  }

 

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      reportName: '',
      selectedProject: '',
      selectedBridge: '',
      selectedInspection: '',
      startingpoint: '',
      endingpoint: '',
      clientName: '',
      reportedBy: '',
      Introduction: '',
      Observation: '',
      Methodology: '',
    });
  }

  selectOption(event: any) {
    // handle the selection change here
    console.log('Selected:', event.value);
    if (event.value === 1) { // Assuming 'Direct Upload' has an id of 1
      this.showUpload = true;
      this.createDoc=false;
    } else {
      this.showUpload = false;
      this.createDoc=true;
    }
  }


  selectDoc(event: any){
    console.log('Selected:', event.value);
    if (event.value === 1) { 
      // this.General = true;
      // this.confidential=false;
      this.phoneno=false;
    } 
    else {
      this.phoneno=true;
      // this.General = false;
      // this.confidential=true;
    }
  }
  changeTimePeriod(event:any)  {
   console.log('Selected Time period',event.value);
   
  }

  selectDocReview(event: any){
    console.log('Selected:', event.value);
    if (event.value === 1) { 
      this.OptionSelectedActivateFields = true;
      this.OptionNotSelected=false;
    } else {
      this.OptionSelectedActivateFields = false;
      this.OptionNotSelected=true;
    }
  }

  selectDocuType(event: any) {
    // handle the selection change here
    console.log('Selected:', event.value);
  }

  config: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  selectInspection(element: any) {
    let id = element.value;

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
  }

  selectItem() {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: 1,
    };

    

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.inventory
      .submitInventory(encryptedPayload)
      .subscribe((response: any) => {
        console.log('response', response);
        if (response.ResponseCode === '0') {
          let getInventoryData = this.encrypt.decryptionAES(
            response.ResponseData
          );
          console.log('inventory data', getInventoryData);
          let data = JSON.parse(getInventoryData);
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });
  }

  getProjectData() {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let payload = {
      authid: this.sessionData.profile.authid,
    };
  }
  getInventoryList() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
}




}
