import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import type { BlogArticleData, Id } from '../../models';

export type StorageResult = {
  articles: BlogArticleData[];
  total: number;
  totalPages: number;
};

export interface DataStorage {
  addArticle: (value: BlogArticleData, page: number) => Observable<StorageResult>;
  deleteArticle: (id: Id, page: number) => Observable<StorageResult>;
  updateArticle: (value: BlogArticleData, page: number) => Observable<StorageResult>;
  getArticles: (page: number) => Observable<StorageResult>;
}

export const DATA_STORAGE_TOKEN = new InjectionToken<DataStorage>('DataStorage');
