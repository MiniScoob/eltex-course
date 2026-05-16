import {InjectionToken, Signal} from '@angular/core';

import type { Observable } from 'rxjs';

import type { Category, Id } from '../../models';

export interface CategoriesFacade {
  categories: Signal<Category[]>;
  loadCategories: () => void;
  getCategoryById: (id: Id) => Category | null;
  resolveCategory: (name: string) => Observable<Id>;
}

export const CATEGORIES_FACADE_TOKEN = new InjectionToken<CategoriesFacade>('CategoriesFacade');
