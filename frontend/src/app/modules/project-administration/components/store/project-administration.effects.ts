import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectAdministrationService} from "../service/project-administration.service";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner} from "../../../../core/store/app.action";
import {LOAD_PROJECT_VIEW, loadProjectViewFail, loadProjectViewSuccess} from "./project-administration.actions";


@Injectable()
export class ProjectAdministrationEffects {
  constructor(private action$: Actions,
              private service:ProjectAdministrationService) {

  }

  _getProjectView=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_PROJECT_VIEW),
      switchMap(action=>
        this.service.getAllProjects().pipe(
          switchMap(data=> of(
            loadProjectViewSuccess({projectViewList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadProjectViewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
