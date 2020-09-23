import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {UserPlatformRole} from './models/user';

@Injectable()
export class UserValidGuardService implements CanActivate {
  constructor(public apiService: ApiService, private router: Router) {
  }

  static useReturnUrl(router: Router, routerCommands: string[]) {
    let returnUrl: any = sessionStorage.getItem('return_url');
    sessionStorage.removeItem('return_url');
    if(returnUrl) {
      try {
        returnUrl = JSON.parse(returnUrl);
        const p = returnUrl[returnUrl.length - 1].split('?')[1];
        returnUrl[returnUrl.length - 1] = returnUrl[returnUrl.length - 1].split('?')[0];
        const querys: any = {};
        if(p) {
          const queryParts = p.split('&');
          queryParts.forEach((part: string) => {
            const parts = part.split('=');
            querys[parts[0]] = parts[1];
          });
        }
        router.navigate(returnUrl, {queryParams: querys});
      } catch(e) {}
    } else {
      router.navigate(routerCommands);
    }
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
