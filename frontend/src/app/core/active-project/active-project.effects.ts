import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  ProjectAdministrationService
} from "../../modules/project-administration/components/service/project-administration.service";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner} from "../store/app.action";
import {
  LOAD_ACTIVE_PROJECT_VIEW,
  loadActiveProjectViewFail,
  loadActiveProjectViewSuccess
} from "./active-project.actions";
import {updateLoggedUserSuccess} from "../logged-user/logged-user.actions";

@Injectable()
export class ActiveProjectEffects {
  constructor(private action$: Actions,
              private service:ProjectAdministrationService) {

  }

  _getActiveProjectView=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_ACTIVE_PROJECT_VIEW),
      switchMap(action=>
        this.service.getProject().pipe(
          switchMap(data=> of(
            loadSpinner({isLoading:true}),
            loadActiveProjectViewSuccess({projectView:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadActiveProjectViewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _getActiveProjectViewAuto=createEffect(()=>
    this.action$.pipe(
      ofType(updateLoggedUserSuccess),
      switchMap(action=>
        this.service.getProject().pipe(
          switchMap(data=> of(
            loadSpinner({isLoading:true}),
            loadActiveProjectViewSuccess({projectView:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadActiveProjectViewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
