import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.css']
})
export class SortbyComponent {
  @Input() total: any = {};
  @Input() queryParams: any;
  from: number = 0;
  to: number = 20;
  keywords: string[] = [];


  ngOnChanges(changes: SimpleChanges) {
    let page = this.queryParams?.page ? parseInt(this.queryParams.page) : 1;
    this.from = (page-1)*20;
    this.to = page*20 < this.total?.value ? page*20 : this.total?.value;
    this.keywords = this.queryParams?.q
  }
}
