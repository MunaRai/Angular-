import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidation {
  static MatchPassword(control: AbstractControl) {
    const password = control.get('userNewPassword').value;
    const userConfirmPassword = control.get('userConfirmPassword').value;
    if (password && userConfirmPassword && (password !== userConfirmPassword)) {
      control.get('userConfirmPassword').setErrors({ MatchPassword: true });
      control.get('userNewPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
