import { TestBed } from '@angular/core/testing';

import { ArticleEventSubscriberService } from './article-event-subscriber-service';

describe('ArticleEventService', () => {
  let service: ArticleEventSubscriberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleEventSubscriberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
