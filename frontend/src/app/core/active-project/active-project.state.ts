import {activeProjectView} from "./active-project.model";
import {
  projectFavViewModel,
  projectViewModel
} from "../../modules/project-administration/store/project-administration.model";

export const activeProjectViewModel:projectViewModel={
  id:0,
  archived:false,
  color:'',
  acronym:'',
  name:'Kein Projekt ausgewählt',
  description:'',
  amountStations:0,
  inProgressStations:0,
  storedStations:0,
  notStoredStations:0,
  image: ""
}

export const activeFavProjectViewModel:projectFavViewModel={
  project:activeProjectViewModel,
  isFavorite:false
}

export const activeProjectViewState:activeProjectView={
  projectView:activeFavProjectViewModel,
  errorMessage: ''
}
