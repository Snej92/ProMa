import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysStatusLedComponent } from './sys-status-led.component';

describe('SysStatusLedComponent', () => {
  let component: SysStatusLedComponent;
  let fixture: ComponentFixture<SysStatusLedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysStatusLedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysStatusLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
