import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

  constructor(private store:Store<AppStateModel>) {
  }

  loggedUser!:loggedUser;

  private subscriptions: Subscription[] = [];

  //Widget-Array
  dashboardWidgets = [
    { name: 'favorite-projects', component: 'app-favorite-project-widget' },
    { name: 'favorite-stations', component: 'app-favorite-station-widget' },
    { name: 'assigned-stations', component: 'app-assigned-station-widget' }
  ];

  ngOnInit(): void {
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
