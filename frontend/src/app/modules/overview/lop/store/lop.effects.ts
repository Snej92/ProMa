import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LopService} from "../service/lop.service";
import {
  loadStationLop,
  loadStationLopFail,
  loadStationLopSuccess, updateStationLop,
  updateStationLopSuccess,
} from "./lop.actions";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";


@Injectable()
export class LopEffects {
  constructor(private action$:Actions,
              private service:LopService) {

  }

  _getStationLop=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationLop),
      switchMap(action=>
        this.service.getStationLops(action.stationId).pipe(
          switchMap(data=> of(
            loadStationLopSuccess({lopList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationLopFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateLop=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationLop),
      switchMap(action =>
        this.service.updateStationLop(action.lopInput).pipe(
          switchMap(res=> of(
            updateStationLopSuccess({lopInput:action.lopInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
