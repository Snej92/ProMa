import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-sys-toolbar',
  templateUrl: './sys-toolbar.component.html',
  styleUrl: './sys-toolbar.component.scss'
})
export class SysToolbarComponent {

  collapsed = signal(false);

}