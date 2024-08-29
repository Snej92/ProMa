import {
  projectFavViewModel
} from "../../modules/project-administration/store/project-administration.model";

export interface activeProjectView{
  projectView:projectFavViewModel,
  errorMessage:string,
}
