import {createAction, props} from "@ngrx/store";
import {specificationModel} from "./specification.model";




export const UPDATE_STATION_SPECIFICATION='[specification overview page] update specification'
export const UPDATE_STATION_SPECIFICATION_SUCCESS='[specification overview page] update specification success'

export const LOAD_STATION_SPECIFICATION_SUCCESS='[specification overview page] load specification success'
export const LOAD_STATION_SPECIFICATION_FAIL='[specification overview page] load specification fail'
export const LOAD_STATION_SPECIFICATION='[specification overview page] get specification'

export const ADD_STATION_SPECIFICATION_SUCCESS='[specification stations page] add specification success'
export const ADD_STATION_SPECIFICATION='[specification stations page] add specification'

export const DELETE_STATION_SPECIFICATION='[specification stations page] delete specification'
export const DELETE_STATION_SPECIFICATION_SUCCESS='[specification stations page] delete specification success'

export const loadStationSpecification=createAction(LOAD_STATION_SPECIFICATION, props<{stationId:number}>());
export const loadStationSpecificationSuccess=createAction(LOAD_STATION_SPECIFICATION_SUCCESS, props<{specificationList:specificationModel[]}>())
export const loadStationSpecificationFail=createAction(LOAD_STATION_SPECIFICATION_FAIL, props<{errorText:any}>())

export const updateStationSpecification=createAction(UPDATE_STATION_SPECIFICATION, props<{specificationStationInput:specificationModel}>())
export const updateStationSpecificationSuccess=createAction(UPDATE_STATION_SPECIFICATION_SUCCESS, props<{specificationStationInput:specificationModel}>())
