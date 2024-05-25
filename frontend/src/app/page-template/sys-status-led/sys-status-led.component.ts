import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sys-status-led',
  templateUrl: './sys-status-led.component.html',
  styleUrl: './sys-status-led.component.scss'
})
export class SysStatusLedComponent {
  @Input() status: boolean = false; //Default status

  get statusClass(): string{
    if (this.status){
      return 'led on'
    } else{
      return `led off`
    }
  }
}
