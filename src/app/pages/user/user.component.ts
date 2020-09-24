
import { Component, ViewEncapsulation} from '@angular/core';
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
    hash: string;
    hasVoted : boolean = false;
    hasConfirm : boolean = false;
    forVotes : number = 0;
    againstVotes : number = 0;
    resultPromises: {[id: number]: Promise<any>} = {};
    result: {[id: number]: [number, number, number]} = {};

    constructor(public apiService: ApiService) {
        this.apiService.getOwnMeetings(undefined, undefined, undefined, undefined, 'timeEnd', 'DESC').then(campaigns => {
            this.campagns = campaigns.result;
        }, err => this.apiService.messageBar.action = {message: err});
    }

    checkAvailability(campagn : Meeting){
        return  new Date(campagn.timeBegin) < new Date() && new Date() < new Date(campagn.timeEnd) ;
    }

    getCampagnResult(campagn: Meeting) {
        if(new Date() < new Date(campagn.timeEnd)) return 'Unknown yet';
        if(!this.resultPromises[campagn.id]) {
            this.resultPromises[campagn.id] = Promise.all([
                this.apiService.getVotesFor(campagn),
                this.apiService.getVotesAgainst(campagn),
                this.apiService.getVotesEmpty(campagn) 
            ]).then(v => this.result[campagn.id] = v);
            return 'Unknown yet';
        } else if(this.result[campagn.id]) {
            if (this.campagn && campagn.id === this.campagn.id){
                this.forVotes = this.result[campagn.id][0];
                this.againstVotes = this.result[campagn.id][1];
            }
            return 'For: ' + this.result[campagn.id][0] + ', Against: ' + this.result[campagn.id][1] + ', Invalid or abstain: '  + this.result[campagn.id][2];
        }
        return 'Unknown yet';
    }

    selectCampaign(campagn : Meeting) {
        this.campagn = campagn;
        this.step++;
    }

    next(){
        this.step++;
    }

    confirmParticipation(){
        this.hasConfirm = true;
        this.apiService.confirmParticipation(this.campagn).then(() =>{
            this.step++;
        });
    }

    registerVote(vote : Vote){
        this.hasVoted = true;
        this.apiService.registerVote(this.campagn, vote).then(tx => {
            this.hash = tx.transactionHash;
            this.next();
        });
        
    }

    refreshResults() {
        this.getCampagnResult(this.campagn);
    }

    seeResults(){
        this.next();
    }
  }