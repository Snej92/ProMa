import {Component, Input, Output} from '@angular/core';
import {projectViewModel} from "../store/project-administration.model";
import {userModel, userRole} from "../../../userAdministration/store/user-Administration.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {updateLoggedUser} from "../../../../core/logged-user/logged-user.actions";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loggedUser} from "../../../../core/logged-user/logged-user.model";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() projectView: projectViewModel | undefined;
  @Input() loggedUser!: loggedUser;

  constructor(private store:Store<AppStateModel>) {
  }

  selectProject(projectId:any) {
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
      console.log(updatedUser);
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateLoggedUser({loggedUser:updatedUser}))
    } else {
      console.log(projectId + ' already selected')
    }
  }
}
