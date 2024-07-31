import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewOverview} from "../../store/stationViewOverview.model";


@Component({
  selector: 'app-station-overview-general',
  templateUrl: './station-overview-general.component.html',
  styleUrl: './station-overview-general.component.scss'
})
export class StationOverviewGeneralComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewOverview;
  @Input() favorite:boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
