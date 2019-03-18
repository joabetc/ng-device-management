import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MessagesService } from './shared/services/messages.service';
import { Reservation } from './model/reservation';
import { map } from 'rxjs/operators';
import { ReservationOwner } from './model/reservation-owner';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private db: AngularFireDatabase,
    private messageService: MessagesService
  ) { }

  insert(reservation: Reservation) {
    this.db.object(`reservation/${reservation.deviceId}`)
      .set(reservation.reservationOwner)
      .then((result: any) => {
        this.messageService.addSuccess(`Reservation successfully created!`);
      })
      .catch((error: any) => {
        this.messageService.addError(`An unexpected error ocurrer while creating the reservation!`);
        console.error(error);
      })
  }

  update(reservation: Reservation, key: string) {
    this.db.list('reservation')
      .update(key, reservation)
      .catch((error: any) => {
        this.messageService.addError(`An unexpected error ocurrer while updating the reservation!`);
        console.error(error);
      })
  }

  getAll() {
    return this.db.list('reservation')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const data = {...c.payload.val()};
            let reservationOwners = new Array<ReservationOwner>();
            Object.keys(data).map(d => {
              const reservationOwner = new ReservationOwner(d, data[d].startDate, data[d].endDate);
              reservationOwners.push(reservationOwner);
            });
            return new Reservation(c.payload.key, reservationOwners);
          });
        })
      )
  }

  delete(key: string) {
    this.db.object(`reservation/${key}`).remove();
  }
}
