import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationViewModel} from "../../../../station/store/stationView.model";

@Component({
  selector: 'app-station-overview-lop',
  templateUrl: './station-overview-lop.component.html',
  styleUrl: './station-overview-lop.component.scss'
})
export class StationOverviewLopComponent implements OnInit, OnDestroy{
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
