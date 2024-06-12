import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {
  loadStationLop, loadStationLopFail, loadStationLopSuccess,
  updateStationLopSuccess
} from "./lop.actions";


const _lopReducer = createReducer(
  lopState,

  on(loadStationLop, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationLopSuccess, (state,action) => {
    return{
      ...state,
      lopList:[...action.lopList],
      errorMessage:''
    };
  }),

  on(loadStationLopFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      lopList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationLopSuccess, (state,action) => {
    const lopOld = {...action.lopOld};
    const lopNew = {...action.lopNew};
    const updatedLop = state.lopList.map(lop => {
      return lopOld.id === lop.id?lopNew:lop;
    });
    return {
      ...state,
      lopList: updatedLop
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
