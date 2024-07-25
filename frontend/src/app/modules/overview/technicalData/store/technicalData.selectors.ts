import {createFeatureSelector, createSelector} from "@ngrx/store";
import {technicalData, technicalDataModel} from "./technicalData.model";

const getTechnicalDataState=createFeatureSelector<technicalData>('technicalData')

export const getTechnicalData=createSelector(getTechnicalDataState,(state)=>{
  return state.technicalDataList;
});

export const getTechnicalDataInfo=createSelector(getTechnicalDataState,(state)=>{
  return state;
});

export const getTechnicalDataById=(technicalDataId:number)=>createSelector(getTechnicalDataState,(state)=>{
  return state.technicalDataList.find((technicalData:technicalDataModel)=>technicalData.id===technicalDataId) as technicalDataModel;
});
