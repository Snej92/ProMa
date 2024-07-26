import {createAction, props} from "@ngrx/store";
import {controlModel} from "./control.model";




export const UPDATE_STATION_CONTROL='[control overview page] update control'
export const UPDATE_STATION_CONTROL_SUCCESS='[control overview page] update control success'

export const LOAD_STATION_CONTROL_SUCCESS='[control overview page] load control success'
export const LOAD_STATION_CONTROL_FAIL='[control overview page] load control fail'
export const LOAD_STATION_CONTROL='[control overview page] get control'

export const ADD_STATION_CONTROL_SUCCESS='[control stations page] add control success'
export const ADD_STATION_CONTROL='[control stations page] add control'

export const DELETE_STATION_CONTROL='[control stations page] delete control'
export const DELETE_STATION_CONTROL_SUCCESS='[control stations page] delete control success'

export const loadStationControl=createAction(LOAD_STATION_CONTROL, props<{stationId:number}>());
export const loadStationControlSuccess=createAction(LOAD_STATION_CONTROL_SUCCESS, props<{controlList:controlModel[]}>())
export const loadStationControlFail=createAction(LOAD_STATION_CONTROL_FAIL, props<{errorText:any}>())

export const updateStationControl=createAction(UPDATE_STATION_CONTROL, props<{controlInput:controlModel}>())
export const updateStationControlSuccess=createAction(
  UPDATE_STATION_CONTROL_SUCCESS, props<{controlNew:controlModel, controlOld:controlModel}>())
