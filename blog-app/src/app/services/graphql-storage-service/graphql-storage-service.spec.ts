import { TestBed } from '@angular/core/testing';

import { GraphqlStorage } from './graphql-storage-service';

describe('GraphqlStorage', () => {
  let service: GraphqlStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
