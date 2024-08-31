import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-multiselectdropdown',
  templateUrl: './multiselectdropdown.component.html',
  styleUrls: ['./multiselectdropdown.component.css']
})
export class MultiselectdropdownComponent {

  @Input() options: any[] = [];
  @Input() selected: any[] = [];
  @Output() onChange = new EventEmitter<any>();

  selectedItems: any[] = [];

  dropdownConfig: any = {
    displayFn: (item: any) => { return item.key; },
    height: "250px",
    search: true,
    searchOnKey: "key",
    searchPlaceholder: 'Search',
    enableSelectAll: true,
    selectAllLabel: 'Select all',
    clearOnSelection: false
  }

  valueUpdated($event: any) {
    console.log(this.selected)
    this.onChange.emit($event.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    let selectedArr: any[] = [];
    this.options.forEach(element => {
      if(changes['selected'].currentValue.findIndex((val: any) => element.key == val) >= 0)
        selectedArr.push(element);
    });
    this.selectedItems = selectedArr;
  }

}
