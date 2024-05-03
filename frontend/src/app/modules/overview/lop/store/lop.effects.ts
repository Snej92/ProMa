import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LopService} from "../service/lop.service";
import {
  addLop,
  addLopSuccess, deleteLop, deleteLopSuccess,
  LOAD_LOP,
  loadLopFail,
  loadLopSuccess, loadSpinner, updateLop, updateLopSuccess,
} from "./lop.actions";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {lopModel} from "./lop.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {showAlert} from "../../../../core/store/app.action";


@Injectable()
export class LopEffects{
  constructor(private action$:Actions,
              private service:LopService) {

  }

  _getLop=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_LOP),
      exhaustMap((action)=>{
        return this.service.getAllLops().pipe(
          map((data)=>{
            return loadLopSuccess({lopList:data});
          }),
          catchError((error)=> of(loadLopFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      })
    )
  );

  _addLop=createEffect(()=>
    this.action$.pipe(
      ofType(addLop),
      switchMap(action=>
        this.service.addLop(action.lopInput).pipe(
          switchMap(data=> of(
            addLopSuccess({lopInput:data as lopModel}),
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
        this.service.updateLop(action.lopInput).pipe(
          switchMap(res=> of(
            updateLopSuccess({lopInput:action.lopInput}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
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
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
