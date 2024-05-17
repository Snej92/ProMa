export interface stationViewModel{
  id:number,
  name:string,
  description:string,
  favorite:boolean,
  issuer:string,
  status:string,
  totalProgress:number,
  //LOP
  lopTotal:number,
  lopDone:number,
  lopProgress:number,
  //Documentation
  documentationTotal:number,
  documentationDone:number,
  documentationProgress:number,
  //Specification
  specificationTotal:number,
  specificationDone:number,
  specificationProgress:number,
  //Control
  controlTotal:number,
  controlDone:number,
  controlProgress:number
}

export interface stationView{
  stationViewList:stationViewModel[],
  errorMessage:string,
}
