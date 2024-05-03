import {createAction, props} from "@ngrx/store";



export const SHOW_ALERT='[app event] show alert'
export const EMPTY_ACTION='[app event] empty'

export const LOAD_SPINNER='[app event] load spinner'

export const showAlert=createAction(SHOW_ALERT, props<{message:string, actionResult:string}>());
export const emptyAction=createAction(EMPTY_ACTION);

export const loadSpinner=createAction(LOAD_SPINNER, props<{isLoading:boolean}>())
