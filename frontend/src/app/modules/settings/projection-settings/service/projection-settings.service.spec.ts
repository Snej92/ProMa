import { TestBed } from '@angular/core/testing';

import { ProjectionSettingsService } from './projection-settings.service';

describe('ProjectionSettingsService', () => {
  let service: ProjectionSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectionSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
