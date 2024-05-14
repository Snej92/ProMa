import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysConfirmationComponent } from './sys-confirmation.component';

describe('SysConfirmationComponent', () => {
  let component: SysConfirmationComponent;
  let fixture: ComponentFixture<SysConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
