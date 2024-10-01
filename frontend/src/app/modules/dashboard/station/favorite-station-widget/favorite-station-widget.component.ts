import {Component, OnDestroy, OnInit} from '@angular/core';
import {loadSpinner} from "../../../../core/store/app.action";
import {loadStationViewFavorite} from "../store/station-favorite.actions";
import {getStationFavoriteViewInfo} from "../store/station-favorite.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {stationView} from "../../../station/store/stationView.model";

@Component({
  selector: 'app-favorite-station-widget',
  templateUrl: './favorite-station-widget.component.html',
  styleUrl: './favorite-station-widget.component.scss'
})
export class FavoriteStationWidgetComponent implements OnInit, OnDestroy{

  constructor(private store:Store<AppStateModel>) {
  }

  private subscriptions: Subscription[] = [];
  stationFavoriteView!:stationView;

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));

    //load favorite stations
    this.store.dispatch(loadStationViewFavorite());
    this.subscriptions.push(
      this.store.select(getStationFavoriteViewInfo).pipe()
        .subscribe(data =>{
          this.stationFavoriteView=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
