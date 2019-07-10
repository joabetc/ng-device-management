import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { DeviceService } from 'src/app/device.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Directive, Input, forwardRef } from '@angular/core';

@Directive({
  selector: '[assetNumberAlreadyTaken][ngModel],[assetNumberAlreadyTaken][ngControl],[assetNumberAlreadyTaken][ngFormControl]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => AssetNumberAlreadyTakenValidator),
    multi: true
  }]
})
export class AssetNumberAlreadyTakenValidator implements AsyncValidator {

  @Input() assetNumberAlreadyTaken: boolean;

  constructor(private deviceService: DeviceService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (this.assetNumberAlreadyTaken) {
      return new Observable<{ uniqueName: false }>();
    } else {
      return this.deviceService.isAssetNumberTaken(control.value).pipe(
        map(isTaken => (isTaken ? { uniqueName: true } : null)),
        catchError(() => null)
      );
    }
  }
}
