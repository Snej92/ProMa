export interface projectViewModel{
  id:number,
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
