import { TestBed } from '@angular/core/testing';

import { SpecificationSettingsService } from './specification-settings.service';

describe('SpecificationSettingsService', () => {
  let service: SpecificationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
