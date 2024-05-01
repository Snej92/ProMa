import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {lopModel} from "./store/lop.model";
import {getLop} from "./store/lop.selectors";
import {loadLop} from "./store/lop.actions";

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrl: './lop.component.scss'
})
export class LopComponent implements OnInit{

  lopList !: lopModel[];
  displayedColumns: string[] = ['Aufnahme', 'LOP', 'Status', 'Erledigt', 'Benutzer']

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadLop())
    this.store.select(getLop).subscribe(data=>{
      this.lopList=data;
      console.log(this.lopList)
    })
  }
}
