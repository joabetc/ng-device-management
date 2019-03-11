import { Component, OnInit, Input } from '@angular/core';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/device.service';
import { DeviceDataService } from '../shared/device-data.service';

export interface OperatingSystem {
  value: string;
  valueView: string
}

@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  device: Device;
  key: string = '';
  operatingSystems: OperatingSystem[] = [
    { value: 'android', valueView: 'Android' }, 
    { value: 'ios', valueView: 'iOS'}
  ];

  constructor(
    private deviceService: DeviceService, 
    private deviceDataService: DeviceDataService) { }

  ngOnInit() {
    this.device = new Device();
    this.deviceDataService.currentDevice.subscribe(data => {
      if (data.device && data.key) {
        this.device = new Device();
        this.device.name = data.device.name;
        this.device.model = data.device.model;
        this.device.os = data.device.os;
        this.key = data.key;
      }
    })
  }

  onSubmit() {
    if (this.key) {
      this.deviceService.update(this.device, this.key);
    } else {
      this.deviceService.insert(this.device);
    }

    this.device = new Device();
  }
}
