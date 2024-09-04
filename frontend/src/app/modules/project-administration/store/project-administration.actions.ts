import {createAction, props} from "@ngrx/store";
import {projectFavViewModel, projectViewModel} from "./project-administration.model";


export const LOAD_PROJECT_VIEW_SUCCESS='[project page] load project view success'
export const LOAD_PROJECT_VIEW_FAIL='[project page] load project view fail'
export const LOAD_PROJECT_VIEW='[project page] get project view'

export const ADD_PROJECT_SUCCESS='[project page] add project success'
export const ADD_PROJECT='[project page] add project'

export const UPDATE_PROJECT='[project page] update project'
export const UPDATE_PROJECT_SUCCESS='[project page] update project success'

export const ARCHIVE_PROJECT='[project page] archive project'
export const ARCHIVE_PROJECT_SUCCESS='[project page] archive project success'
export const DE_ARCHIVE_PROJECT='[project page] de archive project'
export const DE_ARCHIVE_PROJECT_SUCCESS='[project page] de archive project success'

export const DELETE_PROJECT='[project page] delete project'
export const DELETE_PROJECT_SUCCESS='[project page] delete project success'

export const LOAD_PROJECT_VIEW_FAVORITE_SUCCESS='[project page] load project view favorite success'
export const LOAD_PROJECT_VIEW_FAVORITE_FAIL='[project page] load project view favorite fail'
export const LOAD_PROJECT_VIEW_FAVORITE='[project page] get project view favorite'


export const loadProjectView=createAction(LOAD_PROJECT_VIEW, props<{archive:boolean, all:boolean}>());
export const loadProjectViewSuccess=createAction(LOAD_PROJECT_VIEW_SUCCESS, props<{projectViewList:projectFavViewModel[]}>());
export const loadProjectViewFail=createAction(LOAD_PROJECT_VIEW_FAIL, props<{errorText:any}>());

export const addProjectView = createAction(ADD_PROJECT, props<{projectViewInput:projectFavViewModel, template:string}>())
export const addProjectViewSuccess = createAction(ADD_PROJECT_SUCCESS, props<{projectViewInput:projectFavViewModel}>())

export const updateProject=createAction(UPDATE_PROJECT, props<{projectViewInput:projectFavViewModel}>())
export const updateProjectSuccess=createAction(UPDATE_PROJECT_SUCCESS, props<{projectViewNew:projectFavViewModel, projectViewOld:projectFavViewModel}>())

export const archiveProject=createAction(ARCHIVE_PROJECT, props<{projectViewInput:projectFavViewModel}>())
export const archiveProjectSuccess = createAction(ARCHIVE_PROJECT_SUCCESS, props<{projectViewInput:projectFavViewModel}>())

export const deArchiveProject=createAction(DE_ARCHIVE_PROJECT, props<{projectViewInput:projectFavViewModel}>())
export const deArchiveProjectSuccess = createAction(DE_ARCHIVE_PROJECT_SUCCESS, props<{projectViewInput:projectFavViewModel}>())

export const deleteProject=createAction(DELETE_PROJECT, props<{id:number}>())
export const deleteProjectSuccess=createAction(DELETE_PROJECT_SUCCESS, props<{id:number}>())

export const loadProjectViewFavorite=createAction(LOAD_PROJECT_VIEW);
export const loadProjectViewFavoriteSuccess=createAction(LOAD_PROJECT_VIEW_SUCCESS, props<{projectViewList:projectFavViewModel[]}>());
export const loadProjectViewFavoriteFail=createAction(LOAD_PROJECT_VIEW_FAIL, props<{errorText:any}>());
