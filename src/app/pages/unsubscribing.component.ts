import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';

export class UnsubscribingComponent implements OnDestroy {
  env = environment;
  private subs: Subscription[] = [];

  register(sub: Subscription) {
    this.subs.push(sub);
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subs.length; i++) {
      this.subs[i].unsubscribe();
    }
  }
}
