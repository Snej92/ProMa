import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSidenavComponent } from './sys-sidenav.component';

describe('SysSidenavComponent', () => {
  let component: SysSidenavComponent;
  let fixture: ComponentFixture<SysSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
