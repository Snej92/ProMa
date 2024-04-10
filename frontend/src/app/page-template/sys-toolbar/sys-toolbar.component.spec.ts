import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysToolbarComponent } from './sys-toolbar.component';

describe('SysToolbarComponent', () => {
  let component: SysToolbarComponent;
  let fixture: ComponentFixture<SysToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
