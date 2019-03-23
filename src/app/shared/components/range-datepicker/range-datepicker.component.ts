import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbDatepicker, NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss']
})
export class RangeDatepickerComponent implements OnInit {

  @ViewChild('dp') dataPicker: NgbDatepicker;

  @Input() from: Date;
  @Output() fromChange = new EventEmitter<Date>();

  @Input() to: Date;
  @Output() toChange = new EventEmitter<Date>();

  hoveredDate: NgbDate;
  minDate: NgbDate;
  disabledDates: NgbDateStruct[] = [];

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.minDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.dataPicker.navigateTo(this.fromDate);
  }

  toNativeDate(date: NgbDate): Date {
    return new Date(
      date.year,
      date.month - 1,
      date.day
    );
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.from = this.toNativeDate(this.fromDate);
    this.fromChange.emit(this.from);
    this.to = this.toNativeDate(this.toDate);
    this.toChange.emit(this.to);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  isDisable(date: NgbDateStruct, current: {month: number, year: number}) {
    return this.disabledDates.find(d => new NgbDate(d.year, d.month, d.day).equals(date)) ? true : false;
  }

}
