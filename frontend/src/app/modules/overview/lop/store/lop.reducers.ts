import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {loadLop, loadLopSuccess} from "./lop.actions";


const _lopReducer = createReducer(
  lopState,

  on(loadLop, (state) => {
    return{
      ...state
    };
  }),

  on(loadLopSuccess, (state,action) => {
    return{
      ...state,
      lopList:[...action.lopList]
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
