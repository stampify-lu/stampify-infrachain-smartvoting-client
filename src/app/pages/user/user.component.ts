
import { Component, ViewEncapsulation} from '@angular/core';
//import { Router} from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Meeting, Vote } from 'src/app/shared/models/meeting';
import { User } from 'src/app/shared/models/user';

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None
  })

  export class UserComponent {
    user: User;
    campagn : Meeting;
    campagns : Meeting[];
    step : number = 1;
    vote: Vote;
    selectedVotingCampagn : Meeting;
    constructor(public apiService: ApiService) {
        this.apiService.getOwnMeetings(undefined, undefined, undefined, undefined, 'timeEnd', 'DESC').then(campaigns => {
            this.campagns = campaigns.result;
        }, err => this.apiService.messageBar.action = {message: err});
    }

    selectCampaign(campagn : Meeting) {
        this.campagn = campagn;
        this.step++;
    }

    confirm() {
        this.apiService.confirmParticipation(this.campagn);
        this.step++;
    }

    confirmParticipation() {
        this.apiService.confirmParticipation(this.campagn);
    }

    registerVote(vote : Vote) {
        this.apiService.registerVote(this.campagn, vote);
    }

    checkMyVote() {
        this.apiService.checkMyVote(this.campagn);
    }
  }