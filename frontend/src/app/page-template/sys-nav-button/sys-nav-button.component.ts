import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sys-nav-button',
  templateUrl: './sys-nav-button.component.html',
  styleUrl: './sys-nav-button.component.scss'
})
export class SysNavButtonComponent {

  @Input() tooltip = '';
  @Input() text = '';
  @Input() selected : boolean = false;
}
