import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSettingsComponent } from './documentation-settings.component';

describe('DocumentationSettingsComponent', () => {
  let component: DocumentationSettingsComponent;
  let fixture: ComponentFixture<DocumentationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
