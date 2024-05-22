import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {LopSettingService} from "../service/lop-setting.service";
import {
  addSettingLop,
  addSettingLopSuccess, deleteSettingLop, deleteSettingLopSuccess,
  LOAD_SETTING_LOP,
  loadSettingLopFail,
  loadSettingLopSuccess, updateSettingLop, updateSettingLopSuccess
} from "./lopSetting.actions";
import {lopSettingModel} from "./lopSetting.model";


@Injectable()
export class LopSettingEffects {
  constructor(private action$:Actions,
              private service:LopSettingService) {

  }

  _getProjectLop=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_LOP),
      switchMap(action=>
        this.service.getSettingLops().pipe(
          switchMap(data=> of(
            loadSettingLopSuccess({lopSettingList:data}),
              loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingLopFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addLop=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingLop),
      switchMap(action=>
        this.service.addSettingLop(action.lopSettingInput).pipe(
          switchMap(data=> of(
            addSettingLopSuccess({lopSettingInput:data as lopSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateLop=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingLop),
      switchMap(action =>
        this.service.updateSettingLop(action.lopSettingInput).pipe(
          switchMap(res=> of(
            updateSettingLopSuccess({lopSettingInput:action.lopSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteLop=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingLop),
      switchMap(action=>
        this.service.deleteSettingLop(action.id).pipe(
          switchMap(res=>of(
            deleteSettingLopSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
