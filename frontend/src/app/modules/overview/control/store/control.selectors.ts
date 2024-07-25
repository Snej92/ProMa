import {createFeatureSelector, createSelector} from "@ngrx/store";
import {control, controlModel} from "./control.model";

const getControlState=createFeatureSelector<control>('control')

export const getControl=createSelector(getControlState,(state)=>{
  return state.controlList;
});

export const getControlInfo=createSelector(getControlState,(state)=>{
  return state;
});

export const getControlById=(controlId:number)=>createSelector(getControlState,(state)=>{
  return state.controlList.find((control:controlModel)=>control.id===controlId) as controlModel;
});
