import { TestBed } from '@angular/core/testing';

import { ArticlesStorageClientService } from './articles-storage-client-service';

describe('DataService', () => {
  let service: ArticlesStorageClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesStorageClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
