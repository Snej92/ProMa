import {Component, Input, OnInit, signal} from '@angular/core';
import {loggedUserModel} from "../../../core/logged-user/logged-user.state";
import {loggedUser} from "../../../core/logged-user/logged-user.model";

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
export class CustomSidenavComponent implements OnInit{

  @Input() loggedUser!:loggedUser;

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
      // icon: "insert_chart",
      icon: "table",
      // icon: "view_list",
      label: "Gesamtübersicht",
      route: "overall"
    },
    {
      // icon: "fact_check",
      icon: "checklist",
      label: "Übersicht",
      route: "overview"
    },
    {
      // icon: "dashboard_customize",
      icon: "add_business",
      label: "Stationen",
      route: "station"
    },
    {
      icon: "settings",
      label: "Einstellungen",
      route: "settings"
    }
  ])

  ngOnInit(): void {
    if(!this.loggedUser.user.roles.projectRole){
      this.menuItems = signal<MenuItem[]>([
        {
          icon: "home",
          label: "Dashboard",
          route: "dashboard"
        },
        {
          // icon: "insert_chart",
          icon: "table",
          label: "Gesamtübersicht",
          route: "overall"
        },
        {
          // icon: "fact_check",
          icon: "checklist",
          label: "Übersicht",
          route: "overview"
        },
        {
          // icon: "dashboard_customize",
          icon: "add_business",
          label: "Stationen",
          route: "station"
        }
      ])
    }
  }
}
