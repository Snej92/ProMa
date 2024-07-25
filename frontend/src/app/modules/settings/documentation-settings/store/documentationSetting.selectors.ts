import {createFeatureSelector, createSelector} from "@ngrx/store";
import {documentationSetting, documentationSettingModel} from "./documentationSetting.model";


const getSettingDocumentationState=createFeatureSelector<documentationSetting>('documentationSetting')

export const getSettingDocumentation=createSelector(getSettingDocumentationState,(state)=>{
  return state.documentationSettingList;
});

export const getSettingDocumentationInfo=createSelector(getSettingDocumentationState,(state)=>{
  return state;
});

export const getSettingDocumentationById=(documentationSettingId:number)=>createSelector(getSettingDocumentationState,(state)=>{
  return state.documentationSettingList.find((documentationSetting:documentationSettingModel)=>documentationSetting.id===documentationSettingId) as documentationSettingModel;
});
