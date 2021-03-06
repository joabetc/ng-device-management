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
import { DeviceAdapter } from 'src/app/shared/adapters/device.adapter';

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
  editMode = false;
  assetOldValue = 0;
  nameOldValue = '';
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
    private deviceApiService: DeviceApiService,
    private deviceAdapter: DeviceAdapter) { }

  ngOnInit() {
    this.device = new Device();
    this.deviceApiService.getBrands().subscribe((data: ApiResult<Brand[]>) => {
      this.brands = data.data;
    });
    this.deviceDataService.currentDevice.subscribe(data => {
      this.device = new Device();
      if (data.device && data.key) {
        this.device = this.deviceAdapter.adaptFrom(data.device);
        this.key = data.key;
        this.editMode = true;
        this.assetOldValue = this.device.assetNumber;
        this.nameOldValue = this.device.name;
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
    this.editMode = false;
    this.assetOldValue = 0;
    this.nameOldValue = '';
  }

  onAssetChange(searchValue: number ) {
    this.editMode = searchValue == this.assetOldValue;
  }

  onNameChange(value: string) {
    this.editMode = value == this.nameOldValue;
  }
}
