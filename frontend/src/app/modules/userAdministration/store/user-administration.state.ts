import {user} from "../models/user-Administration.model";
import {LoadState} from "../../../core/models/core.models";


export interface UserAdministrationState {
  users : user[],
  usersLoadState : LoadState,
  addUserLoadState : LoadState,
  deleteUserLoadState : LoadState,
  editUserLoadState : LoadState,
}
