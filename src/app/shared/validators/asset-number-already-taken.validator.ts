import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { DeviceService } from 'src/app/device.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Directive } from '@angular/core';

@Directive({
  selector: '[assetNumberAlreadyTaken][ngModel],[assetNumberAlreadyTaken][ngControl],[assetNumberAlreadyTaken][ngFormControl]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: AssetNumberAlreadyTakenValidator,
    multi: true
  }]
})
export class AssetNumberAlreadyTakenValidator implements AsyncValidator {

  constructor(private deviceService: DeviceService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.deviceService.isAssetNumberTaken(control.value).pipe(
      map(isTaken => (isTaken ? { uniqueName: true } : null)),
      catchError(() => null)
    );
  }
}
