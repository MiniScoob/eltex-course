import { MONTHS_ENUM } from '../constants';
import {RatingAction} from '../models';

export const toDateString = (date: Date) =>
  `${date.getUTCDate()} ${MONTHS_ENUM[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

export const notEmptyFile = (value: unknown) =>
  value instanceof File && !!value.size;

export const calculateRating = (current: number, action: RatingAction) =>
  current + (action === 'up' ? 1 : -1);
