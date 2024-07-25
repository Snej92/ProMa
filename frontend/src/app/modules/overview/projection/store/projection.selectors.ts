import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projection, projectionModel} from "./projection.model";

const getProjectionState=createFeatureSelector<projection>('projection')

export const getProjection=createSelector(getProjectionState,(state)=>{
  return state.projectionList;
});

export const getProjectionInfo=createSelector(getProjectionState,(state)=>{
  return state;
});

export const getProjectionById=(projectionId:number)=>createSelector(getProjectionState,(state)=>{
  return state.projectionList.find((projection:projectionModel)=>projection.id===projectionId) as projectionModel;
});
