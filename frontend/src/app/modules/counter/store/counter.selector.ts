import {createFeatureSelector, createSelector} from "@ngrx/store";
import {counterState} from "./counter.model";

const getcounterstate=createFeatureSelector<counterState>('counter')

export const getcounter=createSelector(getcounterstate,(state)=>{
  return state.counter;
  })

export const getcountername=createSelector(getcounterstate,(state)=>{
  return state.counterName;
})
