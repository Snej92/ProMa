import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {VersionService} from "../service/version.service";
import {
  addVersion,
  addVersionSuccess, deleteVersion, deleteVersionSuccess,
  LOAD_VERSION, loadVersion,
  loadVersionFail,
  loadVersionSuccess,
  updateVersion, updateVersionSuccess
} from "./version.actions";
import {versionModel} from "./version.model";

@Injectable()
export class VersionEffects{

  constructor(private action$: Actions,
              private service:VersionService) {

  }

  _getVersion=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_VERSION),
      switchMap(action=>
        this.service.getVersions().pipe(
          switchMap(data=> of(
            loadVersionSuccess({versionList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadVersionFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addVersion=createEffect(()=>
    this.action$.pipe(
      ofType(addVersion),
      switchMap(action=>
        this.service.addVersion(action.versionInput).pipe(
          switchMap(data=> of(
            addVersionSuccess({versionInput:data as versionModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Version Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Version Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateVersion=createEffect(()=>
    this.action$.pipe(
      ofType(updateVersion),
      switchMap(action =>
        this.service.updateVersion(action.versionInput).pipe(
          switchMap(data=> of(
            updateVersionSuccess({versionNew:data as versionModel, versionOld:action.versionInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Version erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Version Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteVersion=createEffect(()=>
    this.action$.pipe(
      ofType(deleteVersion),
      switchMap(action=>
        this.service.deleteVersion(action.id).pipe(
          switchMap(res=>of(
            deleteVersionSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Version erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Version löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
