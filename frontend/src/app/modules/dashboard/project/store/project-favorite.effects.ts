import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {ProjectFavoriteService} from "../service/project-favorite.service";
import {
  loadProjectViewFavorite,
  loadProjectViewFavoriteFail,
  loadProjectViewFavoriteSuccess, updateProjectFavorite
} from "./project-favorite.actions";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {updateProjectFavoriteSuccess} from "../../../project-administration/store/project-administration.actions";


@Injectable()
export class ProjectFavoriteEffects {
  constructor(private action$: Actions,
              private service:ProjectFavoriteService) {

  }

  _getProjectFavoriteView=createEffect(()=>
    this.action$.pipe(
      ofType(loadProjectViewFavorite),
      switchMap(action=>
        this.service.getProjectFavorite().pipe(
          switchMap(data=> of(
            loadProjectViewFavoriteSuccess({projectViewList:data}),
            loadSpinner({isLoading:false}),
          )),
          catchError((error)=> of(loadProjectViewFavoriteFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateProjectFavorite=createEffect(()=>
    this.action$.pipe(
      ofType(updateProjectFavorite),
      switchMap(action =>
        this.service.editProjectFavorite(action.projectId, action.remove).pipe(
          switchMap(data=> of(
            updateProjectFavoriteSuccess({projectId:action.projectId, remove:action.remove}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Projekt erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=>
            of(
              showAlert({
                message: 'Projekt Aktualisierung fehlgeschlagen wegen '+error.message,
                actionResult:'fail'
              }),
              loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
