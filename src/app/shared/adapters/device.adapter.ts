import { Adapter } from '../adapter';
import { Device } from '../../model/device';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceAdapter implements Adapter<Device> {

  adaptFrom(item: any): Device {
    const device = new Device();
    device.assetNumber = item.assetNumber;
    device.brand = item.brand;
    device.model = item.model;
    device.name = item.name;
    device.os = item.os;
    device.version = item.version;
    return device;
  }

  adaptTo(device: Device): any {
    return {
      assetNumber: device.assetNumber,
      brand: device.brand,
      model: device.model,
      name: device.name,
      os: device.os,
      version: device.version
    };
  }
}
