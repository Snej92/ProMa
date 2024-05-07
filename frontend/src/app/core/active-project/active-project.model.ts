import {
  projectViewModel
} from "../../modules/project-administration/components/store/project-administration.model";

export interface activeProjectView{
  projectView:projectViewModel,
  errorMessage:string,
}
