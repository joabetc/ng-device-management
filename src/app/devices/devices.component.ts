import { Component, OnInit, ViewChild } from '@angular/core';
import { DEVICES } from '../model/mock-devices';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource(DEVICES);

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
