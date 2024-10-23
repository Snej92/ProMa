import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationOverviewNoteComponent } from './station-overview-note.component';

describe('StationOverviewNoteComponent', () => {
  let component: StationOverviewNoteComponent;
  let fixture: ComponentFixture<StationOverviewNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationOverviewNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationOverviewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
