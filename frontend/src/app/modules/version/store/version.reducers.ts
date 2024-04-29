import {createReducer, on} from "@ngrx/store";
import {versionState} from "./version.state";
import {getVersion} from "./version.actions";


const _versionReducer = createReducer(
  versionState,

  on(getVersion, (state) => {
    return{
      ...state
    };
  }),

);

export function versionReducer(state: any , action: any) {
  return _versionReducer(state, action);
}
