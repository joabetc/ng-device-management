import { Injectable } from '@angular/core';
import { Device } from './model/device';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private db: AngularFireDatabase) { }

  insert(device: Device) {
    this.db.list('device')
      .push(device)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(device: Device, key: string) {
    this.db.list('device')
      .update(key, device)
      .catch((error: any) => {
        console.error(error);
      })
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
}
