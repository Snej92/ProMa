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
      icon: "dashboard",
      label: "Dashboard",
      route: "dashboard"
    },
    {
      icon: "fact_check",
      label: "Übersicht",
      route: "overview"
    },
    {
      icon: "update",
      label: "Version",
      route: "version"
    },
    {
      icon: "dashboard_customize",
      label: "Stationen",
      route: "stations"
    },
    {
      icon: "settings",
      label: "Einstellungen",
      route: "settings"
    }
  ])
}
