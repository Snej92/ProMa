export interface stationViewModel{
  id:number,
  name:string,
  description:string,
  favorite:boolean,
  issuer:string,
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
  controlProgress:number
}

export interface stationView{
  stationViewList:stationViewModel[],
  errorMessage:string,
}