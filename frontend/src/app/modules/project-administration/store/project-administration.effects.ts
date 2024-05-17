import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectAdministrationService} from "../service/project-administration.service";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../core/store/app.action";
import {
  addProjectView, addProjectViewSuccess, deleteProject, deleteProjectSuccess,
  LOAD_PROJECT_VIEW,
  loadProjectViewFail,
  loadProjectViewSuccess, updateProject, updateProjectSuccess
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

  _updateProject=createEffect(()=>
    this.action$.pipe(
      ofType(updateProject),
      switchMap(action =>
        this.service.updateProject(action.projectViewInput).pipe(
          switchMap(data=> of(
            updateProjectSuccess({projectViewNew:data as projectViewModel, projectViewOld:action.projectViewInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Projekt Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteProject=createEffect(()=>
    this.action$.pipe(
      ofType(deleteProject),
      switchMap(action=>
        this.service.deleteProject(action.id).pipe(
          switchMap(res=>of(
            deleteProjectSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Projekt löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
