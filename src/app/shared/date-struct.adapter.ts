import { Adapter } from './adapter';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateStructAdapter implements Adapter<NgbDateStruct> {

  adaptFrom(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  adaptTo(ngbDate: NgbDateStruct): Date {
    const jsDate = new Date(
      ngbDate.year ? ngbDate.year : new Date().getFullYear(),
      ngbDate.month ? ngbDate.month - 1 : new Date().getMonth() - 1,
      ngbDate.day ? ngbDate.day : new Date().getDate()
    );
    return jsDate;
  }
}
