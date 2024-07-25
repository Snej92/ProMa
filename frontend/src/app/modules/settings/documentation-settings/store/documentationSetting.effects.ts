import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addSettingDocumentation,
  addSettingDocumentationSuccess, deleteSettingDocumentation, deleteSettingDocumentationSuccess,
  LOAD_SETTING_DOCUMENTATION,
  loadSettingDocumentationFail,
  loadSettingDocumentationSuccess, updateSettingDocumentation, updateSettingDocumentationSuccess
} from "./documentationSetting.actions";
import {documentationSettingModel} from "./documentationSetting.model";
import {DocumentationSettingsService} from "../service/documentation-settings.service";


@Injectable()
export class DocumentationSettingEffects {
  constructor(private action$:Actions,
              private service:DocumentationSettingsService) {

  }

  _getProjectDocumentation=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_DOCUMENTATION),
      switchMap(action=>
        this.service.getSettingDocumentations().pipe(
          switchMap(data=> of(
            loadSettingDocumentationSuccess({documentationSettingList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingDocumentationFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addDocumentation=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingDocumentation),
      switchMap(action=>
        this.service.addSettingDocumentation(action.documentationSettingInput).pipe(
          switchMap(data=> of(
            addSettingDocumentationSuccess({documentationSettingInput:data as documentationSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateDocumentation=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingDocumentation),
      switchMap(action =>
        this.service.updateSettingDocumentation(action.documentationSettingInput).pipe(
          switchMap(res=> of(
            updateSettingDocumentationSuccess({documentationSettingInput:action.documentationSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteDocumentation=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingDocumentation),
      switchMap(action=>
        this.service.deleteSettingDocumentation(action.id).pipe(
          switchMap(res=>of(
            deleteSettingDocumentationSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
