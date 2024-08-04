import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewProjectionComponent } from './station-overview-projection.component';

describe('StationOverviewProjectionComponent', () => {
  let component: StationOverviewProjectionComponent;
  let fixture: ComponentFixture<StationOverviewProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewProjectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
