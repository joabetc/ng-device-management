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
    this.fromDate = this.dateAdapter.adaptFrom(this.from);
    this.toDate = this.dateAdapter.adaptFrom(this.to);
    this.dataPicker.navigateTo(this.fromDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.from) {
      this.fromDate = this.dateAdapter.adaptFrom(changes.from.currentValue);
    }

    if (changes.to) {
      this.toDate = this.dateAdapter.adaptFrom(changes.to.currentValue);
    }
  }

  onDateSelection(date: NgbDate) {
    const validFromDate = this.isDisabled(date) ? this.nextValidDate(date) : date;
    const validToDate = this.isDisabled(date) ? this.prevValidDate(date) : date;
    if (!this.fromDate && !this.toDate) {
      this.fromDate = validFromDate;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = validToDate;
      this.to = this.dateAdapter.adaptTo(this.toDate);
      this.toChange.emit(this.to);
    } else {
      this.toDate = null;
      this.fromDate = validFromDate;
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
      const toDate = new NgbDate(range.to.year, range.to.month, range.to.day);
      return (fromDate.equals(date) || fromDate.before(date)) && (toDate.equals(date) || toDate.after(date)) ? true : false;
    });
  }

  isWeekend(date: NgbDate) {
    return this.calendar.getWeekday(date) >= 6;
  }

  nextValidDate(date: NgbDate) {
    return this.getValidDate(date, 1);
  }

  prevValidDate(date: NgbDate) {
    return this.getValidDate(date, -1);
  }

  getValidDate(date: NgbDate, inc: number) {
    const iDate = this.dateAdapter.adaptTo(date);
    while (this.isDisabled(date)) {
      iDate.setDate(iDate.getDate() + inc);
      date = new NgbDate(iDate.getFullYear(), iDate.getMonth() + 1, iDate.getDate());
    }
    return NgbDate.from(this.dateAdapter.adaptFrom(iDate));
  }
}
