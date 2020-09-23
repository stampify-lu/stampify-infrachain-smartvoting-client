import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './pages/admin/admin.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {UserComponent} from './pages/user/user.component';
import {SharedModule} from './shared/shared.module';
import {WidgetsModule} from './widgets/widgets.module';

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
    MatListModule
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
