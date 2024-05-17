import { TestBed } from '@angular/core/testing';

import { ProjectAdministrationService } from './project-administration.service';

describe('ProjectAdministrationService', () => {
  let service: ProjectAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
