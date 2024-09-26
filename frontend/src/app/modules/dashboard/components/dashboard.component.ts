import {Component, OnDestroy, OnInit} from '@angular/core';
import {projectView} from "../../project-administration/store/project-administration.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {loadSpinner} from "../../../core/store/app.action";
import {loadProjectViewFavorite} from "../project/store/project-favorite.actions";
import {getProjectFavoriteViewInfo} from "../project/store/project-favorite.selectors";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

  constructor(private store:Store<AppStateModel>) {
  }

  private subscriptions: Subscription[] = [];
  projectFavoriteView!:projectView;


  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadProjectViewFavorite());
    this.subscriptions.push(
      this.store.select(getProjectFavoriteViewInfo).pipe()
        .subscribe(data =>{
          this.projectFavoriteView=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
