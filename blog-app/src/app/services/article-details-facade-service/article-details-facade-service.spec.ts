import { TestBed } from '@angular/core/testing';

import { ArticleDetailsFacadeService } from './article-details-facade-service';

describe('ArticleDetailsFacadeService', () => {
  let service: ArticleDetailsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleDetailsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
