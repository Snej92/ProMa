import {createAction, props} from "@ngrx/store";
import {specificationSettingModel} from "./specificationSetting.model";

export const LOAD_SETTING_SPECIFICATION_SUCCESS='[specification settings page] load specification success'
export const LOAD_SETTING_SPECIFICATION_FAIL='[specification settings page] load specification fail'
export const LOAD_SETTING_SPECIFICATION='[specification settings page] get specification'
export const ADD_SETTING_SPECIFICATION_SUCCESS='[specification settings page] add specification success'
export const ADD_SETTING_SPECIFICATION='[specification settings page] add specification'
export const UPDATE_SETTING_SPECIFICATION='[specification settings page] update specification'
export const UPDATE_SETTING_SPECIFICATION_SUCCESS='[specification settings page] update specification success'
export const DELETE_SETTING_SPECIFICATION='[specification settings page] delete specification'
export const DELETE_SETTING_SPECIFICATION_SUCCESS='[specification settings page] delete specification success'


export const loadSettingSpecification=createAction(LOAD_SETTING_SPECIFICATION);
export const loadSettingSpecificationSuccess=createAction(LOAD_SETTING_SPECIFICATION_SUCCESS, props<{specificationSettingList:specificationSettingModel[]}>())
export const loadSettingSpecificationFail=createAction(LOAD_SETTING_SPECIFICATION_FAIL, props<{errorText:any}>())

export const addSettingSpecification = createAction(ADD_SETTING_SPECIFICATION, props<{specificationSettingInput:specificationSettingModel}>())
export const addSettingSpecificationSuccess = createAction(ADD_SETTING_SPECIFICATION_SUCCESS, props<{specificationSettingInput:specificationSettingModel}>())

export const updateSettingSpecification=createAction(UPDATE_SETTING_SPECIFICATION, props<{specificationSettingInput:specificationSettingModel}>())
export const updateSettingSpecificationSuccess=createAction(UPDATE_SETTING_SPECIFICATION_SUCCESS, props<{specificationSettingInput:specificationSettingModel}>())

export const deleteSettingSpecification=createAction(DELETE_SETTING_SPECIFICATION, props<{id:number}>())
export const deleteSettingSpecificationSuccess=createAction(DELETE_SETTING_SPECIFICATION_SUCCESS, props<{id:number}>())
