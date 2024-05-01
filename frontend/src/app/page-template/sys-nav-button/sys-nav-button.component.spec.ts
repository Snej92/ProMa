import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysNavButtonComponent } from './sys-nav-button.component';

describe('SysNavButtonComponent', () => {
  let component: SysNavButtonComponent;
  let fixture: ComponentFixture<SysNavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysNavButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysNavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
