import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewModel} from "../../../../station/store/stationView.model";

@Component({
  selector: 'app-station-overview-documentation',
  templateUrl: './station-overview-documentation.component.html',
  styleUrl: './station-overview-documentation.component.scss'
})
export class StationOverviewDocumentationComponent implements OnInit, OnDestroy{
  @Input() stationViewInput!:stationViewModel;
  @Input() favorite:boolean = false;

  ngOnInit(): void {
    console.log("Init station overview general")
    console.log(this.stationViewInput)
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
