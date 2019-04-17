import { DeviceAdapter } from './device.adapter';
import { Device } from '../model/device';

describe('Device.Adapter', () => {
  it('should create an instance', () => {
    expect(new DeviceAdapter()).toBeTruthy();
  });

  it('should return an object of Device type', () => {
    const obj = {
      assetNumber: 12345,
      brand: 'Samsung',
      model: 'Samsung Galaxy S10',
      name: 'Teste',
      os: 'android'
    };
    expect(new DeviceAdapter().adaptFrom(obj)).toBeTruthy(jasmine.any(Device));
  });

  it('should return an object of Object type', () => {
    const device = new Device();
    device.assetNumber = 12345;
    device.brand = 'Samsung';
    device.model = 'Samsung Galaxy S10';
    device.name = 'Teste';
    device.os = 'android';
    expect(new DeviceAdapter().adaptTo(device)).toBeTruthy(jasmine.any(Object));
  });
});
