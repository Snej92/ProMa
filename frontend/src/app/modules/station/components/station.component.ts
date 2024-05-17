import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationView} from "../store/station.model";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {loadSpinner} from "../../../core/store/app.action";
import {loadProjectView} from "../../project-administration/store/project-administration.actions";
import {getProjectViewInfo} from "../../project-administration/store/project-administration.selectors";
import {loadStationView} from "../store/station.actions";
import {getStationViewInfo} from "../store/station.selectors";
import {activeProjectView} from "../../../core/active-project/active-project.model";
import {loadActiveProjectView} from "../../../core/active-project/active-project.actions";
import {getActiveProjectViewInfo} from "../../../core/active-project/active-project.selector";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss'
})
export class StationComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  activeProjectView!:activeProjectView;
  stationView!:stationView;
  loggedUser!:loggedUser;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog) {
  }

  addStation(){

  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadActiveProjectView());
    this.subscriptions.push(
      this.store.select(getActiveProjectViewInfo).subscribe(data =>{
        this.activeProjectView=data;
      })
    );
    this.subscriptions.push(
      this.store.select(getLoggedUserInfo).pipe()
        .subscribe(data =>{
          this.loggedUser=data;
        })
    )
    this.store.dispatch(loadStationView())
    this.subscriptions.push(
      this.store.select(getStationViewInfo).pipe()
        .subscribe(data =>{
          this.stationView=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
