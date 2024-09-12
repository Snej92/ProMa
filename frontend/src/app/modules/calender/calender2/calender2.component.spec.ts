import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calender2Component } from './calender2.component';

describe('Calender2Component', () => {
  let component: Calender2Component;
  let fixture: ComponentFixture<Calender2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calender2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calender2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
