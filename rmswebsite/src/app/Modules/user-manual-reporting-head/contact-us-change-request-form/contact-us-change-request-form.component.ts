import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ViewContactDetailsComponent } from '../view-contact-details/view-contact-details.component';

@Component({
  selector: 'app-contact-us-change-request-form',
  templateUrl: './contact-us-change-request-form.component.html',
  styleUrls: ['./contact-us-change-request-form.component.scss']
})
export class ContactUsChangeRequestFormComponent {
  constructor(private dialog: MatDialog) {}

  openContactUsPopup() {
    this.dialog.open(ViewContactDetailsComponent, {
      width: '2400px',
    });
  }
}
