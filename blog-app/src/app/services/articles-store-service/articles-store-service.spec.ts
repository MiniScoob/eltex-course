import { TestBed } from '@angular/core/testing';

import { ArticlesStoreService } from './articles-store-service';

describe('StoreService', () => {
  let service: ArticlesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
