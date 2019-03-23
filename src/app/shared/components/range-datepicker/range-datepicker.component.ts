import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { NgbDatepicker, NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateStructAdapter } from '../../date-struct.adapter';

@Component({
  selector: 'range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss']
})
export class RangeDatepickerComponent implements OnInit, OnChanges {

  @ViewChild('dp') dataPicker: NgbDatepicker;

  @Input() from: Date;
  @Output() fromChange = new EventEmitter<Date>();

  @Input() to: Date;
  @Output() toChange = new EventEmitter<Date>();
  
  @Input() disabledDates: { from: NgbDateStruct, to: NgbDateStruct }[] = [];
  
  hoveredDate: NgbDate;
  minDate: NgbDate;
  
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(
    private calendar: NgbCalendar,
    private dateAdapter: DateStructAdapter) {
    this.minDate = calendar.getToday();
  }
  
  ngOnInit() {
    this.fromDate = this.fromNativeDate(this.from);
    this.toDate = this.fromNativeDate(this.to);
    this.dataPicker.navigateTo(this.fromDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.from) {
      this.fromDate = this.dateAdapter.adaptFrom(changes.from.currentValue);
    }

    if (changes.to) {
      this.toDate = this.fromNativeDate(changes.to.currentValue);
    }
  }

  toNativeDate(date: NgbDate): Date {
    return new Date(
      date.year,
      date.month - 1,
      date.day
    );
  }

  fromNativeDate(date: Date): NgbDate {
    const ngdDateStruct = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    }
    return NgbDate.from(ngdDateStruct);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.to = this.dateAdapter.adaptTo(this.toDate);
      this.toChange.emit(this.to);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.from = this.dateAdapter.adaptTo(this.fromDate);
    this.fromChange.emit(this.from);
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

  isDisabled(date: NgbDateStruct) {
    return this.disabledDates.find(range => {
      const fromDate = new NgbDate(range.from.year, range.from.month, range.from.day);
      const toDate = new NgbDate(range.from.year, range.from.month, range.from.day);
      return (fromDate.equals(date) || fromDate.before(date)) && (toDate.equals(date) || toDate.after(date)) ? true : false;
    });
  }

  isWeekend(date: NgbDate) {
    return this.calendar.getWeekday(date) >= 6;
  }
}
