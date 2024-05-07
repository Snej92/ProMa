import {createAction, props} from "@ngrx/store";
import {userModel} from "./user-Administration.model";


export const LOAD_USER_SUCCESS='[user page] load user success'
export const LOAD_USER_FAIL='[user page] load user fail'
export const LOAD_USER='[user page] get user'

export const ADD_USER_SUCCESS='[user page] add user success'
export const ADD_USER='[user page] add user'

export const UPDATE_USER='[user page] update user'
export const UPDATE_USER_SUCCESS='[user page] update user success'

export const DELETE_USER='[user page] delete lop'
export const DELETE_USER_SUCCESS='[user page] delete user success'


export const loadUser=createAction(LOAD_USER);
export const loadUserSuccess=createAction(LOAD_USER_SUCCESS, props<{userList:userModel[]}>())
export const loadUserFail=createAction(LOAD_USER_FAIL, props<{errorText:any}>())

export const addUser = createAction(ADD_USER, props<{userInput:userModel}>())
export const addUserSuccess = createAction(ADD_USER_SUCCESS, props<{userInput:userModel}>())

export const updateUser=createAction(UPDATE_USER, props<{userInput:userModel}>())
export const updateUserSuccess=createAction(UPDATE_USER_SUCCESS, props<{userNew:userModel, userOld:userModel}>())

export const deleteUser=createAction(DELETE_USER, props<{sub:string}>())
export const deleteUserSuccess=createAction(DELETE_USER_SUCCESS, props<{sub:string}>())
