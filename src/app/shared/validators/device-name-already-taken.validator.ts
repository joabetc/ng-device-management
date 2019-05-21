import { AsyncValidator, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { DeviceService } from 'src/app/device.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[deviceNameAlreadyTaken][ngModel],[deviceNameAlreadyTaken][ngControl],[deviceNameAlreadyTaken][ngFormControl]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: DeviceNameAlreadyTakenValidator,
    multi: true
  }]
})
export class DeviceNameAlreadyTakenValidator implements AsyncValidator {

  @Input('deviceNameAlreadyTaken') deviceNameAlreadyTaken: boolean;

  constructor(private deviceService: DeviceService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (this.deviceNameAlreadyTaken) {
      return new Observable<{ uniqueName: false }>();
    } else {
      return this.deviceService.isNameTaken(control.value).pipe(
        map(isTaken => (isTaken ? { uniqueName: true} : null)),
        catchError(() => null)
      );
    }
  }
}