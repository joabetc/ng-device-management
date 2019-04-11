import { Injectable } from '@angular/core';
import { Device } from './model/device';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { MessagesService } from './shared/services/messages.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private messagesServices: MessagesService) { }

  insert(device: Device) {
    this.db.list('device')
      .push(device)
      .then((result: any) => {
        this.messagesServices.addSuccess(`Device "${device.name}" sucessfully saved!`);
      })
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(device: Device, key: string) {
    this.db.list('device')
      .update(key, device)
      .catch((error: any) => {
        this.messagesServices.addError(`An unexpected error ocurred while updating "${device.name}"`);
        console.error(error);
      });
  }

  getAll() {
    return this.db.list('device')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`device/${key}`).remove();
  }

  isNameTaken(name: string) {
    return this.isValueTaken(name, 'name');
  }

  isAssetNumberTaken(assetNumber: number) {
    return this.isValueTaken(assetNumber, 'assetNumber');
  }

  private isValueTaken(value: any, field: string) {
    return this.db.list('device', ref => ref.orderByChild(field).equalTo(value))
    .valueChanges()
    .pipe(
      take(1),
      map(arr => arr.length ? { deviceNameAvailable: false } : null)
    );
  }
}
