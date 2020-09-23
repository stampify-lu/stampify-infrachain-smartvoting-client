import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {UserPlatformRole} from './models/user';

@Injectable()
export class UserValidGuardService implements CanActivate {
  constructor(public apiService: ApiService, private router: Router) {
  }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.apiService.infoPromise) {
      return this.apiService.infoPromise.then(user => {
        this.apiService.toolbar.addLogin = false;
        if(state.url.indexOf('admin') > -1) {
          if(user.role === UserPlatformRole.CUSTOMER ) {
            return false;
          }
        }
        return true;
      });
    }
    if(!('return_url' in sessionStorage)) {
      const uri = state.url.replace(/;.*$/, '').replace(/^\//, '');
      sessionStorage.setItem('return_url', JSON.stringify(uri.split('/').map(decodeURIComponent)));
    }
    if(!this.apiService.jwt) {
      this.router.navigate(['/home']);
      this.apiService.toolbar.openLogin();
    }
    return false;
  }
}
