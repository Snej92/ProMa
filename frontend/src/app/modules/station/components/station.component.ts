import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {stationView} from "../store/stationView.model";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {loadSpinner} from "../../../core/store/app.action";
import {loadStationView} from "../store/stationView.actions";
import {getStationViewInfo} from "../store/stationView.selectors";
import {activeProjectView} from "../../../core/active-project/active-project.model";
import {AddStationComponent} from "./add-station/add-station.component";

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
    this.openPopup(0, "Station Hinzufügen", false, "Hinzufügen")
  }

  openPopup(id:any, title:any, isEdit=false, button:any){
    this.dialog.open(AddStationComponent,{
      width:'30%',
      maxHeight: '70vh',
      data:{
        id:id,
        title: title,
        isEdit:isEdit,
        button:button
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
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
