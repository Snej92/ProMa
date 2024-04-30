import {createAction, props} from "@ngrx/store";
import {versionModel} from "./version.model";

export const getVersion=createAction('getVersion');
export const addVersion=createAction('addVersion', props<{versionInput:versionModel}>());
export const updateVersion=createAction('updateVersion', props<{versionInput:versionModel}>());
export const deleteVersion=createAction('deleteVersion', props<{id:number}>());
