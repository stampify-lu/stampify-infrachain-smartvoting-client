import {MessageBarComponent} from '../widgets/message-bar/message-bar.component';
import {ToolbarComponent} from '../widgets/toolbar/toolbar.component';
import { User} from './models/user';
import {Provable} from './provable.service';

export class Application extends Provable {
  toolbar: ToolbarComponent;
  messageBar: MessageBarComponent;
  userInfo: User;
  isMobile = false;

  constructor() {
    super();
    if(window && window.innerWidth < 800) {
      this.isMobile = true;
    }
  }

  back() {
    history.back();
  }

  storeItem(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
    }
  }

  getStoredItem(key: string): any {
    if(!localStorage.getItem(key) || localStorage.getItem(key) === 'undefined') return;
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  removeStoredItem(key: string) {
    localStorage.removeItem(key);
  }
}
