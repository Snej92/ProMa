import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {counterState} from "../store/counter.model";
import {Observable, Subscription} from "rxjs";
import {getcounter} from "../store/counter.selector";
import {AppStateModel} from "../../../core/store/appState.model";

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrl: './counter-display.component.scss'
})
export class CounterDisplayComponent implements OnInit, OnDestroy{
  constructor(private store: Store<AppStateModel>) {

  }

  counterDisplay!:number;
  counterSubscribe !:Subscription;
  counter$!:Observable<counterState>;


  ngOnInit(): void {
    this.counterSubscribe = this.store.select(getcounter).subscribe(data =>{
      this.counterDisplay = data;
      console.log('custom counter');
    });

    // this.counter$ = this.store.select('counter');
  }


  ngOnDestroy(): void {
    if(this.counterSubscribe){
      this.counterSubscribe.unsubscribe();
    }
  }
}
