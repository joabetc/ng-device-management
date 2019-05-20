import { Component, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/device.service';
import { DeviceDataService } from '../shared/device-data.service';
import { DeviceApiService } from 'src/app/device-api.service';
import { Brand } from 'src/app/model/brand';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError } from 'rxjs/operators';
import { ApiResult } from 'src/app/shared/model/api-result';
import { NgForm } from '@angular/forms';

export interface OperatingSystem {
  value: string;
  valueView: string;
}

@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  @ViewChild('deviceForm') deviceForm: NgForm;

  device: Device;
  key = '';
  operatingSystems: OperatingSystem[] = [
    { value: 'android', valueView: 'Android' },
    { value: 'ios', valueView: 'iOS'}
  ];

  brands: Brand[];
  modelSearching = false;
  modelSearchFailed = false;

  constructor(
    private deviceService: DeviceService,
    private deviceDataService: DeviceDataService,
    private deviceApiService: DeviceApiService) { }

  ngOnInit() {
    this.device = new Device();
    this.deviceApiService.getBrands().subscribe((data: ApiResult<Brand[]>) => {
      this.brands = data.data;
    });
    this.deviceDataService.currentDevice.subscribe(data => {
      this.device = new Device();
      if (data.device && data.key) {
        this.device.assetNumber = data.device.assetNumber;
        this.device.brand = data.device.brand;
        this.device.name = data.device.name;
        this.device.model = data.device.model;
        this.device.os = data.device.os;
        this.device.version = data.device.version;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.deviceService.update(this.device, this.key);
    } else {
      this.deviceService.insert(this.device);
    }

    this.reset();
  }

  searchBrand = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] :
        this.brands
            .filter((brand: Brand) => brand.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10)
            .map((brand: Brand) => brand.name)))

  searchModel = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.modelSearching = true),
      switchMap(term =>
        this.deviceApiService.getModels(this.device.brand, term).pipe(
          tap(() => this.modelSearchFailed = false),
          catchError(() => {
            this.modelSearchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.modelSearching = false)
    )

  formatter(value: Device | any) {
    if (value.model)
      return value.model;
    return value;
  } 

  cancel(): void {
    this.reset();
  }

  selectItem(event: any) {
    event.preventDefault();
    this.device.brand = (event.item.brand as string);
    this.device.os = (event.item.os as string).match(/\S*[\s,;]/)[0].trim().replace(',', '').replace(';', '').toLowerCase();
    this.device.version = (event.item.os as string).match(/\d+([\.][\d+]){0,3}(\s\(.*\))?/)[0].trim();
    this.device.model = event.item.model;
  }

  private reset() {
    this.device = new Device();
    this.key = '';
    this.deviceForm.reset();
  }
}
