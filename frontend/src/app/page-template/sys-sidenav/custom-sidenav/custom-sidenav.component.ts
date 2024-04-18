import {Component, signal} from '@angular/core';

export type MenuItem = {
  icon: String,
  label: String,
  route: String
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  menuItems = signal<MenuItem[]>([
    {
      icon: "dashboard",
      label: "Dashboard",
      route: "home"
    },
    {
      icon: "video_library",
      label: "Content",
      route: "content"
    },
    {
      icon: "analytics",
      label: "Analytics",
      route: "analytics"
    },
    {
      icon: "comment",
      label: "Comments",
      route: "comments"
    }
  ])
}
