import {Injectable} from '@angular/core';
import {user} from "../models/user-Administration.model";
import {USERS} from "../../../dummy/mock-user";
import {Store} from "@ngrx/store";
import {UserAdministrationState} from "../store/user-administration.state";
import {GetUsersActions} from "../store/user-administration.actions";
import {Observable} from "rxjs";
import {UserAdministrationSelector} from "../store/user-administration.selectors";
import {LoadState} from "../../../core/models/core.models";


@Injectable({
  providedIn: 'root'
})
export class UserAdministrationService {
  constructor(private store : Store<UserAdministrationState>) { }

  // private store : Store<UserAdministrationState>

  //Todo remove testing!
  getUsers(): user[]{
    return USERS;
  }

  get $users() : Observable<user[]>{
    return this.store.select(UserAdministrationSelector.getUsers)
  }

  get $usersLoadState() : Observable<LoadState>{
    return this.store.select(UserAdministrationSelector.getUsersLoadState)
  }

  get $addUsersLoadState() : Observable<LoadState>{
    return this.store.select(UserAdministrationSelector.addUserLoadState)
  }

  get $deleteUsersLoadState() : Observable<LoadState>{
    return this.store.select(UserAdministrationSelector.deleteUserLoadState)
  }

  get $editUsersLoadState() : Observable<LoadState>{
    return this.store.select(UserAdministrationSelector.editUserLoadState)
  }

  loadUsers() {
    this.store.dispatch(GetUsersActions.do());
  }

}
