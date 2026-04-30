import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import type { BlogArticleData, Id } from '../../models';

export type ArticlesStorageResult = {
  articles: BlogArticleData[];
  total: number;
  totalPages: number;
};

export interface ArticlesStorage {
  addArticle: (value: BlogArticleData, page: number) => Observable<ArticlesStorageResult>;
  deleteArticle: (id: Id, page: number) => Observable<ArticlesStorageResult>;
  updateArticle: (value: BlogArticleData, page: number) => Observable<ArticlesStorageResult>;
  getArticles: (page: number) => Observable<ArticlesStorageResult>;
}

export const ARTICLES_STORAGE_TOKEN = new InjectionToken<ArticlesStorage>('ArticlesStorage');
