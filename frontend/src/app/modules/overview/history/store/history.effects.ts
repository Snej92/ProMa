import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addStationHistory, addStationHistorySuccess,
  loadStationHistory,
  loadStationHistoryFail,
  loadStationHistorySuccess
} from "./history.actions";
import {HistoryService} from "../service/history.service";
import {
  addProjectView,
  addProjectViewSuccess
} from "../../../project-administration/store/project-administration.actions";
import {projectViewModel} from "../../../project-administration/store/project-administration.model";
import {historyModel} from "./history.model";

@Injectable()
export class HistoryEffects {
  constructor(private action$:Actions,
              private service:HistoryService) {

  }

  _getStationHistory=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationHistory),
      switchMap(action=>
        this.service.getStationHistory(action.stationId).pipe(
          switchMap(data=> of(
            loadStationHistorySuccess({historyList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationHistoryFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addStationHistory=createEffect(()=>
    this.action$.pipe(
      ofType(addStationHistory),
      switchMap(action=>
        this.service.addHistory(action.historyInput, action.stationId).pipe(
          switchMap(data=> of(
            addStationHistorySuccess({historyInput:data as historyModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Historie Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Historie Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
