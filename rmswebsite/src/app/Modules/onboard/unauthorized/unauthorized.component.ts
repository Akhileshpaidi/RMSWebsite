import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor( private router: Router,){}
  unauthorized() {
    this.router.navigate(['dashboard']);
  }
}
