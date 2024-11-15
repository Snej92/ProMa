import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdministrationComponent } from './project-administration.component';

describe('ProjectAdministrationComponent', () => {
  let component: ProjectAdministrationComponent;
  let fixture: ComponentFixture<ProjectAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
