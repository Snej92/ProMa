export interface projectViewModel{
  id:number,
  archived:boolean,
  color:string,
  acronym:string,
  name:string,
  description:string,
  amountStations:number,
  inProgressStations:number,
  storedStations:number,
  notStoredStations:number,
}

export interface projectFavViewModel{
  project:projectViewModel,
  isFavorite:boolean
}

export interface projectView{
  projectViewList:projectFavViewModel[],
  errorMessage:string,
}
