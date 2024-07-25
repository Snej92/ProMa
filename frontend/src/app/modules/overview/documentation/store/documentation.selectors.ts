import {createFeatureSelector, createSelector} from "@ngrx/store";
import {documentation, documentationModel} from "./documentation.model";

const getDocumentationState=createFeatureSelector<documentation>('documentation')

export const getDocumentation=createSelector(getDocumentationState,(state)=>{
  return state.documentationList;
});

export const getDocumentationInfo=createSelector(getDocumentationState,(state)=>{
  return state;
});

export const getDocumentationById=(documentationId:number)=>createSelector(getDocumentationState,(state)=>{
  return state.documentationList.find((documentation:documentationModel)=>documentation.id===documentationId) as documentationModel;
});
