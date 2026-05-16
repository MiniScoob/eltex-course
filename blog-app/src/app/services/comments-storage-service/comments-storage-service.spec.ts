import { TestBed } from '@angular/core/testing';

import { CommentsStorageService } from './comments-storage-service';

describe('CommentsStorageService', () => {
  let service: CommentsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
