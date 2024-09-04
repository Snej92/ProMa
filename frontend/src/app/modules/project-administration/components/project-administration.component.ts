import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateModel} from "../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {projectView} from "../store/project-administration.model";
import {loadSpinner} from "../../../core/store/app.action";
import {loadProjectView} from "../store/project-administration.actions";
import {getProjectViewInfo} from "../store/project-administration.selectors";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddProjectComponent} from "./add-project/add-project.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-administration',
  templateUrl: './project-administration.component.html',
  styleUrl: './project-administration.component.scss'
})
export class ProjectAdministrationComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  projectView!:projectView;
  loggedUser!:loggedUser;
  archive!:boolean;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private activatedRoute: ActivatedRoute) {
  }

  addProject(){
    this.openPopup(0, 'Projekt Hinzufügen', false, 'Hinzufügen', this.projectView)
  }

  openPopup(id:any, title:any, isEdit=false, button:any, project:projectView){
    this.dialog.open(AddProjectComponent,{
      width:'30%',
      data:{
        id:id,
        title: title,
        isEdit:isEdit,
        button:button,
        project:project
      }
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.archive = params['archive'] === 'true';
      this.reloadComponent()
    });
  }

  reloadComponent(){
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadProjectView({archive:this.archive, all:false}))
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
