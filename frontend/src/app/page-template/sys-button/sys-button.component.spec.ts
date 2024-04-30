import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysButtonComponent } from './sys-button.component';

describe('SysButtonComponent', () => {
  let component: SysButtonComponent;
  let fixture: ComponentFixture<SysButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
