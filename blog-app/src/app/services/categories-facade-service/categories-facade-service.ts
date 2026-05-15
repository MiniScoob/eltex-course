import { inject, Injectable, signal } from '@angular/core';

import { map, type Observable, of, tap } from 'rxjs';

import type { Category, Id } from '../../models';
import { CATEGORIES_STORAGE_TOKEN } from '../categories-storage-service';
import type { CategoriesFacade } from './categories-facade-service.model';

@Injectable()
export class CategoriesFacadeService implements CategoriesFacade {
  private storage = inject(CATEGORIES_STORAGE_TOKEN);

  private _categories = signal<Category[]>([]);
  public readonly categories = this._categories.asReadonly();

  public loadCategories(): void {
    this.storage.getCategories().subscribe((categories) => {
      this._categories.set(categories);
    });
  }

  public resolveCategory(name: string): Observable<Id> {
    const trimmed = name.trim();
    const existing = this._categories().find(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (existing) {
      return of(existing.id);
    }

    return this.storage.addCategory({ name: trimmed }).pipe(
      tap((categories) => this._categories.set(categories)),
      map((categories) => {
        const created = categories.find(
          (c) => c.name.toLowerCase() === trimmed.toLowerCase()
        );
        return created!.id;
      }),
    );
  }
}
