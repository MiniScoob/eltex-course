import { InjectionToken } from '@angular/core';

import type { Observable } from 'rxjs';

import type { ArticleEvent, Id } from '../../models';

export type SubscribeData = {
  event: string;
  data: Id;
};

export interface ArticleEventSubscriber {
  subscribeToArticle(articleId: Id): Observable<ArticleEvent>;
  unsubscribeFromArticle(articleId: Id): void;
  destroy(): void;
}

export const ARTICLE_EVENT_SUBSCRIBER_TOKEN = new InjectionToken<ArticleEventSubscriber>('ArticleEventSubscriber');
