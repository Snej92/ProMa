import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeaderDataComponent } from './add-header-data.component';

describe('AddHeaderDataComponent', () => {
  let component: AddHeaderDataComponent;
  let fixture: ComponentFixture<AddHeaderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHeaderDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHeaderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
