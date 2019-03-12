import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Device } from '../../model/device'
import { MatSort, MatTableDataSource } from '@angular/material';
import { DeviceService } from 'src/app/device.service';
import { DeviceDataService } from '../shared/device-data.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  @Input() disableButtons: boolean;

  displayedColumns: string[] = ['name', 'model', 'os', 'actions'];
  dataSource = new DeviceDataSource(this.deviceService);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private deviceService: DeviceService,
    private deviceDataService: DeviceDataService) { }

  ngOnInit() {
    //this.dataSource.sort = this.sort;
  }

  delete(key: string) {
    this.deviceService.delete(key);
  }

  edit(device: Device, key: string) {
    this.deviceDataService.changeDevice(device, key);
  }
}

export class DeviceDataSource extends DataSource<any> {
  constructor(private deviceService: DeviceService) {
    super();
  }

  connect(): Observable<any[]> {
    return this.deviceService.getAll();
  }
  disconnect() { }
}