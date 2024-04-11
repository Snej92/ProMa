import { TestBed } from '@angular/core/testing';

import { UserAdministrationConnectorService } from './user-administration-connector.service';

describe('UserAdministrationConnectorService', () => {
  let service: UserAdministrationConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdministrationConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
