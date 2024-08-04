import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy{
  selectedSetting!:number;
  loggedUser!:loggedUser;

  private subscriptions: Subscription[] = [];
  constructor(private store:Store<AppStateModel>) {
  }

  selectSetting(input:number){
    this.selectedSetting = input;
    localStorage.setItem('selectedSetting', String(this.selectedSetting));
  }

  ngOnInit(): void {
    this.selectedSetting = Number(localStorage.getItem('selectedSetting')) || 1; // Default to 1 if no value is found

    this.subscriptions.push(
      this.store.select(getLoggedUserInfo).pipe()
        .subscribe(data =>{
          this.loggedUser=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
