import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewOverview} from "../../store/stationViewOverview.model";

@Component({
  selector: 'app-station-overview-documentation',
  templateUrl: './station-overview-documentation.component.html',
  styleUrl: './station-overview-documentation.component.scss'
})
export class StationOverviewDocumentationComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewOverview;
  @Input() favorite:boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
