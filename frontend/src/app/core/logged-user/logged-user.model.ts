import {userModel} from "../../modules/userAdministration/store/user-Administration.model";


export interface loggedUser{
  user:userModel,
  errorMessage:string
}
