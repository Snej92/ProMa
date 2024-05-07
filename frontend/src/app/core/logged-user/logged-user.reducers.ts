import {createReducer, on} from "@ngrx/store";
import {loggedUserState} from "./logged-user.state";
import {
  loadLoggedUser,
  loadLoggedUserFail,
  loadLoggedUserSuccess,
  updateLoggedUserSuccess,
} from "./logged-user.actions";


const _loggedUserReducer = createReducer(
  loggedUserState,


on(loadLoggedUser, (state) => {
  return{
    ...state
  };
}),

  on(loadLoggedUserSuccess, (state,action) => {
    return{
      ...state,
      user:action.loggedUser,
      errorMessage:''
    };
  }),

  on(loadLoggedUserFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      errorMessage:action.errorText.message
    };
  }),

  on(updateLoggedUserSuccess, (state,action) => {
    return{
      ...state,
      user:action.loggedUser,
      errorMessage:''
    };
  }),
);

export function loggedUserReducer(state: any , action: any) {
  return _loggedUserReducer(state, action);
}
