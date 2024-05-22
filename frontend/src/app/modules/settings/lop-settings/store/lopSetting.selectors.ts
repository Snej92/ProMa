import {createFeatureSelector, createSelector} from "@ngrx/store";
import {lopSetting, lopSettingModel} from "./lopSetting.model";


const getSettingLopState=createFeatureSelector<lopSetting>('lopSetting')

export const getSettingLop=createSelector(getSettingLopState,(state)=>{
  return state.lopSettingList;
});

export const getSettingLopInfo=createSelector(getSettingLopState,(state)=>{
  return state;
});

export const getSettingLopById=(lopSettingId:number)=>createSelector(getSettingLopState,(state)=>{
  return state.lopSettingList.find((lopSetting:lopSettingModel)=>lopSetting.id===lopSettingId) as lopSettingModel;
});
