import { TestBed } from '@angular/core/testing';

import { ProjectFavoriteService } from './project-favorite.service';

describe('ProjectFavoriteService', () => {
  let service: ProjectFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
