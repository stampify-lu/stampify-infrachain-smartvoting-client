import { Component,  ViewEncapsulation} from '@angular/core';
import {ApiService} from 'src/app/shared/api.service';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None
  })

  export class AdminComponent  {
    constructor(public apiService: ApiService) {

    }
  }