import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewOverview} from "../../store/stationViewOverview.model";

@Component({
  selector: 'app-station-overview-projection',
  templateUrl: './station-overview-projection.component.html',
  styleUrl: './station-overview-projection.component.scss'
})
export class StationOverviewProjectionComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewOverview;
  @Input() favorite:boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
