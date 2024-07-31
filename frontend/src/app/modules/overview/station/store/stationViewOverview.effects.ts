import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {
  loadStationViewOverview,
  loadStationViewOverviewFail,
  loadStationViewOverviewSuccess
} from "./stationViewOverview.actions";
import {StationViewOverviewService} from "../service/station-view-overview.service";
import {loadSpinner} from "../../../../core/store/app.action";

@Injectable()
export class StationViewOverviewEffects {
  constructor(private action$: Actions,
              private service: StationViewOverviewService) {
  }

  _getStationView=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationViewOverview),
      switchMap(action=>
        this.service.getStation(action.id).pipe(
          switchMap(data=> of(
            loadStationViewOverviewSuccess({stationViewOverview:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationViewOverviewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
