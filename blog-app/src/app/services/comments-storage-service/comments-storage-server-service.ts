import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map,
  type Observable,
  switchMap,
  throwError,
} from 'rxjs';

import type {
  Id,
  Comment,
  CommentData,
  RatingAction,
} from '../../models';
import { calculateRating } from '../../utils';
import type { CommentsStorage } from './comments-storage-service.model';

@Injectable()
export class CommentsStorageServerService implements CommentsStorage {
  private httpClient = inject(HttpClient);

  public getComments(id: Id) {
      return this.httpClient.get<Comment[]>(`/api/comments/article/${id}`);
  }

  public addComment(data: CommentData): Observable<Comment[]> {
      return this.httpClient
        .post(`/api/comments`, data)
        .pipe(
          switchMap(() => this.getComments(data.articleId)),
        );
  }

  public updateCommentRating(articleId: Id, id: Id, action: RatingAction): Observable<Comment[]> {
      return this.getCommentById(articleId, id).pipe(
        switchMap((comment) => {
          if (comment === null) {
            return throwError(() => new Error(`Comment ${id} not found`));
          }

          return this.httpClient
            .patch(
              `/api/comments/${id}/rating`,
              { rating: calculateRating(comment.rating, action) }
            )
            .pipe(
              switchMap(() => this.getComments(articleId)),
            );
        }),
      );
  }

  private getCommentById(articleId: Id, id: Id): Observable<Comment | null> {
    return this.getComments(articleId).pipe(
      map((comments) =>
        comments.find((c) => c.id === id) ?? null,
      ),
    );
  }
}
