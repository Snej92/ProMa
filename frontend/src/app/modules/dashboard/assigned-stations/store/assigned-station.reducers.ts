import {createReducer, on} from "@ngrx/store";
import {assignedStationViewState} from "./assigned-station.state";
import {
  loadAssignedStationView, loadAssignedStationViewFail, loadAssignedStationViewSuccess,
} from "./assigned-station.actions";


const _assignedStationReducer = createReducer(
  assignedStationViewState,

  on(loadAssignedStationView, (state) => {
    return{
      ...state
    };
  }),

  on(loadAssignedStationViewSuccess, (state,action) => {
    return{
      ...state,
      stationViewList:[...action.stationViewList],
      errorMessage:''
    };
  }),

  on(loadAssignedStationViewFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      stationViewList:[],
      errorMessage:action.errorText.message
    };
  }),
);

export function assignedStationViewReducer(state: any , action: any) {
  return _assignedStationReducer(state, action);
}
