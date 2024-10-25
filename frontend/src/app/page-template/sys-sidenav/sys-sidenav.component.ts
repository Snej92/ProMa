import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
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
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {loggedUserModel} from "../../core/logged-user/logged-user.state";
import {getWeekday, getWeekNumber, global} from "../../core/store/app.model";

@Component({
  selector: 'app-sys-sidenav',
  templateUrl: './sys-sidenav.component.html',
  styleUrl: './sys-sidenav.component.scss'
})
export class SysSidenavComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  activeProjectView!:activeProjectView | null | undefined;
  todayDate:string="";
  weekNumber:number = 0;
  today!:Date;

  loggedUser:loggedUser={
    user:loggedUserModel,
    errorMessage:''
  };

  constructor(private keycloakService:KeycloakService,
              private store:Store<AppStateModel>) {
  }

  collapsed = signal(true);

  sideNavWidth = computed(()=> this.collapsed() ? '63px' : '200px');

  onLogout(){
    this.keycloakService.logout().then()
  }

  ngOnInit(): void {
    console.log('Nav Init')
    console.log('production: ' + environment.production)

    this.today = new Date();

    //Get Date
    this.todayDate = this.getParsedDate();

    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadActiveProjectView());
    this.subscriptions.push(
      this.store.select(getActiveProjectViewInfo).subscribe(data =>{
        this.activeProjectView=data;
      })
    );

    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadLoggedUser());
    this.subscriptions.push(
    this.store.select(getLoggedUserInfo).subscribe(data =>{
      this.loggedUser= {...data};
      console.log("active project: " + this.loggedUser.user.activeProject)
      })
    );
  }

  getParsedDate():string{
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly global = global;
  protected readonly getWeekday = getWeekday;
  protected readonly getWeekNumber = getWeekNumber;
}
