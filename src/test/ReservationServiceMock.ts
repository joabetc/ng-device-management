import { Reservation } from 'src/app/model/reservation';
import { of } from 'rxjs';

export class ReservationServiceMock {

  insert(reservation: Reservation) { }

  update(reservation: Reservation, key: string) { }

  getAll() {
    return of([]);
  }

  delete() { }
}