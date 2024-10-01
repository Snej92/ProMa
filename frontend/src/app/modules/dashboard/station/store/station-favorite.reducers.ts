import {createReducer, on} from "@ngrx/store";
import {stationFavoriteViewState} from "./station-favorite.state";
import {
  loadStationViewFavorite,
  loadStationViewFavoriteFail,
  loadStationViewFavoriteSuccess, updateDashboardStationFavoriteSuccess
} from "./station-favorite.actions";
import {stationFavViewModel} from "../../../station/store/stationView.model";


const _stationFavoriteReducer = createReducer(
  stationFavoriteViewState,

  on(loadStationViewFavorite, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationViewFavoriteSuccess, (state,action) => {
    return{
      ...state,
      stationViewList:[...action.stationViewList],
      errorMessage:''
    };
  }),

  on(loadStationViewFavoriteFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      stationViewList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateDashboardStationFavoriteSuccess, (state, action) => {
    const updateDashboardStationFavorite=state.stationViewList.filter((data:stationFavViewModel)=>{
      return data.station.id!==action.stationId
    })
    return{
      ...state,
      stationViewList:updateDashboardStationFavorite
    };
  }),
);

export function stationFavoriteViewReducer(state: any , action: any) {
  return _stationFavoriteReducer(state, action);
}
