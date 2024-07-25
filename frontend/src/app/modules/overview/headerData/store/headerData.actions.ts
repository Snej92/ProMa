import {createAction, props} from "@ngrx/store";
import {headerDataModel} from "./headerData.model";


export const UPDATE_STATION_HEADER_DATA='[headerData overview page] update headerData'
export const UPDATE_STATION_HEADER_DATA_SUCCESS='[headerData overview page] update headerData success'

export const LOAD_STATION_HEADER_DATA_SUCCESS='[headerData overview page] load headerData success'
export const LOAD_STATION_HEADER_DATA_FAIL='[headerData overview page] load headerData fail'
export const LOAD_STATION_HEADER_DATA='[headerData overview page] get headerData'

export const ADD_STATION_HEADER_DATA_SUCCESS='[headerData stations page] add headerData success'
export const ADD_STATION_HEADER_DATA='[headerData stations page] add headerData'

export const DELETE_STATION_HEADER_DATA='[headerData stations page] delete headerData'
export const DELETE_STATION_HEADER_DATA_SUCCESS='[headerData stations page] delete headerData success'

export const loadStationHeaderData=createAction(LOAD_STATION_HEADER_DATA, props<{stationId:number}>());
export const loadStationHeaderDataSuccess=createAction(LOAD_STATION_HEADER_DATA_SUCCESS, props<{headerDataList:headerDataModel[]}>())
export const loadStationHeaderDataFail=createAction(LOAD_STATION_HEADER_DATA_FAIL, props<{errorText:any}>())

export const updateStationHeaderData=createAction(UPDATE_STATION_HEADER_DATA, props<{headerDataStationInput:headerDataModel}>())
export const updateStationHeaderDataSuccess=createAction(UPDATE_STATION_HEADER_DATA_SUCCESS, props<{headerDataStationInput:headerDataModel}>())
