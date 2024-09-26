import { TestBed } from '@angular/core/testing';

import { StationFavoriteService } from './station-favorite.service';

describe('StationFavoriteService', () => {
  let service: StationFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
