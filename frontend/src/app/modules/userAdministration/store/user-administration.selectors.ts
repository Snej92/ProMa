import {createFeatureSelector, createSelector} from "@ngrx/store";
import {user} from "./user-Administration.model";


const getUserState=createFeatureSelector<user>('user')

export const getLop=createSelector(getUserState,(state)=>{
  return state.userList;
});

export const getUserInfo=createSelector(getUserState,(state)=>{
  return state;
});

