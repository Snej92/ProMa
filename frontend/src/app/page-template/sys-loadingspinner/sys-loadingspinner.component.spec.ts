import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysLoadingspinnerComponent } from './sys-loadingspinner.component';

describe('SysLoadingspinnerComponent', () => {
  let component: SysLoadingspinnerComponent;
  let fixture: ComponentFixture<SysLoadingspinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysLoadingspinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysLoadingspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
