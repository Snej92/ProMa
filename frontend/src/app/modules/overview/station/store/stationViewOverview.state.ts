import {stationFavViewModel, stationViewModel} from "../../../station/store/stationView.model";
import {stationViewOverview} from "./stationViewOverview.model";

export const stationViewModelState:stationViewModel={
  id:0,
  name:'',
  description:'',
  issuerAcronym:'',
  issuerName:'',
  status:'',
  totalProgress:0,
  version:'',
  image:'',
  //LOP
  lopTotal:0,
  lopDone:0,
  lopToDo:0,
  lopProgress:0,
  //Documentation
  documentationTotal:0,
  documentationDone:0,
  documentationToDo:0,
  documentationProgress:0,
  //Specification
  specificationTotal:0,
  specificationDone:0,
  specificationToDo:0,
  specificationProgress:0,
  //Control
  controlTotal:0,
  controlDone:0,
  controlToDo:0,
  controlProgress:0,
  //Projection
  projectionTotal:0,
  projectionDone:0,
  projectionToDo:0,
  projectionProgress:0,
}

export const stationFavViewModelState:stationFavViewModel={
  station:stationViewModelState,
  isFavorite:false
}

export const stationViewOverviewState:stationViewOverview={
  stationViewOverview:stationFavViewModelState,
  errorMessage:''
}

