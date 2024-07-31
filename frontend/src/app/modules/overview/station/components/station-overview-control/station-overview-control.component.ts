import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewOverview} from "../../store/stationViewOverview.model";

@Component({
  selector: 'app-station-overview-control',
  templateUrl: './station-overview-control.component.html',
  styleUrl: './station-overview-control.component.scss'
})
export class StationOverviewControlComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewOverview;
  @Input() favorite:boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
