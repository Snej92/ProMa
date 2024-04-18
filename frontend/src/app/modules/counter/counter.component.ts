import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {decrement, increment, rename, reset} from "./store/counter.actions";
import {counterState} from "./store/counter.model";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  constructor(private store: Store<{ counter : counterState}>) {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  rename(){
    this.store.dispatch(rename({counterName:"Test 1 2 3"}));
  }
}
