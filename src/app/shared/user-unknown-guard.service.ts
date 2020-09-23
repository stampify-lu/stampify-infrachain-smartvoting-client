import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable()
export class UserUnknownGuardService implements CanActivate {
  constructor(public apiService: ApiService, public router: Router) {
  }

  canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.apiService.jwt && this.apiService.userInfo) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
