import {createReducer, on} from "@ngrx/store";
import {stationFavViewModelState, stationViewModelState, stationViewOverviewState} from "./stationViewOverview.state";
import {
  loadStationViewOverview,
  loadStationViewOverviewFail,
  loadStationViewOverviewSuccess, updateStationViewNoteSuccess
} from "./stationViewOverview.actions";
import {updateSettingControlSuccess} from "../../../settings/control-settings/store/controlSetting.actions";



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

  on(updateStationViewNoteSuccess, (state,action) => {
    return{
      ...state,
      stationViewOverview:action.stationViewInput,
      errorMessage:''
    };
  }),
)

export function stationViewOverviewReducer(state: any , action: any) {
  return _stationViewOverviewReducer(state, action);
}
