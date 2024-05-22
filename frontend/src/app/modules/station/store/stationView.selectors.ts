import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stationView, stationViewModel} from "./stationView.model";

const getStationViewState=createFeatureSelector<stationView>('stationView')

export const getStationView=createSelector(getStationViewState,(state)=>{
  return state.stationViewList;
});

export const getStationViewInfo=createSelector(getStationViewState,(state)=>{
  return state;
});

export const getStationById=(stationId:number)=>createSelector(getStationViewState,(state)=>{
  return state.stationViewList.find((stationView:stationViewModel)=>stationView.id===stationId) as stationViewModel;
});
