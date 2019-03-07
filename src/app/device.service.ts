import { Injectable } from '@angular/core';
import { DEVICES } from './model/mock-devices';
import { Device } from './model/device';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  getDevices(): Observable<Device[]> {
    return of(DEVICES);
  }
}
