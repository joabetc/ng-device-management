import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationDataService } from '../shared/reservation-data.service';
import { DeviceService } from 'src/app/device.service';
import { DeviceWithId } from 'src/app/model/device-with-id';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Reservation } from 'src/app/model/reservation';

@Component({
  selector: 'reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnInit {

  reservation: Reservation = new Reservation();
  key: string = '';

  devices: DeviceWithId[];

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    private deviceService: DeviceService,
    private authService: AuthService
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
        this.reservation.userId = data.reservation.userId;
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
      this.reservationService.insert(this.reservation);
    }
  }
}
