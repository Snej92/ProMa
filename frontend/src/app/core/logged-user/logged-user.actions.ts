import {createAction, props} from "@ngrx/store";
import {userModel} from "../../modules/userAdministration/store/user-Administration.model";

export const LOAD_LOGGED_USER_SUCCESS='[logged user] load logged user success'
export const LOAD_LOGGED_USER_FAIL='[logged user] load logged user fail'
export const LOAD_LOGGED_USER='[logged user] get logged user'

export const UPDATE_LOGGED_USER='[logged user] update logged user project'
export const UPDATE_LOGGED_USER_SUCCESS='[logged user] update logged user project success'

export const loadLoggedUser=createAction(LOAD_LOGGED_USER);
export const loadLoggedUserSuccess=createAction(LOAD_LOGGED_USER_SUCCESS, props<{loggedUser:userModel}>())
export const loadLoggedUserFail=createAction(LOAD_LOGGED_USER_FAIL, props<{errorText:any}>())

export const updateLoggedUser=createAction(UPDATE_LOGGED_USER, props<{loggedUser:userModel}>())
export const updateLoggedUserSuccess=createAction(UPDATE_LOGGED_USER_SUCCESS, props<{loggedUser:userModel}>())
