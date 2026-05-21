import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import type {
  ArticleDetails,
  Comment,
  CommentData,
  EnrichedArticleDetails,
  Id,
  RatingAction,
} from '../../models';

export type GetArticleResult = {
  article: EnrichedArticleDetails;
};

export type CreateCommentResult = {
  comment: Comment;
}

export type ArticleRatingChangeResult = {
  article: {
    rating: number;
  };
};

export type CommentRatingChangeResult = {
  comment: {
    rating: number;
  };
};

export interface GraphqlStorage {
  getArticleWithComments: (id: Id) => Observable<EnrichedArticleDetails | null>;
  addComment: (data: CommentData) => Observable<Comment | null>;
  updateArticleRating: (id: Id, action: RatingAction) => Observable<Partial<ArticleDetails> | null>;
  updateCommentRating: (id: Id, action: RatingAction) => Observable<Partial<Comment> | null>;
}

export const GRAPHQL_STORAGE_TOKEN = new InjectionToken<GraphqlStorage>('GraphqlStorage');
