import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../user/user-list/user-list.component';
import userData from '../../../Common/dummy-data/user.json';
import roleData from '../../../Common/dummy-data/role.json';
import { EncryptionService } from '../../../core/encryption.service';
import { UserService } from '../../../core/services/user/user.service';
import { SessionService } from '../../../core/Session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from '../../../Common/toaster/toaster.component';
import { DaidailogeComponent } from '../../../Common/daidailoge/daidailoge.component';
import { ProjectService } from '../../../core/services/project/project.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent {

  public module = 'Inventory Management';
  public access = 'Write';
  checked: any;
  sessionData: any;
  displayedColumns = ['srno', 'name', 'companyname', 'edit', 'status', 'remove'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  erroMessage: any;

  constructor(
    private router: Router,
    private session: SessionService,
    private project: ProjectService,
    private encrypt: EncryptionService,
    public dialog: MatDialog
  ) {
    this.getProjectList();
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

  editProject(element: any) {
    this.router.navigate(['dashboard/project/create-update-project'], {
      state: { data: element },
    });
  }

  createProject() {
    this.router.navigate(['dashboard/project/create-update-project'], {
      state: { data: undefined },
    });
  }

  getProjectList() {
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

    // Calling Api

    this.project.projectSummary(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');

      if (response.ResponseCode === '0') {
        let projectList = this.encrypt.decryptionAES(response.ResponseData);

        let data = JSON.parse(projectList);
        this.dataSource = new MatTableDataSource(data.project);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource, 'projectList');
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

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.project.CRUDProject(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');
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

  removeProject(element: any) {
    console.log(element, 'removr inspection ');
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'D',
      id: element.id,
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.project.CRUDProject(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        window.location.reload();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '550px',
      data: {
        title: 'Delete Item?',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'The dialog was closed');

      if (result == true) {
        this.removeProject(element);
        this.reloadComponent();
      } else {
        console.log('Somthing went wrong');
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

}
