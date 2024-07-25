import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDataSettingsComponent } from './header-data-settings.component';

describe('HeaderDataSettingsComponent', () => {
  let component: HeaderDataSettingsComponent;
  let fixture: ComponentFixture<HeaderDataSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderDataSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDataSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
