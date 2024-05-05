import {Component, OnDestroy, OnInit} from '@angular/core';
import {user} from "../../store/user-Administration.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {loadUser} from "../../store/user-administration.actions";
import {getUserInfo} from "../../store/user-administration.selectors";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrl: './user-administration.component.scss'
})
export class UserAdministrationComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  user!:user;
  displayedColumns: string[] = ['Vorname','Nachname', 'Kürzel', 'E-Mail', 'Telefon', 'Benutzername', 'Passwort']

  constructor(private store:Store<AppStateModel>) {
  }

  openUserForm(){

  }

  ngOnInit(): void {
    // this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadUser())
    this.subscriptions.push(
      this.store.select(getUserInfo).pipe()
        .subscribe(data =>{
          this.user=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
