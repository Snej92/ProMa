import {createAction, props} from "@ngrx/store";
import {lopSettingModel} from "./lopSetting.model";

export const LOAD_SETTING_LOP_SUCCESS='[lop settings page] load lop success'
export const LOAD_SETTING_LOP_FAIL='[lop settings page] load lop fail'
export const LOAD_SETTING_LOP='[lop settings page] get lop'
export const ADD_SETTING_LOP_SUCCESS='[lop settings page] add lop success'
export const ADD_SETTING_LOP='[lop settings page] add lop'
export const UPDATE_SETTING_LOP='[lop settings page] update lop'
export const UPDATE_SETTING_LOP_SUCCESS='[lop settings page] update lop success'
export const DELETE_SETTING_LOP='[lop settings page] delete lop'
export const DELETE_SETTING_LOP_SUCCESS='[lop settings page] delete lop success'


export const loadSettingLop=createAction(LOAD_SETTING_LOP);
export const loadSettingLopSuccess=createAction(LOAD_SETTING_LOP_SUCCESS, props<{lopSettingList:lopSettingModel[]}>())
export const loadSettingLopFail=createAction(LOAD_SETTING_LOP_FAIL, props<{errorText:any}>())

export const addSettingLop = createAction(ADD_SETTING_LOP, props<{lopSettingInput:lopSettingModel}>())
export const addSettingLopSuccess = createAction(ADD_SETTING_LOP_SUCCESS, props<{lopSettingInput:lopSettingModel}>())

export const updateSettingLop=createAction(UPDATE_SETTING_LOP, props<{lopSettingInput:lopSettingModel}>())
export const updateSettingLopSuccess=createAction(UPDATE_SETTING_LOP_SUCCESS, props<{lopSettingInput:lopSettingModel}>())

export const deleteSettingLop=createAction(DELETE_SETTING_LOP, props<{id:number}>())
export const deleteSettingLopSuccess=createAction(DELETE_SETTING_LOP_SUCCESS, props<{id:number}>())
