import {Component, Input} from '@angular/core';
import {stationViewModel} from "../../store/station.model";

@Component({
  selector: 'app-station-card',
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.scss'
})
export class StationCardComponent {
  @Input() stationView: stationViewModel | undefined;
}
