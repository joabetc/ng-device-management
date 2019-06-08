import { DateStructAdapter } from './date-struct.adapter';

describe('DateStructAdapter', () => {
  it('should create an instance', () => {
    expect(new DateStructAdapter()).toBeTruthy();
  });

  it('should convert from Date object to NgbDateStruct', () => {
    const date = new Date();
    expect(new DateStructAdapter().adaptFrom(date)).toBeTruthy('instanceof NgbDateStruct');
  });

  it('should convert from NgbDateStruct object to Date', () => {
    const ngbDate = {
      year: 2019,
      month: 3,
      day: 1
    };
    expect(new DateStructAdapter().adaptTo(ngbDate)).toBeTruthy('instanceof Date');
  });
});
