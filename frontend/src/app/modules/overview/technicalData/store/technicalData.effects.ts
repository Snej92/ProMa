import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  loadStationTechnicalData,
  loadStationTechnicalDataFail,
  loadStationTechnicalDataSuccess, updateStationTechnicalData, updateStationTechnicalDataSuccess
} from "./technicalData.actions";
import {TechnicalDataService} from "../service/technical-data.service";

@Injectable()
export class TechnicalDataEffects {
  constructor(private action$:Actions,
              private service:TechnicalDataService) {

  }

  _getStationTechnicalData=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationTechnicalData),
      switchMap(action=>
        this.service.getStationTechnicalData(action.stationId).pipe(
          switchMap(data=> of(
            loadStationTechnicalDataSuccess({technicalDataList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationTechnicalDataFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationTechnicalData=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationTechnicalData),
      switchMap(action=>
        this.service.updateStationTechnicalData(action.technicalDataStationInput).pipe(
          switchMap(data=> of(
            updateStationTechnicalDataSuccess({technicalDataStationInput:action.technicalDataStationInput}),
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
