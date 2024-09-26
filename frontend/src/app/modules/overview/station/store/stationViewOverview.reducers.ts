import {createReducer, on} from "@ngrx/store";
import {stationFavViewModelState, stationViewModelState, stationViewOverviewState} from "./stationViewOverview.state";
import {
  loadStationViewOverview,
  loadStationViewOverviewFail,
  loadStationViewOverviewSuccess
} from "./stationViewOverview.actions";



const _stationViewOverviewReducer = createReducer(
  stationViewOverviewState,

  on(loadStationViewOverview, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationViewOverviewSuccess, (state,action) => {
    return{
      ...state,
      stationViewOverview:action.stationViewOverview,
      errorMessage:''
    };
  }),

  on(loadStationViewOverviewFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      stationViewOverview:stationFavViewModelState,
      errorMessage:action.errorText.message
    };
  }),
)

export function stationViewOverviewReducer(state: any , action: any) {
  return _stationViewOverviewReducer(state, action);
}
