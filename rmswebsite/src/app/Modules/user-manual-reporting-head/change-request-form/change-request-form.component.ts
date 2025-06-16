import { Component } from '@angular/core';

@Component({
  selector: 'app-change-request-form',
  templateUrl: './change-request-form.component.html',
  styleUrls: ['./change-request-form.component.scss']
})
export class ChangeRequestFormComponent {
  download(): void {
    // Implement your download logic here
    console.log('Download button clicked');
  }

  print(): void {
    // Implement your print logic here
    console.log('Print button clicked');
  }
}
