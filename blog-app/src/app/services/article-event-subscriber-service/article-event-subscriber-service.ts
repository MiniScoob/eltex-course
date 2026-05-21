import { Injectable } from '@angular/core';

import { catchError, EMPTY, filter, retry } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

import type { ArticleEvent, Id } from '../../models';
import type { ArticleEventSubscriber, SubscribeData } from './article-event-subscriber-service.model';
import { UNSUBSCRIBE_EVENT_NAME, SUBSCRIBE_EVENT_NAME } from './article-event-subscriber-service.constants';

@Injectable()
export class ArticleEventSubscriberService implements ArticleEventSubscriber {
  private readonly subject = webSocket<SubscribeData | ArticleEvent>('/websocket');

  public subscribeToArticle(id: Id) {
    this.subject.next({
      event: SUBSCRIBE_EVENT_NAME,
      data: id,
    });

    return this.subject.pipe(
      filter((event): event is ArticleEvent => 'type' in event),
      retry({ count: 3, delay: 2000 }),
      catchError(() => EMPTY),
    );
  }

  unsubscribeFromArticle(id: Id): void {
    this.subject.next({
      event: UNSUBSCRIBE_EVENT_NAME,
      data: id,
    });
  }
}
