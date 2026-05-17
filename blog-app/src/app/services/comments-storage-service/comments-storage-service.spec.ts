import { TestBed } from '@angular/core/testing';

import { CommentsStorageClientService } from './comments-storage-client-service';

describe('CommentsStorageService', () => {
  let service: CommentsStorageClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsStorageClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
