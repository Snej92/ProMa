import {createReducer, on} from "@ngrx/store";
import {activeProjectViewState} from "./active-project.state";
import {loadActiveProjectView, loadActiveProjectViewFail, loadActiveProjectViewSuccess} from "./active-project.actions";


const _activeProjectReducer = createReducer(
  activeProjectViewState,

  on(loadActiveProjectView, (state) => {
    return{
      ...state
    };
  }),

  on(loadActiveProjectViewSuccess, (state,action) => {
    return{
      ...state,
      projectView:action.projectView,
      errorMessage:''
    };
  }),

  on(loadActiveProjectViewFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      errorMessage:action.errorText.message
    };
  }),
);

export function activeProjectViewReducer(state: any , action: any) {
  return _activeProjectReducer(state, action);
}
