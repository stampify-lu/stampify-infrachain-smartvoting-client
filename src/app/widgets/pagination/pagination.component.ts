import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() count: number = 1;
  @Input() offset: number = 1;
  @Input() itemCount: number = 1;
  @Input() action: (offset: number) => void;
  @Input() style: 'dark' | 'light';
  page = 0;
  pages: any = [];
  trim = false;
  trimPages: any = [];

  constructor() {
  }

  ngOnInit() {
    this.start();
  }

  ngOnChanges() {
    this.start();
  }

  start() {
    const pageCount = Math.ceil(this.count / this.itemCount);
    this.pages = new Array(pageCount);
    this.trim = pageCount > 10;
    this.trimPages = new Array(5).fill(1).map((_, i) => i);
  }

  next() {
    this.offset += this.itemCount;
    this.page = Math.floor(this.offset / this.itemCount);
    this.action(this.offset);
    if (this.page > 2) {
      this.trimPages = (this.page + 5) < this.pages.length
        ? Array(5).fill(1).map((_, i) => i + this.page - 2)
        : Array(5).fill(1).map((_, i) => i + this.pages.length - 5);
    }
  }

  prev() {
    this.offset -= this.itemCount;
    this.page = Math.floor(this.offset / this.itemCount);
    this.action(this.offset);
    if (this.page > 2) {
      this.trimPages = (this.page + 5) < this.pages.length
        ? Array(5).fill(1).map((_, i) => i + this.page - 2)
        : Array(5).fill(1).map((_, i) => i + this.pages.length - 5);
    } else {
      this.trimPages = new Array(5).fill(1).map((_, i) => i);
    }
  }

  openPage(num: number) {
    this.page = num;
    this.offset = num * this.itemCount;
    this.action(this.offset);
    if (this.page > 2) {
      this.trimPages = (this.page + 5) < this.pages.length
        ? Array(5).fill(1).map((_, i) => i + this.page - 2)
        : Array(5).fill(1).map((_, i) => i + this.pages.length - 5);
    } else {
      this.trimPages = new Array(5).fill(1).map((_, i) => i);
    }
  }

}
