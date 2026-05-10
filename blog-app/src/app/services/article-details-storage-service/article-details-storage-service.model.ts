import { InjectionToken } from '@angular/core';

import type { Observable } from 'rxjs';

import type {
  ArticleDetails,
  Comment,
  CommentData,
  Id,
} from '../../models';

export interface ArticleDetailsStorage {
  getArticle(id: Id): Observable<ArticleDetails | null>;
  getComments(id: Id): Observable<Comment[]>;
  addComment(data: CommentData): Observable<Comment[]>;
  updateArticleRating(id: Id, step: number): Observable<ArticleDetails | null>;
  updateCommentRating(articleId: Id, id: Id, step: number): Observable<Comment[]>;
}

export const ARTICLE_DETAILS_STORAGE_TOKEN = new InjectionToken<ArticleDetailsStorage>('ArticleDetailsStorage');
