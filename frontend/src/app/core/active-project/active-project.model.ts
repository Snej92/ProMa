import {
  projectViewModel
} from "../../modules/project-administration/store/project-administration.model";

export interface activeProjectView{
  projectView:projectViewModel,
  errorMessage:string,
}
