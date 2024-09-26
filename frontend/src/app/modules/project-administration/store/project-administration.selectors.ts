import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projectFavViewModel, projectView, projectViewModel} from "./project-administration.model";


const getProjectViewState=createFeatureSelector<projectView>('projectView')

export const getProjectView=createSelector(getProjectViewState,(state)=>{
  return state.projectViewList;
});

export const getProjectViewInfo=createSelector(getProjectViewState,(state)=>{
  return state;
});

export const getProjectById=(projectId:number)=>createSelector(getProjectViewState,(state)=>{
  return state.projectViewList.find((projectView:projectFavViewModel)=>projectView.project.id===projectId) as projectFavViewModel;
});
