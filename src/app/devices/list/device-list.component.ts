import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../model/device'
import { MatIconRegistry } from '@angular/material';
import { DeviceService } from 'src/app/device.service';
import { DeviceDataService } from '../shared/device-data.service';
import { DeviceWithId } from 'src/app/model/device-with-id';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  @Input() disableButtons: boolean;

  devices: DeviceWithId[];
  showButtons = false;

  constructor(
    private deviceService: DeviceService,
    private deviceDataService: DeviceDataService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthService) {
      this.authService.isAdmin().then(result => this.showButtons = result);
      iconRegistry.addSvgIcon(
        'android',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/img/android_robot.svg'));
      iconRegistry.addSvgIcon(
        'ios',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/img/apple_logo_black.svg'));
    }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this.deviceService.getAll().subscribe(res => {
      this.devices = res as DeviceWithId[];
    });
  }

  delete(key: string) {
    this.deviceService.delete(key);
  }

  edit(device: Device, key: string) {
    this.deviceDataService.changeDevice(device, key);
  }

  canChange(uid: string) {
    return this.showButtons;
  }

}