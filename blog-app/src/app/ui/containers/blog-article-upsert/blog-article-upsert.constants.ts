import { Validators } from '@angular/forms';

import type { BlogArticleRaw } from '../../../models';
import type { FormConfig } from './blog-article-upsert.model';

export const COMMON_ERRORS = {
  required: () => 'Поле обязательно для заполнения',
  minlength: (err: { requiredLength: number; actualLength: number }) => `Минимум ${err.requiredLength} символов`
};

export const ERROR_PRIORITY: (keyof typeof COMMON_ERRORS)[] = [
  'required',
  'minlength',
];
