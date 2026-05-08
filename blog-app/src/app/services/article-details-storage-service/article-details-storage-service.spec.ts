import { TestBed } from '@angular/core/testing';

import { ArticleDetailsStorageService } from './article-details-storage-service';

describe('ArticleDetailsStorageService', () => {
  let service: ArticleDetailsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleDetailsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
