import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LopSettingsComponent } from './lop-settings.component';

describe('LopSettingsComponent', () => {
  let component: LopSettingsComponent;
  let fixture: ComponentFixture<LopSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LopSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LopSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
