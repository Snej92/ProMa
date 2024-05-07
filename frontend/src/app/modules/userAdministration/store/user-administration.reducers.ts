import {createReducer, on} from "@ngrx/store";
import {
  addUserSuccess, deleteUser,
  loadUser,
  loadUserFail,
  loadUserSuccess,
  updateUserSuccess
} from "./user-administration.actions";
import {userState} from "./user-administration.state";
import {userModel} from "./user-Administration.model";

const _userReducer = createReducer(
  userState,

  //Load all user
  on(loadUser, (state) => {
    return{
      ...state
    };
  }),

  on(loadUserSuccess, (state,action) => {
    return{
      ...state,
      userList:[...action.userList],
      errorMessage:''
    };
  }),

  on(loadUserFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      userList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(addUserSuccess, (state,action) => {
    const user={...action.userInput};
    return{
      ...state,
      userList:[...state.userList,user]
    };
  }),

  on(updateUserSuccess, (state,action) => {
    const userOld={...action.userOld};
    const userNew={...action.userNew};
    const updatedUser=state.userList.map(user=>{
      return userOld.id===user.id?userNew:user;
    });
    return{
      ...state,
      userList:updatedUser
    };
  }),


  on(deleteUser, (state,action) => {
    const updatedUser=state.userList.filter((data:userModel)=>{
      return data.sub!==action.sub
    });
    return{
      ...state,
      userList:updatedUser
    };
  }),
);

export function userReducer(state: any , action: any) {
  return _userReducer(state, action);
}
