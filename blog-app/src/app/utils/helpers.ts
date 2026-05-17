import type { Category, Id, RatingAction } from '../models';
import { MONTHS_ENUM } from '../constants';

export const toDateString = (date: Date) =>
  `${date.getUTCDate()} ${MONTHS_ENUM[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

export const notEmptyFile = (value: unknown) =>
  value instanceof File && !!value.size;

export const calculateRating = (current: number, action: RatingAction) =>
  current + (action === 'up' ? 1 : -1);

export function buildCategoryMap(categories: Category[]): Map<Id, Category> {
  return new Map(categories.map(c => [c.id, c]));
}

export function enrichWithCategory<T extends { categoryId: Id }>(
  value: T,
  categoryMap: Map<Id, Category>
): T & { categoryName: string | null } {
  return { ...value, categoryName: categoryMap.get(value.categoryId)?.name ?? null };
}
