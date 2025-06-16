import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-condition-page',
  templateUrl: './terms-condition-page.component.html',
  styleUrls: ['./terms-condition-page.component.scss'],
})
export class TermsConditionPageComponent {
  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/sign-up']);
  }
}
