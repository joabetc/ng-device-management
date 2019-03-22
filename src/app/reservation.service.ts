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
    this.db.list('reservation')
      .push(reservation)
      .then((result: any) => {
          this.messageService.addSuccess(`Reservation successfully created!`);
        })
      .catch((error: any) => {
        this.messageService.addError(`An unexpected error ocurrer while creating the reservation!`);
        console.error(error);
      });
  }

  update(reservation: Reservation, key: string) {
    this.db.list(`reservation/${key}`)
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
          return changes.map(c => ({key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`reservation/${key}`).remove();
  }
}
