import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stationFavViewModel, stationView} from "./stationView.model";


const getStationViewState=createFeatureSelector<stationView>('stationView')

export const getStationView=createSelector(getStationViewState,(state)=>{
  return state.stationViewList;
});

export const getStationViewInfo=createSelector(getStationViewState,(state)=>{
  return state;
});

export const getStationById=(stationId:number)=>createSelector(getStationViewState,(state)=>{
  return state.stationViewList.find((stationView:stationFavViewModel)=>stationView.station.id===stationId) as stationFavViewModel;
});
