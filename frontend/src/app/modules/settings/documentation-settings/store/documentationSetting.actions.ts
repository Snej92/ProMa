import {createAction, props} from "@ngrx/store";
import {documentationSettingModel} from "./documentationSetting.model";

export const LOAD_SETTING_DOCUMENTATION_SUCCESS='[documentation settings page] load documentation success'
export const LOAD_SETTING_DOCUMENTATION_FAIL='[documentation settings page] load documentation fail'
export const LOAD_SETTING_DOCUMENTATION='[documentation settings page] get documentation'
export const ADD_SETTING_DOCUMENTATION_SUCCESS='[documentation settings page] add documentation success'
export const ADD_SETTING_DOCUMENTATION='[documentation settings page] add documentation'
export const UPDATE_SETTING_DOCUMENTATION='[documentation settings page] update documentation'
export const UPDATE_SETTING_DOCUMENTATION_SUCCESS='[documentation settings page] update documentation success'
export const DELETE_SETTING_DOCUMENTATION='[documentation settings page] delete documentation'
export const DELETE_SETTING_DOCUMENTATION_SUCCESS='[documentation settings page] delete documentation success'


export const loadSettingDocumentation=createAction(LOAD_SETTING_DOCUMENTATION);
export const loadSettingDocumentationSuccess=createAction(LOAD_SETTING_DOCUMENTATION_SUCCESS, props<{documentationSettingList:documentationSettingModel[]}>())
export const loadSettingDocumentationFail=createAction(LOAD_SETTING_DOCUMENTATION_FAIL, props<{errorText:any}>())

export const addSettingDocumentation = createAction(ADD_SETTING_DOCUMENTATION, props<{documentationSettingInput:documentationSettingModel}>())
export const addSettingDocumentationSuccess = createAction(ADD_SETTING_DOCUMENTATION_SUCCESS, props<{documentationSettingInput:documentationSettingModel}>())

export const updateSettingDocumentation=createAction(UPDATE_SETTING_DOCUMENTATION, props<{documentationSettingInput:documentationSettingModel}>())
export const updateSettingDocumentationSuccess=createAction(UPDATE_SETTING_DOCUMENTATION_SUCCESS, props<{documentationSettingInput:documentationSettingModel}>())

export const deleteSettingDocumentation=createAction(DELETE_SETTING_DOCUMENTATION, props<{id:number}>())
export const deleteSettingDocumentationSuccess=createAction(DELETE_SETTING_DOCUMENTATION_SUCCESS, props<{id:number}>())
