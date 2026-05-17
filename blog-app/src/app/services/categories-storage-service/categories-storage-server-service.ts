import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, type Observable, of, switchMap } from 'rxjs';

import type { Category, CategoryRaw } from '../../models';
import type { CategoriesStorage } from './categories-storage-service.model';

@Injectable()
export class CategoriesStorageServerService implements CategoriesStorage {
  private httpClient = inject(HttpClient);

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('api/categories');
  }

  public addCategory(value: CategoryRaw): Observable<Category[]> {
    const prepared: CategoryRaw = {
      name: value.name.trim(),
    };
    const nameLowerCase = prepared.name.toLowerCase();

    return this.getCategories().pipe(
      switchMap((categories) => {
        const exists = categories.find(
          (c) => c.name.toLowerCase() === nameLowerCase,
        );

        if (exists) {
          return of(categories);
        }

        return this.httpClient
          .post<Category>('/api/categories', prepared)
          .pipe(
            map((newCategory) => [...categories, newCategory])
          );
      })
    );
  }
}
