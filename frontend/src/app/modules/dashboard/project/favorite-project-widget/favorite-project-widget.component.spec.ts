import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteProjectWidgetComponent } from './favorite-project-widget.component';

describe('FavoriteProjectWidgetComponent', () => {
  let component: FavoriteProjectWidgetComponent;
  let fixture: ComponentFixture<FavoriteProjectWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteProjectWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteProjectWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
