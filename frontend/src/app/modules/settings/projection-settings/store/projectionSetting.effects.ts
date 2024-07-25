import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addSettingProjection,
  addSettingProjectionSuccess, deleteSettingProjection, deleteSettingProjectionSuccess,
  LOAD_SETTING_PROJECTION,
  loadSettingProjectionFail,
  loadSettingProjectionSuccess, updateSettingProjection, updateSettingProjectionSuccess
} from "./projectionSetting.actions";
import {projectionSettingModel} from "./projectionSetting.model";
import {ProjectionSettingsService} from "../service/projection-settings.service";


@Injectable()
export class ProjectionSettingEffects {
  constructor(private action$:Actions,
              private service:ProjectionSettingsService) {

  }

  _getProjectProjection=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_PROJECTION),
      switchMap(action=>
        this.service.getSettingProjections().pipe(
          switchMap(data=> of(
            loadSettingProjectionSuccess({projectionSettingList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingProjectionFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addProjection=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingProjection),
      switchMap(action=>
        this.service.addSettingProjection(action.projectionSettingInput).pipe(
          switchMap(data=> of(
            addSettingProjectionSuccess({projectionSettingInput:data as projectionSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateProjection=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingProjection),
      switchMap(action =>
        this.service.updateSettingProjection(action.projectionSettingInput).pipe(
          switchMap(res=> of(
            updateSettingProjectionSuccess({projectionSettingInput:action.projectionSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteProjection=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingProjection),
      switchMap(action=>
        this.service.deleteSettingProjection(action.id).pipe(
          switchMap(res=>of(
            deleteSettingProjectionSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
