import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  disableButtons: boolean = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() { }

  onDomChange($event: Event): void {
    let element = $event.target as HTMLElement;
    if (element.classList.contains("show") || element.classList.contains("collapsing")) {
      this.disableButtons = true;
    } else {
      this.disableButtons = false;
    }
    console.log($event.target);
  }

}
