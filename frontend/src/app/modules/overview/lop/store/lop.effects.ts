import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LopService} from "../service/lop.service";
import {
  addLop, addLopSuccess, deleteLop, deleteLopSuccess,
  loadLop,
  loadLopFail,
  loadLopSuccess, updateLop,
  updateLopSuccess,
} from "./lop.actions";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {lopModel} from "./lop.model";


@Injectable()
export class LopEffects {
  constructor(private action$:Actions,
              private service:LopService) {

  }

  _getStationLop=createEffect(()=>
    this.action$.pipe(
      ofType(loadLop),
      switchMap(action=>
        this.service.getStationLops(action.stationId).pipe(
          switchMap(data=> of(
            loadLopSuccess({lopList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadLopFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addLop=createEffect(()=>
    this.action$.pipe(
      ofType(addLop),
      switchMap(action=>
        this.service.addLop(action.lopInput, action.stationId).pipe(
          switchMap(data=> of(
            addLopSuccess({lopInput:data as lopModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateLop=createEffect(()=>
    this.action$.pipe(
      ofType(updateLop),
      switchMap(action =>
        this.service.updateStationLop(action.lopInput).pipe(
          switchMap(data=> of(
            updateLopSuccess({lopNew:data as lopModel, lopOld:action.lopInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(
            showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),
            loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteLop=createEffect(()=>
    this.action$.pipe(
      ofType(deleteLop),
      switchMap(action=>
        this.service.deleteLop(action.id).pipe(
          switchMap(res=>of(
            deleteLopSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
