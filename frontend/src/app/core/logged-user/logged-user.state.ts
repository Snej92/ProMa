import {userModel, userRole} from "../../modules/userAdministration/store/user-Administration.model";
import {loggedUser} from "./logged-user.model";

const roles:userRole={
  id:0,
  adminRole: false,
  projectRole : false,
  userRole : false,
}

export const loggedUserModel:userModel={
  id : 0,
  activeProject: 0,
  sub : '',
  firstname : '',
  lastname : '',
  acronym : '',
  email : '',
  phone : '',
  username : '',
  password : '',
  roles : roles
}

export const loggedUserState:loggedUser={
  user:loggedUserModel,
  errorMessage:''
}
