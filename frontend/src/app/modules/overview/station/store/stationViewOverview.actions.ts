import {createAction, props} from "@ngrx/store";
import {stationFavViewModel} from "../../../station/store/stationView.model";


export const LOAD_STATION_VIEW_OVERVIEW_SUCCESS='[station overview page] load station view overview success'
export const LOAD_STATION_VIEW_OVERVIEW_FAIL='[station overview page] load station view overview fail'
export const LOAD_STATION_VIEW_OVERVIEW='[station overview page] get station overview view'

export const loadStationViewOverview=createAction(LOAD_STATION_VIEW_OVERVIEW, props<{id:number}>());
export const loadStationViewOverviewSuccess=createAction(LOAD_STATION_VIEW_OVERVIEW_SUCCESS, props<{stationViewOverview:stationFavViewModel}>());
export const loadStationViewOverviewFail=createAction(LOAD_STATION_VIEW_OVERVIEW_FAIL, props<{errorText:any}>());
