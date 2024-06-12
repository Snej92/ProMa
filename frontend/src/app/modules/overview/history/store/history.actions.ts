import {createAction, props} from "@ngrx/store";
import {historyModel} from "./history.model";


export const UPDATE_STATION_HISTORY='[history overview page] update history'
export const UPDATE_STATION_HISTORY_SUCCESS='[history overview page] update history success'

export const LOAD_STATION_HISTORY_SUCCESS='[history overview page] load history success'
export const LOAD_STATION_HISTORY_FAIL='[history overview page] load history fail'
export const LOAD_STATION_HISTORY='[history overview page] get history'

export const ADD_STATION_HISTORY_SUCCESS='[history settings page] add history success'
export const ADD_STATION_HISTORY='[history settings page] add history'

export const DELETE_STATION_HISTORY='[history settings page] delete history'
export const DELETE_STATION_HISTORY_SUCCESS='[history settings page] delete history success'

export const loadStationHistory=createAction(LOAD_STATION_HISTORY, props<{stationId:number}>());
export const loadStationHistorySuccess=createAction(LOAD_STATION_HISTORY_SUCCESS, props<{historyList:historyModel[]}>())
export const loadStationHistoryFail=createAction(LOAD_STATION_HISTORY_FAIL, props<{errorText:any}>())

export const updateStationHistory=createAction(UPDATE_STATION_HISTORY, props<{historyInput:historyModel}>())
export const updateStationHistorySuccess=createAction(UPDATE_STATION_HISTORY_SUCCESS, props<{historyNew:historyModel, historyOld:historyModel}>())

export const addStationHistory = createAction(ADD_STATION_HISTORY, props<{historyInput:historyModel, stationId:number}>())
export const addStationHistorySuccess = createAction(ADD_STATION_HISTORY_SUCCESS, props<{historyInput:historyModel}>())

export const deleteStationHistory=createAction(DELETE_STATION_HISTORY, props<{id:number}>())
export const deleteStationHistorySuccess=createAction(DELETE_STATION_HISTORY_SUCCESS, props<{id:number}>())
