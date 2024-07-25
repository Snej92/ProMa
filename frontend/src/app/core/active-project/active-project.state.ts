import {activeProjectView} from "./active-project.model";
import {
  projectViewModel
} from "../../modules/project-administration/store/project-administration.model";

export const activeProjectViewModel:projectViewModel={
  id:0,
  name:'Kein Projekt ausgewählt',
  description:'',
  amountStations:0,
  inProgressStations:0,
  storedStations:0,
  notStoredStations:0,
}

export const activeProjectViewState:activeProjectView={
  projectView:activeProjectViewModel,
  errorMessage: ''
}
