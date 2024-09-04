import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";

import {
  loadAssignment,
  loadAssignmentFail,
  loadAssignmentSuccess, updateAssignment, updateAssignmentSuccess,
} from "./calender.actions";
import {CalenderService} from "../service/calender.service";
import {loadSpinner, showAlert} from "../../../core/store/app.action";
import {assignmentModel} from "./calender.model";



@Injectable()
export class CalenderEffects {
  constructor(private action$:Actions,
              private service:CalenderService) {

  }

  _getAssignment=createEffect(()=>
    this.action$.pipe(
      ofType(loadAssignment),
      switchMap(action=>
        this.service.getAssignment(action.date).pipe(
          switchMap(data=> of(
            loadAssignmentSuccess({assignment:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadAssignmentFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateAssignment=createEffect(()=>
    this.action$.pipe(
      ofType(updateAssignment),
      switchMap(action =>
        this.service.updateAssignment(action.assignmentInput).pipe(
          switchMap(data=> of(
            updateAssignmentSuccess({assignmentNew:data as assignmentModel, assignmentOld:action.assignmentInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
