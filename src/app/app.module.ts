import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {UserComponent} from './pages/user/user.component';
import {HomeComponent} from './pages/home/home.component';
import {SharedModule} from './shared/shared.module';
import {WidgetsModule} from './widgets/widgets.module';
import {AdminComponent} from './pages/admin/admin.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,    
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    WidgetsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatNativeDateModule, 
    MatInputModule,
    DragDropModule,
    MatListModule,
  ],
  declarations: [
    AdminComponent,
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: []
})
export class AppModule {
}
