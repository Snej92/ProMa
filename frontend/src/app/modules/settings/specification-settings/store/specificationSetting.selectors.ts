import {createFeatureSelector, createSelector} from "@ngrx/store";
import {specificationSetting, specificationSettingModel} from "./specificationSetting.model";


const getSettingSpecificationState=createFeatureSelector<specificationSetting>('specificationSetting')

export const getSettingSpecification=createSelector(getSettingSpecificationState,(state)=>{
  return state.specificationSettingList;
});

export const getSettingSpecificationInfo=createSelector(getSettingSpecificationState,(state)=>{
  return state;
});

export const getSettingSpecificationById=(specificationSettingId:number)=>createSelector(getSettingSpecificationState,(state)=>{
  return state.specificationSettingList.find((specificationSetting:specificationSettingModel)=>specificationSetting.id===specificationSettingId) as specificationSettingModel;
});
