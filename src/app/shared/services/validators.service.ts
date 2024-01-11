import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor() {}

  dateValidator(control: AbstractControl): ValidationErrors | null {
    let today = new Date();
    if (new Date(control.value) > today) {
      return { 'GreaterThanToday': true };
    } else {
      return null
    }
  }
}
