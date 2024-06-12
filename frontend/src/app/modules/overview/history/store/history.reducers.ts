import {createReducer, on} from "@ngrx/store";
import {
  addStationHistorySuccess,
  loadStationHistory,
  loadStationHistoryFail,
  loadStationHistorySuccess
} from "./history.actions";
import {historyState} from "./history.state";
import {addProjectViewSuccess} from "../../../project-administration/store/project-administration.actions";

const _historyReducer = createReducer(
  historyState,

  on(loadStationHistory, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationHistorySuccess, (state,action) => {
    return{
      ...state,
      historyList:[...action.historyList],
      errorMessage:''
    };
  }),

  on(loadStationHistoryFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      historyList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(addStationHistorySuccess, (state,action) => {
    const history={...action.historyInput};
    return{
      ...state,
      historyList:[...state.historyList,history]
    };
  }),
);

export function historyReducer(state: any , action: any) {
  return _historyReducer(state, action);
}
