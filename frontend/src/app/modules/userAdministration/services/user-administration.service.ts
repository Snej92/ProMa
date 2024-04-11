import {Injectable} from '@angular/core';
import {user} from "../models/user-Administration.model";
import {USERS} from "../../../dummy/mock-user";
import {Store} from "@ngrx/store";
import {UserAdministrationState} from "../store/user-administration.state";
import {GetUsersActions} from "../store/user-administration.actions";


@Injectable({
  providedIn: 'root'
})
export class UserAdministrationService {
  constructor() { }
  // private store : Store<UserAdministrationState>
  getUsers(): user[]{
    return USERS;
  }

  // loadUsers() {
  //   this.store.dispatch(GetUsersActions.do());
  // }

}
