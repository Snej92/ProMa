import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewSpecificationComponent } from './station-overview-specification.component';

describe('StationOverviewSpecificationComponent', () => {
  let component: StationOverviewSpecificationComponent;
  let fixture: ComponentFixture<StationOverviewSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewSpecificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
