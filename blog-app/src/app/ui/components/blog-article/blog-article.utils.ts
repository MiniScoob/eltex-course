import { MONTHS_ENUM } from './blog-article.constants';

export const toDateString = (date: Date) =>
  `${date.getUTCDate()} ${MONTHS_ENUM[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

export const notEmptyFile = (value: unknown) =>
  value instanceof File && !!value.size;
