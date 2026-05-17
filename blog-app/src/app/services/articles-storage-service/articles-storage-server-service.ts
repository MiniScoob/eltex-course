import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, of, switchMap } from 'rxjs';

import type { ArticleData, Id, ArticleDetails, RatingAction, ArticlePreview } from '../../models';
import { ArticleServerRequestResult, ArticlesStorage } from './articles-storage-service.model';
import { LIMIT } from './articles-storage-service.constants';

@Injectable()
export class ArticlesStorageServerService implements ArticlesStorage {
  private httpClient = inject(HttpClient);

  public addArticle(value: ArticleData, page: number, limit?: number) {
    return this.httpClient
      .post('/api/articles', value)
      .pipe(
        switchMap(() => this.getArticlesFromServer(page, limit))
      );
  }

  public deleteArticle(id: Id, page: number, limit?: number) {
    return this.httpClient
      .delete(`/api/articles/${id}`)
      .pipe(
        switchMap(() => this.getArticlesFromServer(page, limit))
      );
  }

  public updateArticle(id: Id, value: ArticleData, page: number, limit?: number) {
    return this.httpClient
      .patch(`/api/articles/${id}`, value)
      .pipe(
        switchMap(() => this.getArticlesFromServer(page, limit))
      );
  }

  public getArticles(page: number, limit?: number) {
    return this.getArticlesFromServer(page, limit);
  };

  public getArticle(id: Id) {
    return this.httpClient
      .get<ArticleDetails>(`api/articles/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return of(null);
          }

          throw error;
        }),
      );
  }

  public updateArticleRating(id: Id, action: RatingAction) {
    return of(null);
  }

  public getAllComments() {
    return of([]);
  }

  private getArticlesFromServer(page: number, limit = LIMIT) {
    const params = this.prepareParams(page, limit);

    return this.httpClient
      .get<ArticleServerRequestResult>(`/api/articles?${params}`)
      .pipe(
        map(({ items, total }) => ({
          articles: items.map(this.getPreview),
          total,
        })),
      );
  }

  private prepareParams(page: number, limit?: number) {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (limit) {
      params.set('limit', limit.toString());
    }

    return params;
  }

  private getPreview(value: ArticleDetails): ArticlePreview {
    return {
      id: value.id,
      title: value.title,
      content: value.content,
      imgSrc: value.imgSrc,
      categoryId: value.categoryId,
      createdAt: value.createdAt,
    };
  }
}
