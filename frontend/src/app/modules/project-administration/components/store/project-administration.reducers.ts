import {createReducer, on} from "@ngrx/store";
import {projectViewState} from "./project-administration.state";
import {
  addProjectViewSuccess,
  loadProjectView,
  loadProjectViewFail,
  loadProjectViewSuccess
} from "./project-administration.actions";


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

  on(addProjectViewSuccess, (state,action) => {
    const project={...action.projectViewInput};
    return{
      ...state,
      projectViewList:[...state.projectViewList,project]
    };
  }),
);

export function projectViewReducer(state: any , action: any) {
  return _projectReducer(state, action);
}
