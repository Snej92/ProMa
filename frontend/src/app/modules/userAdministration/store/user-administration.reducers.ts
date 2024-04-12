import {UserAdministrationState} from "./user-administration.state";
import {LoadState} from "../../../core/models/core.models";
import {Action, createReducer, on} from "@ngrx/store";
import * as UserAdministrationActions from "./user-administration.actions"


const initialState : UserAdministrationState = {
  users : [],
  usersLoadState : LoadState.NONE,
  addUserLoadState : LoadState.NONE,
  deleteUserLoadState : LoadState.NONE,
  editUserLoadState : LoadState.NONE,
}

export const _userAdministrationReducer = createReducer(
  initialState,

  //get users
  on(
    UserAdministrationActions.GetUsersActions.do,
    (state, action) => ({
      ...state,
      users : [],
      usersLoadState: LoadState.LOADING,
      addUserLoadState : LoadState.NONE,
      deleteUserLoadState : LoadState.NONE,
      editUserLoadState : LoadState.NONE,
    })
  ),
  on(
    UserAdministrationActions.GetUsersActions.success,
    (state, action) => ({
      ...state,
      users : action.users,
      usersLoadState: LoadState.SUCCESS,
    })
  ),
  on(
    UserAdministrationActions.GetUsersActions.fail,
    (state, action) => ({
      ...state,
      users : [],
      usersLoadState: LoadState.FAILURE,
    })
  ),
)

export function userAdministrationReducer(state: UserAdministrationState, action: Action){
  return _userAdministrationReducer(state, action);
}


export const USER_ADMINISTRATION_STORE_KEY = 'user-administration-store';
