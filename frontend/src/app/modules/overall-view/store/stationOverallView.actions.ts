import {createAction, props} from "@ngrx/store";
import {stationOverallViewModel} from "./stationOverallView.model";

export const LOAD_STATION_OVERALL_VIEW_SUCCESS='[station overall view page] load station overall view success'
export const LOAD_STATION_OVERALL_VIEW_FAIL='[station overall view page] load station overall view fail'
export const LOAD_STATION_OVERALL_VIEW='[station overall view page] get station overall view'


export const loadStationOverallView=createAction(LOAD_STATION_OVERALL_VIEW);
export const loadStationOverallViewSuccess=createAction(LOAD_STATION_OVERALL_VIEW_SUCCESS, props<{stationOverallViewList:stationOverallViewModel[]}>());
export const loadStationOverallViewFail=createAction(LOAD_STATION_OVERALL_VIEW_FAIL, props<{errorText:any}>());
