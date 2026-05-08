import { InjectionToken } from '@angular/core';

import type { Observable } from 'rxjs';

import type { ArticleDetails, Comment, Id } from '../../models';

export interface ArticleDetailsStorage {
  getArticle(id: Id): Observable<ArticleDetails | null>;
  addComment(articleId: Id, data: Comment): Observable<Comment[]>;
  updateArticleRating(id: Id, rating: number): Observable<ArticleDetails | null>;
  updateCommentRating(articleId: Id, id: Id, rating: number): Observable<Comment[]>;
}

export const ARTICLE_DETAILS_STORAGE_TOKEN = new InjectionToken<ArticleDetailsStorage>('ArticleDetailsStorage');
