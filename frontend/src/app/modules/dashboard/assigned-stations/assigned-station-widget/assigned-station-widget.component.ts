import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {stationView} from "../../../station/store/stationView.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {loadStationViewFavorite} from "../../station/store/station-favorite.actions";
import {getAssignedStationViewInfo} from "../store/assigned-station.selectors";
import {loadAssignedStationView} from "../store/assigned-station.actions";


@Component({
  selector: 'app-assigned-station-widget',
  templateUrl: './assigned-station-widget.component.html',
  styleUrl: './assigned-station-widget.component.scss'
})
export class AssignedStationWidgetComponent implements OnInit, OnDestroy{
  constructor(private store:Store<AppStateModel>) {
  }

  private subscriptions: Subscription[] = [];
  stationFavoriteView!:stationView;

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));

    //load favorite stations
    this.store.dispatch(loadAssignedStationView());
    this.subscriptions.push(
      this.store.select(getAssignedStationViewInfo).pipe()
        .subscribe(data =>{
          this.stationFavoriteView=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
