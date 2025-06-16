import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.scss'],
})
export class UpdateReportComponent {
  sessionData: any;

  constructor(
    private session: SessionService,
    private encrypt: EncryptionService,
    private RemedyBank: ReportService,
    private router: Router
  ) {
    this.selectReport();
  }

  selectReport() {
    console.log('selected reort :', window.history.state.data);
    let id: any = window.history.state.data.reportid;
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: id,
      // inspectionassignid : data.selectedInspection.inspectionid,
      // data: { ...payload } // Spread the 'payload' object into 'data'
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.RemedyBank.CRUDreport(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let Report = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(Report);
        console.log('response', data);
      }
    });
  }
}
