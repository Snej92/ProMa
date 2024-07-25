import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewDocumentationComponent } from './station-overview-documentation.component';

describe('StationOverviewDocumentationComponent', () => {
  let component: StationOverviewDocumentationComponent;
  let fixture: ComponentFixture<StationOverviewDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewDocumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
