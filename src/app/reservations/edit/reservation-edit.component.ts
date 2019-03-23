import { Component, OnInit} from '@angular/core';
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

  reservation: Reservation;
  key: string = '';

  devices: DeviceWithId[];

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    private deviceService: DeviceService,
    private authService: AuthService
  ) { }

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
}
