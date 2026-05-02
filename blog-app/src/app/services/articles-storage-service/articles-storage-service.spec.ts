import { TestBed } from '@angular/core/testing';

import { ArticlesStorageService } from './articles-storage-service';

describe('DataService', () => {
  let service: ArticlesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
