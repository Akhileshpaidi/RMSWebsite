import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot,UrlTree,} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate1(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      typeof localStorage.getItem('user') !== 'undefined' &&
      localStorage.getItem('user') !== null
    ) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const componentId = route.data['componentId'];
    if (this.authService.hasAccess(componentId)) {
      return true;
    } else {
      return true;
      //this.router.navigate(['unauthorized']);
     // return false;
    }
  }
}
