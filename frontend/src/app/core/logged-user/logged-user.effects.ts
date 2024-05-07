import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../store/app.action";
import {Injectable} from "@angular/core";
import {UserService} from "../../modules/userAdministration/services/user.service";
import {
  LOAD_LOGGED_USER,
  loadLoggedUserFail,
  loadLoggedUserSuccess,
  updateLoggedUser,
  updateLoggedUserSuccess
} from "./logged-user.actions";

@Injectable()
export class LoggedUserEffects {
  constructor(private action$: Actions,
              private service: UserService) {

  }

  _getLoggedUser = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_LOGGED_USER),
      switchMap(action =>
        this.service.getLoggedUser().pipe(
          switchMap(data => of(
            loadLoggedUserSuccess({loggedUser:data}),
            loadSpinner({isLoading: false}),
          )),
          catchError((error) => of(loadLoggedUserFail({errorText: error}), loadSpinner({isLoading: false})))
        )
      )
    )
  );

  _updateLoggedUser=createEffect(()=>
    this.action$.pipe(
      ofType(updateLoggedUser),
      switchMap(action =>
        this.service.updateLoggedUser(action.loggedUser).pipe(
          switchMap(data=> of(
            updateLoggedUserSuccess({loggedUser:data}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt ausgewählt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Projekt auswählen fehlgeschlagen weil '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
