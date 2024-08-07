import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../core/store/app.action";
import {
  LOAD_STATION_OVERALL_VIEW,
  loadStationOverallViewFail,
  loadStationOverallViewSuccess,
} from "./stationOverallView.actions";
import {StationOverallViewService} from "../service/station-overall-view.service";

@Injectable()
export class StationOverallViewEffects {
  constructor(private action$: Actions,
              private service: StationOverallViewService) {
  }

  _getStationOverallView=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_STATION_OVERALL_VIEW),
      switchMap(action=>
        this.service.getStationOverallView().pipe(
          switchMap(data=> of(
            loadStationOverallViewSuccess({stationOverallViewList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationOverallViewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
