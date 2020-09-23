import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AccordionTableComponent} from './accordion-table/accordion-table.component';
import {MessageBarComponent} from './message-bar/message-bar.component';
import {PaginationComponent} from './pagination/pagination.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

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
    AccordionTableComponent,
    PaginationComponent,
  ],
  declarations: [
    ToolbarComponent,
    MessageBarComponent,
    AccordionTableComponent,
    PaginationComponent
  ],
  entryComponents: []
})
export class WidgetsModule {
}
