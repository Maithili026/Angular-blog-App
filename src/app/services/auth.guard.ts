import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
//this method help to not access the dashboard without login it denis the access
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tostr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    if (this.authService.isLoggedInGuard) {
      console.log('Access Granted..');
      return true;
    } else {
      this.tostr.warning('You dont have permission to access this page...❗❗');
      console.log('Access disgrand..');
      this.router.navigate(['/login']); // Redirect to the login page
      return false;
    }
  }
}
