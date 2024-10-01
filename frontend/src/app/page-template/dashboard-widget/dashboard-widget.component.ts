import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrl: './dashboard-widget.component.scss'
})
export class DashboardWidgetComponent {
  @Input() title : string = '';
  @Input() additionalTitle : string = '';

}
