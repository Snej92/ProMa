import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stationFavViewModel, stationView} from "../../../station/store/stationView.model";



const getAssignedStationViewState=createFeatureSelector<stationView>('assignedStationView')

export const getAssignedStationView=createSelector(getAssignedStationViewState,(state)=>{
  return state.stationViewList;
});

export const getAssignedStationViewInfo=createSelector(getAssignedStationViewState,(state)=>{
  return state;
});

export const getAssignedStationById=(stationId:number)=>createSelector(getAssignedStationViewState,(state)=>{
  return state.stationViewList.find((stationView:stationFavViewModel)=>stationView.station.id===stationId) as stationFavViewModel;
});
