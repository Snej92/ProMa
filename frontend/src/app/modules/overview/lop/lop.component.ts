import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {lop} from "./store/lop.model";
import {getLopInfo} from "./store/lop.selectors";
import {loadLop} from "./store/lop.actions";
import {loadSpinner} from "../../../core/store/app.action";

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrl: './lop.component.scss'
})
export class LopComponent implements OnInit{

  lop !: lop;
  displayedColumns: string[] = ['Aufnahme', 'LOP', 'Status', 'Erledigt', 'Benutzer']

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadLop())
    this.store.select(getLopInfo).subscribe(data=>{
      this.lop=data;
    })
  }
}
