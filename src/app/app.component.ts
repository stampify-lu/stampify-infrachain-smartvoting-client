import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from './shared/api.service';
import {MessageBarComponent} from './widgets/message-bar/message-bar.component';
import {ToolbarComponent} from './widgets/toolbar/toolbar.component';

declare const window: Window & {initialQueryString: string[][]; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  root: Element;
  animationInserted = false;

  @ViewChild('toolbar', {static: false}) private toolbar: ToolbarComponent;
  @ViewChild('messageBar', {static: false}) private messageBar: MessageBarComponent;

  constructor(public apiService: ApiService) {
  }

  ngAfterViewInit() {
    this.apiService.toolbar = this.toolbar;
    this.apiService.messageBar = this.messageBar;
    this.root = document.getElementById('main-container').parentElement;
  }
}
