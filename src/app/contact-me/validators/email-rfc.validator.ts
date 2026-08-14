import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { validateEmailSyntax } from './email-rfc.rules';

@Directive({
  selector: '[appEmailRfc]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailRfcValidatorDirective),
      multi: true,
    },
  ],
})
export class EmailRfcValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }
    const result = validateEmailSyntax(value);
    return result.valid ? null : { emailRfc: true };
  }
}
