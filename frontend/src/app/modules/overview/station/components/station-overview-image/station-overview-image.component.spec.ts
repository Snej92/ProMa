import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewImageComponent } from './station-overview-image.component';

describe('StationOverviewImageComponent', () => {
  let component: StationOverviewImageComponent;
  let fixture: ComponentFixture<StationOverviewImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
