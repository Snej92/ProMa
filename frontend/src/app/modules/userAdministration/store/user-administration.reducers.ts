import {createReducer, on} from "@ngrx/store";
import {loadUser, loadUserFail, loadUserSuccess} from "./user-administration.actions";
import {userState} from "./user-administration.state";

const _userReducer = createReducer(
  userState,

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
);

export function userReducer(state: any , action: any) {
  return _userReducer(state, action);
}
