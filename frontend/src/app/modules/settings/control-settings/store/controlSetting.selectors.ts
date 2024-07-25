import {createFeatureSelector, createSelector} from "@ngrx/store";
import {controlSetting, controlSettingModel} from "./controlSetting.model";


const getSettingControlState=createFeatureSelector<controlSetting>('controlSetting')

export const getSettingControl=createSelector(getSettingControlState,(state)=>{
  return state.controlSettingList;
});

export const getSettingControlInfo=createSelector(getSettingControlState,(state)=>{
  return state;
});

export const getSettingControlById=(controlSettingId:number)=>createSelector(getSettingControlState,(state)=>{
  return state.controlSettingList.find((controlSetting:controlSettingModel)=>controlSetting.id===controlSettingId) as controlSettingModel;
});
