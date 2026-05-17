import { TestBed } from '@angular/core/testing';

import { CategoriesStorageClientService } from './categories-storage-client-service';

describe('CategoriesStorageService', () => {
  let service: CategoriesStorageClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesStorageClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
