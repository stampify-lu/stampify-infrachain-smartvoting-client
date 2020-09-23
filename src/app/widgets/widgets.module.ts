import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MessageBarComponent} from './message-bar/message-bar.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    NgbModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [
    ToolbarComponent,
    MessageBarComponent,
  ],
  declarations: [
    ToolbarComponent,
    MessageBarComponent,
  ],
  entryComponents: []
})
export class WidgetsModule {
}
