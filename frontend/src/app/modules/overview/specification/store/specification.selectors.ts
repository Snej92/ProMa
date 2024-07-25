import {createFeatureSelector, createSelector} from "@ngrx/store";
import {specification, specificationModel} from "./specification.model";

const getSpecificationState=createFeatureSelector<specification>('specification')

export const getSpecification=createSelector(getSpecificationState,(state)=>{
  return state.specificationList;
});

export const getSpecificationInfo=createSelector(getSpecificationState,(state)=>{
  return state;
});

export const getSpecificationById=(specificationId:number)=>createSelector(getSpecificationState,(state)=>{
  return state.specificationList.find((specification:specificationModel)=>specification.id===specificationId) as specificationModel;
});
