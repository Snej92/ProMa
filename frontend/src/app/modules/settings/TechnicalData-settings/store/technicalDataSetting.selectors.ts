import {createFeatureSelector, createSelector} from "@ngrx/store";
import {technicalDataSetting, technicalDataSettingModel} from "./technicalDataSetting.model";


const getSettingTechnicalDataState=createFeatureSelector<technicalDataSetting>('technicalDataSetting')

export const getSettingTechnicalData=createSelector(getSettingTechnicalDataState,(state)=>{
  return state.technicalDataSettingList;
});

export const getSettingTechnicalDataInfo=createSelector(getSettingTechnicalDataState,(state)=>{
  return state;
});

export const getSettingTechnicalDataById=(technicalDataSettingId:number)=>createSelector(getSettingTechnicalDataState,(state)=>{
  return state.technicalDataSettingList.find((technicalDataSetting:technicalDataSettingModel)=>technicalDataSetting.id===technicalDataSettingId) as technicalDataSettingModel;
});
