import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLopComponent } from './add-lop.component';

describe('AddLopComponent', () => {
  let component: AddLopComponent;
  let fixture: ComponentFixture<AddLopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
