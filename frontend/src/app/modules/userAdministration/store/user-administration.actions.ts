import {createAction, props} from "@ngrx/store";
import {userModel} from "./user-Administration.model";


export const LOAD_USER_SUCCESS='[user page] load user success'
export const LOAD_USER_FAIL='[user page] load user fail'
export const LOAD_USER='[user page] get user'


export const loadUser=createAction(LOAD_USER);
export const loadUserSuccess=createAction(LOAD_USER_SUCCESS, props<{userList:userModel[]}>())
export const loadUserFail=createAction(LOAD_USER_FAIL, props<{errorText:any}>())
