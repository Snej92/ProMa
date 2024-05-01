import {Component, OnInit} from '@angular/core';
import {lopModel} from "../../overview/lop/store/lop.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {loadLop} from "../../overview/lop/store/lop.actions";
import {getLop} from "../../overview/lop/store/lop.selectors";

@Component({
  selector: 'app-lop-settings',
  templateUrl: './lop-settings.component.html',
  styleUrl: './lop-settings.component.scss'
})
export class LopSettingsComponent implements OnInit{

  lopListSettings !: lopModel[];
  displayedColumns: string[] = ['Aktion','Aufnahme', 'LOP']

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadLop())
    this.store.select(getLop).subscribe(data=>{
      this.lopListSettings=data;
      console.log(this.lopListSettings)
    })
  }
}
