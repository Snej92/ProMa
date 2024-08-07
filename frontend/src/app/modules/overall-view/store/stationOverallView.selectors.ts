import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stationOverallView, stationOverallViewModel} from "./stationOverallView.model";

const getStationOverallViewState=createFeatureSelector<stationOverallView>('stationOverallView')

export const getStationOverallView=createSelector(getStationOverallViewState,(state)=>{
  return state.stationOverallViewList;
});

export const getStationOverallViewInfo=createSelector(getStationOverallViewState,(state)=>{
  return state;
});

export const getStationById=(stationId:number)=>createSelector(getStationOverallViewState,(state)=>{
  return state.stationOverallViewList.find((stationOverallView:stationOverallViewModel)=>stationOverallView.id===stationId) as stationOverallViewModel;
});
