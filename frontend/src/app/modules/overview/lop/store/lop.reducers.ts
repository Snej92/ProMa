import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {
  loadStationLop, loadStationLopFail, loadStationLopSuccess,
  updateStationLopSuccess
} from "./lop.actions";
import {lopModel} from "./lop.model";


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
    const _lop={...action.lopInput};
    const updatedLop=state.lopList.map(lop=>{
      return _lop.id===lop.id?_lop:lop;
    });
    return{
      ...state,
      lopList:updatedLop
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
