import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeRequestFormComponent } from '../change-request-form/change-request-form.component';

@Component({
  selector: 'app-view-contact-details',
  templateUrl: './view-contact-details.component.html',
  styleUrls: ['./view-contact-details.component.scss']
})
export class ViewContactDetailsComponent {

  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(ChangeRequestFormComponent, {
      width: '1400px',
    });
  }

}
