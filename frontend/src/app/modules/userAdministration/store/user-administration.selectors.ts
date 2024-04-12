import {createFeatureSelector, createSelector, Selector} from "@ngrx/store";
import {USER_ADMINISTRATION_STORE_KEY} from "./user-administration.reducers";
import {UserAdministrationState} from "./user-administration.state";


const getUserAdministrationState: Selector<object, UserAdministrationState> = createFeatureSelector(USER_ADMINISTRATION_STORE_KEY);

const users = createSelector(getUserAdministrationState, (state: UserAdministrationState) => state.users);
const usersLoadState = createSelector(getUserAdministrationState, (state: UserAdministrationState) => state.usersLoadState);
const deleteUserState = createSelector(getUserAdministrationState, (state: UserAdministrationState) => state.deleteUserLoadState);
const editUserState = createSelector(getUserAdministrationState, (state: UserAdministrationState) => state.editUserLoadState);
const addUserState = createSelector(getUserAdministrationState, (state: UserAdministrationState) => state.addUserLoadState);

export const UserAdministrationSelector = {
  getUsers : users,
  getUsersLoadState : usersLoadState,
  deleteUserLoadState : deleteUserState,
  editUserLoadState : editUserState,
  addUserLoadState : addUserState
}
