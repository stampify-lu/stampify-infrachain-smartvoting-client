import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../shared/api.service';
import {UnsubscribingComponent} from '../unsubscribing.component';

declare const window: Window & {initialQueryString: string[][]};

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends UnsubscribingComponent {
  env = environment;
  accountName: string;
  password: string;
  privateKey: string;
  signed = false;

  emailHolder = window.initialQueryString.find((q: string[]) => q[0] === 'email');
  passwordHolder = window.initialQueryString.find((q: string[]) => q[0] === 'password');
  privateHolder = window.initialQueryString.find((q: string[]) => q[0] === 'private');

  constructor(public apiService: ApiService, public router: Router, public route: ActivatedRoute) {
    super();
    if(this.emailHolder && this.passwordHolder && this.privateHolder) {
      this.accountName = this.emailHolder[1];
      this.password = this.passwordHolder[1];
      this.privateKey = this.privateHolder[1];
      this.loginWeak();
    }
  }

  loginWeak(): boolean {
    this.apiService.consumeLoginWeak(this.accountName, this.password).then(() => {
      this.leaveToSearch(true).then(() => {
        this.apiService.unlockBCAccount(this.privateKey);
      });
    }, err => this.apiService.messageBar.action = {message: String(err).indexOf(': ') > -1 ? err : 'login.invalid'});
    return true;
  }

  protected leaveToSearch(connect: boolean) {
    return this.apiService.info().then(() => {
        this.doLeave(connect);
    }, err => this.apiService.messageBar.action = {message: err});
  }

  protected doLeave(connect: boolean) {
    this.router.navigate(['/user']);
    if(connect) {
      this.apiService.messageBar.action = {message: 'Logged in!'};
    }
  }
}
