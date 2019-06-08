import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from 'src/app/model/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {

  private deviceSource = new BehaviorSubject({ device: null, key: '' });
  currentDevice = this.deviceSource.asObservable();

  constructor() { }

  changeDevice(device: Device, key: string) {
    this.deviceSource.next({ device, key });
  }
}
