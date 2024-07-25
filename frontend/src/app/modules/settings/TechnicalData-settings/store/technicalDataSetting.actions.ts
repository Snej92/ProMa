import {createAction, props} from "@ngrx/store";
import {technicalDataSettingModel} from "./technicalDataSetting.model";

export const LOAD_SETTING_TECHNICAL_DATA_SUCCESS='[technicalData settings page] load technicalData success'
export const LOAD_SETTING_TECHNICAL_DATA_FAIL='[technicalData settings page] load technicalData fail'
export const LOAD_SETTING_TECHNICAL_DATA='[technicalData settings page] get technicalData'
export const ADD_SETTING_TECHNICAL_DATA_SUCCESS='[technicalData settings page] add technicalData success'
export const ADD_SETTING_TECHNICAL_DATA='[technicalData settings page] add technicalData'
export const UPDATE_SETTING_TECHNICAL_DATA='[technicalData settings page] update technicalData'
export const UPDATE_SETTING_TECHNICAL_DATA_SUCCESS='[technicalData settings page] update technicalData success'
export const DELETE_SETTING_TECHNICAL_DATA='[technicalData settings page] delete technicalData'
export const DELETE_SETTING_TECHNICAL_DATA_SUCCESS='[technicalData settings page] delete technicalData success'


export const loadSettingTechnicalData=createAction(LOAD_SETTING_TECHNICAL_DATA);
export const loadSettingTechnicalDataSuccess=createAction(LOAD_SETTING_TECHNICAL_DATA_SUCCESS, props<{technicalDataSettingList:technicalDataSettingModel[]}>())
export const loadSettingTechnicalDataFail=createAction(LOAD_SETTING_TECHNICAL_DATA_FAIL, props<{errorText:any}>())

export const addSettingTechnicalData = createAction(ADD_SETTING_TECHNICAL_DATA, props<{technicalDataSettingInput:technicalDataSettingModel}>())
export const addSettingTechnicalDataSuccess = createAction(ADD_SETTING_TECHNICAL_DATA_SUCCESS, props<{technicalDataSettingInput:technicalDataSettingModel}>())

export const updateSettingTechnicalData=createAction(UPDATE_SETTING_TECHNICAL_DATA, props<{technicalDataSettingInput:technicalDataSettingModel}>())
export const updateSettingTechnicalDataSuccess=createAction(UPDATE_SETTING_TECHNICAL_DATA_SUCCESS, props<{technicalDataSettingInput:technicalDataSettingModel}>())

export const deleteSettingTechnicalData=createAction(DELETE_SETTING_TECHNICAL_DATA, props<{id:number}>())
export const deleteSettingTechnicalDataSuccess=createAction(DELETE_SETTING_TECHNICAL_DATA_SUCCESS, props<{id:number}>())
