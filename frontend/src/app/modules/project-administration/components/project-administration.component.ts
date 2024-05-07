import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateModel} from "../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {projectView} from "./store/project-administration.model";
import {loadSpinner} from "../../../core/store/app.action";
import {loadProjectView} from "./store/project-administration.actions";
import {getProjectViewInfo} from "./store/project-administration.selectors";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {userModel, userRole} from "../../userAdministration/store/user-Administration.model";
import {updateLoggedUser} from "../../../core/logged-user/logged-user.actions";

@Component({
  selector: 'app-project-administration',
  templateUrl: './project-administration.component.html',
  styleUrl: './project-administration.component.scss'
})
export class ProjectAdministrationComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  projectView!:projectView;
  loggedUser!:loggedUser;

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadProjectView())
    this.subscriptions.push(
      this.store.select(getProjectViewInfo).pipe()
        .subscribe(data =>{
          this.projectView=data;
        })
    )
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
