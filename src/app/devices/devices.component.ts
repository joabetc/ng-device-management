import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { DeviceDataService } from './shared/device-data.service';
import { Device } from '../model/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  disableButtons = false;

  constructor(
    private deviceService: DeviceService,
    private deviceDataService: DeviceDataService) { }

  ngOnInit() { }

  onDomChange($event: Event): void {
    const element = $event.target as HTMLElement;
    if (element.classList.contains('show') || element.classList.contains('collapsing')) {
      this.disableButtons = true;
    } else {
      this.disableButtons = false;
    }
    console.log($event.target);
  }

  newDevice() {
    this.deviceDataService.changeDevice(new Device(), '');
  }

}
