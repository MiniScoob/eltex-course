import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import type { ArticleData, ArticlePreview, Comment, Id } from '../../models';

export type ArticlesStorageResult = {
  articles: ArticlePreview[];
  total: number;
};

export interface ArticlesStorage {
  addArticle: (value: ArticleData, page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  deleteArticle: (id: Id, page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  updateArticle: (id: Id, value: ArticleData, page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  getArticles: (page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  getAllComments: () => Observable<Comment[]>;
}

export const ARTICLES_STORAGE_TOKEN = new InjectionToken<ArticlesStorage>('ArticlesStorage');
