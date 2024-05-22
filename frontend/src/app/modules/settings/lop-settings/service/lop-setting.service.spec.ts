import { TestBed } from '@angular/core/testing';

import { LopSettingService } from './lop-setting.service';

describe('LopSettingService', () => {
  let service: LopSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LopSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
