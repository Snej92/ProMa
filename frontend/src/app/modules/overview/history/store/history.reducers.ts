import {createReducer, on} from "@ngrx/store";
import {
  addStationHistorySuccess,
  loadStationHistory,
  loadStationHistoryFail,
  loadStationHistorySuccess, updateStationHistory, updateStationHistorySuccess
} from "./history.actions";
import {historyState} from "./history.state";
import {addProjectViewSuccess} from "../../../project-administration/store/project-administration.actions";
import {updateVersionSuccess} from "../../../settings/version/store/version.actions";

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
      historyList:[history, ...state.historyList]
    };
  }),

  on(updateStationHistorySuccess, (state,action) => {
    const historyOld={...action.historyOld};
    const historyNew={...action.historyNew};
    const updatedHistory=state.historyList.map(history=>{
      return historyOld.id===history.id?historyNew:history;
    });
    return{
      ...state,
      historyList:updatedHistory
    };
  }),
);

export function historyReducer(state: any , action: any) {
  return _historyReducer(state, action);
}
