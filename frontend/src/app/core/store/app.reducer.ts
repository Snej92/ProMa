import {createReducer, on} from "@ngrx/store";
import {globalState} from "./global.state";
import {loadSpinner} from "./app.action";

const _appReducer = createReducer(
  globalState,

  on(loadSpinner, (state,action) => {
    return{
      ...state,
      isLoading:action.isLoading,
    };
  }),

)

export function appReducer(state: any , action: any) {
  return _appReducer(state, action);
}
