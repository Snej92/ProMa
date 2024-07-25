import {createAction, props} from "@ngrx/store";
import {technicalDataModel} from "./technicalData.model";


export const UPDATE_STATION_HEADER_DATA='[technicalData overview page] update technicalData'
export const UPDATE_STATION_HEADER_DATA_SUCCESS='[technicalData overview page] update technicalData success'

export const LOAD_STATION_HEADER_DATA_SUCCESS='[technicalData overview page] load technicalData success'
export const LOAD_STATION_HEADER_DATA_FAIL='[technicalData overview page] load technicalData fail'
export const LOAD_STATION_HEADER_DATA='[technicalData overview page] get technicalData'

export const ADD_STATION_HEADER_DATA_SUCCESS='[technicalData stations page] add technicalData success'
export const ADD_STATION_HEADER_DATA='[technicalData stations page] add technicalData'

export const DELETE_STATION_HEADER_DATA='[technicalData stations page] delete technicalData'
export const DELETE_STATION_HEADER_DATA_SUCCESS='[technicalData stations page] delete technicalData success'

export const loadStationTechnicalData=createAction(LOAD_STATION_HEADER_DATA, props<{stationId:number}>());
export const loadStationTechnicalDataSuccess=createAction(LOAD_STATION_HEADER_DATA_SUCCESS, props<{technicalDataList:technicalDataModel[]}>())
export const loadStationTechnicalDataFail=createAction(LOAD_STATION_HEADER_DATA_FAIL, props<{errorText:any}>())

export const updateStationTechnicalData=createAction(UPDATE_STATION_HEADER_DATA, props<{technicalDataStationInput:technicalDataModel}>())
export const updateStationTechnicalDataSuccess=createAction(UPDATE_STATION_HEADER_DATA_SUCCESS, props<{technicalDataStationInput:technicalDataModel}>())
