import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getSpinnerState} from "../../modules/overview/lop/store/lop.selectors";
import {AppStateModel} from "../../core/store/appState.model";

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
    console.log(this.isLoading)
    this.store.select(getSpinnerState).subscribe(data=>{
      this.isLoading = data;
    });
  }
}
