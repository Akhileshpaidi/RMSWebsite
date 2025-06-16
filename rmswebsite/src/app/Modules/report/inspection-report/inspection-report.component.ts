import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ReportService } from 'src/app/core/services/report/report.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImportRemedyComponent } from '../import-remedy/import-remedy.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inspection-report',
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.scss'],
})
export class InspectionReportComponent {
  reportForm!: FormGroup;
  selectedInspection: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['srno', 'Description', 'Qty', 'Unit', 'Rate', 'Amount'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isLinear = false;
  project: any;
  bridge: any;
  inspection: any;
  inputString: any;
  sessionData: any;
  name = 'Angular 6';
  htmlContent = '';
  remedies: any;
  shortTermRemedies: any[] = [];
  longTermRemedies: any[] = [];
  selectedRemedies: string[] = [];
  BOQ: any;

  constructor(
    private router: Router,
    private session: SessionService,
    private report: ReportService,
    private encrypt: EncryptionService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.selectProject();
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

  selectProject() {
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

    this.report.projectMeta(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let projectList = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(projectList);
        this.project = data.project;
        console.log('projectList', this.project);
      } else {
        console.error(response);
      }
    });
  }

  selectBridge(element: any) {
    console.log(element);
    let id = element.value;
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      projectid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.report.bridgeMeta(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let bridgeList = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(bridgeList);
        this.bridge = data.bridgelist;
        console.log('bridgeList', this.bridge);
      } else {
        console.error(response);
      }
    });
  }

  selectInspection(element: any) {
    let id = element.value;

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      bridgeid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.report
      .inspectionSummary(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let inspectionList = this.encrypt.decryptionAES(
            response.ResponseData
          );
          let data = JSON.parse(inspectionList);
          this.inspection = data.inspectionlist;
          console.log('inspectionList', this.inspection);
        } else {
          console.error(response);
        }
      });

    this.report.getBOQ(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let BOQ = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(BOQ);
        this.dataSource = new MatTableDataSource(data.unitrate);
        this.dataSource.paginator = this.paginator;
        console.log('BOQ', data);
      } else {
        console.error(response);
      }
    });
  }

  draftReport(data: any) {
    let payload = {
      selectedProject: data.selectedProject,
      selectedBridge: data.selectedBridge,
      selectedInspection: data.selectedInspection,
      startingPoint: data.startingpoint,
      endingPoint: data.endingpoint,
      clientName: data.clientName,
      introduction: data.Introduction,
      Observation: data.Observation,
      Methodology: data.Methodology,
    };

    let Data = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      id: 0,
      reportname: data.reportName,
      inspectionassignid: data.selectedInspection.inspectionid,
      data: { ...payload }, // Spread the 'payload' object into 'data'
    };
    console.log('create Report', Data);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(Data)),
    };

    this.report.CRUDreport(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let Report = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(Report);
        console.log('Report', data);
      } else {
        console.error(response);
      }
    });
    console.log('form data', Data);
  }

  config: AngularEditorConfig = {
    editable: true,
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

  onChange(event: any) {
    console.log('changed');
  }

  onBlur(event: any) {
    console.log('blur ' + event);
  }

  onChange2(event: any) {
    console.warn(this.reportForm.value);
  }

  importShortTermRemedy() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ImportRemedyComponent, dialogConfig);
    let CurrentDialog = this.dialog.open(ImportRemedyComponent, dialogConfig);

    CurrentDialog.afterClosed().subscribe((result) => {
      this.shortTermRemedies = result.selectedremedys;
      console.log('Dialog result after close: ', this.remedies);
    });
  }

  importLongTermRemedy() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ImportRemedyComponent, dialogConfig);
    let CurrentDialog = this.dialog.open(ImportRemedyComponent, dialogConfig);

    CurrentDialog.afterClosed().subscribe((result) => {
      this.longTermRemedies = result.selectedremedys;
      console.log('Dialog result after close: ', this.remedies);
    });
  }

  getPhotographs(element: any) {
    let inspection = element;
    let id = inspection.inspectionid;
    console.log('selection data', inspection);
    console.log(id);

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionassignid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.report.getPhotographs(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let inspectionList = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(inspectionList);
        this.inspection = data.inspectionlist;
        console.log('Photographs', data);
      } else {
        console.error(response);
      }
    });
  }

  selectedImageIds: number[] = [];

  imageList = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1516176966905-58371240ba28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1429041966141-44d228a42775?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 3,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1663947578336-1a45da837985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1675&q=80',
    },
    {
      id: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1522775559573-2f76d540932b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    },
    {
      id: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1516176966905-58371240ba28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    },
    {
      id: 6,
      imageUrl:
        'https://images.unsplash.com/photo-1429041966141-44d228a42775?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 8,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1663947578336-1a45da837985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1675&q=80',
    },
    {
      id: 9,
      imageUrl:
        'https://images.unsplash.com/photo-1522775559573-2f76d540932b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    },

    // Add more image objects as needed
  ];

  toggleImageSelection(imageId: number): void {
    const index = this.selectedImageIds.indexOf(imageId);
    if (index > -1) {
      this.selectedImageIds.splice(index, 1);
    } else {
      this.selectedImageIds.push(imageId);
    }
  }

  isImageSelected(imageId: number): boolean {
    return this.selectedImageIds.includes(imageId);
  }

  selectedImages(): void {
    // Call your function or perform any other desired action with the selected image IDs
    console.log('images ', this.selectedImageIds);
  }
}
