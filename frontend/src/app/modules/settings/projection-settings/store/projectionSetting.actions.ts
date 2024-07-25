import {createAction, props} from "@ngrx/store";
import {projectionSettingModel} from "./projectionSetting.model";

export const LOAD_SETTING_PROJECTION_SUCCESS='[projection settings page] load projection success'
export const LOAD_SETTING_PROJECTION_FAIL='[projection settings page] load projection fail'
export const LOAD_SETTING_PROJECTION='[projection settings page] get projection'
export const ADD_SETTING_PROJECTION_SUCCESS='[projection settings page] add projection success'
export const ADD_SETTING_PROJECTION='[projection settings page] add projection'
export const UPDATE_SETTING_PROJECTION='[projection settings page] update projection'
export const UPDATE_SETTING_PROJECTION_SUCCESS='[projection settings page] update projection success'
export const DELETE_SETTING_PROJECTION='[projection settings page] delete projection'
export const DELETE_SETTING_PROJECTION_SUCCESS='[projection settings page] delete projection success'


export const loadSettingProjection=createAction(LOAD_SETTING_PROJECTION);
export const loadSettingProjectionSuccess=createAction(LOAD_SETTING_PROJECTION_SUCCESS, props<{projectionSettingList:projectionSettingModel[]}>())
export const loadSettingProjectionFail=createAction(LOAD_SETTING_PROJECTION_FAIL, props<{errorText:any}>())

export const addSettingProjection = createAction(ADD_SETTING_PROJECTION, props<{projectionSettingInput:projectionSettingModel}>())
export const addSettingProjectionSuccess = createAction(ADD_SETTING_PROJECTION_SUCCESS, props<{projectionSettingInput:projectionSettingModel}>())

export const updateSettingProjection=createAction(UPDATE_SETTING_PROJECTION, props<{projectionSettingInput:projectionSettingModel}>())
export const updateSettingProjectionSuccess=createAction(UPDATE_SETTING_PROJECTION_SUCCESS, props<{projectionSettingInput:projectionSettingModel}>())

export const deleteSettingProjection=createAction(DELETE_SETTING_PROJECTION, props<{id:number}>())
export const deleteSettingProjectionSuccess=createAction(DELETE_SETTING_PROJECTION_SUCCESS, props<{id:number}>())
