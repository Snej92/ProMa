import { TestBed } from '@angular/core/testing';

import { StationViewOverviewService } from './station-view-overview.service';

describe('StationViewOverviewService', () => {
  let service: StationViewOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationViewOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
