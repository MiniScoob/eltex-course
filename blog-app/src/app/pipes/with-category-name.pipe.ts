import { Pipe, type PipeTransform } from '@angular/core';

import type { Category, Id } from '../models';
import {buildCategoryMap, enrichWithCategory} from '../utils';

@Pipe({
  name: 'withCategoryName',
  standalone: true,
})
export class WithCategoryNamePipe implements PipeTransform {
  public transform<T extends { categoryId: Id }>(
    value: T,
    categories: Category[]
  ): T & { categoryName: string | null };

  public transform<T extends { categoryId: Id }>(
    value: T[],
    categories: Category[]
  ): (T & { categoryName: string | null })[];

  public transform<T extends { categoryId: Id }>(
    value: T | T[],
    categories: Category[]
  ): (T & { categoryName: string | null }) | (T & { categoryName: string | null })[] {
    const map = buildCategoryMap(categories);
    return Array.isArray(value)
      ? value.map(item => enrichWithCategory(item, map))
      : enrichWithCategory(value, map);
  }
}
