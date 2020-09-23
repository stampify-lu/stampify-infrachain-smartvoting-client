import { Component,  ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from 'src/app/shared/api.service';
import { User } from 'src/app/shared/models/user';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
  formName: string;
  formTimeBegin: string;
  formTimeEnd: string;
  search: string;
  formUsers: User[] = [];
  selectedUsers: User[] = [];

  constructor(public apiService: ApiService, private router: Router) {
  }

  doSearch() {
    if(this.search && this.search.length > 2) {
      this.apiService.adminSearchUser(this.search).then(us => this.formUsers = us, () => undefined);
    }
  }

  addUser(u: User) {
    if(!this.selectedUsers.find(us => us.id === u.id))
      this.selectedUsers.push(u);
  }

  send() {
    this.apiService.createMeeting({
      name: this.formName,
      timeBegin: new Date(this.formTimeBegin).toISOString(),
      timeEnd: new Date(this.formTimeEnd).toISOString(),
      timeFrozen: undefined,
      contractAddress: undefined
    }).then(id => {
      return Promise.all(this.selectedUsers.map(su => {
        return this.apiService.addMeetingUser(id, su.id);
      })).then(() => {
        this.router.navigate(['/user']);
        this.apiService.messageBar.action = {message: 'Vote created'};
      });
    }).catch(err => this.apiService.messageB
ar.action = {message: err});
  }
}