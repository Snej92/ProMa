
export interface stationViewModel{
  id:number,
  name:string,
  description:string,
  issuerAcronym:string,
  issuerName:string,
  status:string,
  version:string,
  totalProgress:number,
  //LOP
  lopTotal:number,
  lopDone:number,
  lopToDo:number,
  lopProgress:number,
  //Documentation
  documentationTotal:number,
  documentationDone:number,
  documentationToDo:number,
  documentationProgress:number,
  //Specification
  specificationTotal:number,
  specificationDone:number,
  specificationToDo:number,
  specificationProgress:number,
  //Control
  controlTotal:number,
  controlDone:number,
  controlToDo:number,
  controlProgress:number,
  //Projection
  projectionTotal:number,
  projectionDone:number,
  projectionToDo:number,
  projectionProgress:number,
}

export interface stationViewRequest{
  stationFavView:stationFavViewModel,
  headerDataInput:additionalHeaderDataModel[]
}

export interface stationFavViewModel{
  station:stationViewModel,
  isFavorite:boolean
}

export interface stationView{
  stationViewList:stationFavViewModel[],
  errorMessage:string,
}

//Additional Header Data
export interface additionalHeaderDataModel{
  item:string,
  data:string,
}
