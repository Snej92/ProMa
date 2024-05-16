import {createAction, props} from "@ngrx/store";
import {projectViewModel} from "./project-administration.model";


export const LOAD_PROJECT_VIEW_SUCCESS='[project page] load project view success'
export const LOAD_PROJECT_VIEW_FAIL='[project page] load project view fail'
export const LOAD_PROJECT_VIEW='[project page] get project view'

export const ADD_PROJECT_SUCCESS='[project page] add project success'
export const ADD_PROJECT='[project page] add project'

export const UPDATE_PROJECT='[project page] update project'
export const UPDATE_PROJECT_SUCCESS='[project page] update project success'

export const DELETE_PROJECT='[project page] delete project'
export const DELETE_PROJECT_SUCCESS='[project page] delete project success'


export const loadProjectView=createAction(LOAD_PROJECT_VIEW);
export const loadProjectViewSuccess=createAction(LOAD_PROJECT_VIEW_SUCCESS, props<{projectViewList:projectViewModel[]}>());
export const loadProjectViewFail=createAction(LOAD_PROJECT_VIEW_FAIL, props<{errorText:any}>());

export const addProjectView = createAction(ADD_PROJECT, props<{projectViewInput:projectViewModel}>())
export const addProjectViewSuccess = createAction(ADD_PROJECT_SUCCESS, props<{projectViewInput:projectViewModel}>())

export const updateProject=createAction(UPDATE_PROJECT, props<{projectViewInput:projectViewModel}>())
export const updateProjectSuccess=createAction(UPDATE_PROJECT_SUCCESS, props<{projectViewNew:projectViewModel, projectViewOld:projectViewModel}>())

export const deleteProject=createAction(DELETE_PROJECT, props<{id:number}>())
export const deleteProjectSuccess=createAction(DELETE_PROJECT_SUCCESS, props<{id:number}>())
