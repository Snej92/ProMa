import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-three-state-button',
  templateUrl: './three-state-button.component.html',
  styleUrl: './three-state-button.component.scss'
})
export class ThreeStateButtonComponent {
  @Input() state: number = 1;
  @Output() stateChange = new EventEmitter<number>();

  toggleState() {
    if (this.state >= 3) {
      this.state = 1;
    } else {
      this.state += 1;
    }
    this.stateChange.emit(this.state);  // Send state
  }
}
