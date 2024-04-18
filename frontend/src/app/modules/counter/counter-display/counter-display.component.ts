import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {counterState} from "../store/counter.model";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrl: './counter-display.component.scss'
})
export class CounterDisplayComponent implements OnInit, OnDestroy{
  constructor(private store: Store<{ counter : counterState}>) {

  }

  // counterDisplay!:number;
  // counterName="";
  // counterSubscribe !:Subscription;
  counter$!:Observable<counterState>;


  ngOnInit(): void {
    // this.counterSubscribe = this.store.select('counter').subscribe(data =>{
    //   this.counterDisplay = data.counter;
    //   this.counterName = data.counterName;
    // })
    this.counter$ = this.store.select('counter');
  }


  ngOnDestroy(): void {
    // if(this.counterSubscribe){
    //   this.counterSubscribe.unsubscribe();
    // }
  }
}
