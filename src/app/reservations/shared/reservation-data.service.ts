import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReservationTable } from 'src/app/model/reservation-table';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {

  private reservationSource = new BehaviorSubject(
    {
      reservation: null,
      key: ''
    }
  );
  currentReservation = this.reservationSource.asObservable();

  constructor() { }

  changeReservation(reservation: ReservationTable, key: string) {
    this.reservationSource.next({ reservation, key });
  }
}
