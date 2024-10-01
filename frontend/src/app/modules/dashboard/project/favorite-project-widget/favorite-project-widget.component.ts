import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {loadSpinner} from "../../../../core/store/app.action";
import {loadProjectViewFavorite} from "../store/project-favorite.actions";
import {getProjectFavoriteViewInfo} from "../store/project-favorite.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {projectView} from "../../../project-administration/store/project-administration.model";
import {loggedUser} from "../../../../core/logged-user/logged-user.model";

@Component({
  selector: 'app-favorite-project-widget',
  templateUrl: './favorite-project-widget.component.html',
  styleUrl: './favorite-project-widget.component.scss'
})
export class FavoriteProjectWidgetComponent implements OnInit, OnDestroy{
  constructor(private store:Store<AppStateModel>) {
  }

  @Input() loggedUser!: loggedUser;

  private subscriptions: Subscription[] = [];
  projectFavoriteView!:projectView;

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));

    //load favorite projects
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
