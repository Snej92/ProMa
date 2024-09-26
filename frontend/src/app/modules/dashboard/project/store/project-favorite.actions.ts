import {createAction, props} from "@ngrx/store";
import {projectFavViewModel} from "../../../project-administration/store/project-administration.model";


export const LOAD_PROJECT_VIEW_FAVORITE_SUCCESS='[dashboard page] load project view favorite success'
export const LOAD_PROJECT_VIEW_FAVORITE_FAIL='[dashboard page] load project view favorite fail'
export const LOAD_PROJECT_VIEW_FAVORITE='[dashboard page] get project view favorite'

export const UPDATE_PROJECT_FAVORITE='[dashboard page] update project'


export const updateProjectFavorite=createAction(UPDATE_PROJECT_FAVORITE, props<{projectId:number, remove:boolean}>())

export const loadProjectViewFavorite=createAction(LOAD_PROJECT_VIEW_FAVORITE);
export const loadProjectViewFavoriteSuccess=createAction(LOAD_PROJECT_VIEW_FAVORITE_SUCCESS, props<{projectViewList:projectFavViewModel[]}>());
export const loadProjectViewFavoriteFail=createAction(LOAD_PROJECT_VIEW_FAVORITE_FAIL, props<{errorText:any}>());
