import { Adapter } from '../adapter';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFireTimestampAdapter implements Adapter<Timestamp> {

  adaptFrom(date: Date): Timestamp {
    return firestore.Timestamp.fromDate(date);
  }

  adaptTo(fireTimestamp: Timestamp): Date {
    const millisec = fireTimestamp.seconds * 1e3 + (fireTimestamp.nanoseconds || 0) / 1e6;
    return new Date(millisec)
  }
}