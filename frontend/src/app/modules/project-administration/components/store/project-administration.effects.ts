import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectAdministrationService} from "../service/project-administration.service";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addProjectView, addProjectViewSuccess,
  LOAD_PROJECT_VIEW,
  loadProjectViewFail,
  loadProjectViewSuccess
} from "./project-administration.actions";
import {projectViewModel} from "./project-administration.model";


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

  _addProjectView=createEffect(()=>
    this.action$.pipe(
      ofType(addProjectView),
      switchMap(action=>
        this.service.addProject(action.projectViewInput).pipe(
          switchMap(data=> of(
            addProjectViewSuccess({projectViewInput:data as projectViewModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Projekt Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
