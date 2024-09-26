import {Component, Injector, Input, Output} from '@angular/core';
import {projectFavViewModel, projectViewModel} from "../../store/project-administration.model";
import {userModel, userRole} from "../../../userAdministration/store/user-Administration.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {updateLoggedUser} from "../../../../core/logged-user/logged-user.actions";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loggedUser} from "../../../../core/logged-user/logged-user.model";
import {MatDialog} from "@angular/material/dialog";
import {AddProjectComponent} from "../add-project/add-project.component";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {
  archiveProject,
  deleteProject,
} from "../../store/project-administration.actions";
import {getProjectById} from "../../store/project-administration.selectors";
import {take} from "rxjs";
import {updateProjectFavorite} from "../../../dashboard/project/store/project-favorite.actions";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() projectFavView: projectFavViewModel | undefined;
  @Input() loggedUser!: loggedUser;
  @Input() favorite : boolean = false;
  @Input() archive : boolean = false;
  archivedProject!:projectFavViewModel;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  editProject(id:any){
    console.log(id)
    this.openPopup(id, 'Projekt Bearbeiten', true, 'Aktualisieren')
  }

  deleteProject(id:any, deleteName:any){
    this.openConfirm('Projekt', deleteName, 'Löschen', id);
  }

  openConfirm(title:any, confirmName:any, button:any, id:any){
    const confirmRef = this.confirm.open(SysConfirmationComponent, {
      width: '30%',
      data:{
        title: title,
        confirmName: confirmName,
        button:button
      }
    });
    confirmRef.afterClosed().subscribe((confirmed:boolean)=> {
      if(confirmed){
        console.log(id)
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(deleteProject({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false, button:any){
    this.dialog.open(AddProjectComponent,{
      width:'30%',
      data:{
        id:id,
        title: title,
        isEdit:isEdit,
        button:button
      }
    })
  }

  selectProject(projectId:any) {
    if(!this.archive){
      if(this.loggedUser.user.activeProject!=projectId){
        console.log('select project ' +projectId)
        const roles:userRole={
          id:this.loggedUser.user.roles.id,
          adminRole: this.loggedUser.user.roles.adminRole,
          projectRole : this.loggedUser.user.roles.projectRole,
          userRole : this.loggedUser.user.roles.userRole,
        }
        const updatedUser : userModel = {
          id :this.loggedUser.user.id,
          activeProject: projectId,
          sub : this.loggedUser.user.sub,
          firstname : this.loggedUser.user.firstname,
          lastname : this.loggedUser.user.lastname,
          acronym : this.loggedUser.user.acronym,
          email : this.loggedUser.user.email,
          phone : this.loggedUser.user.phone,
          username : this.loggedUser.user.username,
          password : this.loggedUser.user.password,
          roles : roles
        }
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(updateLoggedUser({loggedUser:updatedUser}));
        console.log(updatedUser.activeProject + " selected");
      } else {
        console.log(projectId + ' already selected')
      }
    }
  }

  archiveProject(projectId:any){
    this.store.select(getProjectById(projectId)).pipe(
      take(1)
    ).subscribe(data => {
      this.archivedProject = {
        ...data,
        project: {
          ...data.project,
          archived: true
        }
      };
      this.store.dispatch(loadSpinner({ isLoading: true }));
      this.store.dispatch(archiveProject({ projectViewInput: this.archivedProject }));
    });
  }

  deArchiveProject(projectId:any){
    this.store.select(getProjectById(projectId)).pipe(
      take(1)
    ).subscribe(data => {
      this.archivedProject = {
        ...data,
        project: {
          ...data.project,
          archived: false
        }
      };
      this.store.dispatch(loadSpinner({ isLoading: true }));
      this.store.dispatch(archiveProject({ projectViewInput: this.archivedProject }));
    });
  }

  editFavorite(event: MouseEvent, id:any, isFavorite:any){
    event.stopPropagation();

    console.log("add " + id + " to favorites");
    this.store.dispatch(loadSpinner({ isLoading: true }));
    if(isFavorite){
      this.store.dispatch(updateProjectFavorite({projectId:id, remove:true}))
    } else {
      this.store.dispatch(updateProjectFavorite({projectId:id, remove:false}))
    }
  }
}
