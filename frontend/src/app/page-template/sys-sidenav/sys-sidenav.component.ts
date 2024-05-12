import {Component, computed, OnInit, signal} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../core/store/appState.model";
import {loadSpinner} from "../../core/store/app.action";
import {loadLoggedUser} from "../../core/logged-user/logged-user.actions";
import {getLoggedUserInfo} from "../../core/logged-user/logged-user.selectors";
import {loggedUser} from "../../core/logged-user/logged-user.model";
import {activeProjectView} from "../../core/active-project/active-project.model";
import {loadActiveProjectView} from "../../core/active-project/active-project.actions";
import {getActiveProjectViewInfo} from "../../core/active-project/active-project.selector";

@Component({
  selector: 'app-sys-sidenav',
  templateUrl: './sys-sidenav.component.html',
  styleUrl: './sys-sidenav.component.scss'
})
export class SysSidenavComponent implements OnInit{

  activeProjectView!:activeProjectView;
  loggedUser!:loggedUser;


  constructor(private keycloakService:KeycloakService,
              private store:Store<AppStateModel>) {
  }

  protected readonly open = open;

  collapsed = signal(true);

  sideNavWidth = computed(()=> this.collapsed() ? '63px' : '200px');

  onLogout(){
    this.keycloakService.logout().then()
  }

  ngOnInit(): void {
    console.log('Nav Init')
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadActiveProjectView());
    this.store.select(getActiveProjectViewInfo).subscribe(data =>{
          this.activeProjectView=data;
    });
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadLoggedUser());
    this.store.select(getLoggedUserInfo).subscribe(data =>{
      this.loggedUser=data;
    });
  }
}
