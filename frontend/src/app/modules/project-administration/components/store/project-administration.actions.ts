import {createAction, props} from "@ngrx/store";
import {projectViewModel} from "./project-administration.model";
import {userModel} from "../../../userAdministration/store/user-Administration.model";
import {ADD_USER, ADD_USER_SUCCESS} from "../../../userAdministration/store/user-administration.actions";


export const LOAD_PROJECT_VIEW_SUCCESS='[project page] load project view success'
export const LOAD_PROJECT_VIEW_FAIL='[project page] load project view fail'
export const LOAD_PROJECT_VIEW='[project page] get project view'

export const ADD_PROJECT_SUCCESS='[project page] add project success'
export const ADD_PROJECT='[project page] add project'


export const loadProjectView=createAction(LOAD_PROJECT_VIEW);
export const loadProjectViewSuccess=createAction(LOAD_PROJECT_VIEW_SUCCESS, props<{projectViewList:projectViewModel[]}>());
export const loadProjectViewFail=createAction(LOAD_PROJECT_VIEW_FAIL, props<{errorText:any}>());


export const addProjectView = createAction(ADD_PROJECT, props<{projectViewInput:projectViewModel}>())
export const addProjectViewSuccess = createAction(ADD_PROJECT_SUCCESS, props<{projectViewInput:projectViewModel}>())
