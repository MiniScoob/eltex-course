import { InjectionToken } from '@angular/core';

import type { Observable } from 'rxjs';

import type {
  ArticleData,
  ArticleDetails,
  ArticlePreview,
  Comment,
  Id,
  RatingAction,
} from '../../models';

export type ArticlesStorageResult = {
  articles: ArticlePreview[];
  total: number;
};

export interface ArticlesStorage {
  addArticle: (value: ArticleData, page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  deleteArticle: (id: Id, page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  updateArticle: (id: Id, value: ArticleData, page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  getArticles: (page: number, pageSize?: number) => Observable<ArticlesStorageResult>;
  getArticle: (id: Id) => Observable<ArticleDetails | null>;
  updateArticleRating: (id: Id, action: RatingAction) => Observable<ArticleDetails | null>;
  getAllComments: () => Observable<Comment[]>;
}

export const ARTICLES_STORAGE_TOKEN = new InjectionToken<ArticlesStorage>('ArticlesStorage');
