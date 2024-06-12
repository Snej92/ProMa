import {createFeatureSelector, createSelector} from "@ngrx/store";
import {history, historyModel} from "./history.model";

const getHistoryState=createFeatureSelector<history>('history')

export const getHistory=createSelector(getHistoryState,(state)=>{
  return state.historyList;
});

export const getHistoryInfo=createSelector(getHistoryState,(state)=>{
  return state;
});

export const getHistoryById=(historyId:number)=>createSelector(getHistoryState,(state)=>{
  return state.historyList.find((history:historyModel)=>history.id===historyId) as historyModel;
});
