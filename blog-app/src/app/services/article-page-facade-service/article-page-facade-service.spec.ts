import { TestBed } from '@angular/core/testing';

import { ArticlePageFacadeService } from './article-page-facade-service';

describe('ArticleDetailsFacadeService', () => {
  let service: ArticlePageFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlePageFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
