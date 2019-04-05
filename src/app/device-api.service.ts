import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from './shared/model/api-result';
import { Observable } from 'rxjs';

const BRAND_DATA = 'assets/data/brands.json';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<ApiResult> {
    return this.http.get<ApiResult>(BRAND_DATA);
  }
}
