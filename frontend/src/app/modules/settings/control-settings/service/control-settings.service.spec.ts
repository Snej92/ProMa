import { TestBed } from '@angular/core/testing';

import { ControlSettingsService } from './control-settings.service';

describe('ControlSettingsService', () => {
  let service: ControlSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
