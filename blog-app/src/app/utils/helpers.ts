import type { Category, Id, RatingAction } from '../models';

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
