import {createAction, props} from "@ngrx/store";
import {lopModel} from "./lop.model";

export const UPDATE_STATION_LOP='[lop overview page] update lop'
export const UPDATE_STATION_LOP_SUCCESS='[lop overview page] update lop success'
export const LOAD_STATION_LOP_SUCCESS='[lop overview page] load lop success'
export const LOAD_STATION_LOP_FAIL='[lop overview page] load lop fail'
export const LOAD_STATION_LOP='[lop overview page] get lop'

export const loadStationLop=createAction(LOAD_STATION_LOP, props<{stationId:number}>());
export const loadStationLopSuccess=createAction(LOAD_STATION_LOP_SUCCESS, props<{lopList:lopModel[]}>())
export const loadStationLopFail=createAction(LOAD_STATION_LOP_FAIL, props<{errorText:any}>())

export const updateStationLop=createAction(UPDATE_STATION_LOP, props<{lopInput:lopModel}>())
export const updateStationLopSuccess=createAction(UPDATE_STATION_LOP_SUCCESS, props<{lopInput:lopModel}>())
