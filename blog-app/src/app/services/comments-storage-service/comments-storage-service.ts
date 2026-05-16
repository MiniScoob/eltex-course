import { inject, Injectable } from '@angular/core';

import { of } from 'rxjs';

import type {
  Comment,
  CommentData,
  CommentsStorageData,
  Id,
  RatingAction,
} from '../../models';
import { COMMENTS_STORAGE_KEY } from '../../constants';
import { calculateRating } from '../../utils';
import { STORAGE_ENGINE_TOKEN } from '../storage-engine-service';
import type { CommentsStorage } from './comments-storage-service.model';

@Injectable()
export class CommentsStorageService implements CommentsStorage {
  private readonly engine = inject(STORAGE_ENGINE_TOKEN);

  private readonly _commentsStorageKey = COMMENTS_STORAGE_KEY;

  public getComments(id: Id) {
    return of(this.getCommentsByArticleId(id));
  }

  public addComment(data: CommentData) {
    const value = this.prepareComment(data);
    this.saveComment(value);

    return of(this.getCommentsByArticleId(data.articleId));
  }

  public updateCommentRating(articleId: Id, id: Id, action: RatingAction) {
    const comments = this.getCommentsByArticleId(articleId);

    if (!comments) {
      return of([]);
    }

    let value = comments.find((comment) => comment.id === id);

    if (!value) {
      return of([]);
    }

    const updated: Comment = {
      ...value,
      rating: calculateRating(value.rating, action),
    };
    this.saveComment(updated);

    return of(this.getCommentsByArticleId(articleId));
  }

  private prepareComment(value: CommentData): Comment {
    return {
      ...value,
      id: crypto.randomUUID(),
      rating: 0,
      createdAt: new Date().toISOString(),
    }
  }

  private saveComment(value: Comment) {
    const data = this.getAllCommentsFromStorage();
    const groupExists = data.some((d) => d.articleId === value.articleId);

    const updated = groupExists
      ? data.map((d) => {
        if (d.articleId !== value.articleId) {
          return d;
        }

        const commentExists = d.comments.some((c) => c.id === value.id);
        const comments = commentExists
          ? d.comments.map((c) => (c.id === value.id ? value : c))
          : [...d.comments, value];
        return { ...d, comments };
      })
      : [...data, { articleId: value.articleId, comments: [value] }];

    this.saveCommentsToStorage(updated);
  }

  private getCommentsByArticleId(id: Id): Comment[] {
    const values = this.getAllCommentsFromStorage();

    const data = values.find((v) => v.articleId === id);

    if (!data) {
      return [];
    }

    return data.comments.map((c) => ({ ...c, articleId: data.articleId }));
  }

  private getAllCommentsFromStorage(): CommentsStorageData[]  {
    const values = this.engine.getItem(this._commentsStorageKey);

    if (!values) {
      return [];
    }

    return JSON.parse(values);
  }

  private saveCommentsToStorage(values: CommentsStorageData[]) {
    this.engine.setItem(this._commentsStorageKey, JSON.stringify(values));
  }
}
