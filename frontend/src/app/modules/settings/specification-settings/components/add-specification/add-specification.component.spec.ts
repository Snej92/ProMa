import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecificationComponent } from './add-specification.component';

describe('AddSpecificationComponent', () => {
  let component: AddSpecificationComponent;
  let fixture: ComponentFixture<AddSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpecificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
