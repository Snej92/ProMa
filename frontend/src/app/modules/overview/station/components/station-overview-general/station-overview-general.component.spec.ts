import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewGeneralComponent } from './station-overview-general.component';

describe('StationOverviewGeneralComponent', () => {
  let component: StationOverviewGeneralComponent;
  let fixture: ComponentFixture<StationOverviewGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
