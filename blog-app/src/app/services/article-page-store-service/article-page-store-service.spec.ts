import { TestBed } from '@angular/core/testing';

import { ArticlePageStoreService } from './article-page-store-service';

describe('ArticleDetailsStoreService', () => {
  let service: ArticlePageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlePageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
