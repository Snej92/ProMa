import { TestBed } from '@angular/core/testing';

import { HeaderDataSettingsService } from './header-data-settings.service';

describe('HeaderDataSettingsService', () => {
  let service: HeaderDataSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderDataSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
