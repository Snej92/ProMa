import { TestBed } from '@angular/core/testing';

import { StationOverallViewService } from './station-overall-view.service';

describe('StationOverallViewService', () => {
  let service: StationOverallViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationOverallViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
