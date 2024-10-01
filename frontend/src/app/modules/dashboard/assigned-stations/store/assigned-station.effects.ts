import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {
  loadAssignedStationView, loadAssignedStationViewFail, loadAssignedStationViewSuccess,
} from "./assigned-station.actions";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {AssignedStationService} from "../service/assigned-station.service";


@Injectable()
export class AssignedStationEffects {
  constructor(private action$: Actions,
              private service:AssignedStationService) {

  }

  _getAssignedStationView=createEffect(()=>
    this.action$.pipe(
      ofType(loadAssignedStationView),
      switchMap(action=>
        this.service.getAssignedStations().pipe(
          switchMap(data=> of(
            loadAssignedStationViewSuccess({stationViewList:data}),
            loadSpinner({isLoading:false}),
          )),
          catchError((error)=> of(loadAssignedStationViewFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
