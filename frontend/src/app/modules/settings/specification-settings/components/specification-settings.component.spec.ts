import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationSettingsComponent } from './specification-settings.component';

describe('SpecificationSettingsComponent', () => {
  let component: SpecificationSettingsComponent;
  let fixture: ComponentFixture<SpecificationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificationSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
