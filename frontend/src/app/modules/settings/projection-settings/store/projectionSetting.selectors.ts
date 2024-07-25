import {createFeatureSelector, createSelector} from "@ngrx/store";
import {projectionSetting, projectionSettingModel} from "./projectionSetting.model";


const getSettingProjectionState=createFeatureSelector<projectionSetting>('projectionSetting')

export const getSettingProjection=createSelector(getSettingProjectionState,(state)=>{
  return state.projectionSettingList;
});

export const getSettingProjectionInfo=createSelector(getSettingProjectionState,(state)=>{
  return state;
});

export const getSettingProjectionById=(projectionSettingId:number)=>createSelector(getSettingProjectionState,(state)=>{
  return state.projectionSettingList.find((projectionSetting:projectionSettingModel)=>projectionSetting.id===projectionSettingId) as projectionSettingModel;
});
