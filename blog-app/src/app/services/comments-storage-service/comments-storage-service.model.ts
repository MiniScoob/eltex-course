import { InjectionToken } from '@angular/core';

import type { Observable } from 'rxjs';

import type {
  Comment,
  CommentData,
  Id,
  RatingAction,
} from '../../models';

export interface CommentsStorage {
  getComments(id: Id): Observable<Comment[]>;
  addComment(data: CommentData): Observable<Comment[]>;
  updateCommentRating(articleId: Id, id: Id, action: RatingAction): Observable<Comment[]>;
}

export const COMMENT_STORAGE_TOKEN = new InjectionToken<CommentsStorage>('CommentsStorageService');
