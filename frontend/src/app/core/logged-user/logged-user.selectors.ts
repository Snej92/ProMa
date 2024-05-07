import {createFeatureSelector, createSelector} from "@ngrx/store";
import {loggedUser} from "./logged-user.model";


const getLoggedUserState=createFeatureSelector<loggedUser>('loggedUser')

export const getLoggedUser=createSelector(getLoggedUserState,(state)=>{
  return state.user
});

export const getLoggedUserInfo=createSelector(getLoggedUserState,(state)=>{
  return state;
});
