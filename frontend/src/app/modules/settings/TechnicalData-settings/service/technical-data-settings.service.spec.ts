import { TestBed } from '@angular/core/testing';

import { TechnicalDataSettingsService } from './technical-data-settings.service';

describe('TechnicalDataSettingsService', () => {
  let service: TechnicalDataSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalDataSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
