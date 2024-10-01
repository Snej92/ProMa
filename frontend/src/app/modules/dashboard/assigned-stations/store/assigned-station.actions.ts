import {createAction, props} from "@ngrx/store";
import {stationFavViewModel} from "../../../station/store/stationView.model";



export const LOAD_ASSIGNED_STATION_VIEW_SUCCESS='[dashboard page] load assigned station view success'
export const LOAD_ASSIGNED_STATION_VIEW_FAIL='[dashboard page] load assigned station view fail'
export const LOAD_ASSIGNED_STATION_VIEW='[dashboard page] get assigned station view'

export const loadAssignedStationView=createAction(LOAD_ASSIGNED_STATION_VIEW);
export const loadAssignedStationViewSuccess=createAction(LOAD_ASSIGNED_STATION_VIEW_SUCCESS, props<{stationViewList:stationFavViewModel[]}>());
export const loadAssignedStationViewFail=createAction(LOAD_ASSIGNED_STATION_VIEW_FAIL, props<{errorText:any}>());
