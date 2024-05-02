import {createAction, props} from "@ngrx/store";
import {lopModel} from "./lop.model";

export const LOAD_LOP_SUCCESS='[lop page] load lop success'
export const LOAD_LOP_FAIL='[lop page] load lop fail'
export const LOAD_LOP='[lop page] get lop'
export const ADD_LOP_SUCCESS='[lop page] add lop success'
export const ADD_LOP='[lop page] add lop'
export const UPDATE_LOP='[lop page] update lop'
export const UPDATE_LOP_SUCCESS='[lop page] update lop'


export const loadLop=createAction(LOAD_LOP);
export const loadLopSuccess=createAction(LOAD_LOP_SUCCESS, props<{lopList:lopModel[]}>())
export const loadLopFail=createAction(LOAD_LOP_FAIL, props<{errorText:any}>())

export const addLop = createAction(ADD_LOP, props<{lopInput:lopModel}>())
export const addLopSuccess = createAction(ADD_LOP_SUCCESS, props<{lopInput:lopModel}>())

export const updateLop=createAction(ADD_LOP, props<{lopInput:lopModel}>())
