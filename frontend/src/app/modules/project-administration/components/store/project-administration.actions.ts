import {createAction, props} from "@ngrx/store";
import {projectViewModel} from "./project-administration.model";


export const LOAD_PROJECT_VIEW_SUCCESS='[project page] load project view success'
export const LOAD_PROJECT_VIEW_FAIL='[project page] load project view fail'
export const LOAD_PROJECT_VIEW='[project page] get project view'


export const loadProjectView=createAction(LOAD_PROJECT_VIEW);
export const loadProjectViewSuccess=createAction(LOAD_PROJECT_VIEW_SUCCESS, props<{projectViewList:projectViewModel[]}>())
export const loadProjectViewFail=createAction(LOAD_PROJECT_VIEW_FAIL, props<{errorText:any}>())