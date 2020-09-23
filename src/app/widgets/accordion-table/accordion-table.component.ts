import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewEncapsulation} from '@angular/core';
import {UnsubscribingComponent } from '../../pages/unsubscribing.component';
import {ApiService} from '../../shared/api.service';
import {collapse, expand, toDict} from '../../shared/utils/utils';

@Component({
  selector: 'accordion-table',
  templateUrl: './accordion-table.component.html',
  styleUrls: ['./accordion-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionTableComponent extends UnsubscribingComponent implements OnChanges {

  @Output() onExpand = new EventEmitter();

  @Input() data = {
    idRowPrefix: '',
    titles: '',
    rows: <string[]>[],
    style: {
      leftIcon: true,
      leftImage: false,
      darkRows: true,
      accordionRows: false,
      sortableHeaders: <number[]>[],
      customFields: {}, // (index of a field for customFieldTemplate)
      emptyText: 'noContent',
      mobileFields: <number[]>[],
      headerTooltips: {}
    },
    sortFunction: <(index: number, order: number) => void>undefined
  };
  @Input() name: string;
  @Input() rowContent: TemplateRef<any>;
  @Input() customFieldTemplate: TemplateRef<any>;
  tableMobile: boolean[] = [];
  tableSortable: boolean[] = [];
  keys: string[] = [];
  values: string[] = [];

  constructor(public apiService: ApiService) {
    super();
  }

  ngOnChanges(c: SimpleChanges) {
    if (c.data && c.data.currentValue) {
      if (c.data.currentValue.onChange$) {
        c.data.currentValue.onChange$.subscribe(() => this.load(c.data.currentValue));
      } else {
        this.load(c.data.currentValue);
      }
    }
  }

  load(data: any) {
    const dict = toDict(this.apiService, data.titles);
    this.keys = dict.keys();
    this.values = dict.values();

    this.tableMobile = [data.style.mobileFields.indexOf(0) > -1].concat(this.values.map((_, i) =>
      data.style.mobileFields.indexOf(i + 1) > -1
    ));
    this.tableSortable = this.values.map((_, i) => data.style.sortableHeaders.indexOf(i) > -1);
  }

  toggleCollapse(index: any, skipCollapse = false) {
    const id = 'ac' + index, id2 = 'ar' + index;
    if (!this.data.style.accordionRows) return false;
    const content = document.querySelector('#' + this.name).querySelector('.' + id),
      all = document.querySelector('#' + this.name).querySelectorAll('.accordion-content'),
      row = document.querySelector('#' + this.name).querySelector('.' + id2),
      allRow = document.querySelector('#' + this.name).querySelectorAll('.accordion');
    if (content.className.match('collapse')) {
      for (let i = 0; i < all.length; i++) {
        if (!all[i].className.match('collapse')) {
          collapse(all[i]);
          all[i].className = all[i].className + ' collapse';
          allRow[i].className = allRow[i].className.replace(' active', '');
        }
      }
      expand(content);
      content.className = content.className.replace(' collapse', '');
      row.className = row.className + ' active';
      this.onExpand.emit({ expand: true, index: index });
    } else {
      if (!skipCollapse) {
        collapse(content);
        content.className = content.className + ' collapse';
        row.className = row.className.replace(' active', '');
        this.onExpand.emit({ expand: false, index: index });
      }
    }
  }

  titleClick(el: any, index: number) {
    if (this.data.style.sortableHeaders.indexOf(index) === -1) return;
    const all = document.getElementById(this.name).getElementsByClassName('sortable');
    if (this.data.style.leftImage || this.data.style.leftIcon) index = index + 1;
    if (this.data.style.sortableHeaders.length > 0) {
      if (el.className.match('sorted')) {
        el.className = el.className.replace(' sorted', '');
        if (this.data.sortFunction) {
          this.data.sortFunction(index, -1);
        } else {
          this.data.rows.sort((a, b) => {
            const sortB = this.cleanValues(b[index]);
            const sortA = this.cleanValues(a[index]);
            return (sortA < sortB) ? -1 : 1;
          });
          this.load(this.data);
        }
      } else {
        for (let i = 0; i < all.length; i++) {
          if (all[i].className.match('sorted')) {
            all[i].className = all[i].className.replace(' sorted', '');
          }
        }
        el.className = el.className + ' sorted';
        if (this.data.sortFunction) {
          this.data.sortFunction(index, 1);
        } else {
          this.data.rows.sort((a, b) => {
            const sortB = this.cleanValues(b[index]);
            const sortA = this.cleanValues(a[index]);
            return (sortA > sortB) ? -1 : 1;
          });
          this.load(this.data);
        }
      }
    }
  }

  cleanValues(val: any) {
    const reverseNumber = (n: string) => n.indexOf('.') >= 0 ? Number(n.replace(/,|\./g, '')) / Math.pow(10, (n.length - n.indexOf('.')) - 1) : Number(n.replace(/,|\./g, ''));
    if(typeof val === 'number') return val;
    if(!isNaN(new Date(val).getTime())) return new Date(val);
    if(val.indexOf(' ') > -1) val = val.split(' ')[0];
    if(val.match(/\,|\./g)) return reverseNumber(val) * 100;
    if(!isNaN(parseFloat(val))) return parseFloat(val) * 100;
    return val;
  }
}
