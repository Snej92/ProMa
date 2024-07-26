import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  loadStationProjection,
  loadStationProjectionFail,
  loadStationProjectionSuccess, updateStationProjection, updateStationProjectionSuccess
} from "./projection.actions";
import {ProjectionService} from "../service/projection.service";
import {projectionModel} from "./projection.model";


@Injectable()
export class ProjectionEffects {
  constructor(private action$:Actions,
              private service:ProjectionService) {

  }

  _getStationProjection=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationProjection),
      switchMap(action=>
        this.service.getStationProjection(action.stationId).pipe(
          switchMap(data=> of(
            loadStationProjectionSuccess({projectionList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationProjectionFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationProjection=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationProjection),
      switchMap(action=>
        this.service.updateStationProjection(action.projectionInput).pipe(
          switchMap(data=> of(
            updateStationProjectionSuccess({projectionNew:data as projectionModel, projectionOld:action.projectionInput}),
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
