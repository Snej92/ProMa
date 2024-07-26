import {createAction, props} from "@ngrx/store";
import {projectionModel} from "./projection.model";


export const UPDATE_STATION_PROJECTION='[projection overview page] update projection'
export const UPDATE_STATION_PROJECTION_SUCCESS='[projection overview page] update projection success'

export const LOAD_STATION_PROJECTION_SUCCESS='[projection overview page] load projection success'
export const LOAD_STATION_PROJECTION_FAIL='[projection overview page] load projection fail'
export const LOAD_STATION_PROJECTION='[projection overview page] get projection'

export const ADD_STATION_PROJECTION_SUCCESS='[projection stations page] add projection success'
export const ADD_STATION_PROJECTION='[projection stations page] add projection'

export const DELETE_STATION_PROJECTION='[projection stations page] delete projection'
export const DELETE_STATION_PROJECTION_SUCCESS='[projection stations page] delete projection success'

export const loadStationProjection=createAction(LOAD_STATION_PROJECTION, props<{stationId:number}>());
export const loadStationProjectionSuccess=createAction(LOAD_STATION_PROJECTION_SUCCESS, props<{projectionList:projectionModel[]}>())
export const loadStationProjectionFail=createAction(LOAD_STATION_PROJECTION_FAIL, props<{errorText:any}>())

export const updateStationProjection=createAction(UPDATE_STATION_PROJECTION, props<{projectionInput:projectionModel}>())
export const updateStationProjectionSuccess=createAction(
  UPDATE_STATION_PROJECTION_SUCCESS, props<{projectionNew:projectionModel, projectionOld:projectionModel}>())
