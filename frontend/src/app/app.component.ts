import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {activeProjectView} from "./core/active-project/active-project.model";
import {loggedUser} from "./core/logged-user/logged-user.model";
import {loadSpinner} from "./core/store/app.action";
import {loadActiveProjectView} from "./core/active-project/active-project.actions";
import {getActiveProjectViewInfo} from "./core/active-project/active-project.selector";
import {loadLoggedUser} from "./core/logged-user/logged-user.actions";
import {getLoggedUserInfo} from "./core/logged-user/logged-user.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "./core/store/appState.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  activeProjectView!:activeProjectView;
  loggedUser!:loggedUser;
  title = 'ProMa - SYSPROTEC';

  public constructor(private titleService: Title,
                     private store:Store<AppStateModel>){}

  public setTitle(newTitle: string){
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    console.log('Init Page')
    this.setTitle(this.title);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
