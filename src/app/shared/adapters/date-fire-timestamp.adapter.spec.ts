import { DateFireTimestampAdapter } from "./date-fire-timestamp.adapter";
import { firestore } from 'firebase';

describe('DateFireTimestampAdapter', () => {
  it('should create an instance', () => {
    expect(new DateFireTimestampAdapter()).toBeTruthy();
  });

  it('should convert from Date to firestore.Timestamp', () => {
    const date = new Date();
    expect(new DateFireTimestampAdapter().adaptFrom(date)).toBeTruthy('instanceof firestore.Timestamp');
  });

  it('should convert from firestore.Timestamp to Date', () => {
    const timestamp = new firestore.Timestamp(1556593200, 0);
    expect(new DateFireTimestampAdapter().adaptTo(timestamp)).toBeTruthy('instanceof Date');
  });
});
