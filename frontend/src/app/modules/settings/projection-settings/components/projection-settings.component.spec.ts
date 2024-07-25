import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionSettingsComponent } from './projection-settings.component';

describe('ProjectionSettingsComponent', () => {
  let component: ProjectionSettingsComponent;
  let fixture: ComponentFixture<ProjectionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectionSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
