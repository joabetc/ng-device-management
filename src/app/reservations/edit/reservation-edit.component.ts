import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationTable } from 'src/app/model/reservation-table';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationDataService } from '../shared/reservation-data.service';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DeviceService } from 'src/app/device.service';
import { DeviceWithId } from 'src/app/model/device-with-id';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Reservation } from 'src/app/model/reservation';

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
  minDate: NgbDate;
  disabledDates: NgbDateStruct[] = [];

  fromDate: NgbDate;
  toDate: NgbDate;

  reservation: Reservation;
  key: string = '';

  devices: DeviceWithId[];

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    private calendar: NgbCalendar,
    private deviceService: DeviceService,
    private authService: AuthService
  ) {
    this.fromDate = calendar.getToday();
    this.minDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.reservation = new Reservation();
    this.reservationDataService.currentReservation.subscribe(data => {
      this.reservation = new Reservation();
      if (data.reservation && data.key) {
        this.reservation.deviceId = data.reservation.deviceId;
        this.reservation.userId = data.reservation.userId;
        this.reservation.startDate = new Date(data.reservation.startDate);
        this.reservation.endDate = new Date(data.reservation.endDate);
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
      this.reservationService.update(this.reservation, this.key);
    } else {
      this.reservation.userId = this.authService.getCurrentUser().uid;
      this.reservationService.insert(this.reservation);
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

  isDisable(date: NgbDateStruct, current: {month: number, year: number}) {
    return this.disabledDates.find(d => new NgbDate(d.year, d.month, d.day).equals(date)) ? true : false;
  }
}
