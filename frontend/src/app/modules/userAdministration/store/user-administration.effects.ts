import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {LOAD_USER, loadUserFail, loadUserSuccess} from "./user-administration.actions";
import {UserService} from "../services/user.service";
import {loadSpinner} from "../../../core/store/app.action";


@Injectable()
export class UserAdministrationEffects{
  constructor(private action$:Actions,
              private service:UserService) {

  }

  _getUser=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_USER),
      switchMap(action=>
        this.service.getAllUsers().pipe(
          switchMap(data=> of(
            loadUserSuccess({userList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadUserFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );
}

