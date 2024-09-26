import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projectFavViewModel, projectView} from "../../../project-administration/store/project-administration.model";


const getProjectFavoriteViewState=createFeatureSelector<projectView>('projectView')

export const getProjectFavoriteView=createSelector(getProjectFavoriteViewState,(state)=>{
  return state.projectViewList;
});

export const getProjectFavoriteViewInfo=createSelector(getProjectFavoriteViewState,(state)=>{
  return state;
});

export const getProjectFavoriteById=(projectId:number)=>createSelector(getProjectFavoriteViewState,(state)=>{
  return state.projectViewList.find((projectView:projectFavViewModel)=>projectView.project.id===projectId) as projectFavViewModel;
});
