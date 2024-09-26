import {createAction, props} from "@ngrx/store";
import {stationFavViewModel} from "../../../station/store/stationView.model";



export const LOAD_STATION_VIEW_FAVORITE_SUCCESS='[dashboard page] load station view favorite success'
export const LOAD_STATION_VIEW_FAVORITE_FAIL='[dashboard page] load station view favorite fail'
export const LOAD_STATION_VIEW_FAVORITE='[dashboard page] get station view favorite'

export const UPDATE_STATION_FAVORITE='[dashboard page] update station'

export const updateStationFavorite=createAction(UPDATE_STATION_FAVORITE, props<{stationId:number, remove:boolean}>())

export const loadStationViewFavorite=createAction(LOAD_STATION_VIEW_FAVORITE);
export const loadStationViewFavoriteSuccess=createAction(LOAD_STATION_VIEW_FAVORITE_SUCCESS, props<{stationViewList:stationFavViewModel[]}>());
export const loadStationViewFavoriteFail=createAction(LOAD_STATION_VIEW_FAVORITE_FAIL, props<{errorText:any}>());
