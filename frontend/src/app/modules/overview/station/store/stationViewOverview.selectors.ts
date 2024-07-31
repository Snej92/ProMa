import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stationViewOverview} from "./stationViewOverview.model";


const getStationViewState=createFeatureSelector<stationViewOverview>('stationViewOverview')

export const getStationViewOverview=createSelector(getStationViewState,(state)=>{
  return state.stationViewOverview
});

export const getStationViewOverviewInfo=createSelector(getStationViewState,(state)=>{
  return state;
});
