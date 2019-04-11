import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationDataService } from '../shared/reservation-data.service';
import { DeviceService } from 'src/app/device.service';
import { DeviceWithId } from 'src/app/model/device-with-id';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Reservation } from 'src/app/model/reservation';
import { DateRange } from 'src/app/shared/model/date-range';
import { ReservationTable } from 'src/app/model/reservation-table';
import { DateStructAdapter } from 'src/app/shared/date-struct.adapter';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnInit {

  @Input() reservations: ReservationTable[];

  @ViewChild('reservationForm') reservationForm: NgForm;

  disabledDates: DateRange[] = [];
  reservation: Reservation = new Reservation();
  key = '';

  devices: DeviceWithId[];

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    private deviceService: DeviceService,
    private authService: AuthService,
    private dateAdapter: DateStructAdapter
  ) { }

  ngOnInit() {
    this.deviceService.getAll().subscribe(devices => {
      this.devices = devices as DeviceWithId[];
    });
    this.reservationDataService.currentReservation.subscribe(data => {
      this.reservation = new Reservation();
      this.key = '';
      if (data.reservation && data.key) {
        this.reservation.deviceId = data.reservation.deviceId;
        this.reservation.deviceName = data.reservation.deviceName;
        this.reservation.userId = data.reservation.userId;
        this.reservation.userName = data.reservation.userName;
        this.reservation.startDate = data.reservation.startDate;
        this.reservation.endDate = data.reservation.endDate;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.reservationService.update(this.reservation, this.key);
    } else {
      this.reservation.userId = this.authService.getCurrentUser().uid;
      this.reservation.userName = this.authService.getCurrentUser().displayName;
      this.reservationService.insert(this.reservation);
    }
  }

  onChange(newValue) {
    const foundDevices = this.devices.find(device => device.key === newValue);
    this.reservation.deviceName = foundDevices !== undefined ? foundDevices.name : '';
    this.updateDisabledDates(newValue);
  }

  updateDisabledDates(key) {
    this.disabledDates = this.reservations.filter(reservation => reservation.deviceId === key).map(reservation => {
      return {
        from: this.dateAdapter.adaptFrom(reservation.startDate),
        to: this.dateAdapter.adaptFrom(reservation.endDate)
      };
    });
  }

  cancel() {
    this.reservationForm.reset();
    this.reservation = new ReservationTable();
  }
}
