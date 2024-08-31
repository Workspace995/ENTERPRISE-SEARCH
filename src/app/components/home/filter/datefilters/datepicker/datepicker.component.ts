import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
  model: NgbDateStruct | null = null;
  @Output() onDatePicked = new EventEmitter<any>();
  @Input() fieldName: string = "datepicker";
  @Input() params: any = [];

  updateDate() {
    let key = this.fieldName;
    let value = this.formatDate(this.model);
    this.onDatePicked.emit({ key, value })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.params[this.fieldName])
      this.model = this.createDate(this.params[this.fieldName]);
    else
    this.model = null;
  }

  createDate(d: string): NgbDateStruct {
    var date = new Date(d);
    var ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear() };
    return ngbDateStruct;
  }

  formatDate(d: NgbDateStruct | null): string | null {
    if (d === null) {
      return null;
    }

    return [
      (d.day < 10 ? ('0' + d.day) : d.day),
      (d.month < 10 ? ('0' + d.month) : d.month),
      d.year
    ].reverse().join('/');
  }

  clear() {
    this.model = null;
    this.onDatePicked.emit({ key: this.fieldName, value: null })
  }
}
