import { Injectable } from '@angular/core';
import { Device } from 'src/app/model/device';
import { of } from 'rxjs';

@Injectable()
export class DeviceServiceMock {

  insert(device: Device) { }

  update(device: Device, key: string) { }

  getAll() {
    return of([]);
  }

  delete(key: string) { }

  isAssetNumberTaken(assetNumber: number) {
    return of(true);
  }
}
