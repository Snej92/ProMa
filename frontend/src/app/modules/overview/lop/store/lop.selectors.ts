import {createFeatureSelector, createSelector} from "@ngrx/store";
import {lop} from "./lop.model";


const getLopState=createFeatureSelector<lop>('lop')

export const getLop=createSelector(getLopState,(state)=>{
  return state.lopList;
})
