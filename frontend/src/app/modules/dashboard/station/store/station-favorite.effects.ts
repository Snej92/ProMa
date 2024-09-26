import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {StationFavoriteService} from "../service/station-favorite.service";
import {
  loadStationViewFavorite,
  loadStationViewFavoriteFail, loadStationViewFavoriteSuccess, updateStationFavorite,
} from "./station-favorite.actions";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {updateStationFavoriteSuccess} from "../../../station/store/stationView.actions";


@Injectable()
export class StationFavoriteEffects {
  constructor(private action$: Actions,
              private service:StationFavoriteService) {

  }

  _getStationFavoriteView=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationViewFavorite),
      switchMap(action=>
        this.service.getStationFavorite().pipe(
          switchMap(data=> of(
            loadStationViewFavoriteSuccess({stationViewList:data}),
            loadSpinner({isLoading:false}),
          )),
          catchError((error)=> of(loadStationViewFavoriteFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationFavorite=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationFavorite),
      switchMap(action =>
        this.service.editStationFavorite(action.stationId, action.remove).pipe(
          switchMap(data=> of(
            updateStationFavoriteSuccess({stationId:action.stationId, remove:action.remove}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=>
            of(
              showAlert({
                message: 'Projekt Aktualisierung fehlgeschlagen wegen '+error.message,
                actionResult:'fail'
              }),
              loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
