import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {customIncrement} from "../store/counter.actions";
import {counterState} from "../store/counter.model";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent {

  constructor(private store: Store<{ counter : counterState}>) {
  }


  counterInput!:number;
  actionType="add";
  increment(){
    this.store.dispatch(customIncrement({value: +this.counterInput, action: this.actionType}))
  }
}
