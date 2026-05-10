import { InjectionToken } from '@angular/core';

import type { Observable } from 'rxjs';

import type { Category, CategoryRaw } from '../../models';

export interface CategoriesStorage {
  getCategories(): Observable<Category[]>;
  addCategory(value: CategoryRaw): Observable<Category[]>;
}

export const CATEGORIES_STORAGE_TOKEN = new InjectionToken<CategoriesStorage>('CategoriesStorage')
