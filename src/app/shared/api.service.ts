import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {pki} from 'node-forge';
import {take, timeout} from 'rxjs/operators';
import * as Web3 from 'web3';
import {environment} from '../../environments/environment';
import {Application} from './application.service';
import {BackendMessage, Results} from './models/backend-message';
import {Meeting, Vote} from './models/meeting';
import {User} from './models/user';

@Injectable()
export class ApiService extends Application {

  get jwt() {
    return this.jwtToken;
  }

  set jwt(token: string) {
    console.warn('JWT TOKEN', token);
    this.jwtToken = token;
    this.storeItem('jwt', this.jwtToken);
  }

  // Used for authentication towards the API server
  private get httpOptions() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
    if(this.jwtToken) {
      options.headers = options.headers.append('Authorization', this.jwtToken);
    }
    return options;
  }
  protected web3: Web3.default;
  infoPromise: Promise<User>;

  private jwtToken: string;
  private userBCPublicKey: string;

  constructor(private http: HttpClient, private router: Router) {
    super();
    // Try to auto log in
    this.jwtToken = this.getStoredItem('jwt');
    if(this.jwtToken && JSON.parse(atob(this.jwtToken.split('.')[1])).exp > Date.now() / 1000) {
      this.info().then(() => {
        if(location.hash.length < 3)
          this.router.navigate(['/dashboard']);
      }, err => this.messageBar.action = {message: err});
    }
  }

  unlockBCAccount(privateKey: string) {
    this.userBCPublicKey = this.web3.eth.accounts.wallet.add(privateKey).address;
  }

  signOut() {
    this.jwt = undefined;
    this.userInfo = undefined;
    this.removeStoredItem('jwt');
    this.router.navigate(['/']);
    return Promise.resolve();
  }

  info(): Promise<User> {
    this.infoPromise = new Promise((resolve, reject) => {
      this.http.get<Results<User>>(environment.baseUri + 'users/info', this.httpOptions)
        .pipe(timeout(20000)).pipe(take(1)).subscribe((res: Results<User>) => {
        this.processMessages(res);
        // General set up thanks to having the user finally!
        this.userInfo = res.result;
        this.web3 = new (<any>window).Web3(this.userInfo.server.blockchain.rpc);
        // Return result
        resolve(res.result);
      }, this.makeReject(reject));
    });
    return this.infoPromise;
  }

  setInfo(user: User): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.http.post<undefined>(environment.baseUri + 'users/info', {
        lang: user.lang
      }, this.httpOptions).pipe(timeout(20000)).pipe(take(1)).subscribe(resolve, this.makeReject(reject));
    });
  }

  consumeLoginWeak(accountName: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post<Results<{jwt: string}>>(environment.baseUri + 'users/login_weak', {
        account_name: accountName,
        password: password
      }, this.httpOptions)
        .pipe(timeout(20000)).pipe(take(1)).subscribe((res: Results<{jwt: string}>) => {
          this.processMessages(res);
          this.jwt = res.result.jwt;
          resolve(res.result.jwt);
        }, this.makeReject(reject));
    });
  }

  reset(accountName: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.http.post<undefined>(environment.baseUri + 'users/reset/' + encodeURIComponent(accountName), {}, this.httpOptions)
        .pipe(timeout(20000)).pipe(take(1)).subscribe(resolve, this.makeReject(reject));
    });
  }

  resetPassword(accountName: string, resetKey: string, password: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.http.post<undefined>(environment.baseUri + 'users/recover/' + encodeURIComponent(accountName), {
        reset_key: resetKey,
        password: password
      }, this.httpOptions).pipe(timeout(20000)).pipe(take(1)).subscribe(resolve, this.makeReject(reject));
    });
  }

  setPassword(password: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.http.post<undefined>(environment.baseUri + 'users/password', {
        password: password
      }, this.httpOptions).pipe(timeout(20000)).pipe(take(1)).subscribe(resolve, this.makeReject(reject));
    });
  }

  adminSearchUser(search: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Results<User[]>>(environment.baseUri + 'users/search/' + encodeURIComponent(search), this.httpOptions)
        .pipe(timeout(20000)).pipe(take(1)).subscribe(res => resolve(res.result), this.makeReject(reject));
    });
  }

  getOwnMeetings(minDate?: Date,
                 search?: string, offset?: number, limit?: number,
                 orderColumn?: 'id' | 'name' | 'timeBegin' | 'timeEnd',
                 orderAsc?: 'ASC' | 'DESC'): Promise<Results<Meeting[]>> {
    return new Promise((resolve, reject) => {
      this.http.get<Results<Meeting[]>>(environment.baseUri + 'meetings/own/query?1=1'
        + (minDate ? '&minDate=' + minDate.getTime() : '')
        + (search ? '&search=' + encodeURIComponent(search) : '')
        + (offset ? '&offset=' + offset : '') + (limit ? '&limit=' + limit : '')
        + (orderColumn ? '&orderColumn=' + orderColumn : '') + (orderAsc ? '&orderAsc=' + orderAsc : ''), this.httpOptions)
        .pipe(timeout(20000)).pipe(take(1)).subscribe((res: Results<Meeting[]>) => {
          this.processMessages(res);
          resolve(res);
        }, this.makeReject(reject, false));
    });
  }

  createMeeting(meeting: Meeting): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<Results<number>>(environment.baseUri + 'meetings', {
        name: meeting.name,
        time_begin: new Date(meeting.timeBegin).getTime(),
        time_end: new Date(meeting.timeEnd).getTime()

      }, this.httpOptions).pipe(timeout(20000)).pipe(take(1)).subscribe(res => resolve(res.result), this.makeReject(reject));
    });
  }

  addMeetingUser(meetingId: number, userId: number): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.http.post<undefined>(environment.baseUri + 'meetings/' + meetingId + '/add_user', {
        user_id: userId
      }, this.httpOptions).pipe(timeout(20000)).pipe(take(1)).subscribe(resolve, this.makeReject(reject));
    });
  }

  deleteUserMeeting(meetingId: number, userMeetingId: number): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.http.post<undefined>(environment.baseUri + 'meetings/' + meetingId + '/delete_user', {
        user__meeting_id: userMeetingId
      }, this.httpOptions).pipe(timeout(20000)).pipe(take(1)).subscribe(resolve, this.makeReject(reject));
    });
  }

  confirmParticipation(meeting: Meeting): Promise<undefined> {
    const Meeting = new this.web3.eth.Contract(JSON.parse(this.userInfo.server.contractsAbi.Meeting));
    Meeting.options.address = meeting.contractAddress;
    return Meeting.methods.set_vote(this.web3.utils.fromAscii((<any>pki.certificateFromPem(this.userInfo.server.contractVoteCypher)
      .publicKey).encrypt(String(Vote.BLANK)))).send({from: this.userBCPublicKey, gas: 1500000, gasPrice: 2000000000});
  }

  registerVote(meeting: Meeting, vote: Vote): Promise<undefined> {
    const Meeting = new this.web3.eth.Contract(JSON.parse(this.userInfo.server.contractsAbi.Meeting));
    Meeting.options.address = meeting.contractAddress;
    return Meeting.methods.set_vote(this.web3.utils.fromAscii((<any>pki.certificateFromPem(this.userInfo.server.contractVoteCypher)
      .publicKey).encrypt(String(vote)))).send({from: this.userBCPublicKey, gas: 1500000, gasPrice: 2000000000});
  }

  checkMyVote(meeting: Meeting): Promise<boolean> {
    const Meeting = new this.web3.eth.Contract(JSON.parse(this.userInfo.server.contractsAbi.Meeting));
    Meeting.options.address = meeting.contractAddress;
    return Meeting.methods.get_vote_cypher(this.userBCPublicKey).call({from: this.userBCPublicKey})
      .then((record: string) => {
        if(!record) return false;
        const utf8record = this.web3.utils.toAscii(record);
        if(!utf8record || utf8record.replace(/0/g, '').length < 3) return false;
        return true;
      });
  }

  private processMessages(msg: BackendMessage) {
    if(!msg) return;
    if(msg.targetAppVesion && msg.targetAppVesion > environment.appVersion) {
      window.location.reload(true);
      return;
    }
  }

  private makeReject(reject: (error: any) => void, logout = true): (error: any) => void {
    let stack = 'err';
    try {
      stack = new Error().stack.match(/ApiService.[a-zA-Z]+ /g)[1].split('\.')[1].trim();
    } catch(e) {
    }
    return (err: {error?: BackendMessage, status?: number}) => {
      if(err.status === 401 && logout) {
        this.signOut().then(() => location.href = '/', () => window.location.reload(true));
        return;
      }
      const msg = err.error && err.error.error && err.error.error.additionalInfo;
      if(msg) {
        reject(err.error.error.additionalInfo);
      } else {
        reject('err.' + stack);
      }
    };
  }
}
