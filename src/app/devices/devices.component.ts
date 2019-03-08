import { Component, OnInit, ViewChild } from '@angular/core';
import { DEVICES } from '../model/mock-devices';
import { Device } from '../model/device'
import { MatSort, MatTableDataSource } from '@angular/material';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }

  ngOnInit() { }

}
