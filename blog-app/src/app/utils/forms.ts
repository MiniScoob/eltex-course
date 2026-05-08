import { AbstractControl } from '@angular/forms';

import { COMMON_ERRORS } from '../constants';

export const isInvalid = (control: AbstractControl | null) => {
  return !!(control && control.invalid && control.touched);
};

export const getError = (control: AbstractControl | null) => {
  if (!control || !control.errors || !control.touched) {
    return [];
  }

  return Object.entries(control.errors)
    .map(([key, value]) => {
      const errorHandler = COMMON_ERRORS[key as keyof typeof COMMON_ERRORS];

      if (!errorHandler) {
        return null;
      }

      return errorHandler(value);
    })
    .filter(Boolean) as string[];
};
