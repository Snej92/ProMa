import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {lop} from "./store/lop.model";
import {getLopInfo} from "./store/lop.selectors";
import {loadLop} from "./store/lop.actions";
import {loadSpinner} from "../../../core/store/app.action";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrl: './lop.component.scss'
})
export class LopComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  lop !: lop;
  displayedColumns: string[] = ['Aufnahme', 'LOP', 'Status', 'Erledigt', 'Benutzer'];
  lopStatus: string[] = ['ERLEDIGT', 'OFFEN', 'INARBEIT'];

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadLop())
    this.subscriptions.push(
      this.store.select(getLopInfo).pipe()
        .subscribe(data =>{
          this.lop=data;
        })
    )
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
