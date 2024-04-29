import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {customIncrement} from "../store/counter.actions";
import {counterState} from "../store/counter.model";
import {MatLabel} from "@angular/material/form-field";
import {Subscription} from "rxjs";
import {getcountername} from "../store/counter.selector";

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent implements OnInit {

  constructor(private store: Store<{ counter: counterState }>) {
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
