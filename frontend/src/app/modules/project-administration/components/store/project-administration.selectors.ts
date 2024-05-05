import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projectView} from "./project-administration.model";


const getProjectViewState=createFeatureSelector<projectView>('projectView')

export const getProjectView=createSelector(getProjectViewState,(state)=>{
  return state.projectViewList;
});

export const getProjectViewInfo=createSelector(getProjectViewState,(state)=>{
  return state;
});
