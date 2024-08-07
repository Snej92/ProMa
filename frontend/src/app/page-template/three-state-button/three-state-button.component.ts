import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-three-state-button',
  templateUrl: './three-state-button.component.html',
  styleUrl: './three-state-button.component.scss'
})
export class ThreeStateButtonComponent {
  private _state!: number;

  @Output() stateChange = new EventEmitter<number>();

  @Input()
  get state(): number {
    return this._state;
  }

  set state(value: number) {
    this._state = value;
    this.stateChange.emit(this._state);
  }

  toggleState() {
    if (this.state >= 3) {
      this.state = 1;
    } else {
      this.state += 1;
    }
  }
}
