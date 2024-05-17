import {activeProjectView} from "./active-project.model";
import {
  projectViewModel
} from "../../modules/project-administration/store/project-administration.model";

const activeProjectViewModel:projectViewModel={
  id:0,
  name:'',
  description:'',
  favorite:false,
  amountStations:0,
  inProgressStations:0,
  storedStations:0,
  notStoredStations:0,
}

export const activeProjectViewState:activeProjectView={
  projectView:activeProjectViewModel,
  errorMessage: ''
}
