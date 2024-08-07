import {createReducer, on} from "@ngrx/store";
import {stationOverallViewState} from "./stationOverallView.state";
import {
  loadStationOverallView,
  loadStationOverallViewFail,
  loadStationOverallViewSuccess
} from "./stationOverallView.actions";

const _stationOverallViewReducer = createReducer(
  stationOverallViewState,

  on(loadStationOverallView, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationOverallViewSuccess, (state,action) => {
    return{
      ...state,
      stationOverallViewList:[...action.stationOverallViewList],
      errorMessage:''
    };
  }),

  on(loadStationOverallViewFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      stationOverallViewList:[],
      errorMessage:action.errorText.message
    };
  }),
);

export function stationOverallViewReducer(state: any , action: any) {
  return _stationOverallViewReducer(state, action);
}
