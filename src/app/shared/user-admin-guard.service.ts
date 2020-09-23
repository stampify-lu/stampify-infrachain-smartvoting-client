import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {UserPlatformRole} from './models/user';

@Injectable()
export class UserAdminGuardService implements CanActivate {
  constructor(public apiService: ApiService, private router: Router) {
  }

  canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.apiService.infoPromise.then(user => {
      if(user.role === UserPlatformRole.ADMIN) return true;
      this.router.navigate(['/user']);
      return false;
    });
  }
}
