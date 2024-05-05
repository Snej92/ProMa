import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateModel} from "../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {projectView} from "./store/project-administration.model";
import {loadSpinner} from "../../../core/store/app.action";
import {loadProjectView} from "./store/project-administration.actions";
import {getProjectViewInfo} from "./store/project-administration.selectors";

@Component({
  selector: 'app-project-administration',
  templateUrl: './project-administration.component.html',
  styleUrl: './project-administration.component.scss'
})
export class ProjectAdministrationComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  projectView!:projectView;

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    // this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadProjectView())
    this.subscriptions.push(
      this.store.select(getProjectViewInfo).pipe()
        .subscribe(data =>{
          this.projectView=data;
        })
    )
    console.log(this.projectView)
  }

  selectProject(){
    console.log('select project')
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
