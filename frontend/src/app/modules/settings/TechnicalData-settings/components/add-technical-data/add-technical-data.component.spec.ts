import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnicalDataComponent } from './add-technical-data.component';

describe('AddTechnicalDataComponent', () => {
  let component: AddTechnicalDataComponent;
  let fixture: ComponentFixture<AddTechnicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTechnicalDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTechnicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
