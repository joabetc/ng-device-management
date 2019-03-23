import { Adapter } from './adapter';
import { Reservation } from '../model/reservation';
import { DateFireTimestampAdapter } from './date-fire-timestamp.adpter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationFireAdapter implements Adapter<Reservation> {

  constructor(
    private dateFiretimestampAdapter: DateFireTimestampAdapter
  ) { }

  adaptFrom(item: any): Reservation {
    const reservation = new Reservation();
    reservation.deviceId = item.deviceId;
    reservation.deviceName = item.deviceName;
    reservation.userId = item.userId;
    reservation.userName = item.userName;
    reservation.startDate = this.dateFiretimestampAdapter.adaptTo(item.startDate);
    reservation.endDate = this.dateFiretimestampAdapter.adaptTo(item.endDate);
    return reservation;
  }

  adaptTo(reservation: Reservation): any {
    return {
      deviceId: reservation.deviceId,
      deviceName: reservation.deviceName,
      userId: reservation.userId,
      userName: reservation.userName,
      startDate: this.dateFiretimestampAdapter.adaptFrom(reservation.startDate),
      endDate: this.dateFiretimestampAdapter.adaptFrom(reservation.endDate)
    }
  }
}