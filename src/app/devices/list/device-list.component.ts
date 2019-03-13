import { Component, OnInit, ViewChild, Input, AfterViewInit, HostListener } from '@angular/core';
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

  columnDefinitions = [
    { def: 'name', showMobile: true },
    { def: 'model', showMobile: false },
    { def: 'os', showMobile: true },
    { def: 'actions', showMobile: true }
  ]

  @ViewChild(MatSort) sort: MatSort;

  innerWidth: any;

  constructor(
    private deviceService: DeviceService,
    private deviceDataService: DeviceDataService) { }

  ngOnInit() {
    this.getAllDevices();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
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

  getDisplayedColumns(): string[] {
    const isMobile = this.innerWidth < 768;
    return this.columnDefinitions
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
  }

  showColumn(column: string): boolean {
    return this.getDisplayedColumns().includes(column);
  }
}