
export interface stationViewModel{
  id:number,
  name:string,
  description:string,
  issuerAcronym:string,
  issuerName:string,
  status:string,
  totalProgress:number,
  version:string,
  image:string,
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
  //Additions
  note:string,
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
