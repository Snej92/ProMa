import {createFeatureSelector, createSelector} from "@ngrx/store";
import {lop, lopModel} from "./lop.model";


const getLopState=createFeatureSelector<lop>('lop')

export const getLop=createSelector(getLopState,(state)=>{
  return state.lopList;
})

export const getLopInfo=createSelector(getLopState,(state)=>{
  return state;
})

export const getLopById=(lopId:number)=>createSelector(getLopState,(state)=>{
  return state.lopList.find((lop:lopModel)=>lop.id===lopId) as lopModel;
})
