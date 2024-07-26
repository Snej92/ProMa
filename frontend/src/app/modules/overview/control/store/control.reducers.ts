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
    const controlOld = {...action.controlOld};
    const controlNew = {...action.controlNew};
    const updatedControl = state.controlList.map(control => {
      return controlOld.id === control.id?controlNew:control;
    });
    return {
      ...state,
      controlList: updatedControl
    };
  }),
);

export function controlReducer(state: any , action: any) {
  return _controlReducer(state, action);
}
