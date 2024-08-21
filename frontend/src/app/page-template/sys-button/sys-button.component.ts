import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'app-sys-button',
  templateUrl: './sys-button.component.html',
  styleUrl: './sys-button.component.scss'
})
export class SysButtonComponent {

  @Input() color = 'primary';
  @Input() tooltip = '';
  @Input() icon:string | undefined;
  @Input() disabled: boolean = false;

}
