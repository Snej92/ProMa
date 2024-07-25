import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addSettingHeaderData,
  addSettingHeaderDataSuccess, deleteSettingHeaderData, deleteSettingHeaderDataSuccess, LOAD_SETTING_HEADER_DATA,
  loadSettingHeaderDataFail,
  loadSettingHeaderDataSuccess, updateSettingHeaderData, updateSettingHeaderDataSuccess
} from "./headerDataSetting.actions";
import {headerDataSettingModel} from "./headerDataSetting.model";
import {HeaderDataSettingsService} from "../service/header-data-settings.service";




@Injectable()
export class HeaderDataSettingEffects {
  constructor(private action$:Actions,
              private service:HeaderDataSettingsService) {

  }

  _getProjectHeaderData=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_HEADER_DATA),
      switchMap(action=>
        this.service.getSettingHeaderData().pipe(
          switchMap(data=> of(
            loadSettingHeaderDataSuccess({headerDataSettingList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingHeaderDataFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addHeaderData=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingHeaderData),
      switchMap(action=>
        this.service.addSettingHeaderData(action.headerDataSettingInput).pipe(
          switchMap(data=> of(
            addSettingHeaderDataSuccess({headerDataSettingInput:data as headerDataSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateHeaderData=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingHeaderData),
      switchMap(action =>
        this.service.updateSettingHeaderData(action.headerDataSettingInput).pipe(
          switchMap(res=> of(
            updateSettingHeaderDataSuccess({headerDataSettingInput:action.headerDataSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteHeaderData=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingHeaderData),
      switchMap(action=>
        this.service.deleteSettingHeaderData(action.id).pipe(
          switchMap(res=>of(
            deleteSettingHeaderDataSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
