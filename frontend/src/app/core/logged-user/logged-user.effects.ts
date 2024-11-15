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
import {
  ProjectAdministrationService
} from "../../modules/project-administration/service/project-administration.service";
import {loadStationViewFavorite} from "../../modules/dashboard/station/store/station-favorite.actions";
import {loadAssignedStationView} from "../../modules/dashboard/assigned-stations/store/assigned-station.actions";

@Injectable()
export class LoggedUserEffects {
  constructor(private action$: Actions,
              private service: UserService,
              private projectService: ProjectAdministrationService) {

  }

  _getLoggedUser = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_LOGGED_USER),
      switchMap(action =>
        this.service.getLoggedUser().pipe(
          switchMap(data => of(
            loadSpinner({isLoading:true}),
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
            loadSpinner({isLoading:true}),
            updateLoggedUserSuccess({loggedUser:data}),
            loadStationViewFavorite(),
            loadAssignedStationView(),
            showAlert({message: 'Projekt ausgewählt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Projekt auswählen fehlgeschlagen weil '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
