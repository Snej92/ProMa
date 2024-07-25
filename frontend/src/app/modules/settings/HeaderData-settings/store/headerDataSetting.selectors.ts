import {createFeatureSelector, createSelector} from "@ngrx/store";
import {headerDataSetting, headerDataSettingModel} from "./headerDataSetting.model";


const getSettingHeaderDataState=createFeatureSelector<headerDataSetting>('headerDataSetting')

export const getSettingHeaderData=createSelector(getSettingHeaderDataState,(state)=>{
  return state.headerDataSettingList;
});

export const getSettingHeaderDataInfo=createSelector(getSettingHeaderDataState,(state)=>{
  return state;
});

export const getSettingHeaderDataById=(headerDataSettingId:number)=>createSelector(getSettingHeaderDataState,(state)=>{
  return state.headerDataSettingList.find((headerDataSetting:headerDataSettingModel)=>headerDataSetting.id===headerDataSettingId) as headerDataSettingModel;
});
