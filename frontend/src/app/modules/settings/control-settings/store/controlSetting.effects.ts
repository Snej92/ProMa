import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addSettingControl,
  addSettingControlSuccess, deleteSettingControl, deleteSettingControlSuccess,
  LOAD_SETTING_CONTROL,
  loadSettingControlFail,
  loadSettingControlSuccess, updateSettingControl, updateSettingControlSuccess
} from "./controlSetting.actions";
import {controlSettingModel} from "./controlSetting.model";
import {ControlSettingsService} from "../service/control-settings.service";


@Injectable()
export class ControlSettingEffects {
  constructor(private action$:Actions,
              private service:ControlSettingsService) {

  }

  _getProjectControl=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_CONTROL),
      switchMap(action=>
        this.service.getSettingControls().pipe(
          switchMap(data=> of(
            loadSettingControlSuccess({controlSettingList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingControlFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addControl=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingControl),
      switchMap(action=>
        this.service.addSettingControl(action.controlSettingInput).pipe(
          switchMap(data=> of(
            addSettingControlSuccess({controlSettingInput:data as controlSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateControl=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingControl),
      switchMap(action =>
        this.service.updateSettingControl(action.controlSettingInput).pipe(
          switchMap(res=> of(
            updateSettingControlSuccess({controlSettingInput:action.controlSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteControl=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingControl),
      switchMap(action=>
        this.service.deleteSettingControl(action.id).pipe(
          switchMap(res=>of(
            deleteSettingControlSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
