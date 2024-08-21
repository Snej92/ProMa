import {createAction, props} from "@ngrx/store";
import {additionalHeaderDataModel, stationViewModel} from "./stationView.model";

export const LOAD_STATION_VIEW_SUCCESS='[station page] load station view success'
export const LOAD_STATION_VIEW_FAIL='[station page] load station view fail'
export const LOAD_STATION_VIEW='[station page] get station view'

export const ADD_STATION_SUCCESS='[station page] add station success'
export const ADD_STATION='[station page] add station'

export const UPDATE_STATION='[station page] update station'
export const UPDATE_STATION_SUCCESS='[station page] update station success'

export const DELETE_STATION='[station page] delete station'
export const DELETE_STATION_SUCCESS='[station page] delete station success'


export const loadStationView=createAction(LOAD_STATION_VIEW);
export const loadStationViewSuccess=createAction(LOAD_STATION_VIEW_SUCCESS, props<{stationViewList:stationViewModel[]}>());
export const loadStationViewFail=createAction(LOAD_STATION_VIEW_FAIL, props<{errorText:any}>());

export const addStationView = createAction(ADD_STATION, props<{stationViewInput:stationViewModel, headerDataInput:additionalHeaderDataModel[]}>())
export const addStationViewSuccess = createAction(ADD_STATION_SUCCESS, props<{stationViewInput:stationViewModel}>())

export const updateStation=createAction(UPDATE_STATION, props<{stationViewInput:stationViewModel}>())
export const updateStationSuccess=createAction(UPDATE_STATION_SUCCESS, props<{stationViewNew:stationViewModel, stationViewOld:stationViewModel}>())

export const deleteStation=createAction(DELETE_STATION, props<{id:number}>())
export const deleteStationSuccess=createAction(DELETE_STATION_SUCCESS, props<{id:number}>())

