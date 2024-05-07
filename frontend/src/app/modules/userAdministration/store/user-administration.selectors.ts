import {createFeatureSelector, createSelector} from "@ngrx/store";
import {user, userModel} from "./user-Administration.model";


const getUserState=createFeatureSelector<user>('user')

export const getUser=createSelector(getUserState,(state)=>{
  return state.userList;
});

export const getUserInfo=createSelector(getUserState,(state)=>{
  return state;
});

export const getUserById=(userId:number)=>createSelector(getUserState,(state)=>{
  return state.userList.find((user:userModel)=>user.id===userId) as userModel;
});
