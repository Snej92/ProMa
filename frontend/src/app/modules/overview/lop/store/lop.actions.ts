import {createAction, props} from "@ngrx/store";
import {lopModel} from "./lop.model";

export const LOAD_LOP_SUCCESS='[lop page] load lop success'
export const LOAD_LOP='[lop page] get lop'


export const loadLop=createAction(LOAD_LOP);
export const loadLopSuccess=createAction(LOAD_LOP_SUCCESS, props<{lopList:lopModel[]}>())
