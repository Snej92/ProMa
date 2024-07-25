import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addSettingTechnicalData,
  addSettingTechnicalDataSuccess,
  deleteSettingTechnicalData,
  deleteSettingTechnicalDataSuccess,
  LOAD_SETTING_TECHNICAL_DATA,

  loadSettingTechnicalDataFail,
  loadSettingTechnicalDataSuccess,
  updateSettingTechnicalData,
  updateSettingTechnicalDataSuccess
} from "./technicalDataSetting.actions";
import {technicalDataSettingModel} from "./technicalDataSetting.model";
import {TechnicalDataSettingsService} from "../service/technical-data-settings.service";



@Injectable()
export class TechnicalDataSettingEffects {
  constructor(private action$:Actions,
              private service:TechnicalDataSettingsService) {

  }

  _getProjectTechnicalData=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_TECHNICAL_DATA),
      switchMap(action=>
        this.service.getSettingTechnicalData().pipe(
          switchMap(data=> of(
            loadSettingTechnicalDataSuccess({technicalDataSettingList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingTechnicalDataFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addTechnicalData=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingTechnicalData),
      switchMap(action=>
        this.service.addSettingTechnicalData(action.technicalDataSettingInput).pipe(
          switchMap(data=> of(
            addSettingTechnicalDataSuccess({technicalDataSettingInput:data as technicalDataSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateTechnicalData=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingTechnicalData),
      switchMap(action =>
        this.service.updateSettingTechnicalData(action.technicalDataSettingInput).pipe(
          switchMap(res=> of(
            updateSettingTechnicalDataSuccess({technicalDataSettingInput:action.technicalDataSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteTechnicalData=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingTechnicalData),
      switchMap(action=>
        this.service.deleteSettingTechnicalData(action.id).pipe(
          switchMap(res=>of(
            deleteSettingTechnicalDataSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
