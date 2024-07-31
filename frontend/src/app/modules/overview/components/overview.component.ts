import {Component, computed, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {loadStationView} from "../../station/store/stationView.actions";
import {getStationViewInfo} from "../../station/store/stationView.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {stationView} from "../../station/store/stationView.model";
import {loadSpinner} from "../../../core/store/app.action";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  stationView!:stationView;

  selectedOverview!:number;

  constructor(private store:Store<AppStateModel>) {
  }

  selectOverview(input:number){
    this.selectedOverview = input;
    localStorage.setItem('selectedOverview', String(this.selectedOverview));
  }

  ngOnInit(): void {
    this.selectedOverview = Number(localStorage.getItem('selectedOverview')) || 1; // Default to 1 if no value is found

    this.store.dispatch(loadSpinner({isLoading:true}))
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
