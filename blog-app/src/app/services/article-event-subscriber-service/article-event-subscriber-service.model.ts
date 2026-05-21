import type { ArticleEventType, Id } from '../../models';
import type { Observable } from 'rxjs';
import {InjectionToken} from '@angular/core';

type EventBasic = {
  payload: {
    articleId: string;
  };
};

type CommentCreatedEvent = EventBasic & {
  type: ArticleEventType.CommentCreated;
  payload: {
    commentId: string;
    content: string;
    username: string;
    createdAt: Date;
  };
};

type CommentRatingChangedEvent = EventBasic & {
  type: ArticleEventType.CommentRatingChanged;
  payload: {
    commentId: string;
    rating: number;
    prevRating: number;
  };
};

type ArticleRatingChangedEvent = EventBasic & {
  type: ArticleEventType.ArticleRatingChanged;
  payload: {
    rating: number;
    prevRating: number;
  };
};

export type ArticleEvent = CommentCreatedEvent | CommentRatingChangedEvent | ArticleRatingChangedEvent;

export type SubscribeData = {
  event: string;
  data: Id;
};

export interface ArticleEventSubscriber {
  subscribeToArticle(articleId: Id): Observable<unknown>;
  unsubscribeFromArticle(articleId: Id): void;
}

export const ARTICLE_EVENT_SUBSCRIBER_TOKEN = new InjectionToken<ArticleEventSubscriber>('ArticleEventSubscriber');
