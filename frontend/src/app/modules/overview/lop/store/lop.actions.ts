import {createAction, props} from "@ngrx/store";
import {lopModel} from "./lop.model";


export const UPDATE_LOP='[lop overview page] update lop'
export const UPDATE_LOP_SUCCESS='[lop overview page] update lop success'
export const LOAD_LOP_SUCCESS='[lop overview page] load lop success'
export const LOAD_LOP_FAIL='[lop overview page] load lop fail'
export const LOAD_LOP='[lop overview page] get lop'
export const ADD_LOP_SUCCESS='[lop page] add control success'
export const ADD_LOP='[lop page] add control'
export const DELETE_LOP='[lop page] delete control'
export const DELETE_LOP_SUCCESS='[lop page] delete control success'

export const loadLop=createAction(LOAD_LOP, props<{stationId:number}>());
export const loadLopSuccess=createAction(LOAD_LOP_SUCCESS, props<{lopList:lopModel[]}>())
export const loadLopFail=createAction(LOAD_LOP_FAIL, props<{errorText:any}>())

export const updateLop=createAction(UPDATE_LOP, props<{lopInput:lopModel}>())
export const updateLopSuccess=createAction(UPDATE_LOP_SUCCESS, props<{lopNew:lopModel, lopOld:lopModel}>())

export const addLop = createAction(ADD_LOP, props<{lopInput:lopModel, stationId:number}>())
export const addLopSuccess = createAction(ADD_LOP_SUCCESS, props<{lopInput:lopModel}>())

export const deleteLop=createAction(DELETE_LOP, props<{id:number}>())
export const deleteLopSuccess=createAction(DELETE_LOP_SUCCESS, props<{id:number}>())
