import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  loadStationHeaderData,
  loadStationHeaderDataFail,
  loadStationHeaderDataSuccess, updateStationHeaderData, updateStationHeaderDataSuccess
} from "./headerData.actions";
import {HeaderDataService} from "../sercive/header-data.service";

@Injectable()
export class HeaderDataEffects {
  constructor(private action$:Actions,
              private service:HeaderDataService) {

  }

  _getStationHeaderData=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationHeaderData),
      switchMap(action=>
        this.service.getStationHeaderData(action.stationId).pipe(
          switchMap(data=> of(
            loadStationHeaderDataSuccess({headerDataList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationHeaderDataFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationHeaderData=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationHeaderData),
      switchMap(action=>
        this.service.updateStationHeaderData(action.headerDataStationInput).pipe(
          switchMap(data=> of(
            updateStationHeaderDataSuccess({headerDataStationInput:action.headerDataStationInput}),
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
