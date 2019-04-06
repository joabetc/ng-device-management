import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResult } from './shared/model/api-result';
import { Observable } from 'rxjs';
import { Brand } from './model/brand';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

const BRAND_DATA = 'assets/data/brands.json';
const FONO_API_URL = 'https://fonoapi.freshpixl.com/v1/getdevice';
const PARAMS = new HttpParams({
  fromObject: {
    format: 'json',
    orign: '*'
  }
});

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  models: any[];

  constructor(private http: HttpClient) { }

  getBrands(): Observable<ApiResult<Brand[]>> {
    return this.http.get<ApiResult<Brand[]>>(BRAND_DATA);
  }

  getModels(brand: string, model: string) {
    return this.http.get(FONO_API_URL, {
      params: PARAMS
        .set('token', environment.fonoapi.token)
        .set('brand', brand)
        .set('device', model)
    }).pipe(
      map(response => Object.values(response).map(data => data.DeviceName))
    );
  }

}
