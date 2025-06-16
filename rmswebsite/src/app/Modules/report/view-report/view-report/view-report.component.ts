import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ReportService } from 'src/app/core/services/report/report.service';
import jspdf, { jsPDF } from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent {
  @ViewChild('containerElement', { static: false })
  containerElement!: ElementRef;

  sessionData: any;
  reportname: any;
  bridgename: any;
  clientName: any;
  inspectionname: any;
  inspector: any;
  reviewer: any;
  introduction: any;
  Observation: any;

  constructor(
    private session: SessionService,
    private encrypt: EncryptionService,
    private Report: ReportService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.selectReport();
  }

  selectReport() {
    let id: any = window.history.state.data.reportid;
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // payload for service
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: id,
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.Report.CRUDreport(encryptedPayload).subscribe((response: any) => {
      if (response.ResponseCode === '0') {
        let Report = this.encrypt.decryptionAES(response.ResponseData);
        let data = JSON.parse(Report);
        this.bridgename = data.data.selectedInspection.bridgename;
        console.log('report view Data:', data);
        this.reportname = data.reportname;
        this.inspectionname = data.data.selectedInspection.inspectionname;
        this.clientName = data.data.clientName;
        this.inspector = data.data.selectedInspection.inspector[0].name;
        let user: any = this.session.getUser();
        this.sessionData = JSON.parse(user);
        console.log('user:', this.sessionData);
        this.reviewer = data.data.selectedInspection.reviewer[0].name;
        this.introduction = this.sanitizer.bypassSecurityTrustHtml(
          data.data.introduction
        );
        this.Observation = this.sanitizer.bypassSecurityTrustHtml(
          data.data.Observation
        );
      }
    });
  }

  downloadAsPdf() {
    const data = document.getElementById('contentToConvert');
    if (!data) {
      return;
    }

    const options = {
      scale: 2, // Adjust the scale as needed
      useCORS: true, // Enable CORS for rendering images from different domains
      scrollX: 0, // Set the initial scroll position to top-left
      scrollY: 0,
    };

    html2canvas(data, options).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 208;
      const pageHeight = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(
        contentDataURL,
        'PNG',
        15,
        10,
        imgWidth - 20,
        imgHeight - 20
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        // Add a new page
        pdf.addPage();
        position = heightLeft - imgHeight;

        // Adjust the height and position of the image
        imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(
          contentDataURL,
          'PNG',
          15,
          position + 10,
          imgWidth - 20,
          imgHeight - 20
        );

        heightLeft -= pageHeight;
      }

      pdf.save('MYPdf.pdf');
    });
  }
}
