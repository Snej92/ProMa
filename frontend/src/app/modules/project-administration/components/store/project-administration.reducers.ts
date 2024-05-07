import {createReducer, on} from "@ngrx/store";
import {projectViewState} from "./project-administration.state";
import {
  loadProjectView,
  loadProjectViewFail,
  loadProjectViewSuccess
} from "./project-administration.actions";
import {lopModel} from "../../../overview/lop/store/lop.model";


const _projectReducer = createReducer(
  projectViewState,

  on(loadProjectView, (state) => {
    return{
      ...state
    };
  }),

  on(loadProjectViewSuccess, (state,action) => {
    return{
      ...state,
      projectViewList:[...action.projectViewList],
      errorMessage:''
    };
  }),

  on(loadProjectViewFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      projectViewList:[],
      errorMessage:action.errorText.message
    };
  }),
);

export function projectViewReducer(state: any , action: any) {
  return _projectReducer(state, action);
}
