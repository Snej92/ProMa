import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadStationViewOverview} from "../store/stationViewOverview.actions";
import {getStationViewOverviewInfo} from "../store/stationViewOverview.selectors";
import {loadSpinner} from "../../../../core/store/app.action";
import {stationViewModel} from "../../../station/store/stationView.model";
import {stationViewOverview} from "../store/stationViewOverview.model";

@Component({
  selector: 'app-station-overview',
  templateUrl: './station-overview.component.html',
  styleUrl: './station-overview.component.scss'
})
export class StationOverviewComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  @Input() stationId!:number;
  @Input() stationViewInput!:stationViewModel;
  stationViewOverview!:stationViewOverview

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log("Init station overview")
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadStationViewOverview({id:this.stationId}))
    this.subscriptions.push(
      this.store.select(getStationViewOverviewInfo).pipe()
        .subscribe(data =>{
          this.stationViewOverview=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
