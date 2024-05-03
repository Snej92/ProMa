import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../core/store/appState.model";
import {getSpinnerState} from "../../core/store/app.selector";

@Component({
  selector: 'app-sys-loadingspinner',
  templateUrl: './sys-loadingspinner.component.html',
  styleUrl: './sys-loadingspinner.component.scss'
})
export class SysLoadingspinnerComponent implements OnInit{

  isLoading= false;
  constructor(private store:Store<AppStateModel>) {
  }



  ngOnInit(): void {
    this.store.select(getSpinnerState).subscribe(data=>{
      this.isLoading = data;
    });
  }
}
