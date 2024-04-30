import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {getLop} from "./lop.actions";


const _lopReducer = createReducer(
  lopState,

  on(getLop, (state) => {
    return{
      ...state
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
