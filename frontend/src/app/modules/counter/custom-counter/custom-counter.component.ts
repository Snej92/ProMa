import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {customIncrement} from "../store/counter.actions";
import {Subscription} from "rxjs";
import {getcountername} from "../store/counter.selector";
import {AppStateModel} from "../../../core/store/appState.model";

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent implements OnInit {

  constructor(private store: Store<AppStateModel>) {
  }

  counterName = "";
  counterSubscribe !: Subscription;

  counterInput!: number;
  actionType = "add";

  increment() {
    this.store.dispatch(customIncrement({value: +this.counterInput, action: this.actionType}))
  }

  ngOnInit(): void {
    this.counterSubscribe = this.store.select(getcountername).subscribe(data => {
      this.counterName = data;
      console.log('custom counter');
    });
  }
}
