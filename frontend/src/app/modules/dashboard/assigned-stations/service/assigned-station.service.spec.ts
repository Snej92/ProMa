import { TestBed } from '@angular/core/testing';

import { AssignedStationService } from './assigned-station.service';

describe('AssignedStationService', () => {
  let service: AssignedStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
