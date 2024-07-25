import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {stationViewModel} from "../../../station/store/stationView.model";

@Component({
  selector: 'app-station-overview',
  templateUrl: './station-overview.component.html',
  styleUrl: './station-overview.component.scss'
})
export class StationOverviewComponent implements OnInit, OnDestroy{

  // private subscriptions: Subscription[] = [];
  @Input() stationId!:number;
  @Input() stationViewInput!:stationViewModel;

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
