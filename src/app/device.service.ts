import { Injectable } from '@angular/core';
import { Device } from './model/device';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { MessagesService } from './shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private db: AngularFireDatabase,
    private messagesServices: MessagesService) { }

  insert(device: Device) {
    this.db.list('device')
      .push(device)
      .then((result: any) => {
        this.messagesServices.addSuccess(`The device "${device.name}" was sucessfully saved!`);
      })
      .catch((error: any) => {
        this.messagesServices.addError(`An unexpected error ocurred while deleting "${device.name}"!`);
        console.log(error);
      });
  }

  update(device: Device, key: string) {
    this.db.list('device')
      .update(key, device)
      .then(() => {
        this.messagesServices.addSuccess(`The device "${device.name}" was successfully updated!`);
      })
      .catch((error: any) => {
        this.messagesServices.addError(`An unexpected error ocurred while updating "${device.name}"!`);
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
    this.db.object(`device/${key}`)
      .remove()
      .then(() => this.messagesServices.addSuccess('Device successfully removed!'))
      .catch((error: any) => {
        this.messagesServices.addError('An unexpected error ocurred while deleting the device!');
        console.error(error);
      });
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
