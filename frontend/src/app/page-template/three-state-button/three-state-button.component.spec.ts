import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStateButtonComponent } from './three-state-button.component';

describe('ThreeStateButtonComponent', () => {
  let component: ThreeStateButtonComponent;
  let fixture: ComponentFixture<ThreeStateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeStateButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeStateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
