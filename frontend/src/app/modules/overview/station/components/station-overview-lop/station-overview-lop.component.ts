import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewOverview} from "../../store/stationViewOverview.model";

@Component({
  selector: 'app-station-overview-lop',
  templateUrl: './station-overview-lop.component.html',
  styleUrl: './station-overview-lop.component.scss'
})
export class StationOverviewLopComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewOverview;
  @Input() favorite:boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
