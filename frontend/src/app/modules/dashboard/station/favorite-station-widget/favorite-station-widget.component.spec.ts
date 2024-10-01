import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStationWidgetComponent } from './favorite-station-widget.component';

describe('FavoriteStationWidgetComponent', () => {
  let component: FavoriteStationWidgetComponent;
  let fixture: ComponentFixture<FavoriteStationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteStationWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteStationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
