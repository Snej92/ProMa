import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  loadStationSpecification,
  loadStationSpecificationFail,
  loadStationSpecificationSuccess, updateStationSpecification, updateStationSpecificationSuccess
} from "./specification.actions";
import {SpecificationService} from "../service/specification.service";
import {specificationModel} from "../../specification/store/specification.model";

@Injectable()
export class SpecificationEffects {
  constructor(private action$:Actions,
              private service:SpecificationService) {

  }

  _getStationSpecification=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationSpecification),
      switchMap(action=>
        this.service.getStationSpecification(action.stationId).pipe(
          switchMap(data=> of(
            loadStationSpecificationSuccess({specificationList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationSpecificationFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationSpecification=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationSpecification),
      switchMap(action=>
        this.service.updateStationSpecification(action.specificationInput).pipe(
          switchMap(data=> of(
            updateStationSpecificationSuccess({specificationNew:data as specificationModel, specificationOld:action.specificationInput}),
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
