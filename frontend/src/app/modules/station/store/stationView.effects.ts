import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {StationService} from "../service/station.service";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../core/store/app.action";
import {
  addStationView,
  addStationViewSuccess, deleteStation, deleteStationSuccess,
  LOAD_STATION_VIEW,
  loadStationViewFail,
  loadStationViewSuccess, updateStation, updateStationSuccess
} from "./stationView.actions";
import {stationFavViewModel, stationViewModel} from "./stationView.model";

@Injectable()
export class StationViewEffects {
  constructor(private action$: Actions,
              private service: StationService) {
  }

  _getStationView=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_STATION_VIEW),
      switchMap(action=>
        this.service.getAllStations().pipe(
          switchMap(data=> of(
            loadStationViewSuccess({stationViewList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationViewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addStationView=createEffect(()=>
    this.action$.pipe(
      ofType(addStationView),
      switchMap(action=>
        this.service.addStation(action.stationViewInput, action.headerDataInput).pipe(
          switchMap(data=> of(
            addStationViewSuccess({stationViewInput:data as stationFavViewModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Station Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Station Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStation=createEffect(()=>
    this.action$.pipe(
      ofType(updateStation),
      switchMap(action =>
        this.service.updateStation(action.stationViewInput).pipe(
          switchMap(data=> of(
            updateStationSuccess({stationViewNew:data as stationFavViewModel, stationViewOld:action.stationViewInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Station erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Station Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteStation=createEffect(()=>
    this.action$.pipe(
      ofType(deleteStation),
      switchMap(action=>
        this.service.deleteStation(action.id).pipe(
          switchMap(res=>of(
            deleteStationSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Station erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Station löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
