import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  loadStationControl,
  loadStationControlFail,
  loadStationControlSuccess, updateStationControl, updateStationControlSuccess
} from "./control.actions";
import {ControlService} from "../service/control.service";
import {controlModel} from "../../control/store/control.model";

@Injectable()
export class ControlEffects {
  constructor(private action$:Actions,
              private service:ControlService) {

  }

  _getStationControl=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationControl),
      switchMap(action=>
        this.service.getStationControl(action.stationId).pipe(
          switchMap(data=> of(
            loadStationControlSuccess({controlList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationControlFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationControl=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationControl),
      switchMap(action=>
        this.service.updateStationControl(action.controlInput).pipe(
          switchMap(data=> of(
            updateStationControlSuccess({controlNew:data as controlModel, controlOld:action.controlInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(
            showAlert({message: 'Aktualisieren fehlgeschlagen wegen '+error.message, actionResult:'fail'}),
            loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
