import { Adapter } from './adapter';
import { firestore } from 'firebase';
import { ReservationTable } from '../model/reservation-table';
import { DateFireTimestampAdapter } from './date-fire-timestamp.adpter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationTableFireAdapter implements Adapter<ReservationTable> {

  constructor(
    private dateFireTimestampAdapter: DateFireTimestampAdapter
  ) { }

  adaptFrom(item: any): ReservationTable {
    const reservationTable = new ReservationTable();
    reservationTable.key = item.key;
    reservationTable.deviceId = item.deviceId;
    reservationTable.userId = item.userId;
    reservationTable.startDate = this.dateFireTimestampAdapter.adaptTo(item.startDate);
    reservationTable.endDate = this.dateFireTimestampAdapter.adaptTo(item.endDate);
    return reservationTable;
  }

  adaptTo(reservationTable: ReservationTable): any {
    return {
      key: reservationTable.key,
      deviceId: reservationTable.deviceId,
      userId: reservationTable.userId,
      startDate: this.dateFireTimestampAdapter.adaptFrom(reservationTable.startDate),
      endDate: this.dateFireTimestampAdapter.adaptFrom(reservationTable.endDate)
    }
  }
}