import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {
  addSettingSpecification,
  addSettingSpecificationSuccess, deleteSettingSpecification, deleteSettingSpecificationSuccess,
  LOAD_SETTING_SPECIFICATION,
  loadSettingSpecificationFail,
  loadSettingSpecificationSuccess, updateSettingSpecification, updateSettingSpecificationSuccess
} from "./specificationSetting.actions";
import {specificationSettingModel} from "./specificationSetting.model";
import {SpecificationSettingsService} from "../service/specification-settings.service";


@Injectable()
export class SpecificationSettingEffects {
  constructor(private action$:Actions,
              private service:SpecificationSettingsService) {

  }

  _getProjectSpecification=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_SETTING_SPECIFICATION),
      switchMap(action=>
        this.service.getSettingSpecifications().pipe(
          switchMap(data=> of(
            loadSettingSpecificationSuccess({specificationSettingList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadSettingSpecificationFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _addSpecification=createEffect(()=>
    this.action$.pipe(
      ofType(addSettingSpecification),
      switchMap(action=>
        this.service.addSettingSpecification(action.specificationSettingInput).pipe(
          switchMap(data=> of(
            addSettingSpecificationSuccess({specificationSettingInput:data as specificationSettingModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateSpecification=createEffect(()=>
    this.action$.pipe(
      ofType(updateSettingSpecification),
      switchMap(action =>
        this.service.updateSettingSpecification(action.specificationSettingInput).pipe(
          switchMap(res=> of(
            updateSettingSpecificationSuccess({specificationSettingInput:action.specificationSettingInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteSpecification=createEffect(()=>
    this.action$.pipe(
      ofType(deleteSettingSpecification),
      switchMap(action=>
        this.service.deleteSettingSpecification(action.id).pipe(
          switchMap(res=>of(
            deleteSettingSpecificationSuccess({id:action.id}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
