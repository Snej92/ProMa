import {createFeatureSelector, createSelector} from "@ngrx/store";
import {headerData, headerDataModel} from "./headerData.model";

const getHeaderDataState=createFeatureSelector<headerData>('headerData')

export const getHeaderData=createSelector(getHeaderDataState,(state)=>{
  return state.headerDataList;
});

export const getHeaderDataInfo=createSelector(getHeaderDataState,(state)=>{
  return state;
});

export const getHeaderDataById=(headerDataId:number)=>createSelector(getHeaderDataState,(state)=>{
  return state.headerDataList.find((headerData:headerDataModel)=>headerData.id===headerDataId) as headerDataModel;
});
