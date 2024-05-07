import {createFeatureSelector, createSelector} from "@ngrx/store";
import {activeProjectView} from "./active-project.model";

const getActiveProjectViewState=createFeatureSelector<activeProjectView>('activeProjectView')

export const getActiveProjectView=createSelector(getActiveProjectViewState,(state)=>{
  return state.projectView;
});

export const getActiveProjectViewInfo=createSelector(getActiveProjectViewState,(state)=>{
  return state;
});
