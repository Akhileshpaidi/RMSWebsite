import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {}
  logout() {
    this.session.cleanSesssion();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
