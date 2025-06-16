import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../user/user-list/user-list.component';
import userData from '../../../Common/dummy-data/user.json';
import roleData from '../../../Common/dummy-data/role.json';
import { EncryptionService } from 'src/app/core/encryption.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent {
  public module = 'Inventory Management';
  public access = 'Write';
  checked: any;
  sessionData: any;
  displayedColumns = [
    'srno',
    'reportname',
    'username',
    'date',
    'time',
    'view',
    'edit',
    'remove',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  erroMessage: any;
  bridge: any;
  project: any;
  inspection: any;

  constructor(
    private router: Router,
    private session: SessionService,
    private report: ReportService,
    private encrypt: EncryptionService,
    public dialog: MatDialog
  ) {
    this.selectProject();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editReport(element: any) {
    console.log('elemnt:', element);
    this.router.navigate(['dashboard/report/update-report'], {
      state: { data: element },
    });
  }

  viewReport(element: any) {
    console.log('elemnt:', element);
    this.router.navigate(['dashboard/report/view-report'], {
      state: { data: element },
    });
  }

  createReport() {
    this.router.navigate(['dashboard/report/generateReport']);
  }

  gerReportList(element: any) {
    const id = element.inspectionid;
    console.log('inspectionassignid', id);

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      inspectionassignid: id,
    };
    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.report.reportSummary(encryptedPayload).subscribe((response: any) => {
      // console.log(response, 'response');

      if (response.ResponseCode === '0') {
        let ReportList = this.encrypt.decryptionAES(response.ResponseData);

        let data = JSON.parse(ReportList);
        console.log(data, 'ReportList');
        // this.dataSource = data.Reportsummary;
        this.dataSource = new MatTableDataSource(data.reportlist);
        this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource, 'ReportList');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  changeStatus(value: any, element: any) {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'C',
      id: element.id,
      status: value.checked ? '0' : '1',
    };

    // console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.report.CRUDreport(encryptedPayload).subscribe((response: any) => {
      // console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.reloadComponent();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.reloadComponent();
      }
    });
  }

  removeReport(element: any) {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'D',
      id: element.reportid,
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.report.CRUDreport(encryptedPayload).subscribe((response: any) => {
      // console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        // window.location.reload();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  openDialog(element: any) {
    console.log('elemnt', element);
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '550px',
      data: {
        title: 'rrrrDelete Item?',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result, 'The dialog was closed');

      if (result == true) {
        this.removeReport(element);
        // this.reloadComponent();
      } else {
        // console.error('Somthing went wrong');
      }
    });
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  searchTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  }
}
