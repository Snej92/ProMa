import {Component, Input, signal} from '@angular/core';

export type MenuItem = {
  icon: string,
  label: string,
  route: string
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: "home",
      label: "Dashboard",
      route: "dashboard"
    },
    {
      // icon: "fact_check",
      icon: "checklist",
      label: "Übersicht",
      route: "overview"
    },
    {
      icon: "dashboard_customize",
      label: "Stationen",
      route: "station"
    },
    {
      icon: "settings",
      label: "Einstellungen",
      route: "settings"
    }
  ])
}
