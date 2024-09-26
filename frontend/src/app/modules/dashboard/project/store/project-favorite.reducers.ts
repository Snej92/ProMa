import {createReducer, on} from "@ngrx/store";
import {projectFavoriteViewState} from "./project-favorite.state";
import {
  loadProjectViewFavorite,
  loadProjectViewFavoriteFail,
  loadProjectViewFavoriteSuccess
} from "./project-favorite.actions";


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
);

export function projectFavoriteViewReducer(state: any , action: any) {
  return _projectFavoriteReducer(state, action);
}
