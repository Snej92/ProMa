import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {
  addUser,
  addUserSuccess, deleteUser, deleteUserSuccess,
  LOAD_USER,
  loadUserFail,
  loadUserSuccess,
  updateUser, updateUserSuccess
} from "./user-administration.actions";
import {UserService} from "../services/user.service";
import {loadSpinner, showAlert} from "../../../core/store/app.action";
import {userModel} from "./user-Administration.model";


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

  _addUser=createEffect(()=>
    this.action$.pipe(
      ofType(addUser),
      switchMap(action=>
        this.service.addUser(action.userInput).pipe(
          switchMap(data=> of(
            addUserSuccess({userInput:data as userModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Benutzer Erfolgreich hinzugefügt', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Benutzer Hinzufügen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _updateUser=createEffect(()=>
    this.action$.pipe(
      ofType(updateUser),
      switchMap(action =>
        this.service.updateUser(action.userInput).pipe(
          switchMap(data=> of(
            updateUserSuccess({userNew:data as userModel, userOld:action.userInput}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Benutzer erfolgreich aktualisiert', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Benutzer Aktualisierung fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteUser=createEffect(()=>
    this.action$.pipe(
      ofType(deleteUser),
      switchMap(action=>
        this.service.deleteUser(action.sub).pipe(
          switchMap(res=>of(
            deleteUserSuccess({sub:action.sub}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Benutzer erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Benutzer löschen fehlgeschlagen wegen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
