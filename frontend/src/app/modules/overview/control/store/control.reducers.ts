import {createReducer, on} from "@ngrx/store";
import {
  loadStationControl,
  loadStationControlFail,
  loadStationControlSuccess, updateStationControlSuccess
} from "./control.actions";
import {controlState} from "./control.state";

const _controlReducer = createReducer(
  controlState,

  on(loadStationControl, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationControlSuccess, (state,action) => {
    return{
      ...state,
      controlList:[...action.controlList],
      errorMessage:''
    };
  }),

  on(loadStationControlFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      controlList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationControlSuccess, (state,action) => {
    const _control={...action.controlStationInput};
    const updatedControl=state.controlList.map(control=>{
      return _control.id===control.id?_control:control;
    });
    return{
      ...state,
      controlList:updatedControl
    };
  }),
);

export function controlReducer(state: any , action: any) {
  return _controlReducer(state, action);
}
