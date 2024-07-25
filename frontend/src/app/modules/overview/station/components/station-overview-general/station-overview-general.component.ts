import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewModel} from "../../../../station/store/stationView.model";

@Component({
  selector: 'app-station-overview-general',
  templateUrl: './station-overview-general.component.html',
  styleUrl: './station-overview-general.component.scss'
})
export class StationOverviewGeneralComponent implements OnInit, OnDestroy{
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
