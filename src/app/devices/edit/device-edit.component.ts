import { Component, OnInit, Input } from '@angular/core';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/device.service';
import { DeviceDataService } from '../shared/device-data.service';
import { DeviceApiService } from 'src/app/device-api.service';
import { Brand } from 'src/app/model/brand';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError } from 'rxjs/operators';
import { ApiResult } from 'src/app/shared/model/api-result';

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
        this.device.name = data.device.name;
        this.device.model = data.device.model;
        this.device.os = data.device.os;
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

    this.device = new Device();
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
        this.deviceApiService.getModels(this.device.brand.toLocaleLowerCase(), term).pipe(
          tap(() => this.modelSearchFailed = false),
          catchError(() => {
            this.modelSearchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.modelSearching = false)
    )
}
