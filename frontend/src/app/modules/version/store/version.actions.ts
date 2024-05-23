import {createAction, props} from "@ngrx/store";
import {versionModel, versionStationModel} from "./version.model";

export const LOAD_VERSION_SUCCESS='[version page] load version success'
export const LOAD_VERSION_FAIL='[version page] load version fail'
export const LOAD_VERSION='[version page] get version view'

export const ADD_VERSION_SUCCESS='[version page] add version success'
export const ADD_VERSION='[version page] add version'

export const UPDATE_VERSION='[version page] update version'
export const UPDATE_VERSION_SUCCESS='[version page] update version success'

export const DELETE_VERSION='[version page] delete version'
export const DELETE_VERSION_SUCCESS='[version page] delete version success'

export const loadVersion=createAction(LOAD_VERSION);
export const loadVersionSuccess=createAction(LOAD_VERSION_SUCCESS, props<{versionList:versionModel[]}>());
export const loadVersionFail=createAction(LOAD_VERSION_FAIL, props<{errorText:any}>());

export const addVersion = createAction(ADD_VERSION, props<{versionInput:versionModel}>())
export const addVersionSuccess = createAction(ADD_VERSION_SUCCESS, props<{versionInput:versionModel}>())

export const updateVersion=createAction(UPDATE_VERSION, props<{versionInput:versionModel}>())
export const updateVersionSuccess=createAction(UPDATE_VERSION_SUCCESS, props<{versionNew:versionModel, versionOld:versionModel}>())

export const deleteVersion=createAction(DELETE_VERSION, props<{id:number}>())
export const deleteVersionSuccess=createAction(DELETE_VERSION_SUCCESS, props<{id:number}>())



export const loadVersionSuccess2=createAction(LOAD_VERSION_SUCCESS, props<{versionStation:versionStationModel[]}>());
