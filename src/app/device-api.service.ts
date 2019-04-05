import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BRAND_DATA = 'assets/data/brands.json';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get(BRAND_DATA);
  }
}
