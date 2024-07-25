import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  loadStationDocumentation,
  loadStationDocumentationFail,
  loadStationDocumentationSuccess, updateStationDocumentation, updateStationDocumentationSuccess
} from "./documentation.actions";
import {DocumentationService} from "../service/documentation.service";

@Injectable()
export class DocumentationEffects {
  constructor(private action$:Actions,
              private service:DocumentationService) {

  }

  _getStationDocumentation=createEffect(()=>
    this.action$.pipe(
      ofType(loadStationDocumentation),
      switchMap(action=>
        this.service.getStationDocumentation(action.stationId).pipe(
          switchMap(data=> of(
            loadStationDocumentationSuccess({documentationList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadStationDocumentationFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateStationDocumentation=createEffect(()=>
    this.action$.pipe(
      ofType(updateStationDocumentation),
      switchMap(action=>
        this.service.updateStationDocumentation(action.documentationStationInput).pipe(
          switchMap(data=> of(
            updateStationDocumentationSuccess({documentationStationInput:action.documentationStationInput}),
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
