import {createAction, props} from "@ngrx/store";
import {headerDataSettingModel} from "./headerDataSetting.model";

export const LOAD_SETTING_HEADER_DATA_SUCCESS='[headerData settings page] load headerData success'
export const LOAD_SETTING_HEADER_DATA_FAIL='[headerData settings page] load headerData fail'
export const LOAD_SETTING_HEADER_DATA='[headerData settings page] get headerData'
export const ADD_SETTING_HEADER_DATA_SUCCESS='[headerData settings page] add headerData success'
export const ADD_SETTING_HEADER_DATA='[headerData settings page] add headerData'
export const UPDATE_SETTING_HEADER_DATA='[headerData settings page] update headerData'
export const UPDATE_SETTING_HEADER_DATA_SUCCESS='[headerData settings page] update headerData success'
export const DELETE_SETTING_HEADER_DATA='[headerData settings page] delete headerData'
export const DELETE_SETTING_HEADER_DATA_SUCCESS='[headerData settings page] delete headerData success'


export const loadSettingHeaderData=createAction(LOAD_SETTING_HEADER_DATA);
export const loadSettingHeaderDataSuccess=createAction(LOAD_SETTING_HEADER_DATA_SUCCESS, props<{headerDataSettingList:headerDataSettingModel[]}>())
export const loadSettingHeaderDataFail=createAction(LOAD_SETTING_HEADER_DATA_FAIL, props<{errorText:any}>())

export const addSettingHeaderData = createAction(ADD_SETTING_HEADER_DATA, props<{headerDataSettingInput:headerDataSettingModel}>())
export const addSettingHeaderDataSuccess = createAction(ADD_SETTING_HEADER_DATA_SUCCESS, props<{headerDataSettingInput:headerDataSettingModel}>())

export const updateSettingHeaderData=createAction(UPDATE_SETTING_HEADER_DATA, props<{headerDataSettingInput:headerDataSettingModel}>())
export const updateSettingHeaderDataSuccess=createAction(UPDATE_SETTING_HEADER_DATA_SUCCESS, props<{headerDataSettingInput:headerDataSettingModel}>())

export const deleteSettingHeaderData=createAction(DELETE_SETTING_HEADER_DATA, props<{id:number}>())
export const deleteSettingHeaderDataSuccess=createAction(DELETE_SETTING_HEADER_DATA_SUCCESS, props<{id:number}>())
