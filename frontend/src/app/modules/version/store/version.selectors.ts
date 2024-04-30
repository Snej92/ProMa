import {createFeatureSelector, createSelector} from "@ngrx/store";
import {versionModel, versions} from "./version.model";

const getVersionState=createFeatureSelector<versions>('version')

export const getVersion=createSelector(getVersionState,(state)=>{
  return state.versionList;
})


export const getVersionById=(versionId:number)=>createSelector(getVersionState,(state)=>{
  return state.versionList.find((version:versionModel)=>version.id===versionId) as versionModel;
})
