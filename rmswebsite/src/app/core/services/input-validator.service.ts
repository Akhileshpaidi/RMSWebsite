import { AbstractControl, ValidatorFn } from '@angular/forms';

export function inputLengthRangeValidator(
  minLength: number,
  maxLength: number
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputLength = control.value ? control.value.toString().length : 0;
    if (inputLength < minLength || inputLength > maxLength) {
      return { inputLengthRange: true };
    }
    return null;
  };
}
