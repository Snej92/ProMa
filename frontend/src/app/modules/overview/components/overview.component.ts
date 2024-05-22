import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';
import {loadStationView} from "../../station/store/stationView.actions";
import {getStationViewInfo} from "../../station/store/stationView.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {stationView} from "../../station/store/stationView.model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  stationView!:stationView;

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadStationView())
    this.subscriptions.push(
      this.store.select(getStationViewInfo).pipe()
        .subscribe(data =>{
          this.stationView=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
