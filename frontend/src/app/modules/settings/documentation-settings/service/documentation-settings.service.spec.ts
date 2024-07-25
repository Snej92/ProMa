import { TestBed } from '@angular/core/testing';

import { DocumentationSettingsService } from './documentation-settings.service';

describe('DocumentationSettingsService', () => {
  let service: DocumentationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
