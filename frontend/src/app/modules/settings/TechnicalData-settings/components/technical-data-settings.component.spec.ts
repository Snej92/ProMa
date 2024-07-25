import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDataSettingsComponent } from './technical-data-settings.component';

describe('TechnicalDataSettingsComponent', () => {
  let component: TechnicalDataSettingsComponent;
  let fixture: ComponentFixture<TechnicalDataSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicalDataSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnicalDataSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
