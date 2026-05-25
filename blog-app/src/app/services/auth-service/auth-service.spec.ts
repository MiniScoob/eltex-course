import { TestBed } from '@angular/core/testing';

import { AuthClientService } from './auth-client-service';

describe('AuthService', () => {
  let service: AuthClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
