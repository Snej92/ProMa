import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectAdministrationService} from "../service/project-administration.service";
import {catchError, of, switchMap, tap} from "rxjs";
import {loadSpinner, showAlert} from "../../../core/store/app.action";
import {
  addProjectView,
  addProjectViewSuccess,
  archiveProject,
  archiveProjectSuccess,
  deArchiveProject, deArchiveProjectSuccess,
  deleteProject,
  deleteProjectSuccess,
  loadProjectView,
  loadProjectViewFail,
  loadProjectViewSuccess,
  updateProject,
  updateProjectSuccess
} from "./project-administration.actions";
import {projectFavViewModel} from "./project-administration.model";
import {CoreService} from "../../../core/service/core.service";


@Injectable()
export class ProjectAdministrationEffects {
  constructor(private action$: Actions,
              private service:ProjectAdministrationService,
              private coreService:CoreService) {

  }

  _getProjectView=createEffect(()=>
    this.action$.pipe(
      ofType(loadProjectView),
      switchMap(action=>
        this.service.getAllProjects(action.archive, action.all).pipe(
          switchMap(data=> of(
            loadProjectViewSuccess({projectViewList:data}),
            loadSpinner({isLoading:false}),
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
        this.service.addProject(action.projectViewInput, action.template).pipe(
          switchMap(data=> of(
            addProjectViewSuccess({projectViewInput:data as projectFavViewModel}),
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
            updateProjectSuccess({projectViewNew:data as projectFavViewModel, projectViewOld:action.projectViewInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=>
            of(
              showAlert({
                message: 'Projekt Aktualisierung fehlgeschlagen wegen '+error.message,
                actionResult:'fail'
              }),
              loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _archiveProject=createEffect(()=>
    this.action$.pipe(
      ofType(archiveProject),
      switchMap(action =>
        this.service.updateProject(action.projectViewInput).pipe(
          switchMap(data=> of(
            updateProjectSuccess({projectViewNew:data as projectFavViewModel, projectViewOld:action.projectViewInput}),
            archiveProjectSuccess({projectViewInput: data as projectFavViewModel}),
            loadSpinner({isLoading:false}),
            showAlert({
              message: 'Projekt erfolgreich archiviert',
              actionResult:'pass'
            })
          )),
          catchError((error)=> of(showAlert({message: 'Projekt Archivierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deArchiveProject=createEffect(()=>
    this.action$.pipe(
      ofType(deArchiveProject),
      switchMap(action =>
        this.service.updateProject(action.projectViewInput).pipe(
          switchMap(data=> of(
            updateProjectSuccess({projectViewNew:data as projectFavViewModel, projectViewOld:action.projectViewInput}),
            deArchiveProjectSuccess({projectViewInput: data as projectFavViewModel}),
            loadSpinner({isLoading:false}),
            showAlert({
              message: 'Projekt erfolgreich dearchiviert',
              actionResult:'pass'
            })
          )),
          catchError((error)=> of(showAlert({message: 'Projekt Dearchivierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
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

  _reloadAfterArchive = createEffect(
    () =>
      this.action$.pipe(
        ofType(archiveProjectSuccess, deArchiveProjectSuccess),
        tap(() => {
          this.coreService.reloadComponent();
        })
      ),
    { dispatch: false }
  );
}
