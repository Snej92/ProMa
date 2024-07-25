import {createAction, props} from "@ngrx/store";
import {controlSettingModel} from "./controlSetting.model";

export const LOAD_SETTING_CONTROL_SUCCESS='[control settings page] load control success'
export const LOAD_SETTING_CONTROL_FAIL='[control settings page] load control fail'
export const LOAD_SETTING_CONTROL='[control settings page] get control'
export const ADD_SETTING_CONTROL_SUCCESS='[control settings page] add control success'
export const ADD_SETTING_CONTROL='[control settings page] add control'
export const UPDATE_SETTING_CONTROL='[control settings page] update control'
export const UPDATE_SETTING_CONTROL_SUCCESS='[control settings page] update control success'
export const DELETE_SETTING_CONTROL='[control settings page] delete control'
export const DELETE_SETTING_CONTROL_SUCCESS='[control settings page] delete control success'


export const loadSettingControl=createAction(LOAD_SETTING_CONTROL);
export const loadSettingControlSuccess=createAction(LOAD_SETTING_CONTROL_SUCCESS, props<{controlSettingList:controlSettingModel[]}>())
export const loadSettingControlFail=createAction(LOAD_SETTING_CONTROL_FAIL, props<{errorText:any}>())

export const addSettingControl = createAction(ADD_SETTING_CONTROL, props<{controlSettingInput:controlSettingModel}>())
export const addSettingControlSuccess = createAction(ADD_SETTING_CONTROL_SUCCESS, props<{controlSettingInput:controlSettingModel}>())

export const updateSettingControl=createAction(UPDATE_SETTING_CONTROL, props<{controlSettingInput:controlSettingModel}>())
export const updateSettingControlSuccess=createAction(UPDATE_SETTING_CONTROL_SUCCESS, props<{controlSettingInput:controlSettingModel}>())

export const deleteSettingControl=createAction(DELETE_SETTING_CONTROL, props<{id:number}>())
export const deleteSettingControlSuccess=createAction(DELETE_SETTING_CONTROL_SUCCESS, props<{id:number}>())
