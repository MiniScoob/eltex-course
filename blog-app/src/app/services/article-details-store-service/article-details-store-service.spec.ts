import { TestBed } from '@angular/core/testing';

import { ArticleDetailsStoreService } from './article-details-store-service';

describe('ArticleDetailsStoreService', () => {
  let service: ArticleDetailsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleDetailsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
