import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiService} from './api.service';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule
  ],
  exports: [],
  declarations: [],
  providers: [
    ApiService
  ],
  entryComponents: []
})
export class SharedModule {
}
