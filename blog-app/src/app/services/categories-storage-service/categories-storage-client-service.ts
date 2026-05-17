import { inject, Injectable } from '@angular/core';

import { type Observable, of } from 'rxjs';

import type { Category, CategoryRaw } from '../../models';
import { CATEGORIES_STORAGE_KEY } from '../../constants';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { CategoriesStorage } from './categories-storage-service.model';

@Injectable()
export class CategoriesStorageClientService implements CategoriesStorage {
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _storageKey = CATEGORIES_STORAGE_KEY;

  public getCategories(): Observable<Category[]> {
    return of(this.getCategoriesFromStorage());
  }

  public addCategory(value: CategoryRaw): Observable<Category[]> {
    const prepared: CategoryRaw = {
      name: value.name.trim(),
    };
    const nameLowerCase = prepared.name.toLowerCase();
    const categories = this.getCategoriesFromStorage();

    const exists = categories.some(
      (c) => c.name.toLowerCase() === nameLowerCase,
    );

    if (exists) {
      return of(categories);
    }

    const newCategory = this.createCategory(prepared);
    const updated = [...categories, newCategory];
    this.saveCategoriesToStorage(updated);

    return of(updated);
  }

  private createCategory(data: CategoryRaw): Category {
    return {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
  }

  private getCategoriesFromStorage(): Category[] {
    const values = this.engine.getItem(this._storageKey);
    return values ? JSON.parse(values) : [];
  }

  private saveCategoriesToStorage(values: Category[]): void {
    this.engine.setItem(this._storageKey, JSON.stringify(values));
  }
}
