import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Device } from '../../model/device'
import { MatSort, MatTableDataSource } from '@angular/material';
import { DeviceService } from 'src/app/device.service';
import { DeviceDataService } from '../shared/device-data.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit, AfterViewInit {

  @Input() disableButtons: boolean;

  displayedColumns: string[] = ['name', 'model', 'os', 'actions'];
  dataSource = new MatTableDataSource<Device>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private deviceService: DeviceService,
    private deviceDataService: DeviceDataService) { }

  ngOnInit() {
    this.getAllDevices();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllDevices() {
    this.deviceService.getAll().subscribe(res => {
      this.dataSource.data = res as Device[];
    })
  }

  delete(key: string) {
    this.deviceService.delete(key);
  }

  edit(device: Device, key: string) {
    this.deviceDataService.changeDevice(device, key);
  }

}