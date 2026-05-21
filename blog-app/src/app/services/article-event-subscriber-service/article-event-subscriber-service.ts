import { Injectable } from '@angular/core';

import { filter } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

import type { Id } from '../../models';
import type {
  ArticleEvent,
  ArticleEventSubscriber,
  SubscribeData,
} from './article-event-subscriber-service.model';
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
    );
  }

  unsubscribeFromArticle(id: Id): void {
    this.subject.next({
      event: UNSUBSCRIBE_EVENT_NAME,
      data: id,
    });
  }
}
