export interface projectViewModel{
  id:number,
  archived:boolean,
  name:string,
  description:string,
  amountStations:number,
  inProgressStations:number,
  storedStations:number,
  notStoredStations:number,
}

export interface projectView{
  projectViewList:projectViewModel[],
  errorMessage:string,
}
