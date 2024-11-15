import {createAction, props} from "@ngrx/store";
import {
  projectFavViewModel,
} from "../../modules/project-administration/store/project-administration.model";

export const LOAD_ACTIVE_PROJECT_VIEW_SUCCESS='[project page] load active project view success'
export const LOAD_ACTIVE_PROJECT_VIEW_FAIL='[project page] load active project view fail'
export const LOAD_ACTIVE_PROJECT_VIEW='[project page] get active project view'


export const loadActiveProjectView=createAction(LOAD_ACTIVE_PROJECT_VIEW);
export const loadActiveProjectViewSuccess=createAction(LOAD_ACTIVE_PROJECT_VIEW_SUCCESS, props<{projectView:projectFavViewModel}>())
export const loadActiveProjectViewFail=createAction(LOAD_ACTIVE_PROJECT_VIEW_FAIL, props<{errorText:any}>())
