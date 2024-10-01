import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stationFavViewModel, stationView} from "../../../station/store/stationView.model";



const getStationFavoriteViewState=createFeatureSelector<stationView>('stationFavoriteView')

export const getStationFavoriteView=createSelector(getStationFavoriteViewState,(state)=>{
  return state.stationViewList;
});

export const getStationFavoriteViewInfo=createSelector(getStationFavoriteViewState,(state)=>{
  return state;
});

export const getStationFavoriteById=(stationId:number)=>createSelector(getStationFavoriteViewState,(state)=>{
  return state.stationViewList.find((stationView:stationFavViewModel)=>stationView.station.id===stationId) as stationFavViewModel;
});
