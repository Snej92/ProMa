import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewLopComponent } from './station-overview-lop.component';

describe('StationOverviewLopComponent', () => {
  let component: StationOverviewLopComponent;
  let fixture: ComponentFixture<StationOverviewLopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewLopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
