import {Component, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginComponent} from '../../pages/login/login.component';
import {ApiService} from '../../shared/api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'globalDismiss($event)'
  }
})
export class ToolbarComponent extends LoginComponent {
  @ViewChild('signTemplate', {static: true}) signTemplate: TemplateRef<any>;

  showLogin = false;
  addLogin = false;

  secondLineVisible = false;
  unreadCount = 0;

  constructor(public apiService: ApiService, public route: ActivatedRoute, public router: Router) {
    super(apiService, router, route);
  }

  openLogin() {
    if(this.showLogin) {
      this.addLogin = false;
      this.showLogin = false;
      return;
    }
    this.addLogin = true;
    setTimeout(() => this.showLogin = true, 100);
  }

  closeLogin() {
    setTimeout(() => {
      if(!this.showLogin) return;
      this.showLogin = false;
      setTimeout(() => this.addLogin = false, 350);
    });
  }

  goTo() {

  }

  logout() {
    this.apiService.signOut().then(() => undefined, err => this.apiService.messageBar.action = {message: err});
  }


  globalDismiss(event: any) {
    if(this.showLogin) {
      if((!document.querySelector('.second-line').contains(event.target)
        || (document.querySelector('.notification-center') && !document.querySelector('.notification-center').contains(event.target))
      )) {
        this.closeLogin();
      }
    }
  }
}
