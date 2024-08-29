import {createReducer, on} from "@ngrx/store";
import {projectViewState} from "./project-administration.state";
import {
  addProjectViewSuccess, deleteProject,
  loadProjectView,
  loadProjectViewFail,
  loadProjectViewSuccess, updateProjectSuccess
} from "./project-administration.actions";
import {projectFavViewModel} from "./project-administration.model";


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

  on(updateProjectSuccess, (state,action) => {
    const projectViewOld={...action.projectViewOld};
    const projectViewNew={...action.projectViewNew};
    const updatedProject=state.projectViewList.map(projectView=>{
      return projectViewOld.project.id===projectView.project.id?projectViewNew:projectView;
    });
    return{
      ...state,
      projectViewList:updatedProject
    };
  }),


  on(deleteProject, (state,action) => {
    const updatedProject=state.projectViewList.filter((data:projectFavViewModel)=>{
      return data.project.id!==action.id
    });
    return{
      ...state,
      projectViewList:updatedProject
    };
  }),
);

export function projectViewReducer(state: any , action: any) {
  return _projectReducer(state, action);
}
