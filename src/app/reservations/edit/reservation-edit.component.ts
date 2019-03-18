import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationTable } from 'src/app/model/reservation-table';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationDataService } from '../shared/reservation-data.service';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DeviceService } from 'src/app/device.service';
import { DeviceWithId } from 'src/app/model/device-with-id';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss'],
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }]
})
export class ReservationEditComponent implements OnInit {
  @ViewChild('dp') dataPicker: NgbDatepicker;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  reservation: ReservationTable;
  key: string = '';

  devices: DeviceWithId[];

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    private calendar: NgbCalendar,
    private deviceService: DeviceService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.reservation = new ReservationTable('', '', new Date(), new Date());
    this.reservationDataService.currentReservation.subscribe(data => {
      if (data.reservation && data.key) {
        this.reservation = new ReservationTable(
          data.key,
          data.reservation.userId,
          data.reservation.startDate,
          data.reservation.endDate
        );
        this.key = data.key;
        
        const startDate = new Date(this.reservation.startDate);
        this.fromDate = NgbDate.from({
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate()
        });

        const endDate = new Date(this.reservation.endDate);
        this.toDate = NgbDate.from({
          year: endDate.getFullYear(),
          month: endDate.getMonth() + 1,
          day: endDate.getDate()
        });

        this.dataPicker.navigateTo(this.fromDate);
      }
    });
    this.deviceService.getAll().subscribe(devices => {
      this.devices = devices as DeviceWithId[];
    });
  }

  onSubmit() {
    if (this.key) {
      this.reservationService.update(
        ReservationTable.toReservation(this.reservation), this.key);
    } else {
      this.reservationService.insert(
        ReservationTable.toReservation(this.reservation));
    }
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
    this.reservation.startDate = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    this.reservation.endDate = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
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
}
