import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedStationWidgetComponent } from './assigned-station-widget.component';

describe('AssignedStationWidgetComponent', () => {
  let component: AssignedStationWidgetComponent;
  let fixture: ComponentFixture<AssignedStationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedStationWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedStationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
