import {createAction, props} from "@ngrx/store";
import {documentationModel} from "./documentation.model";




export const UPDATE_STATION_DOCUMENTATION='[documentation overview page] update documentation'
export const UPDATE_STATION_DOCUMENTATION_SUCCESS='[documentation overview page] update documentation success'

export const LOAD_STATION_DOCUMENTATION_SUCCESS='[documentation overview page] load documentation success'
export const LOAD_STATION_DOCUMENTATION_FAIL='[documentation overview page] load documentation fail'
export const LOAD_STATION_DOCUMENTATION='[documentation overview page] get documentation'

export const ADD_STATION_DOCUMENTATION_SUCCESS='[documentation stations page] add documentation success'
export const ADD_STATION_DOCUMENTATION='[documentation stations page] add documentation'

export const DELETE_STATION_DOCUMENTATION='[documentation stations page] delete documentation'
export const DELETE_STATION_DOCUMENTATION_SUCCESS='[documentation stations page] delete documentation success'

export const loadStationDocumentation=createAction(LOAD_STATION_DOCUMENTATION, props<{stationId:number}>());
export const loadStationDocumentationSuccess=createAction(LOAD_STATION_DOCUMENTATION_SUCCESS, props<{documentationList:documentationModel[]}>())
export const loadStationDocumentationFail=createAction(LOAD_STATION_DOCUMENTATION_FAIL, props<{errorText:any}>())

export const updateStationDocumentation=createAction(UPDATE_STATION_DOCUMENTATION, props<{documentationStationInput:documentationModel}>())
export const updateStationDocumentationSuccess=createAction(UPDATE_STATION_DOCUMENTATION_SUCCESS, props<{documentationStationInput:documentationModel}>())
