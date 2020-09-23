
import { Component, ViewEncapsulation} from '@angular/core';
//import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/shared/api.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
  })

  export class HomeComponent  {
    constructor(public apiService: ApiService) {
        
    }
  }