import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewControlComponent } from './station-overview-control.component';

describe('StationOverviewControlComponent', () => {
  let component: StationOverviewControlComponent;
  let fixture: ComponentFixture<StationOverviewControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
