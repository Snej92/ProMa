import {Injectable} from "@angular/core";
import * as UserAdministrationActions from "./user-administration.actions"
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserAdministrationConnectorService} from "../services/user-administration-connector.service";
import {catchError, map, of, switchMap, tap} from "rxjs";

@Injectable()
export class UserAdministrationEffects{

  getUsers = createEffect(() => this.actions$.pipe(
    ofType(UserAdministrationActions.GetUsersActions.do),
    switchMap(action =>
      this.connector.getUsers().pipe(
        map((data) => UserAdministrationActions.GetUsersActions.success({users: data})),
        catchError(() => of(UserAdministrationActions.GetUsersActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  constructor(
    private actions$: Actions,
    private connector: UserAdministrationConnectorService
  ) {
  }
}
