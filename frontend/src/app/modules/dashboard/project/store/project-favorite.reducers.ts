import {createReducer, on} from "@ngrx/store";
import {projectFavoriteViewState} from "./project-favorite.state";
import {
  loadProjectViewFavorite,
  loadProjectViewFavoriteFail,
  loadProjectViewFavoriteSuccess, updateDashboardProjectFavoriteSuccess
} from "./project-favorite.actions";
import {projectFavViewModel} from "../../../project-administration/store/project-administration.model";


const _projectFavoriteReducer = createReducer(
  projectFavoriteViewState,

  on(loadProjectViewFavorite, (state) => {
    return{
      ...state
    };
  }),

  on(loadProjectViewFavoriteSuccess, (state,action) => {
    return{
      ...state,
      projectViewList:[...action.projectViewList],
      errorMessage:''
    };
  }),

  on(loadProjectViewFavoriteFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      projectViewList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateDashboardProjectFavoriteSuccess, (state, action) => {
    return{
      ...state,
      projectViewList: state.projectViewList.map(projectFavViewModel =>
        projectFavViewModel.project.id === action.projectId
          ? {
            ...projectFavViewModel,
            isFavorite: !action.remove
          }
          : projectFavViewModel
      ),
    };
  }),

  on(updateDashboardProjectFavoriteSuccess, (state, action) => {
    const updateDashboardProjectFavorite=state.projectViewList.filter((data:projectFavViewModel)=>{
      return data.project.id!==action.projectId
    })
    return{
      ...state,
      projectViewList:updateDashboardProjectFavorite
    };
  }),
);

export function projectFavoriteViewReducer(state: any , action: any) {
  return _projectFavoriteReducer(state, action);
}
