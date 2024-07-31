import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewModel} from "../../../../station/store/stationView.model";
import {stationViewOverview} from "../../store/stationViewOverview.model";

@Component({
  selector: 'app-station-overview-specification',
  templateUrl: './station-overview-specification.component.html',
  styleUrl: './station-overview-specification.component.scss'
})
export class StationOverviewSpecificationComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewOverview;
  @Input() favorite:boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
